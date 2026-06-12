import { useState, useEffect, useRef } from "react";

/* ── TOKENS ─────────────────────────────────────────────── */
const C = {
  forestDark:  "#1E4D0F",
  forest:      "#2E7A1A",
  forestMid:   "#4A9B2F",
  leafLight:   "#C8E6A0",
  bgPage:      "#F2F8EC",
  bgCard:      "#FFFFFF",
  sky:         "#2E7BB4",
  skyLight:    "#D6EAF8",
  wheat:       "#D4A017",
  wheatLight:  "#FDF3D0",
  soil:        "#8B5E3C",
  textPrimary: "#111A0A",
  textMuted:   "#5A6E4A",
  border:      "#D4E8C0",
};

/* ── NAV LINKS ───────────────────────────────────────────── */
const NAV = ["Özellikler", "Bahçe Planla", "Nasıl Çalışır", "İletişim"];

/* ── FEATURES ────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: "🗺️",
    label: "BAHÇE PLANLAMA",
    title: "Parsel bazlı akıllı düzen",
    desc: "Sürükle-bırak arayüzüyle tarlayı parsellere böl, her bölgeye farklı ürün ve bakım takvimi ata. Toprak haritası verilerinle entegre çalışır.",
    accent: C.forest,
    bg: "#EBF5DC",
    tag: "Planlama",
  },
  {
    icon: "🩺",
    label: "HASTALIK TAKİBİ",
    title: "Erken uyarı & tanı sistemi",
    desc: "Yaprak fotoğrafı yükle, yapay zeka dakikalar içinde olası hastalık ve zararlıları tespit etsin. Geçmiş kayıtlarla trend analizi yap.",
    accent: C.wheat,
    bg: C.wheatLight,
    tag: "Sağlık",
  },
  {
    icon: "💧",
    label: "SULAMA KONTROLÜ",
    title: "Nem bazlı otomatik sulama",
    desc: "Toprak nem sensörleri ve hava durumu verileriyle sulama zamanlaması otomatik ayarlanır. Su tüketimini ortalama %40 azaltır.",
    accent: C.sky,
    bg: C.skyLight,
    tag: "Sulama",
  },
];

/* ── HOW IT WORKS ────────────────────────────────────────── */
const STEPS = [
  { icon: "📍", title: "Arazini tanımla", desc: "Koordinat veya elle çizimle parselini sisteme ekle. Toprak türü ve iklim verisi otomatik yüklenir." },
  { icon: "🌱", title: "Ürünlerini seç", desc: "Yüzlerce bitki profilinden seç; ekim takvimi, sulama ve gübre tavsiyeleri anında oluşur." },
  { icon: "📡", title: "Sensörleri bağla", desc: "Desteklenen IoT nem ve hava sensörlerini eşleştir ya da manuel veri girişiyle devam et." },
  { icon: "📊", title: "İzle & müdahale et", desc: "Anlık dashboard'dan anomali uyarılarını gör, tek dokunuşla sulama veya ilaçlama aksiyonu başlat." },
];

/* ── STATS ───────────────────────────────────────────────── */
const STATS = [
  { val: "%40", label: "Su Tasarrufu", color: C.sky },
  { val: "3×", label: "Daha Hızlı Hastalık Tespiti", color: C.wheat },
  { val: "1200+", label: "Aktif Çiftlik", color: C.forest },
  { val: "98%", label: "Kullanıcı Memnuniyeti", color: C.forestMid },
];

