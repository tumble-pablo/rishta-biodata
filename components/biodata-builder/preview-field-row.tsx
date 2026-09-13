interface PreviewFieldRowProps {
  label: string;
  value?: string | null;
}

// A "label + value-or-skeleton-bar" row used throughout the live preview.
// The label always renders for real; only the value falls back to the hero
// mock's skeleton-bar ghost (app/page.tsx's `bg-primary/[0.09]` pattern) when
// the field hasn't been filled in yet, so the preview feels alive at every
// step rather than looking empty until the very end.
export function PreviewFieldRow({ label, value }: PreviewFieldRowProps) {
  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <div className="grid grid-cols-[84px_1fr] items-baseline gap-x-3 gap-y-1 py-1 sm:grid-cols-[110px_1fr]">
      <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {hasValue ? (
        <span className="text-sm font-medium text-foreground">{value}</span>
      ) : (
        <span aria-hidden="true" className="h-2 w-2/3 rounded-full bg-primary/[0.09]" />
      )}
    </div>
  );
}
