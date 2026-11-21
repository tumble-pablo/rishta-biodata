import { ScaledSample } from "@/components/home/scaled-sample";

// Hero artwork: three finished sample biodatas fanned out, rendered by the
// real preview so the first thing visitors see is the actual result they
// will download, in three of the most popular designs.
export function HeroBiodataFan() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] select-none py-6">
      <div className="relative mx-auto aspect-[1/1.02] w-full">
        <div className="absolute left-[2%] top-[10%] w-[44%] -rotate-[9deg] drop-shadow-[0_24px_40px_rgba(62,21,50,0.22)]">
          <ScaledSample templateId="deep-frame" profile="woman" />
        </div>
        <div className="absolute right-[2%] top-[10%] w-[44%] rotate-[9deg] drop-shadow-[0_24px_40px_rgba(62,21,50,0.22)]">
          <ScaledSample templateId="double" profile="woman" />
        </div>
        <div className="absolute left-1/2 top-0 w-[54%] -translate-x-1/2 drop-shadow-[0_30px_50px_rgba(62,21,50,0.28)]">
          <ScaledSample templateId="classic" profile="man" />
        </div>
      </div>
    </div>
  );
}
