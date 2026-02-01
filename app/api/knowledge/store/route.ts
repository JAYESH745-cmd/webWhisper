import { db } from "@/db/client";
import { knowledge_source } from "@/db/schema";
import firecrawl from "@/lib/firecrawl";
import { isAuthorized } from "@/lib/isAuthorised";
import { summarizeMarkdown } from "@/lib/openAi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await isAuthorized();
    console.log(user);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// update
    let type: string;
    let body: any = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      type = formData.get("type") as string;

      if (type === "upload") {
        const file = formData.get("file") as File;
        if (!file)
          return NextResponse.json(
            { error: "No File Upload" },
            { status: 400 },
          );

        const fileContent = await file.text();
        const lines = fileContent.split("\n").filter((line) => line.trim());
        const headers = lines[0]?.split(",").map((h) => h.trim());
        let formattedContent:any = ""

        const markdown = await summarizeMarkdown(fileContent);
        formattedContent = markdown

        // TODO: store markdown in DB
        await db.insert(knowledge_source).values({
            user_email:user.email,
            type:"upload",
            name:file.name,
            status:"active",
            content:formattedContent,
            meta_data:JSON.stringify({
                fileName: file.name,
                fileSize: file.size,
                rowCount: lines.length - 1,
                headers: headers
            })
        })
        return NextResponse.json({  message: "CSV File added successfully" },{status:200});
      }

      body = Object.fromEntries(formData.entries());
    } else {
      body = await req.json();
      type = body.type;
    }

    // ✅ Handle website or text types
    if (type === "website") {
      const url = body.url;
      if (!url)
        return NextResponse.json(
          { error: "Website URL is required" },
          { status: 400 },
        );

      const scrapeResult = await firecrawl.scrape(url, {
        formats: ["markdown"],
      });

      if (!scrapeResult || !scrapeResult.markdown)
        return NextResponse.json(
          { error: "Failed to scrape website" },
          { status: 500 },
        );

      const summarized = await summarizeMarkdown(scrapeResult.markdown);
      console.log("summarized data:", summarized);

      //   TODO: save summarized to DB
      await db.insert(knowledge_source).values({
        user_email: user.email,
        type: "website",
        name: body.url,
        status: "active",
        source_url: body.url,
        content: summarized,
      });

      return NextResponse.json({
        success: true,
        message: "Website added to knowledge base",
      });
    } else if (type === "text") {
      const { title } = body;
      let { content } = body;
      //   let content = body.content
      if (!title || !content)
        return NextResponse.json(
          { error: "Title and content are required" },
          { status: 400 },
        );

      if (content.length > 500) {
        const markdown = await summarizeMarkdown(content);
        content = markdown;
      }
      // TODO: save markdown with title to DB
      await db.insert(knowledge_source).values({
        user_email:user.email,
        type:"text",
        name:body.title,
        status:"active",
        content:content
      })

      return NextResponse.json({
        success: true,
        message: "Source added to knowledge base",
      });
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (error) {
    console.error("STORE ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}