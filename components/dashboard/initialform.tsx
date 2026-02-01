"use client";

import React, { useEffect, useRef, useState } from "react";
import { Building2, Globe, LinkIcon, ChevronLeft, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/* -------------------- Types -------------------- */

interface InitialData {
  businessName: string;
  websiteUrl: string;
  externalLinks: string;
}

interface Step {
  id: string;
  label: string;
  question: string;
  description?: string;
  icon: any;
  placeholder: string;
  type: "text" | "url" | "textarea";
  field: keyof InitialData;
  badge?: string;
}

/* -------------------- Steps -------------------- */

const STEPS: Step[] = [
  {
    id: "name",
    label: "Business Name",
    question: "What is the name of your business?",
    description: "This will be the identity of your AI assistant.",
    icon: Building2,
    placeholder: "e.g. Acme Corp",
    type: "text",
    field: "businessName",
  },
  {
    id: "website",
    label: "Website",
    question: "What is your website URL?",
    description: "We will scrape data from here to train your chatbot.",
    icon: Globe,
    placeholder: "https://acme.com",
    type: "url",
    field: "websiteUrl",
  },
  {
    id: "links",
    label: "Extra Context",
    question: "Any other links to add?",
    description:
      "Add external links like Notion pages or help docs to improve accuracy.",
    icon: LinkIcon,
    placeholder: "https://notion.so/docs ...",
    type: "textarea",
    field: "externalLinks",
    badge: "Optional",
  },
];

/* -------------------- Component -------------------- */

const InitialForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<InitialData>({
    businessName: "",
    websiteUrl: "",
    externalLinks: "",
  });

  const inputRef =
    useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const stepData = STEPS[currentStep];
  const Icon = stepData.icon;

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const isStepValid =
    currentStep >= 2 || Boolean(formData[stepData.field]);

  /* -------------------- Effects -------------------- */

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [currentStep]);

  /* -------------------- Handlers -------------------- */

  const handleNext = async () => {
    if (!isStepValid) return;

    if (currentStep === STEPS.length - 1) {
      await handleSubmit();
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep === 0) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const response = await fetch("/api/metadata/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: formData.businessName,
        website_url: formData.websiteUrl,
        external_links: formData.externalLinks,
      }),
    });

    await response.json();
    setIsSubmitting(false);
    window.location.reload();
  };

  /* -------------------- Render -------------------- */

  return (
    <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col justify-center px-6">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5">
        <div
          className="h-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step info */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-medium text-indigo-400 uppercase">
            Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>

        {currentStep > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-zinc-500 hover:text-zinc-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out transform",
          isAnimating
            ? "opacity-0 translate-y-4 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        )}
      >
        <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">
          {stepData.question}
        </h1>

        {stepData.description && (
          <p className="text-zinc-400 mb-6">
            {stepData.description}
          </p>
        )}

        {/* Input */}
        <div className="relative group">
          {stepData.type === "textarea" ? (
            <Textarea
              ref={inputRef as any}
              value={formData[stepData.field]}
              placeholder={stepData.placeholder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [stepData.field]: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}
              className="min-h-[120px]"
            />
          ) : (
            <Input
              ref={inputRef as any}
              type={stepData.type}
              value={formData[stepData.field]}
              placeholder={stepData.placeholder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [stepData.field]: e.target.value,
                })
              }
              onKeyDown={handleKeyDown}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-8">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
            {stepData.type === "textarea" ? (
              <>
                <Command className="w-3 h-3" />
                <span>+ Enter</span>
              </>
            ) : (
              <span>Press Enter ↵</span>
            )}
            <span className="ml-1">to continue</span>
          </div>

          <Button
            onClick={handleNext}
            disabled={!isStepValid || isSubmitting}
            className="ml-auto"
          >
            {currentStep === STEPS.length - 1
              ? isSubmitting
                ? "Submitting..."
                : "Finish"
              : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InitialForm;
