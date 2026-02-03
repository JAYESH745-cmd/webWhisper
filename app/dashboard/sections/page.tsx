"use client";
import SectionFormField from "@/components/sections/sectionFormField";
import SectionTables from "@/components/sections/sectionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SectionFormData,Section,KnowledgeSource } from "@/@types/types";

type SectionStatus = "active" | "draft" | "disabled";
type Tone = "strict" | "neutral" | "friendly" | "empathetic";

// interface KnowledgeSource {
//   id: string;
//   name: string;
//   type: string;
//   status: string;
// }

interface FormData {
  name: string;
  description: string;
  tone: Tone;
  allowedTopics: string;
  blockedTopics: string;
  fallbackBehaviour: string;
}

const INITIAL_FORM_DATA: SectionFormData = {
  name: "",
  description: "",
  tone: "neutral",
  allowedTopics: "",
  blockedTopics: "",
  fallbackBehaviour: "escalate",
};

const page = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(
    [],
  );
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [isLoadingSources, setIsLoadingSources] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoadingSections, setIsLoadingSections] = useState(true);

  const [formData, setFormData] = useState<SectionFormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    fetchSections();
  }, []);

  const handleCreateSection = async () => {
    setSelectedSection({
      id: "new",
      name: "",
      description: "",
      sourceCount: 0,
      tone: "neutral",
      scopeLabel: "",
      status: "draft",
    });
    setSelectedSource([]);
    setFormData(INITIAL_FORM_DATA);
    setIsSheetOpen(true);
  };

  const handlePreviewSection = async (section: Section) => {
    setSelectedSection(section);
    setFormData({
      name: section.name,
      description: section.description,
      tone: section.tone,
      allowedTopics: section.allowed_topic || "",
      blockedTopics: section.blocked_topic || "",
      fallbackBehaviour: "escalate",
    });
    setSelectedSource(section.source_ids || []);
    setIsSheetOpen(true);
  };

  useEffect(() => {
    const fetchKnowledgeSources = async () => {
      try {
        const res = await fetch("/api/knowledge/fetch");
        const data = await res.json();
        setKnowledgeSources(data.sources || []);
      } catch (error) {
        console.error("Failed to fetch knowledge sources:", error);
      } finally {
        setIsLoadingSources(false);
      }
    };
    fetchKnowledgeSources();
  }, []);

  const fetchSections = async () => {
    try {
      setIsLoadingSections(true);
      const res = await fetch("/api/section/fetch");
      const data = await res.json();

      const transformedSections: Section[] = data.map((section: any) => ({
        id: section.id,
        name: section.name,
        description: section.description,
        source_ids: section.source_ids?.length || 0,
        tone: section.tone as Tone,
        scopeLabel: section.allowed_topics || "General",
        blocked_topics: section.blocked_topics,
        status: section.status as SectionStatus,
      }));

      setSections(transformedSections);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    } finally {
      setIsLoadingSections(false);
    }
  };

  const handleSaveSection = async () => {
    if (!formData.name.trim()) {
      toast("Please enter a section name!");
      return;
    }
    if (!formData.description.trim()) {
      toast("Please enter a section description!");
      return;
    }
    if (selectedSource.length === 0) {
      toast("Please select at least one knowledge source!");
      return;
    }

    setIsSaving(true);

    try {
      const sectionData = {
        ...formData,
        sourceIds: selectedSource,
        status: "active",
      };

      const response = await fetch("/api/section/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (!response.ok) {
        toast.error("Failed to create section");
      }

      await fetchSections();
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Failed to save section:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const handleDeleteSection = async () => {
    if (!selectedSection || selectedSection.id === "new") return;

    if (
      !confirm(
        `Are you sure you want to delete "${selectedSection.name}"? This action will delete the section`,
      )
    ) {
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/api/section/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedSection.id }),
      });

      if (response.ok) {
        toast.success("Section deleted successfully");
      }

      if (!response.ok) {
        toast.error("Failed to delete the section");
      }

      await fetchSections();
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Failed to delete section", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isPreviewMode = selectedSection?.id !== "new";
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sections</h1>
          <p className="text-zinc-400 mt-1">
            Define behaviour and tone for different topics
          </p>
        </div>

        <Button
          onClick={handleCreateSection}
          className="bg-white text-black hover:bg-zinc-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Section
        </Button>
      </div>

      <Card className="border-white/5 bg-[#0A0A0E]">
        <CardContent className="p-0">
          <SectionTables
            sections={sections}
            isLoading={isLoadingSections}
            onPreview={handlePreviewSection}
            onCreateSection={handleCreateSection}
          />
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md  border-white/10 bg-black ">
          {selectedSection && (
            <>
              <SheetHeader className="p-6 border-6 border-white/5">
                <SheetTitle className="text-xl text-white">
                  {selectedSection.id === "new"
                    ? "Create Section"
                    : "View Section"}
                </SheetTitle>

                <SheetDescription className="text-zinc-500">
                  Configure how the AI behaves for the specific topic.
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-auto px-6 py-0 space-y-8">
                <SectionFormField
                  formData={formData}
                  setFormData={setFormData}
                  selectedSources={selectedSource}
                  setSelectedSource={setSelectedSource}
                  knowledgeSources={knowledgeSources}
                  isLoadingSources={isLoadingSources}
                  isDisabled={isPreviewMode}
                />
              </div>

              {selectedSection.id === "new" && (
                <div className="p-6 border-t border-white/5">
                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-300"
                    onClick={handleSaveSection}
                    disabled={isSaving}
                  >
                    {isSaving ? "Creating..." : "Create Section"}
                  </Button>
                </div>
              )}

              {selectedSection.id !== "new" && (
                <div className="p-6 bg-red-500/5 border-t border-red-500/10">
                  <h5 className="text-sm font-medium text-red-400 mb-1">
                    Danger Zone
                  </h5>
                  <p className="text-xs text-red-600/700 mb-3">
                    Deleting this section will remove all associated routing
                    rules.
                  </p>

                  <Button
                    className="w-full bg-red-500/10 text-red-500 border border-red-500/70 hover:bg-red-300"
                    onClick={handleDeleteSection}
                    disabled={isSaving}
                  >
                    {isSaving ? "Deleting..." : "Delete Section"}
                  </Button>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default page;