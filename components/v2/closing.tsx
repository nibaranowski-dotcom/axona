import { closing } from "@/content/site-v2";
import { RequestAccessForm } from "@/components/v2/request-access-form";

// Closing CTA — dotgrid panel, big headline, and the full request-access form (V2.1).
export function Closing() {
  return (
    <section id="demo" className="mx-auto max-w-[1180px] px-7 pb-20">
      <div className="dotgrid rounded-[16px] bg-panel px-7 py-[72px] text-center">
        <h2 className="text-[clamp(36px,5.5vw,76px)] font-semibold leading-[0.96] tracking-[-0.04em] text-ink">
          {closing.h2}
        </h2>
        <RequestAccessForm />
      </div>
    </section>
  );
}
