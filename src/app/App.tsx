import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoImg from "@/imports/Untitled.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Nav ─── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["解決方案", "如何運作", "規劃藍圖", "ESG", "定價"];
  const hrefs = ["#solution", "#how", "#roadmap", "#esg", "#pricing"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", borderBottom: scrolled ? "1px solid #e8e8e8" : "none" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-[60px]">
        <a href="#">
          <ImageWithFallback src={logoImg} alt="MemberPass" className="h-8 w-auto object-contain" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]}
              className="text-[13px] text-[#444] hover:text-[#1a56db] transition-colors"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              {l}
            </a>
          ))}
          <a href="#contact"
            className="text-[13px] font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ background: "#1a56db", fontFamily: "'Noto Sans TC', sans-serif" }}>
            聯絡我們
          </a>
        </div>
        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-[#e8e8e8] px-6 py-5 flex flex-col gap-4">
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]} onClick={() => setOpen(false)}
              className="text-sm text-[#333]" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between pt-[60px] bg-white">
      {/* Top strip */}
      <div className="border-b border-[#e8e8e8] px-6 md:px-10 py-3 flex items-center justify-between max-w-screen-xl mx-auto w-full">
        <span className="text-[11px] tracking-[0.15em] text-[#999] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          MemberPass · MP 2.0 · 會員認證中心
        </span>
        <span className="text-[11px] tracking-[0.1em] text-[#999] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Taiwan · 2025
        </span>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center px-6 md:px-10 max-w-screen-xl mx-auto w-full py-16">
        <div className="w-full">
          {/* Overline */}
          <p className="text-[12px] tracking-[0.2em] text-[#1a56db] uppercase mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            線下通路會員認證中心
          </p>

          {/* Headline */}
          <h1
            className="text-[clamp(48px,8vw,110px)] font-black leading-[0.92] tracking-tight text-[#0d1b2a] mb-10"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}
          >
            零摩擦的<br />
            <span style={{ color: "#1a56db" }}>會員體驗</span><br />
            <span style={{ WebkitTextStroke: "2px #0d1b2a", color: "transparent" }}>從這裡開始</span>
          </h1>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-[#e8e8e8] pt-8">
            <p className="text-[#555] text-base leading-relaxed max-w-md"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              一組共通條碼，串接所有商家會員系統。<br />
              消費者免去繁瑣註冊，商家輕鬆擴大會員名單。
            </p>
            <div className="flex items-center gap-6">
              <a href="#how"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "#1a56db", fontFamily: "'Noto Sans TC', sans-serif" }}>
                了解運作方式 <ArrowUpRight size={15} />
              </a>
              <a href="#pricing"
                className="text-sm font-semibold text-[#1a56db] underline underline-offset-4"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                查看定價
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-[#e8e8e8] px-6 md:px-10 max-w-screen-xl mx-auto w-full">
        <div className="grid grid-cols-3 divide-x divide-[#e8e8e8]">
          {[
            { n: "62.2%", label: "消費者因步驟冗長放棄申請會員" },
            { n: "68.9%", label: "消費者對結帳時切換 App 感到困擾" },
            { n: "3 步驟", label: "使用 MemberPass 完成會員綁定" },
          ].map((s) => (
            <div key={s.n} className="py-7 px-6 first:pl-0">
              <div className="text-[28px] md:text-[36px] font-black text-[#0d1b2a] leading-none mb-1.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s.n}
              </div>
              <div className="text-[12px] text-[#888] leading-snug"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problem ─── */
function Problem() {
  const { ref, inView } = useInView();
  return (
    <section id="problem" className="bg-[#f5f5f5]" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
          {/* Left label */}
          <div className="md:sticky md:top-28">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              The Problem
            </p>
            <h2 className="text-3xl font-black text-[#0d1b2a] leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
              為什麼消費者<br />不願加入會員？
            </h2>
          </div>

          {/* Right content */}
          <div
            className="space-y-0 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
          >
            {[
              {
                n: "01",
                stat: "62.2%",
                title: "申請步驟太冗長",
                body: "超過六成的消費者在嘗試申請商家會員的過程中，因為填寫資料步驟繁瑣，選擇直接放棄。這意味著商家每天都在默默流失潛在忠實顧客。",
              },
              {
                n: "02",
                stat: "68.9%",
                title: "結帳時 App 切換困擾",
                body: "結帳時在付款 App 與會員 App 之間來回切換，是消費者最常抱怨的痛點。繁複的動作讓後方排隊的人感到不耐，也讓消費者索性放棄使用會員。",
              },
              {
                n: "03",
                stat: "∞",
                title: "商家難以累積私域流量",
                body: "缺乏低摩擦的入會機制，中小型商家即使有會員系統，也難以將每天走進店裡的路人轉化為可再行銷的會員數據。",
              },
            ].map((item) => (
              <div key={item.n} className="border-b border-[#ddd] py-10 grid grid-cols-[80px_1fr] gap-6">
                <div>
                  <span className="text-[11px] text-[#bbb]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.n}
                  </span>
                  <div className="text-[28px] font-black text-[#1a56db] leading-none mt-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.stat}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1b2a] mb-2 text-lg"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Solution ─── */
function Solution() {
  const { ref, inView } = useInView();
  return (
    <section id="solution" className="bg-white" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              The Solution
            </p>
            <div className="flex-1 h-px bg-[#e8e8e8]" />
          </div>

          {/* Headline */}
          <h2 className="text-[clamp(32px,5vw,72px)] font-black text-[#0d1b2a] leading-tight tracking-tight mb-20"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
            MemberPass 讓加入會員<br />
            <span style={{ color: "#2da042" }}>像掃碼一樣自然</span>
          </h2>

          {/* Feature list */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {[
              {
                title: "共通 QR 條碼",
                body: "消費者只需一組動態條碼，即可在所有串接商家累積點數、完成會員綁定，無需重複填寫個人資料。",
                tag: "CORE",
              },
              {
                title: "OAuth 2.0 架構",
                body: "採用與「Sign in with Google」相同的開放授權標準，商家端快速串接，消費者清楚掌握資料授權範圍。",
                tag: "SECURITY",
              },
              {
                title: "自動完成會員註冊",
                body: "消費者首次掃碼結帳，系統自動完成商家會員建立，結帳完成後再決定是否安裝商家 App。",
                tag: "UX",
              },
              {
                title: "整合行動支付",
                body: "與 LINE Pay、Google Pay、Apple Pay 深度整合，支付的同時自動觸發 MemberPass 身份驗證。",
                tag: "INTEGRATION",
              },
              {
                title: "動態 + 靜態雙模條碼",
                body: "動態條碼支援高安全性操作（扣點、自動登錄）；靜態條碼應對網路不穩環境，提供低風險的累點選擇。",
                tag: "RELIABILITY",
              },
              {
                title: "JIT 資料同步",
                body: "Just-in-Time 觸發式同步，只在消費者前往商家消費時進行資料版本比對，大幅降低伺服器負載。",
                tag: "PERFORMANCE",
              },
            ].map((f, i) => (
              <div key={i} className="py-8 border-b border-[#ececec] flex gap-6 group">
                <span className="text-[10px] font-bold tracking-widest text-[#bbb] mt-1 w-20 flex-shrink-0"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {f.tag}
                </span>
                <div>
                  <h3 className="font-bold text-[#0d1b2a] mb-1.5 group-hover:text-[#1a56db] transition-colors"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed"
                    style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ─── */
function HowItWorks() {
  const { ref, inView } = useInView();
  const steps = [
    { n: "01", title: "預填會員資料", body: "消費者在 MemberPass 平台一次填寫基本資訊，生成專屬識別碼與安全動態條碼。" },
    { n: "02", title: "給商家掃描", body: "結帳時出示 MemberPass 條碼，商家 POS 系統掃描並透過 OAuth 2.0 完成身份驗證。" },
    { n: "03", title: "自動完成！", body: "系統自動累積點數並完成會員綁定。消費者可選擇是否下載商家 App，完全不強迫。" },
  ];

  return (
    <section id="how" className="bg-[#0d1b2a]" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              How It Works
            </p>
            <div className="flex-1 h-px bg-[#1e2d44]" />
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
              三步驟，<br />搞定一切
            </h2>
            <p className="text-[#7a90a8] leading-relaxed pt-2"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              MemberPass 的設計哲學是：讓複雜的事情在後端發生，讓消費者感覺什麼都沒做。
              預填一次資料，往後在所有串接商家結帳時，一個條碼解決所有問題。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#1e2d44]">
            {steps.map((step) => (
              <div key={step.n} className="bg-[#0d1b2a] p-10">
                <div className="text-[11px] tracking-widest text-[#1a56db] mb-6"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  STEP {step.n}
                </div>
                <h3 className="text-2xl font-black text-white mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#7a90a8] leading-relaxed"
                  style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Payment integrations */}
          <div className="mt-12 pt-10 border-t border-[#1e2d44] flex flex-col md:flex-row md:items-center gap-6">
            <span className="text-[11px] tracking-widest uppercase text-[#555] flex-shrink-0"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              支援串接
            </span>
            <div className="flex flex-wrap gap-3">
              {["LINE Pay", "Google Pay", "Apple Pay", "街口支付", "悠遊付"].map((p) => (
                <span key={p}
                  className="px-4 py-1.5 text-[13px] text-[#7a90a8] border border-[#1e2d44] rounded-full"
                  style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Audiences ─── */
function Audiences() {
  const { ref, inView } = useInView();
  return (
    <section id="audience" className="bg-white" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Who We Serve
            </p>
            <div className="flex-1 h-px bg-[#e8e8e8]" />
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#e8e8e8]">
            {[
              {
                label: "中小型商家",
                sub: "主要客群",
                color: "#1a56db",
                points: [
                  "無需龐大技術資源即可串接",
                  "自動累積精準會員名單",
                  "降低行銷獲客成本（CAC）",
                  "快速接入既有 POS 系統",
                ],
              },
              {
                label: "消費者",
                sub: "終端用戶",
                color: "#2da042",
                points: [
                  "一次預填，處處通用",
                  "結帳即自動累積點數",
                  "無需下載多個商家 App",
                  "個資由平台統一保護",
                ],
              },
              {
                label: "電子支付平台",
                sub: "合作夥伴",
                color: "#7c3aed",
                points: [
                  "LINE Pay / Google Pay 深度整合",
                  "支付即完成會員驗證",
                  "擴大支付場景覆蓋率",
                  "降低商家系統依賴",
                ],
              },
            ].map((g) => (
              <div key={g.label} className="bg-white p-10">
                <p className="text-[11px] tracking-widest uppercase mb-3"
                  style={{ color: g.color, fontFamily: "'JetBrains Mono', monospace" }}>
                  {g.sub}
                </p>
                <h3 className="text-2xl font-black text-[#0d1b2a] mb-8"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
                  {g.label}
                </h3>
                <ul className="space-y-3">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-[#555]"
                      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: g.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Roadmap ─── */
function Roadmap() {
  const { ref, inView } = useInView();
  return (
    <section id="roadmap" className="bg-[#f5f5f5]" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Roadmap
            </p>
            <div className="flex-1 h-px bg-[#ddd]" />
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16">
            <h2 className="text-4xl font-black text-[#0d1b2a] leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
              從本地出發，<br />走向國際
            </h2>
            <p className="text-[#666] leading-relaxed pt-1"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              MemberPass 的擴張路徑清晰且具體：先在台灣零售市場深耕，再橫跨至交通票券與展場門票，最終整合國際條碼體系。
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                phase: "短期",
                en: "SHORT-TERM",
                items: ["開發整合條碼與會員平台", "消費者透過 MemberPass 登入商家 App", "OAuth 2.0 商家串接機制建立"],
                color: "#1a56db",
              },
              {
                phase: "中期",
                en: "MID-TERM",
                items: ["由零售商店跨至交通票券", "展場門票智慧票券整合", "MemberPass 共通條碼成為智慧票券基礎建設"],
                color: "#2da042",
              },
              {
                phase: "長期",
                en: "LONG-TERM",
                items: ["國際市場拓展策略", "整合國外零售商店條碼", "最大幅度降低消費者加入會員的門檻"],
                color: "#0d1b2a",
              },
            ].map((phase, i) => (
              <div key={i} className="border-b border-[#ddd] py-10 grid md:grid-cols-[180px_1fr] gap-8">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#aaa] mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {phase.en}
                  </p>
                  <p className="text-2xl font-black" style={{ color: phase.color, fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
                    {phase.phase}目標
                  </p>
                </div>
                <ul className="grid sm:grid-cols-3 gap-4">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-sm text-[#555] leading-relaxed"
                      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      <span className="text-[10px] font-bold mr-2" style={{ color: phase.color }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ESG ─── */
function ESG() {
  const { ref, inView } = useInView();
  return (
    <section id="esg" className="bg-[#0d1b2a]" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ESG · Sustainability
            </p>
            <div className="flex-1 h-px bg-[#1e2d44]" />
          </div>

          <div className="grid md:grid-cols-[1fr_1.8fr] gap-16 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
              弭平<br />數位落差
            </h2>
            <div>
              <p className="text-[#7a90a8] leading-relaxed mb-6"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                大型連鎖品牌有龐大資源建立流暢的 App 與會員漏斗，但中小型商家往往面臨「有 App 但無人下載」的窘境。
                MemberPass 作為基礎設施，讓中小型商家能享有等同大企業級別的低阻力獲客通道。
              </p>
              <div className="flex flex-wrap gap-3">
                {["SDG 8 尊嚴就業", "SDG 9 產業創新", "SDG 10 減少不平等"].map((s) => (
                  <span key={s}
                    className="px-4 py-1.5 text-[12px] border border-[#1e2d44] text-[#7a90a8] rounded-full"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Four pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e2d44]">
            {[
              { tag: "S — Social", title: "賦能中小企業", body: "讓行銷資源有限的商家也能擁有強大的會員導流能力，同時改善收銀員的工作壓力。" },
              { tag: "G — Governance", title: "資安合規保護", body: "OAuth 2.0 架構確保資料拋轉符合國際標準，消費者擁有明確的同意權管理。" },
              { tag: "SDG 8", title: "經濟成長動能", body: "降低數位獲客成本，帶動線下零售與中小型餐飲業績增長，減少第一線人員勞動摩擦。" },
              { tag: "SDG 9 + 10", title: "基礎建設平權", body: "如同 TWQR 般的會員認證基礎設施，打破大企業對私域流量資源的壟斷。" },
            ].map((p) => (
              <div key={p.tag} className="bg-[#0d1b2a] p-8">
                <p className="text-[10px] font-bold tracking-widest text-[#2da042] mb-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {p.tag}
                </p>
                <h4 className="font-bold text-white mb-3"
                  style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  {p.title}
                </h4>
                <p className="text-xs text-[#7a90a8] leading-relaxed"
                  style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const { ref, inView } = useInView();
  return (
    <section id="pricing" className="bg-white" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Pricing Model
            </p>
            <div className="flex-1 h-px bg-[#e8e8e8]" />
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-black text-[#0d1b2a] leading-tight mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
                簡單透明<br />的定價
              </h2>
              <p className="text-sm text-[#888]"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                所有商家方案均同時包含以下兩項費用。實際費率依商家規模洽談。
              </p>
            </div>
            <div className="flex flex-col gap-0">
              {[
                {
                  type: "01 · PLATFORM LICENSE",
                  name: "基礎授權費",
                  color: "#1a56db",
                  desc: "平台月費，涵蓋商家後台管理、OAuth 2.0 連結設定、會員數據報表及客服支援等核心功能。每月固定收取。",
                  features: ["商家後台管理介面", "OAuth 2.0 串接設定", "基礎會員數據報表", "客服技術支援"],
                },
                {
                  type: "02 · USAGE-BASED API",
                  name: "API 呼叫費",
                  color: "#2da042",
                  desc: "依實際用量計費，結帳或綁定時產生的 API 請求才計費。零使用、零費用，與商家業績規模連動。",
                  features: ["條碼掃描驗證計費", "動態條碼即時生成", "會員自動登錄觸發", "JIT 資料同步呼叫"],
                },
              ].map((plan, i) => (
                <div key={i} className="border-b border-[#ececec] py-10 grid sm:grid-cols-[220px_1fr] gap-8">
                  <div>
                    <p className="text-[10px] tracking-widest mb-2"
                      style={{ color: plan.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {plan.type}
                    </p>
                    <h3 className="text-2xl font-black text-[#0d1b2a]"
                      style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}>
                      {plan.name}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm text-[#666] leading-relaxed mb-5"
                      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {plan.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((f) => (
                        <span key={f}
                          className="text-[12px] px-3 py-1 rounded-full border"
                          style={{ borderColor: `${plan.color}30`, color: plan.color, background: `${plan.color}08`, fontFamily: "'Noto Sans TC', sans-serif" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <p className="text-sm text-[#888]" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              費率依商家規模與預估用量共同決定，歡迎直接聯絡洽談。
            </p>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "#1a56db", fontFamily: "'Noto Sans TC', sans-serif" }}>
              索取報價 <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" className="bg-[#1a56db]" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div
          className="transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Get Started
              </p>
              <h2
                className="text-[clamp(40px,6vw,88px)] font-black text-white leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans TC', sans-serif" }}
              >
                準備好打造<br />
                <span style={{ color: "#a8f5bc" }}>零摩擦的</span><br />
                會員體驗了嗎？
              </h2>
            </div>
            <div className="flex flex-col gap-4 md:pb-2">
              <a href="mailto:mpass@zhiu.dev"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#1a56db] bg-white transition-all hover:scale-105 text-sm"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                聯絡我們 <ArrowUpRight size={15} />
              </a>
              <a href="#how"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-all text-sm"
                style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                了解更多功能
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#0a1220] py-10 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <ImageWithFallback src={logoImg} alt="MemberPass" className="h-7 w-auto object-contain opacity-60 brightness-200" />
        <div className="flex gap-6 text-[12px] text-[#555]">
          {["解決方案", "如何運作", "規劃藍圖", "ESG", "定價"].map((l) => (
            <a key={l} href="#" className="hover:text-[#aaa] transition-colors"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>{l}</a>
          ))}
        </div>
        <p className="text-[11px] text-[#444]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          © 2025 MemberPass
        </p>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Audiences />
      <Roadmap />
      <ESG />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
