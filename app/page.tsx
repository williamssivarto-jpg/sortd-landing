"use client";
import { useState, useRef, useEffect } from 'react';

const TEAL = "#3ECFA0";
const TEAL_DARK = "#1D9E75";
const TEAL_DIM = "#0D2E24";
const BG = "#080F0D";
const BG2 = "#0D1A15";
const BG3 = "#122018";
const BORDER = "rgba(62,207,160,0.12)";
const BORDER_MED = "rgba(62,207,160,0.22)";
const TEXT = "#E8F5F0";
const TEXT_MED = "#8BBFA8";
const TEXT_DIM = "#4A7A63";

const CHAT_URL = "https://colin-73.app.n8n.cloud/webhook/66beb48f-e1ab-4137-957c-d8a294024560/chat";

interface Message {
  role: 'bot' | 'user';
  text: string;
}

export default function SortdLandingPage() {
  const [formData, setFormData] = useState({ name: "", agency: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm Sortd. Let's find your perfect holiday. Who's travelling — couple, family, friends, or solo? And how many people in your group?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);
    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userMessage, sessionId }),
      });
      const data = await response.json();
      const botReply = data.output?.customerReply || data.output || data.text || data.message || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;

    try {
      const res = await fetch('/api/sortd-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission failed', err);
    }
  };

  const Check = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  );

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: TEXT, background: BG, minHeight: "100vh" }}>

      <nav style={{ borderBottom: `0.5px solid ${BORDER}`, padding: "0 2rem", position: "sticky", top: 0, background: `${BG}F2`, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: TEAL_DARK, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.5px", color: TEXT }}>Sortd</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="#how-it-works" style={{ fontSize: 14, color: TEXT_MED, textDecoration: "none" }}>How it works</a>
            <a href="#try-sortd" style={{ fontSize: 14, color: TEXT_MED, textDecoration: "none" }}>Try it live</a>
            <a href="#pricing" style={{ fontSize: 14, color: TEXT_MED, textDecoration: "none" }}>Pricing</a>
            <a href="#demo" style={{ fontSize: 14, fontWeight: 500, background: TEAL_DARK, color: "white", padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>Book a demo</a>
          </div>
        </div>
      </nav>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 2rem 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: TEAL_DIM, color: TEAL, fontSize: 13, fontWeight: 500, padding: "5px 14px", borderRadius: 20, marginBottom: 28, border: `0.5px solid ${BORDER_MED}` }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL }}></div>
              AI holiday matcher for travel agencies
            </div>
            <h1 style={{ fontSize: 50, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-1.5px", margin: "0 0 24px", color: TEXT }}>
              Turn more holiday enquiries<br/>
              into qualified leads.<br/>
              <span style={{ color: TEAL }}>24/7.</span>
            </h1>
            <p style={{ fontSize: 18, color: TEXT_MED, lineHeight: 1.75, margin: "0 0 36px", maxWidth: 480 }}>
              Sortd is a branded AI holiday matchmaker that sits on your website, asks the right questions, recommends best-fit trips, and sends a warm qualified lead straight to your inbox.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <a href="#try-sortd" style={{ background: TEAL_DARK, color: "white", padding: "13px 26px", borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Try Sortd live</a>
              <a href="#demo" style={{ border: `0.5px solid ${BORDER_MED}`, color: TEXT, padding: "13px 26px", borderRadius: 8, fontSize: 15, textDecoration: "none" }}>Book a demo</a>
            </div>
            <p style={{ fontSize: 13, color: TEXT_DIM, margin: 0 }}>No tech knowledge needed. We set it up, you get the leads.</p>
          </div>

          <div style={{ background: BG2, borderRadius: 18, border: `0.5px solid ${BORDER}`, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E24B4A" }}></div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF9F27" }}></div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#639922" }}></div>
              <span style={{ fontSize: 12, color: TEXT_DIM, marginLeft: 8 }}>Sortd — example conversation</span>
            </div>
            <div style={{ background: BG3, borderRadius: 12, padding: 16, border: `0.5px solid ${BORDER}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: `0.5px solid ${BORDER}` }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: TEAL_DARK, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, color: "white", fontWeight: 500 }}>S</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: TEXT }}>Sortd</p>
                  <p style={{ margin: 0, fontSize: 11, color: TEXT_DIM }}>Holiday Matcher</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#639922" }}></div>
                  <span style={{ fontSize: 11, color: TEXT_DIM }}>Online</span>
                </div>
              </div>
              {[
                { from: "sortd", text: "Hi! I'm Sortd. Let's find your perfect holiday. Who's travelling and how many people?" },
                { from: "user", text: "Couple, just the two of us. July, 10 nights from Manchester." },
                { from: "sortd", text: "Are you open to long haul, or short haul only?" },
                { from: "user", text: "Open to long haul. Budget around £2,500 each." },
                { from: "sortd", text: "Beach, city break, all-inclusive? And do you want guaranteed heat?" },
                { from: "user", text: "Beach, all-inclusive. Guaranteed heat yes." },
                { from: "sortd", text: "Perfect — I have three brilliant matches for you..." },
              ].map((msg, i) => (
                <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "82%", padding: "8px 12px", borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: msg.from === "user" ? TEAL_DARK : TEAL_DIM, fontSize: 12, lineHeight: 1.5, color: msg.from === "user" ? "white" : TEXT }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "8px 12px", background: TEAL_DIM, borderRadius: 8, border: `0.5px solid ${BORDER_MED}` }}>
                <p style={{ margin: 0, fontSize: 11, color: TEAL, fontWeight: 500 }}>Lead sent to agent</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: TEXT_MED }}>Cape Verde, Turkey, Crete — Hot lead flagged</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}`, background: BG2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.75rem 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { stat: "24/7", label: "Lead capture, even when you're closed" },
            { stat: "10 questions", label: "Full qualification in minutes" },
            { stat: "3 matches", label: "Tailored recommendations every time" },
            { stat: "Instant", label: "Warm lead to your inbox" },
          ].map((item) => (
            <div key={item.stat} style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 5px", fontSize: 24, fontWeight: 500, color: TEAL }}>{item.stat}</p>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MED, lineHeight: 1.4 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 600, marginBottom: 48 }}>
          <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.5px", color: TEXT }}>What Sortd does for your agency</h2>
          <p style={{ fontSize: 17, color: TEXT_MED, lineHeight: 1.75, margin: 0 }}>Sortd turns vague enquiries into warm, qualified leads so you spend less time chasing weak prospects and more time closing bookings.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Qualifies every enquiry", desc: "Budget, dates, airport, holiday style, weather, must-haves and deal breakers — all captured before your team makes contact." },
            { icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", title: "Recommends 3 best matches", desc: "Best overall, best value, and a wildcard. Each comes with a destination, reason, weather, and budget fit." },
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Delivers a warm lead", desc: "Your team gets a fully structured lead summary by email — priorities, budget, lead quality score, and best contact time." },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Works while you sleep", desc: "Sortd runs 24/7. Late-night enquiries get the same quality response as a Monday morning call." },
            { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: "Feels like your brand", desc: "Configured for your agency, your tone, and your travel specialisms. Not a generic chatbot." },
            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Logs and scores every lead", desc: "Every completed enquiry logged with a hot, warm or cold quality score. Know who to call first." },
          ].map((item) => (
            <div key={item.title} style={{ background: BG2, border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: "22px 20px" }}>
              <div style={{ width: 40, height: 40, background: TEAL_DIM, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 500, color: TEXT }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: 14, color: TEXT_MED, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" style={{ background: BG2, borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 48px", letterSpacing: "-0.5px", color: TEXT }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, position: "relative" }}>
            {[
              { num: "1", title: "Visitor starts a chat", desc: "A visitor on your website opens Sortd and starts a conversation." },
              { num: "2", title: "Sortd qualifies the lead", desc: "Natural questions covering who, when, where, budget, style, and priorities." },
              { num: "3", title: "3 recommendations delivered", desc: "Best match, best value, and a wildcard — each with reasons and booking timing." },
              { num: "4", title: "Lead summary emailed", desc: "A fully structured, scored lead summary sent instantly to your inbox." },
              { num: "5", title: "You follow up", desc: "Call with full context — budget, priorities, lead score, and best contact time." },
            ].map((step, i) => (
              <div key={step.num} style={{ position: "relative" }}>
                {i < 4 && <div style={{ position: "absolute", top: 20, left: "60%", right: "-40%", height: "0.5px", background: BORDER_MED, zIndex: 0 }}></div>}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: TEAL_DARK, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 500, marginBottom: 16 }}>{step.num}</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 500, color: TEXT }}>{step.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT_MED, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="try-sortd" style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: TEAL_DIM, color: TEAL, fontSize: 13, fontWeight: 500, padding: "5px 14px", borderRadius: 20, marginBottom: 20, border: `0.5px solid ${BORDER_MED}` }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL }}></div>
            Live demo
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.5px", color: TEXT }}>Try Sortd right now</h2>
          <p style={{ fontSize: 17, color: TEXT_MED, margin: 0, lineHeight: 1.7 }}>This is the real thing — not a mockup. Have a real conversation with Sortd and see exactly what your customers would experience.</p>
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto", background: BG2, borderRadius: 16, border: `0.5px solid ${BORDER_MED}`, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `0.5px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: TEAL_DARK, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 15, color: "white", fontWeight: 500 }}>S</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: TEXT }}>Sortd</p>
              <p style={{ margin: 0, fontSize: 12, color: TEXT_DIM }}>Holiday Matcher</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL }}></div>
              <span style={{ fontSize: 12, color: TEXT_MED }}>Online</span>
            </div>
          </div>

          <div style={{ height: 400, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", background: msg.role === "user" ? TEAL_DARK : BG3, fontSize: 14, lineHeight: 1.6, color: msg.role === "user" ? "white" : TEXT, border: msg.role === "bot" ? `0.5px solid ${BORDER}` : "none", whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 2px", background: BG3, border: `0.5px solid ${BORDER}`, display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, opacity: 0.6 }}></div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, opacity: 0.8 }}></div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "12px 16px", borderTop: `0.5px solid ${BORDER}`, display: "flex", gap: 10, alignItems: "center" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={{ flex: 1, background: BG3, border: `0.5px solid ${BORDER_MED}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: TEXT, outline: "none" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ width: 40, height: 40, background: input.trim() ? TEAL_DARK : BG3, border: `0.5px solid ${BORDER_MED}`, borderRadius: 8, cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", margin: "16px 0 0", fontSize: 12, color: TEXT_DIM }}>Real conversation. No sign-up needed.</p>
      </section>

      <section style={{ background: BG2, borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.5px", color: TEXT }}>Built for independent travel agents</h2>
              <p style={{ fontSize: 17, color: TEXT_MED, lineHeight: 1.75, margin: "0 0 32px" }}>Sortd gives smaller agencies the kind of lead qualification normally reserved for bigger operators — without the heavy setup or enterprise price tag.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {["Independent travel agents", "Homeworking agents", "Small agencies", "Destination specialists", "Luxury travel advisors", "Family holiday agencies"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: `0.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, background: BG3, color: TEXT_MED }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, flexShrink: 0 }}></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 12px", color: TEXT }}>What lands in your inbox</h3>
              <p style={{ fontSize: 15, color: TEXT_MED, lineHeight: 1.65, margin: "0 0 20px" }}>Every lead arrives fully structured and scored — so you know exactly who to call and what to say before you pick up the phone.</p>
              <div style={{ background: BG3, borderRadius: 12, border: `0.5px solid ${BORDER}`, padding: 20, fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: `0.5px solid ${BORDER}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL }}></div>
                  <span style={{ fontWeight: 500, color: TEXT }}>New Sortd lead — Sarah & James, July</span>
                  <span style={{ marginLeft: "auto", background: TEAL_DIM, color: TEAL, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 20, border: `0.5px solid ${BORDER_MED}` }}>Hot lead</span>
                </div>
                {[
                  ["Travellers", "Couple, 2 adults"],
                  ["Travel month", "July, 10 nights"],
                  ["Departure", "Manchester — open to long haul"],
                  ["Budget", "£2,500 per person"],
                  ["Holiday type", "Beach, all-inclusive"],
                  ["Weather", "Guaranteed heat"],
                  ["Priorities", "Comfort, good food"],
                  ["Must-haves", "Good pool"],
                  ["Deal breakers", "Overcrowded resorts"],
                  ["Recommended", "Cape Verde, Turkey, Crete"],
                  ["Best contact", "Evenings after 6pm or weekends"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `0.5px solid ${BORDER}` }}>
                    <span style={{ color: TEXT_MED }}>{label}</span>
                    <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "55%", color: TEXT }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 48px" }}>
          <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.5px", color: TEXT }}>Simple pricing</h2>
          <p style={{ fontSize: 17, color: TEXT_MED, margin: 0 }}>Simple setup, simple monthly support.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
          {[
            { name: "Setup", price: "£250", desc: "We configure Sortd for your agency, brand it to match your site, and install it. One-off payment.", features: ["Full setup and configuration", "Branded to your agency", "Installed on your website", "Testing and sign-off"] },
            { name: "Monthly", price: "£65/mo", desc: "Sortd stays live, maintained and updated. Cancel any time.", features: ["Sortd live on your site 24/7", "Lead summaries by email", "Lead scoring and logging", "Updates included"], featured: true },
          ].map((plan) => (
            <div key={plan.name} style={{ background: BG2, border: plan.featured ? `1.5px solid ${TEAL_DARK}` : `0.5px solid ${BORDER}`, borderRadius: 12, padding: 28, position: "relative" }}>
              {plan.featured && <div style={{ position: "absolute", top: -12, left: 20, background: TEAL_DARK, color: "white", fontSize: 12, fontWeight: 500, padding: "3px 12px", borderRadius: 20 }}>Ongoing</div>}
              <p style={{ margin: "0 0 4px", fontSize: 13, color: TEXT_MED }}>{plan.name}</p>
              <p style={{ margin: "0 0 12px", fontSize: 34, fontWeight: 500, letterSpacing: "-0.5px", color: TEXT }}>{plan.price}</p>
              <p style={{ margin: "0 0 20px", fontSize: 14, color: TEXT_MED, lineHeight: 1.5 }}>{plan.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: TEXT_MED }}>
                    <Check />{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 12, color: TEXT_DIM }}>Early pricing shown for pilot clients and subject to refinement.</p>
      </section>

      <section id="demo" style={{ background: BG2, borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 38, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.5px", color: TEXT }}>See Sortd on your site</h2>
              <p style={{ fontSize: 17, color: TEXT_MED, lineHeight: 1.75, margin: "0 0 28px" }}>Book a 20-minute demo. We'll show you how Sortd works, how leads are delivered, and how quickly it could be live on your site.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["We set everything up — no tech knowledge needed", "Fast setup for pilot clients", "Cancel any time, no long contracts"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: TEXT_MED }}>
                    <Check />{item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: BG3, borderRadius: 16, border: `0.5px solid ${BORDER}`, padding: 32 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ width: 56, height: 56, background: TEAL_DIM, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 500, color: TEXT }}>Request received</h3>
                  <p style={{ margin: 0, color: TEXT_MED, fontSize: 15 }}>We'll be in touch within one working day to arrange your demo.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 500, color: TEXT }}>Book a demo</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { key: "name", placeholder: "Your name" },
                      { key: "agency", placeholder: "Agency name" },
                      { key: "email", placeholder: "Email address" },
                      { key: "phone", placeholder: "Phone number (optional)" },
                    ].map((field) => (
                      <input
                        key={field.key}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `0.5px solid ${BORDER_MED}`, fontSize: 14, background: BG2, color: TEXT, boxSizing: "border-box" }}
                      />
                    ))}
                    <button onClick={handleSubmit} style={{ background: TEAL_DARK, color: "white", border: "none", borderRadius: 8, padding: "13px 20px", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 }}>
                      Request a demo
                    </button>
                    <p style={{ margin: 0, fontSize: 12, color: TEXT_DIM, textAlign: "center" }}>No commitment. 20 minutes. We'll show you everything.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `0.5px solid ${BORDER}`, padding: "2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, background: TEAL_DARK, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 500, color: TEXT }}>Sortd</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: TEXT_DIM }}>AI holiday matching for independent travel agents</p>
        </div>
      </footer>
    </div>
  );
}