import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { RequestAccessInput } from "@/lib/validation/request-access";

// Founder notification — sent to REQUEST_ACCESS_TO on every (valid, non-bot) submission.
export function FounderNotification({ data }: { data: RequestAccessInput }) {
  const rows: Array<[string, string]> = [
    ["Source", data.source],
    ["Email", data.email],
    ["Name", data.name || "—"],
    ["Company", data.company || "—"],
    ["Role", data.role || "—"],
    ["Building", data.building || "—"],
  ];
  return (
    <Html>
      <Head />
      <Preview>New Axona access request from {data.email}</Preview>
      <Body
        style={{
          backgroundColor: "#f4f3ef",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: "24px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e7e7e1",
            borderRadius: 10,
            maxWidth: 520,
            padding: 28,
          }}
        >
          <Heading
            style={{ fontSize: 18, color: "#0a0a0a", margin: "0 0 4px" }}
          >
            New request access
          </Heading>
          <Text style={{ fontSize: 13, color: "#6b6b63", margin: "0 0 16px" }}>
            Reply directly to this email to reach the submitter.
          </Text>
          <Hr style={{ borderColor: "#ededed" }} />
          <Section>
            {rows.map(([k, v]) => (
              <Text
                key={k}
                style={{ fontSize: 14, color: "#111111", margin: "10px 0" }}
              >
                <strong style={{ color: "#6b6b63" }}>{k}: </strong>
                {v}
              </Text>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default FounderNotification;