/* ── GARDEN GRID SVG (hero visual) ──────────────────────── */
function GardenGrid() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const parcels = [
    { x: 20,  y: 20,  w: 110, h: 70,  crop: "🍅 Domates",   health: "good",    water: 82 },
    { x: 145, y: 20,  w: 90,  h: 70,  crop: "🫑 Biber",     health: "warn",    water: 48 },
    { x: 250, y: 20,  w: 120, h: 70,  crop: "🥒 Salatalık", health: "good",    water: 91 },
    { x: 20,  y: 110, w: 150, h: 80,  crop: "🌽 Mısır",     health: "good",    water: 67 },
    { x: 185, y: 110, w: 85,  h: 80,  crop: "🧅 Soğan",     health: "alert",   water: 30 },
    { x: 285, y: 110, w: 85,  h: 80,  crop: "🥕 Havuç",     health: "good",    water: 75 },
  ];

  const healthColor = { good: "#2E7A1A", warn: "#D4A017", alert: "#C0392B" };
  const healthBg    = { good: "#EBF5DC", warn: "#FDF3D0", alert: "#FDECEA" };
  const healthLabel = { good: "Sağlıklı", warn: "Takip et", alert: "Uyarı!" };

  const pulseIdx = tick % parcels.length;

  return (
    <svg viewBox="0 0 390 210" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 520, display: "block" }}>
      {/* soil bg */}
      <rect x="0" y="0" width="390" height="210" rx="16" fill="#F2F8EC" />
      {/* grid lines subtle */}
      {[20,145,250,385].map(x => <line key={x} x1={x} y1="10" x2={x} y2="200" stroke="#D4E8C0" strokeWidth="1" />)}
      {[20,110,200].map(y => <line key={y} x1="10" y1={y} x2="380" y2={y} stroke="#D4E8C0" strokeWidth="1" />)}

      {parcels.map((p, i) => (
        <g key={i}>
          {/* parcel bg */}
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="8"
            fill={healthBg[p.health]} stroke={healthColor[p.health]}
            strokeWidth={i === pulseIdx ? 2.5 : 1}
            opacity={i === pulseIdx ? 1 : 0.85} />
          {/* pulse ring */}
          {i === pulseIdx && (
            <rect x={p.x - 3} y={p.y - 3} width={p.w + 6} height={p.h + 6} rx="11"
              fill="none" stroke={healthColor[p.health]} strokeWidth="1.5" opacity="0.4" />
          )}
          {/* crop label */}
          <text x={p.x + p.w / 2} y={p.y + 26} textAnchor="middle"
            fontSize="11" fontWeight="600" fill={healthColor[p.health]}>
            {p.crop}
          </text>
          {/* health badge */}
          <rect x={p.x + 6} y={p.y + p.h - 22} width={56} height="16" rx="4"
            fill={healthColor[p.health]} opacity="0.15" />
          <text x={p.x + 34} y={p.y + p.h - 11} textAnchor="middle"
            fontSize="9" fontWeight="700" fill={healthColor[p.health]}>
            {healthLabel[p.health]}
          </text>
          {/* water bar */}
          <rect x={p.x + p.w - 28} y={p.y + 8} width="16" height={p.h - 30} rx="4"
            fill="#D6EAF8" />
          <rect x={p.x + p.w - 28} y={p.y + 8 + (p.h - 30) * (1 - p.water / 100)}
            width="16" height={(p.h - 30) * (p.water / 100)} rx="4" fill="#2E7BB4" />
          <text x={p.x + p.w - 20} y={p.y + p.h - 18} textAnchor="middle"
            fontSize="8" fill="#2E7BB4" fontWeight="700">
            {p.water}%
          </text>
        </g>
      ))}

      {/* legend */}
      {[["#2E7A1A","Sağlıklı"],["#D4A017","Takip"],["#C0392B","Uyarı"]].map(([c,l], i) => (
        <g key={l}>
          <circle cx={20 + i * 90} cy={198} r="5" fill={c} />
          <text x={29 + i * 90} y={202} fontSize="9" fill="#5A6E4A">{l}</text>
        </g>
      ))}
      <text x={310} y={202} fontSize="9" fill="#2E7BB4">💧 Nem %</text>
    </svg>
  );
}

