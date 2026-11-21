import { ScaledSample } from "@/components/home/scaled-sample";
import { TEMPLATES } from "@/lib/biodata/templates";

// Homepage gallery of every builder design, each shown as a finished sample
// biodata rendered by the real preview (see ScaledSample) — what visitors
// see here is exactly what they'll download. Samples alternate between the
// two fictional profiles so the gallery doesn't repeat one face.
export function TemplateShowcase() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
      {TEMPLATES.map((template, index) => (
        <li key={template.id}>
          <a
            href="#biodata-builder"
            className="group block rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <ScaledSample
              templateId={template.id}
              profile={index % 2 === 0 ? "man" : "woman"}
              className="transition-transform duration-300 group-hover:-translate-y-1.5"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="font-display text-[16px] font-semibold">{template.label}</p>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-accent-foreground uppercase">
                {template.style === "traditional" ? "Traditional" : "Modern"}
              </span>
            </div>
            <p className="mt-1 text-[13px] leading-5 text-muted-foreground">{template.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
