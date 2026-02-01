"use client";

import React, { useState } from "react";

import { KnowledgeSource } from "@/@types/types";
import QuickActions from "@/components/knowledge/quickactions";
import Quickadd from "@/components/knowledge/quickadd";

const Page = () => {
  const [defaultTab, setDefaultTab] = useState("website");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [knowledgeStoringLoader, setKnowledgeStoringLoader] = useState(false);
  const [knowledgeSourcesLoader, setKnowledgeSourcesLoader] = useState(true);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);

  const openModal = (tab: string) => {
    setDefaultTab(tab);
    setIsAddOpen(true);
  };

  const handleImportSource = async (data: any) => {
    try {
      setKnowledgeStoringLoader(true);
      // 🔥 your API call here
      // await fetch("/api/knowledge/import", { method: "POST", body: JSON.stringify(data) });
    } finally {
      setKnowledgeStoringLoader(false);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
    <h1 className="text-xl font-semibold text-white">Knowledge</h1>

    <QuickActions onOpenModal={openModal} />

    <Quickadd
      isOpen={isAddOpen}
      setIsOpen={setIsAddOpen}
      defaultTab={defaultTab}
      setDefaultTab={setDefaultTab}
      onImport={handleImportSource}
      isLoading={knowledgeStoringLoader}
      existingSources={knowledgeSources}
    />
  </div>
    </>
  );
};

export default Page;
