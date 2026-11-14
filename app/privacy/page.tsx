import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice — Sortd",
  description: "How Sortd handles personal information on trysortd.co.uk.",
};

const BG = "#080F0D";
const BG2 = "#0D1A15";
const BORDER = "rgba(62,207,160,0.12)";
const TEAL = "#3ECFA0";
const TEXT = "#E8F5F0";
const TEXT_MED = "#8BBFA8";
const TEXT_DIM = "#4A7A63";

const h2 = { fontSize: 20, fontWeight: 500, margin: "36px 0 10px", color: TEXT } as const;
const p = { fontSize: 15, lineHeight: 1.75, color: TEXT_MED, margin: "0 0 12px" } as const;
const li = { fontSize: 15, lineHeight: 1.75, color: TEXT_MED, marginBottom: 6 } as const;

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", background: BG, color: TEXT, minHeight: "100vh" }}>
      <nav style={{ borderBottom: `0.5px solid ${BORDER}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", height: 64, display: "flex", alignItems: "center" }}>
          <a href="/" style={{ color: TEXT, textDecoration: "none", fontSize: 18, fontWeight: 500 }}>&larr; Sortd</a>
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <h1 style={{ fontSize: 36, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Privacy notice</h1>
        <p style={{ ...p, color: TEXT_DIM }}>Last updated: 14 November 2026</p>

        <p style={p}>
          This notice explains what personal information Sortd collects on this website, why, and what we do with it.
          Sortd is run by Colin Williams, a sole trader based in Wolverhampton, UK, who is responsible for your
          information. Questions or requests:{" "}
          <a href="mailto:colin@colinwilliams.space" style={{ color: TEAL }}>colin@colinwilliams.space</a>.
        </p>

        <h2 style={h2}>What we collect</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}>
            <strong style={{ color: TEXT }}>Demo requests:</strong> your name, agency name, email address and (if you give
            it) your phone number.
          </li>
          <li style={li}>
            <strong style={{ color: TEXT }}>Live demo chat:</strong> the messages you type to Sortd. The demo does not ask for
            your name or contact details, so please don&apos;t include them.
          </li>
        </ul>

        <h2 style={h2}>Why we use it</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}>Demo requests are used only to contact you and arrange your demo. We rely on our legitimate interest in responding to your request.</li>
          <li style={li}>Demo chat messages are used to answer you in the chat and to check the demo is working well.</li>
        </ul>
        <p style={p}>We never sell your information or use it for unrelated marketing.</p>

        <h2 style={h2}>Who processes it for us</h2>
        <p style={p}>
          We use trusted service providers to run Sortd: Vercel (website hosting), n8n (the service that runs the chat),
          and an AI model provider that generates Sortd&apos;s replies. Some of these providers may process data outside
          the UK; where they do, we rely on the safeguards they provide under UK data protection law.
        </p>

        <h2 style={h2}>How long we keep it</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}>Demo requests: up to 12 months, unless you become a client.</li>
          <li style={li}>Demo chat messages: deleted within 30 days.</li>
        </ul>

        <h2 style={h2}>Sortd on a travel agent&apos;s website</h2>
        <p style={p}>
          When Sortd runs on a travel agent&apos;s own website, that agent is responsible for the enquiries it collects and
          their own privacy notice applies. We process that information only on the agent&apos;s instructions.
        </p>

        <h2 style={h2}>Your rights</h2>
        <p style={p}>
          You can ask to see, correct or delete the information we hold about you, or object to how we use it. Email{" "}
          <a href="mailto:colin@colinwilliams.space" style={{ color: TEAL }}>colin@colinwilliams.space</a> and we&apos;ll
          respond within one month. If you&apos;re unhappy with how we&apos;ve handled your information, you can complain to
          the Information Commissioner&apos;s Office at{" "}
          <a href="https://ico.org.uk" style={{ color: TEAL }}>ico.org.uk</a>.
        </p>
      </main>

      <footer style={{ borderTop: `0.5px solid ${BORDER}`, background: BG2, padding: "1.5rem 2rem" }}>
        <p style={{ maxWidth: 760, margin: "0 auto", fontSize: 12, color: TEXT_DIM }}>&copy; 2026 Sortd &middot; Colin Williams, Wolverhampton, UK</p>
      </footer>
    </div>
  );
}
