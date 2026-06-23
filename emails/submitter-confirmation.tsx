import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

// Submitter confirmation — honest expectation-setting, no fabricated promises.
export function SubmitterConfirmation({ name }: { name?: string }) {
  const greeting = name && name.trim() ? `Hi ${name.trim()},` : "Hi,";
  return (
    <Html>
      <Head />
      <Preview>Thanks for your interest in Axona</Preview>
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
            style={{ fontSize: 18, color: "#0a0a0a", margin: "0 0 12px" }}
          >
            Thanks for reaching out
          </Heading>
          <Text
            style={{
              fontSize: 14,
              color: "#111111",
              lineHeight: 1.5,
              margin: "0 0 12px",
            }}
          >
            {greeting}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#111111",
              lineHeight: 1.5,
              margin: "0 0 12px",
            }}
          >
            We&apos;ll be in touch within a few days. Founders read every
            request — so you&apos;ll hear from a real person, not an
            autoresponder.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#111111",
              lineHeight: 1.5,
              margin: "0 0 12px",
            }}
          >
            In the meantime, feel free to reply to this email with anything
            you&apos;d like us to know about what you&apos;re building.
          </Text>
          <Text style={{ fontSize: 13, color: "#6b6b63", margin: "16px 0 0" }}>
            — The Axona team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default SubmitterConfirmation;
