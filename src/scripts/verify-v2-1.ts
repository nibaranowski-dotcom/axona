// Run: pnpm verify src/scripts/verify-v2-1.ts
async function run() {
  let passed = 0,
    failed = 0;
  const check = async (l: string, fn: () => boolean | Promise<boolean>) => {
    try {
      (await fn())
        ? (console.log(`  PASS ${l}`), passed++)
        : (console.log(`  FAIL ${l}`), failed++);
    } catch (e) {
      console.log(`  FAIL ${l} — ${(e as Error).message}`);
      failed++;
    }
  };
  console.log("\nVerifying V2.1 — request-access form\n");
  const fs = await import("fs");
  const read = (p: string) => fs.readFileSync(p, "utf8");
  const exists = (p: string) => fs.existsSync(p);
  const action = exists("app/actions/request-access.ts")
    ? read("app/actions/request-access.ts")
    : "";

  await check('server action exists + "use server"', () =>
    /["']use server["']/.test(action),
  );
  await check("uses Resend", () => /resend/i.test(action));
  await check(
    "validates with Zod",
    () =>
      /zod|z\./.test(action) ||
      (exists("lib/validation/request-access.ts") &&
        /zod/i.test(read("lib/validation/request-access.ts"))),
  );
  await check("honeypot handled", () =>
    /honeypot|company_url|botField/i.test(action),
  );
  await check(
    "guards missing RESEND_API_KEY",
    () =>
      /RESEND_API_KEY/.test(action) &&
      /(if\s*\(!|\?\?|missing|return)/.test(action),
  );
  await check(
    "hero capture wired to action",
    () =>
      exists("components/v2/email-capture.tsx") &&
      /requestAccess/.test(read("components/v2/email-capture.tsx")),
  );
  await check(
    "full form wired to action",
    () =>
      exists("components/v2/request-access-form.tsx") &&
      /requestAccess/.test(read("components/v2/request-access-form.tsx")),
  );
  await check("success copy verbatim", () =>
    /we['’]ll be in touch within a few days/.test(
      action +
        (exists("content/site-v2.ts") ? read("content/site-v2.ts") : "") +
        (exists("components/v2/request-access-form.tsx")
          ? read("components/v2/request-access-form.tsx")
          : ""),
    ),
  );
  await check(
    "email templates present",
    () =>
      exists("emails/founder-notification.tsx") &&
      exists("emails/submitter-confirmation.tsx"),
  );
  await check(
    ".env.example documents keys",
    () =>
      exists(".env.example") &&
      /RESEND_API_KEY/.test(read(".env.example")) &&
      /REQUEST_ACCESS_TO/.test(read(".env.example")),
  );
  // a11y + tokens (no inline hex in components)
  for (const f of [
    "components/v2/request-access-form.tsx",
    "components/v2/email-capture.tsx",
  ]) {
    if (exists(f)) {
      await check(`${f}: labels present`, () => /<label/.test(read(f)));
      await check(
        `${f}: no inline hex`,
        () => !/#[0-9a-fA-F]{3,8}\b/.test(read(f)),
      );
    }
  }

  if (failed === 0) {
    console.log(`\nPASSED — ${passed} checks`);
    console.log("See docs/manual-checks.md for browser verification.");
  } else {
    console.log(`\nFAILED — ${failed} check(s) failed`);
    process.exit(1);
  }
}
run();