/* ── MAIN ────────────────────────────────────────────────── */
export default function AgriLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waterVal, setWaterVal] = useState(68);
  const meterRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const waterColor = waterVal < 35 ? C.wheat : waterVal > 80 ? C.sky : C.forest;
  const waterLabel = waterVal < 35 ? "⚠️ Sulama gerekli" : waterVal > 80 ? "💧 Yeterli nem" : "✅ Normal";

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: C.bgPage, color: C.textPrimary, overflowX: "hidden" }}>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(242,248,236,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.3s",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <rect width="36" height="36" rx="10" fill={C.forestDark} />
              <text x="18" y="24" textAnchor="middle" fontSize="18" fill="#C8E6A0">🌿</text>
            </svg>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: C.forestDark, lineHeight: 1 }}>AgriSense</div>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 500 }}>Akıllı Tarım Platformu</div>
            </div>
          </div>

          {/* desktop nav */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV.map(l => (
              <a key={l} href="#" style={{ textDecoration: "none", color: C.textMuted, fontSize: 14, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = C.forestDark}
                onMouseLeave={e => e.target.style.color = C.textMuted}>{l}</a>
            ))}
            <a href="#" style={{
              background: C.forestDark, color: "#C8E6A0",
              padding: "9px 22px", borderRadius: 8,
              textDecoration: "none", fontSize: 14, fontWeight: 700,
              transition: "background .2s",
            }}
              onMouseEnter={e => e.target.style.background = C.forest}
              onMouseLeave={e => e.target.style.background = C.forestDark}>
              Ücretsiz Dene
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(170deg, #E8F5D4 0%, #F2F8EC 55%, ${C.skyLight} 100%)`,
        display: "flex", alignItems: "center",
        padding: "120px 5% 80px",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>

          {/* left copy */}
          <div style={{ flex: "1 1 340px", minWidth: 280 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: C.leafLight, color: C.forestDark,
              padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              marginBottom: 28, border: `1px solid ${C.forestMid}`,
            }}>
              🌾 Tarımda yapay zeka dönemi
            </span>

            <h1 style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 8px", letterSpacing: "-1.5px", color: C.forestDark }}>
              Bahçenden
            </h1>
            <h1 style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 8px", letterSpacing: "-1.5px", color: C.forest }}>
              daha fazla verim,
            </h1>
            <h1 style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 28px", letterSpacing: "-1.5px" }}>
              <span style={{ color: C.sky }}>daha az su.</span>
            </h1>

            <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: C.textMuted, lineHeight: 1.75, maxWidth: 480, margin: "0 0 40px" }}>
              AgriSense; parsel bazlı bahçe planlaması, yapay zeka destekli hastalık tespiti ve otomatik sulama kontrolünü tek platformda birleştirir.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#" style={{
                background: C.forestDark, color: "#C8E6A0",
                padding: "14px 32px", borderRadius: 10,
                textDecoration: "none", fontWeight: 800, fontSize: 15,
                boxShadow: `0 6px 28px rgba(30,77,15,0.28)`,
                transition: "transform .2s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 36px rgba(30,77,15,0.38)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 6px 28px rgba(30,77,15,0.28)`; }}>
                Bahçeni Oluştur →
              </a>
              <a href="#" style={{
                background: "transparent", color: C.forestDark,
                padding: "14px 26px", borderRadius: 10,
                textDecoration: "none", fontWeight: 600, fontSize: 15,
                border: `1.5px solid ${C.border}`,
                transition: "border-color .2s",
              }}
                onMouseEnter={e => e.target.style.borderColor = C.forestMid}
                onMouseLeave={e => e.target.style.borderColor = C.border}>
                Demo İzle ▶
              </a>
            </div>
            <p style={{ marginTop: 18, fontSize: 12, color: C.textMuted }}>Kredi kartı gerekmez · 14 gün ücretsiz</p>
          </div>

          {/* right — garden grid */}
          <div style={{
            flex: "1 1 380px", minWidth: 300,
            background: "#fff", borderRadius: 20, padding: 20,
            border: `1.5px solid ${C.border}`,
            boxShadow: "0 8px 40px rgba(30,77,15,0.10)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 12, letterSpacing: "0.5px" }}>
              CANLI BAHÇE GÖRÜNÜMÜ — Örnek Tarla
            </div>
            <GardenGrid />
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[{ icon: "🟢", label: "4 parsel sağlıklı", color: C.forest }, { icon: "🟡", label: "1 takipte", color: C.wheat }, { icon: "🔴", label: "1 uyarı", color: "#C0392B" }].map(b => (
                <span key={b.label} style={{ background: "#F2F8EC", border: `1px solid ${C.border}`, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: b.color }}>
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section style={{ background: C.forestDark, padding: "56px 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 42, fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "#8FC87A", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", background: "#EBF5DC", color: C.forestDark, padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16, border: `1px solid ${C.leafLight}` }}>3 ANA MODÜL</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.5px", color: C.forestDark }}>Tarlandan masana kadar tam kontrol</h2>
            <p style={{ fontSize: 17, color: C.textMuted, maxWidth: 520, margin: "0 auto" }}>Her modül bağımsız çalışır, ama birlikte kullandığında veriminiz katlanır.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 24 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: f.bg, borderRadius: 16,
                border: `1.5px solid ${f.accent}22`,
                padding: "32px 28px",
                transition: "transform .2s, box-shadow .2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${f.accent}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: f.accent, letterSpacing: "1px", marginBottom: 8 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: C.textPrimary }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>{f.desc}</p>
                <a href="#" style={{ fontSize: 13, fontWeight: 700, color: f.accent, textDecoration: "none" }}>
                  Daha fazla →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MOISTURE DEMO ─────────────────────── */}
      <section style={{ padding: "80px 5%", background: C.skyLight }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", background: C.sky, color: "#fff", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>💧 SULAMA MANTIGI</span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, margin: "0 0 12px", color: C.forestDark }}>Sensör verisini sürükle, sistemi gör</h2>
          <p style={{ fontSize: 15, color: C.textMuted, marginBottom: 40 }}>Toprak nem seviyesine göre AgriSense otomatik aksiyon önerir.</p>

          <div style={{ background: "#fff", borderRadius: 16, padding: "36px 32px", border: `1.5px solid ${C.border}`, boxShadow: "0 4px 24px rgba(46,123,180,0.08)" }}>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, display: "block", marginBottom: 12 }}>
                Toprak Nem Oranı
              </label>
              <input type="range" min="0" max="100" value={waterVal}
                onChange={e => setWaterVal(Number(e.target.value))}
                style={{ width: "100%", accentColor: waterColor, height: 6 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                <span>Kuru</span><span>Optimal</span><span>Çok Islak</span>
              </div>
            </div>

            {/* gauge */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: `conic-gradient(${waterColor} ${waterVal * 3.6}deg, #e8e8e8 0deg)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: waterColor }}>{waterVal}</span>
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: waterColor }}>{waterLabel}</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
                  {waterVal < 35
                    ? "Sistem bugün 18:00'de otomatik sulama başlatacak."
                    : waterVal > 80
                    ? "Sulama durduruldu, aşırı nem riski algılandı."
                    : "Mevcut koşullar optimal. Bir sonraki kontrol 6 saat sonra."}
                </div>
              </div>
            </div>

            {/* action chip */}
            <div style={{
              background: `${waterColor}12`, border: `1px solid ${waterColor}44`,
              borderRadius: 10, padding: "12px 18px",
              fontSize: 13, fontWeight: 600, color: waterColor, textAlign: "left",
            }}>
              {waterVal < 35
                ? "📣 Aksiyon: Sulama vanası açılıyor — Parsel A3, A4 (tahmini 25 dk)"
                : waterVal > 80
                ? "🛑 Aksiyon: Tüm sulama programları 12 saat erteleniyor"
                : "✔ Aksiyon: Gerekmez — bir sonraki sulama perşembe 07:00"}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section style={{ padding: "100px 5%", background: C.bgPage }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ display: "inline-block", background: C.wheatLight, color: C.wheat, padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16, border: `1px solid ${C.wheat}44` }}>NASIL ÇALIŞIR</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, margin: "0 0 12px", color: C.forestDark }}>İlk hasadınıza 4 adım</h2>
            <p style={{ fontSize: 16, color: C.textMuted, maxWidth: 420, margin: "0 auto" }}>Teknoloji bilgisine gerek yok — çiftçi mantığıyla tasarlandı.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ position: "relative" }}>
                {i < STEPS.length - 1 && (
                  <div style={{ position: "absolute", top: 28, left: "80%", right: "-14%", height: 2, background: `linear-gradient(90deg, ${C.leafLight}, transparent)`, zIndex: 0 }} />
                )}
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: i % 2 === 0 ? "#EBF5DC" : C.skyLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: 18, position: "relative", zIndex: 1,
                  border: `1px solid ${i % 2 === 0 ? C.leafLight : "#B5D4F4"}`,
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: C.forestDark }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section style={{ padding: "0 5% 100px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: `linear-gradient(130deg, ${C.forestDark} 0%, #0D3B6E 100%)`,
          borderRadius: 24, padding: "72px 5%",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(200,230,160,0.07)" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(46,123,180,0.12)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🌾</div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
              Bu sezon daha iyi hasat için
            </h2>
            <p style={{ fontSize: 17, color: "rgba(200,230,160,0.85)", maxWidth: 480, margin: "0 auto 40px" }}>
              1200'den fazla çiftçi AgriSense ile suyunu azaltıyor, verimini artırıyor.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{
                background: C.leafLight, color: C.forestDark,
                padding: "14px 36px", borderRadius: 10,
                textDecoration: "none", fontWeight: 800, fontSize: 16,
                transition: "background .2s",
              }}
                onMouseEnter={e => e.target.style.background = "#b0d87a"}
                onMouseLeave={e => e.target.style.background = C.leafLight}>
                Bahçeni Oluştur — Ücretsiz
              </a>
              <a href="#" style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                padding: "14px 28px", borderRadius: 10,
                textDecoration: "none", fontWeight: 600, fontSize: 15,
                border: "1px solid rgba(255,255,255,0.2)",
              }}>
                Demo Talep Et
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: "#0D1F07", color: "#7A9E65", padding: "60px 5% 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <svg width="30" height="30" viewBox="0 0 36 36"><rect width="36" height="36" rx="9" fill={C.forestMid} /><text x="18" y="24" textAnchor="middle" fontSize="17" fill="#EBF5DC">🌿</text></svg>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#C8E6A0" }}>AgriSense</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#5A7E4A", margin: 0 }}>Tarımda akıllı geleceğe liderlik eden platform.</p>
            </div>
            {[
              ["Platform", ["Bahçe Planlama", "Hastalık Tespiti", "Sulama Yönetimi", "Raporlama"]],
              ["Şirket",   ["Hakkımızda", "Blog", "Basın", "Kariyer"]],
              ["Destek",   ["Yardım Merkezi", "Topluluk", "İletişim", "API Docs"]],
            ].map(([title, links]) => (
              <div key={title}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: "#C8E6A0", marginBottom: 14, letterSpacing: "1px", textTransform: "uppercase" }}>{title}</h4>
                {links.map(l => (
                  <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "#5A7E4A", textDecoration: "none", marginBottom: 10, transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#C8E6A0"}
                    onMouseLeave={e => e.target.style.color = "#5A7E4A"}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1A3410", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "#3A5A2A", margin: 0 }}>© 2025 AgriSense. Tüm hakları saklıdır.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Gizlilik", "Kullanım Şartları"].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: "#3A5A2A", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}