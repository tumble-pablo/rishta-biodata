import {
  biodataDraftSchema,
  type BiodataDraftValues,
  type BiodataFormValues,
} from "@/lib/biodata/schema";

// Client-only draft persistence via localStorage — no backend/login exists
// yet, matching the site's "no sign-up to begin" promise. Versioned so a
// future breaking schema change can bump the version and abandon old drafts
// rather than attempt a migration.

const STORAGE_KEY = "rishta-biodata:builder-draft:v1";
const STORAGE_VERSION = 1;

interface StoredDraft {
  version: number;
  savedAt: string;
  values: BiodataDraftValues;
}

export function loadDraft(): BiodataDraftValues | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredDraft>;
    if (parsed.version !== STORAGE_VERSION) return null;

    const result = biodataDraftSchema.safeParse(parsed.values);
    return result.success ? result.data : null;
  } catch {
    // Corrupt JSON, schema drift, or localStorage unavailable (e.g. Safari
    // private browsing) — fail open to a fresh start rather than crash.
    return null;
  }
}

export function saveDraft(values: BiodataDraftValues): void {
  try {
    const stored: StoredDraft = {
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString(),
      values,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Ignore write failures (private browsing, storage full/disabled) — the
    // form still works, it just won't persist across reloads.
  }
}

/** Merges a (possibly partial) restored draft into the full set of default
 * values, one section at a time. A plain `{ ...defaults, ...draft }` spread
 * would be wrong here: since `draft` is validated against the lenient
 * `.deepPartial()` schema, a section like `draft.personal` can itself be
 * missing fields — spreading it wholesale over `defaults.personal` would
 * replace the entire section and drop every field the draft didn't happen to
 * have, leaving them `undefined` instead of their default `""`. Merging
 * section-by-section keeps every field defined, matching what `useForm`
 * expects for controlled inputs. */
export function mergeDraftWithDefaults(
  defaults: BiodataFormValues,
  draft: BiodataDraftValues
): BiodataFormValues {
  const merged = { ...defaults };
  (Object.keys(defaults) as Array<keyof BiodataFormValues>).forEach((key) => {
    const section = draft[key];
    if (section && typeof section === "object") {
      merged[key] = { ...defaults[key], ...section } as never;
    }
  });
  return merged;
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
