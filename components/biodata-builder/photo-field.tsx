"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { ImagePlus, Trash2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PhotoError, preparePhoto } from "@/lib/biodata/photo";
import type { BiodataFormValues } from "@/lib/biodata/schema";

// Optional passport-style photo. The file is processed in the browser by
// `preparePhoto` and stored as a data URL in form state — see photo.ts.
export function PhotoField() {
  const { control } = useFormContext<BiodataFormValues>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  return (
    <FormField
      control={control}
      name="personal.photo"
      render={({ field }) => {
        const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          // Reset so picking the same file again still fires `change`.
          event.target.value = "";
          if (!file) return;

          setError(null);
          setBusy(true);
          try {
            field.onChange(await preparePhoto(file));
          } catch (caught) {
            setError(caught instanceof PhotoError ? caught.message : "This photo could not be added. Please try another.");
          } finally {
            setBusy(false);
          }
        };

        return (
          <FormItem>
            <FormLabel>Photo (optional)</FormLabel>
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-dashed border-primary/25 bg-muted/40">
                {field.value ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local data URL, nothing to optimise
                  <img src={field.value} alt="Your biodata photo" className="size-full object-cover" />
                ) : (
                  <UserRound aria-hidden="true" className="size-6 text-primary/30" />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label="Choose a photo"
                  onChange={handleFile}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => inputRef.current?.click()}
                >
                  <ImagePlus aria-hidden="true" className="size-4" />
                  {busy ? "Adding photo…" : field.value ? "Change photo" : "Add photo"}
                </Button>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={busy}
                    onClick={() => field.onChange("")}
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground">
              A clear, recent photo of your face works best. It stays on your device and only appears in your biodata.
            </p>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
