import { partner } from "@/content/site-v2";
import { EmailCapture } from "@/components/v2/email-capture";

// Founding design partner — the honest offer (no testimonial wall): the real benefits, a request-
// access capture, and founder credibility (only Nicolas, "Founder at Axona").
export function Partner() {
  return (
    <section id="partner" className="mx-auto max-w-[1180px] px-7 py-[72px]">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
            {partner.eyebrow}
          </span>
          <h2 className="mt-[14px] max-w-[18ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {partner.h2}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-body">
            {partner.body}
          </p>

          <div className="mt-8">
            <EmailCapture source="partner" />
          </div>

          <div className="mt-9 flex items-center gap-4 border-t border-line pt-7">
            <span
              className="inline-flex size-12 flex-none items-center justify-center bg-ink font-mono text-[15px] text-lime"
              style={{ borderRadius: "0 14px 0 14px" }}
              aria-hidden="true"
            >
              {partner.founder.initials}
            </span>
            <div>
              <div className="text-[15px] font-semibold text-ink">
                {partner.founder.name}
              </div>
              <div className="mt-[3px] text-[13.5px] leading-[1.5] text-body">
                {partner.founder.bio}
              </div>
            </div>
          </div>
        </div>

        {/* what a partner gets */}
        <div className="grid content-start gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
          {partner.benefits.map((b) => (
            <div key={b.idx} className="bg-paper p-6">
              <div className="mb-3.5 font-mono text-[11px] tracking-[0.06em] text-faint">
                {b.idx}
              </div>
              <h3 className="mb-[7px] text-[16px] font-semibold tracking-[-0.01em] text-ink">
                {b.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-body">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
