import Firecrawl from "@mendable/firecrawl-js";


export const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});


export default firecrawl;