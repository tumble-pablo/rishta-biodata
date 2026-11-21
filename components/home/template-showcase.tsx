import { TemplateFrame } from "@/components/biodata-builder/template-frame";
import { TEMPLATES } from "@/lib/biodata/templates";

// Homepage gallery of the real builder designs. Each tile uses the same
// TemplateFrame the builder and PDF use, so what visitors see here is the
// border they'll actually get. The inner content is a static sample, not
// the live preview, to keep the tiles light.
function SampleSheet() {
  return (
    <div aria-hidden="true" className="space-y-2 py-1">
      <p className="text-center text-[9px] font-semibold tracking-[0.2em] text-primary">BIODATA</p>
      <p className="font-heading text-center text-[11px] font-semibold text-accent-foreground">Rahul Sharma</p>
      {[0, 1, 2].map((section) => (
        <div key={section} className="space-y-1 pt-1">
          <div className="h-[3px] w-1/3 rounded-full bg-accent-foreground/40" />
          <div className="h-[3px] w-full rounded-full bg-primary/10" />
          <div className="h-[3px] w-4/5 rounded-full bg-primary/10" />
        </div>
      ))}
    </div>
  );
}

export function TemplateShowcase() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
      {TEMPLATES.map((template) => (
        <li key={template.id}>
          <a
            href="#biodata-builder"
            className="group block rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <TemplateFrame
              templateId={template.id}
              compact
              className="pointer-events-none transition-transform duration-200 group-hover:-translate-y-1"
            >
              <SampleSheet />
            </TemplateFrame>
            <p className="font-heading mt-3 text-center text-[14px] font-semibold">{template.label}</p>
            <p className="mt-1 text-center text-[13px] leading-5 text-muted-foreground">{template.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
