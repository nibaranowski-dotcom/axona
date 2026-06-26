import { finalCta } from "@/content/site-v2";
import { EmailCapture } from "@/components/v2/email-capture";

// Final CTA — dotgrid panel, headline, sub, and the request-access capture.
export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 pb-20">
      <div className="dotgrid rounded-[16px] bg-panel px-7 py-[72px] text-center">
        <h2 className="text-[clamp(36px,5.5vw,72px)] font-semibold leading-[0.96] tracking-[-0.04em] text-ink">
          {finalCta.h2}
        </h2>
        <p className="mx-auto mt-[18px] max-w-[40ch] text-[16px] leading-[1.6] text-body">
          {finalCta.sub}
        </p>
        <div className="mt-8 flex justify-center">
          <EmailCapture source="final" className="mx-auto" />
        </div>
      </div>
    </section>
  );
}
