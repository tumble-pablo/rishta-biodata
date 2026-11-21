"use client";

import * as React from "react";
import { useFormContext, type FieldPath } from "react-hook-form";
import { FileUp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImportError, importBiodataFile } from "@/lib/biodata/import-client";
import { importedFieldEntries } from "@/lib/biodata/import-schema";
import type { BiodataFormValues } from "@/lib/biodata/schema";

// "Bring your old biodata": most families already have one in Word, as a
// PDF or on paper. Upload it and the form is filled in for them to check
// and restyle. Imported values only fill fields — they never clear what the
// person already typed, except where the old biodata has a value.
export function ImportBiodataCard() {
  const { setValue } = useFormContext<BiodataFormValues>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    setMessage(null);
    try {
      const imported = await importBiodataFile(file);
      const entries = importedFieldEntries(imported);
      for (const [path, value] of entries) {
        setValue(path as FieldPath<BiodataFormValues>, value as never, { shouldDirty: true });
      }
      if (imported.documentLanguage === "hi" || imported.documentLanguage === "mr") {
        setValue("template.language", imported.documentLanguage, { shouldDirty: true });
      }

      setMessage(
        entries.length > 0
          ? {
              tone: "ok",
              text: `We filled in ${entries.length} details from your old biodata. Please check each step, as we may have missed or misread something.`,
            }
          : { tone: "error", text: "We couldn't find any details in this file. Please try a clearer photo." }
      );
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof ImportError ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-primary/20 bg-primary/[0.03] p-4 sm:p-5">
      <p className="font-heading text-[15px] font-semibold">Already have a biodata?</p>
      <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
        Upload a photo or PDF of your old biodata and we will fill in the form for you. Then pick a new design.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        aria-label="Upload your old biodata"
        onChange={handleFile}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? <Loader2 className="animate-spin" /> : <FileUp />}
        {busy ? "Reading your biodata…" : "Upload old biodata"}
      </Button>
      <p className="mt-2 text-[12px] leading-4 text-muted-foreground">
        Your file is read once to fill the form and is not saved by us.
      </p>
      {message && (
        <p
          role={message.tone === "error" ? "alert" : "status"}
          className={`mt-2 text-[13px] ${message.tone === "error" ? "text-destructive" : "text-foreground"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
