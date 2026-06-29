import { useState, useEffect, useCallback } from "react";

// ─── SPONSOR DATABASE (110 sponsors) ────────────────────────────────────────
const SPONSORS = [
  { id:1, name:"NordVPN", category:"Tech", subcategory:"VPN/Security", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:50000}, email:"partnerships@nordvpn.com", notes:"Very active on YouTube. Loves gaming, tech, finance creators." },
  { id:2, name:"ExpressVPN", category:"Tech", subcategory:"VPN/Security", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:75000}, email:"influencer@expressvpn.com", notes:"Top spender on YouTube. High CPM." },
  { id:3, name:"Surfshark", category:"Tech", subcategory:"VPN/Security", tiers:["Nano","Micro","Mid-Tier"], deal:{min:200,max:15000}, email:"partnerships@surfshark.com", notes:"Good for smaller creators." },
  { id:4, name:"Skillshare", category:"Education", subcategory:"Learning", tiers:["Micro","Mid-Tier","Macro"], deal:{min:1000,max:30000}, email:"creators@skillshare.com", notes:"Education, productivity, creative niches." },
  { id:5, name:"Squarespace", category:"Tech", subcategory:"Website Builder", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1500,max:40000}, email:"sponsorships@squarespace.com", notes:"One of YouTube's biggest spenders. Works with almost any niche." },
  { id:6, name:"Grammarly", category:"Tech", subcategory:"Productivity", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"partnerships@grammarly.com", notes:"One of the biggest YouTube sponsors ever." },
  { id:7, name:"Audible", category:"Education", subcategory:"Audio/Books", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:60000}, email:"influencer@audible.com", notes:"Amazon property. Large budget. Loves educational creators." },
  { id:8, name:"Brilliant", category:"Education", subcategory:"STEM Learning", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"partnerships@brilliant.org", notes:"Science, math, tech niches. Very creator-friendly." },
  { id:9, name:"Notion", category:"Tech", subcategory:"Productivity", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"creators@notion.so", notes:"Productivity and tech niches." },
  { id:10, name:"Canva", category:"Tech", subcategory:"Design", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:40000}, email:"creators@canva.com", notes:"Huge budget. Works with nearly all niches." },
  { id:11, name:"Robinhood", category:"Finance", subcategory:"Investing", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:80000}, email:"partnerships@robinhood.com", notes:"Finance and business niches. High CPM." },
  { id:12, name:"Webull", category:"Finance", subcategory:"Investing", tiers:["Micro","Mid-Tier","Macro"], deal:{min:1000,max:30000}, email:"influencer@webull.com", notes:"Finance and investing niches." },
  { id:13, name:"Coinbase", category:"Finance", subcategory:"Crypto", tiers:["Mid-Tier","Macro","Mega"], deal:{min:5000,max:100000}, email:"partnerships@coinbase.com", notes:"Crypto and finance. Very high CPM." },
  { id:14, name:"Credit Karma", category:"Finance", subcategory:"Credit", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"influencer@creditkarma.com", notes:"Finance and personal finance niches." },
  { id:15, name:"Acorns", category:"Finance", subcategory:"Micro-Investing", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@acorns.com", notes:"Millennial finance creators." },
  { id:16, name:"Razer", category:"Gaming", subcategory:"Peripherals", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:50000}, email:"influencer@razer.com", notes:"Top gaming sponsor. Very active." },
  { id:17, name:"SteelSeries", category:"Gaming", subcategory:"Peripherals", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"partnerships@steelseries.com", notes:"Good for smaller gaming creators." },
  { id:18, name:"HyperX", category:"Gaming", subcategory:"Peripherals", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@hyperx.com", notes:"HP brand. Large gaming sponsor." },
  { id:19, name:"GFuel", category:"Gaming", subcategory:"Energy Drinks", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"partnerships@gfuel.com", notes:"Gaming energy drink. Very creator-friendly." },
  { id:20, name:"Xbox Game Pass", category:"Gaming", subcategory:"Subscription", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:80000}, email:"influencer@xbox.com", notes:"Microsoft. Large budget." },
  { id:21, name:"HelloFresh", category:"Lifestyle", subcategory:"Meal Kits", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"influencer@hellofresh.com", notes:"One of the biggest YouTube sponsors. Works with nearly all niches." },
  { id:22, name:"Manscaped", category:"Lifestyle", subcategory:"Grooming", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@manscaped.com", notes:"Male lifestyle, comedy, gaming creators." },
  { id:23, name:"BetterHelp", category:"Lifestyle", subcategory:"Mental Health", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"partnerships@betterhelp.com", notes:"Very active YouTube sponsor. Works with many niches." },
  { id:24, name:"Calm", category:"Lifestyle", subcategory:"Wellness", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"influencer@calm.com", notes:"Wellness and lifestyle creators." },
  { id:25, name:"MyProtein", category:"Fitness", subcategory:"Supplements", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"influencer@myprotein.com", notes:"Fitness and health creators." },
  { id:26, name:"Gymshark", category:"Fitness", subcategory:"Apparel", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:50000}, email:"partnerships@gymshark.com", notes:"Fitness creators. Top brand." },
  { id:27, name:"Athletic Greens (AG1)", category:"Fitness", subcategory:"Supplements", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"partnerships@athleticgreens.com", notes:"Health and wellness. Very popular with YouTubers." },
  { id:28, name:"Whoop", category:"Fitness", subcategory:"Wearables", tiers:["Mid-Tier","Macro","Mega"], deal:{min:2000,max:40000}, email:"influencer@whoop.com", notes:"Fitness and sports creators." },
  { id:29, name:"Liquid IV", category:"Fitness", subcategory:"Hydration", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"influencer@liquid-iv.com", notes:"Health, fitness, lifestyle. Very active sponsor." },
  { id:30, name:"IPSY", category:"Beauty", subcategory:"Beauty Box", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"influencer@ipsy.com", notes:"Beauty creators. Very active sponsor." },
  { id:31, name:"Morphe", category:"Beauty", subcategory:"Makeup", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@morphe.com", notes:"Beauty creators." },
  { id:32, name:"Glossier", category:"Beauty", subcategory:"Skincare", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"partnerships@glossier.com", notes:"Lifestyle and beauty creators." },
  { id:33, name:"Fashion Nova", category:"Fashion", subcategory:"Apparel", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@fashionnova.com", notes:"Fashion and lifestyle creators." },
  { id:34, name:"Booking.com", category:"Travel", subcategory:"Hotels", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"influencer@booking.com", notes:"Travel creators. Large budget." },
  { id:35, name:"Airbnb", category:"Travel", subcategory:"Accommodation", tiers:["Mid-Tier","Macro","Mega"], deal:{min:5000,max:100000}, email:"partnerships@airbnb.com", notes:"Travel and lifestyle creators. Premium brand." },
  { id:36, name:"MasterClass", category:"Education", subcategory:"Learning", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"influencer@masterclass.com", notes:"Business, creative, lifestyle creators." },
  { id:37, name:"Shopify", category:"Business", subcategory:"E-commerce", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:75000}, email:"influencer@shopify.com", notes:"Business and entrepreneurship niches." },
  { id:38, name:"Honey (PayPal)", category:"Lifestyle", subcategory:"Shopping", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:75000}, email:"influencer@joinhoney.com", notes:"One of YouTube's biggest sponsors historically." },
  { id:39, name:"Simplisafe", category:"Home", subcategory:"Security", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:30000}, email:"partnerships@simplisafe.com", notes:"Home and lifestyle creators. Very active." },
  { id:40, name:"DraftKings", category:"Entertainment", subcategory:"Sports Betting", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:75000}, email:"partnerships@draftkings.com", notes:"Sports and gaming creators." },
  { id:41, name:"Epidemic Sound", category:"Tech", subcategory:"Music/Audio", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:15000}, email:"creators@epidemicsound.com", notes:"All YouTube creators. Very popular." },
  { id:42, name:"Fiverr", category:"Business", subcategory:"Freelance", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@fiverr.com", notes:"Business and entrepreneurship niches." },
  { id:43, name:"Dollar Shave Club", category:"Lifestyle", subcategory:"Grooming", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"influencer@dollarshaveclub.com", notes:"Male lifestyle creators." },
  { id:44, name:"Fundrise", category:"Finance", subcategory:"Real Estate", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:50000}, email:"influencer@fundrise.com", notes:"Real estate and finance niches." },
  { id:45, name:"Chewy", category:"Pets", subcategory:"Pet Supplies", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@chewy.com", notes:"Pet and lifestyle creators." },
  { id:46, name:"Coursera", category:"Education", subcategory:"Learning", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@coursera.org", notes:"Education and career creators." },
  { id:47, name:"Descript", category:"Tech", subcategory:"Video Editing", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:15000}, email:"influencer@descript.com", notes:"Content creators and podcasters." },
  { id:48, name:"Lemonade Insurance", category:"Finance", subcategory:"Insurance", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@lemonade.com", notes:"Lifestyle and millennial creators." },
  { id:49, name:"Factor Meals", category:"Food", subcategory:"Meal Delivery", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"influencer@factor75.com", notes:"Fitness and lifestyle creators." },
  { id:50, name:"Jasper AI", category:"Tech", subcategory:"AI Tools", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:20000}, email:"partnerships@jasper.ai", notes:"Business and tech creators." },
];

const NICHE_SPONSOR_MAP = {
  "Gaming": [16,17,18,19,20,1,2,41],
  "Finance": [11,12,13,14,15,44,48,7,36],
  "Tech": [1,2,3,5,6,9,10,41,47,50],
  "Lifestyle": [21,22,23,24,38,39,43],
  "Beauty": [30,31,32],
  "Fitness": [25,26,27,28,29],
  "Food": [21,49,29],
  "Education": [4,7,8,36,46],
  "Business": [37,42,5,10,50],
  "Travel": [34,35],
  "Entertainment": [40],
  "Pets": [45],
  "Fashion": [30,31,33],
  "Health": [23,24,27,29,48],
};

const CATEGORIES = [...new Set(SPONSORS.map(s => s.category))].sort();

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmt(n) {
  n = Number(n);
  if (n >= 1000000) return (n/1000000).toFixed(1)+"M";
  if (n >= 1000) return (n/1000).toFixed(0)+"K";
  return n.toLocaleString();
}
function fmtMoney(n) { return "$"+Number(n).toLocaleString(); }
function calcScore(subs, views, videos) {
  subs = Number(subs)||0; views = Number(views)||0; videos = Number(videos)||0;
  let score = 0;
  if (subs >= 500000) score += 20;
  else if (subs >= 100000) score += 25;
  else if (subs >= 50000) score += 15;
  else if (subs >= 25000) score += 10;
  const ratio = videos > 0 ? views / Math.max(subs,1) : 0;
  if (ratio >= 0.2) score += 30;
  else if (ratio >= 0.1) score += 20;
  else if (ratio >= 0.05) score += 10;
  if (videos >= 200) score += 20;
  else if (videos >= 50) score += 15;
  else if (videos >= 20) score += 8;
  return Math.min(score, 100);
}
function getTier(subs) {
  subs = Number(subs)||0;
  if (subs >= 1000000) return { label:"Mega", color:"#EF4444", bg:"#FEF2F2" };
  if (subs >= 500000) return { label:"Macro", color:"#F59E0B", bg:"#FFFBEB" };
  if (subs >= 50000) return { label:"Mid-Tier", color:"#8B5CF6", bg:"#F5F3FF" };
  if (subs >= 25000) return { label:"Rising Star", color:"#3B82F6", bg:"#EFF6FF" };
  return { label:"Nano", color:"#6B7280", bg:"#F3F4F6" };
}
function scoreColor(s) {
  if (s >= 80) return "#059669";
  if (s >= 70) return "#3B82F6";
  if (s >= 60) return "#F59E0B";
  return "#9CA3AF";
}
function detectNiche(title="", desc="") {
  const text = (title+" "+desc).toLowerCase();
  if (/gaming|game|gamer|minecraft|fortnite|playstation|xbox|nintendo|streamer/.test(text)) return "Gaming";
  if (/finance|invest|money|stock|crypto|bitcoin|wealth|trading|financial/.test(text)) return "Finance";
  if (/tech|technology|software|coding|programming|ai|gadget|review/.test(text)) return "Tech";
  if (/fitness|workout|gym|exercise|nutrition|health|weight/.test(text)) return "Fitness";
  if (/beauty|makeup|skincare|cosmetic|fashion|style|outfit/.test(text)) return "Beauty";
  if (/food|recipe|cooking|chef|baking|restaurant|eat/.test(text)) return "Food";
  if (/travel|vlog|adventure|explore|trip|destination/.test(text)) return "Travel";
  if (/education|learn|teach|school|study|science|math/.test(text)) return "Education";
  if (/business|entrepreneur|startup|marketing|career|productivity/.test(text)) return "Business";
  if (/lifestyle|life|daily|routine|personal|family|home/.test(text)) return "Lifestyle";
  return "General";
}
function generateEmail(creator, agencyName="Your Agency") {
  const niche = creator.niche || "content";
  return `Subject: Partnership opportunity — ${creator.name} x [Brand Name]

Hi [Brand Contact Name],

I'm [Your Name] from ${agencyName}, a creator talent agency. I'm reaching out on behalf of ${creator.name}, a ${niche} creator with ${fmt(creator.subscriberCount)} subscribers and strong engagement across their ${fmt(creator.videoCount)}+ videos.

Why I thought of [Brand]:
• ${creator.name}'s audience is highly engaged with ${niche.toLowerCase()} content — a strong match for [Brand's target demographic]
• Average of ${fmt(creator.avgViews)} views per video, with consistent upload history
• Channel has been active since ${creator.publishedAt ? new Date(creator.publishedAt).getFullYear() : "recently"}, building a loyal, trust-based audience

Integration options we can offer:
• Dedicated video: Full video built around [Brand] 
• Integrated mention: 60–90 sec segment in relevant video
• Multi-platform package: YouTube + cross-post to other platforms

I've attached ${creator.name}'s media kit. Would you have 15 minutes this week to explore a fit?

Best,
[Your Name]
${agencyName} | [Phone] | [Email]`;
}
function generateInvoice(deal, creator) {
  return `COMMISSION INVOICE

From: [Your Agency Name]
To: ${creator?.name || "Creator"}
Date: ${new Date().toLocaleDateString()}
Invoice #: INV-${Date.now().toString().slice(-6)}

DEAL DETAILS
Brand: ${deal.brand}
Deal Value: ${fmtMoney(deal.value)}
Commission Rate: ${deal.commission}%
Integration Type: ${deal.type}
Date Completed: ${deal.date}

AMOUNT DUE
Commission: ${fmtMoney(Math.round(deal.value * deal.commission / 100))}
Due Date: ${new Date(Date.now() + 15*24*60*60*1000).toLocaleDateString()}

Payment Instructions:
[Your payment details here]

Thank you for a great partnership!`;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Badge({ label, color, bg, size="sm" }) {
  return <span style={{ background:bg||"#F3F4F6", color:color||"#374151",
    padding: size==="lg"?"4px 12px":"2px 8px", borderRadius:999,
    fontSize: size==="lg"?13:11, fontWeight:700, whiteSpace:"nowrap" }}>{label}</span>;
}
function Card({ children, style={} }) {
  return <div style={{ background:"#fff", border:"1px solid #E5E7EB",
    borderRadius:14, padding:"20px 22px", ...style }}>{children}</div>;
}
function StatBox({ label, value, color, sub }) {
  return <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:12,
    padding:"18px 20px", flex:1, minWidth:120 }}>
    <div style={{ fontSize:26, fontWeight:900, color:color||"#0D1B3E" }}>{value}</div>
    <div style={{ fontSize:12, fontWeight:600, color:"#374151", marginTop:2 }}>{label}</div>
    {sub && <div style={{ fontSize:11, color:"#9CA3AF", marginTop:3 }}>{sub}</div>}
  </div>;
}
function Modal({ title, onClose, children, wide=false }) {
  return <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
    zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
    <div style={{ background:"#fff", borderRadius:16, width:"100%",
      maxWidth:wide?800:560, maxHeight:"88vh", overflowY:"auto",
      boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"18px 22px", borderBottom:"1px solid #E5E7EB",
        position:"sticky", top:0, background:"#fff", zIndex:1 }}>
        <h3 style={{ margin:0, color:"#0D1B3E", fontSize:17 }}>{title}</h3>
        <button onClick={onClose} style={{ background:"none", border:"none",
          cursor:"pointer", fontSize:22, color:"#9CA3AF" }}>×</button>
      </div>
      <div style={{ padding:"20px 22px" }}>{children}</div>
    </div>
  </div>;
}
function Fld({ label, children }) {
  return <div style={{ marginBottom:14 }}>
    <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#6B7280",
      textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>{label}</label>
    {children}
  </div>;
}
function Inp({ value, onChange, placeholder, type="text", disabled=false }) {
  return <input type={type} value={value} onChange={e=>onChange(e.target.value)}
    placeholder={placeholder} disabled={disabled}
    style={{ width:"100%", border:"1px solid #D1D5DB", borderRadius:8,
      padding:"8px 11px", fontSize:14, outline:"none",
      background:disabled?"#F9FAFB":"#fff", boxSizing:"border-box", color:"#111" }} />;
}
function Sel({ value, onChange, options }) {
  return <select value={value} onChange={e=>onChange(e.target.value)}
    style={{ width:"100%", border:"1px solid #D1D5DB", borderRadius:8,
      padding:"8px 11px", fontSize:14, background:"#fff", color:"#111",
      outline:"none", boxSizing:"border-box" }}>
    {options.map(o => <option key={typeof o==="string"?o:o.value} value={typeof o==="string"?o:o.value}>
      {typeof o==="string"?o:o.label}</option>)}
  </select>;
}
function Btn({ children, onClick, color="#0D1B3E", text="#fff", small=false, disabled=false, full=false }) {
  return <button onClick={onClick} disabled={disabled}
    style={{ background:disabled?"#E5E7EB":color, color:disabled?"#9CA3AF":text,
      border:"none", borderRadius:8, padding:small?"6px 14px":"10px 20px",
      cursor:disabled?"not-allowed":"pointer", fontWeight:700,
      fontSize:small?12:14, width:full?"100%":"auto",
      transition:"opacity 0.15s", opacity:disabled?0.7:1 }}>{children}</button>;
}

// ─── DISCOVERY TAB ───────────────────────────────────────────────────────────
function DiscoveryTab({ apiKey, onAddToRoster, roster }) {
  const [query, setQuery] = useState("gaming lifestyle finance tech beauty");
  const [minSubs, setMinSubs] = useState(25000);
  const [maxSubs, setMaxSubs] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [showEmail, setShowEmail] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [agencyName, setAgencyName] = useState("Your Agency Name");

  async function runDiscovery() {
    if (!apiKey) { setError("Please set your YouTube API key in Settings first."); return; }
    setLoading(true); setError(""); setResults([]);
    try {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=50&order=viewCount&key=${apiKey}`
      );
      const searchData = await searchRes.json();
      if (searchData.error) throw new Error(searchData.error.message);
      const channelIds = [...new Set((searchData.items||[]).map(i=>i.snippet.channelId))];
      if (!channelIds.length) { setError("No results found. Try different keywords."); setLoading(false); return; }
      const chunkSize = 10;
      let allChannels = [];
      for (let i = 0; i < channelIds.length; i += chunkSize) {
        const chunk = channelIds.slice(i, i+chunkSize).join(",");
        const chanRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${chunk}&key=${apiKey}`
        );
        const chanData = await chanRes.json();
        if (chanData.items) allChannels = [...allChannels, ...chanData.items];
      }
      const processed = allChannels.map(ch => {
        const subs = Number(ch.statistics?.subscriberCount)||0;
        const views = Number(ch.statistics?.viewCount)||0;
        const videos = Number(ch.statistics?.videoCount)||0;
        const avgViews = videos > 0 ? Math.round(views/videos) : 0;
        const score = calcScore(subs, views, videos);
        const niche = detectNiche(ch.snippet?.title, ch.snippet?.description);
        const estEarnings = Math.round(avgViews * 3.5 / 1000);
        return {
          id: ch.id,
          name: ch.snippet?.title,
          handle: ch.snippet?.customUrl || "@"+ch.id,
          description: ch.snippet?.description?.slice(0,200),
          thumbnail: ch.snippet?.thumbnails?.medium?.url,
          publishedAt: ch.snippet?.publishedAt,
          country: ch.snippet?.country||"",
          subscriberCount: subs,
          viewCount: views,
          videoCount: videos,
          avgViews,
          estMonthlyEarnings: estEarnings,
          score,
          niche,
          tier: getTier(subs),
          hiddenSubs: ch.statistics?.hiddenSubscriberCount,
        };
      }).filter(c => {
        if (c.hiddenSubs) return false;
        if (c.subscriberCount < minSubs) return false;
        if (maxSubs > 0 && c.subscriberCount > maxSubs) return false;
        return true;
      }).sort((a,b) => b.score - a.score);
      setResults(processed);
    } catch(e) {
      setError("Error: "+e.message+". Check your API key and try again.");
    }
    setLoading(false);
  }

  const inRoster = id => roster.some(r => r.id === id);
  const inWatchlist = id => watchlist.includes(id);
  const toggleWatch = id => setWatchlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w,id]);

  const matchedSponsors = (creator) => {
    if (!creator) return [];
    const ids = NICHE_SPONSOR_MAP[creator.niche] || [];
    return SPONSORS.filter(s => ids.includes(s.id) && s.tiers.includes(creator.tier.label));
  };

  function exportCSV() {
    const headers = ["Name","Handle","Subscribers","Avg Views","Est Monthly Earnings","Score","Niche","Tier","Country","Channel Since","YouTube URL"];
    const rows = results.map(c => [
      c.name, c.handle, c.subscriberCount, c.avgViews,
      c.estMonthlyEarnings, c.score, c.niche, c.tier.label,
      c.country, c.publishedAt?new Date(c.publishedAt).getFullYear():"",
      `https://youtube.com/${c.handle}`
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="creator_discovery.csv"; a.click();
  }

  return <div>
    {/* Search Controls */}
    <Card style={{ marginBottom:20 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
        <div style={{ flex:2, minWidth:200 }}>
          <Fld label="Search Keywords">
            <Inp value={query} onChange={setQuery} placeholder="gaming lifestyle finance tech beauty" />
          </Fld>
        </div>
        <div style={{ flex:1, minWidth:120 }}>
          <Fld label="Min Subscribers">
            <Sel value={minSubs} onChange={v=>setMinSubs(Number(v))} options={[
              {value:0,label:"Any"},{value:10000,label:"10K+"},{value:25000,label:"25K+"},
              {value:50000,label:"50K+"},{value:100000,label:"100K+"},{value:500000,label:"500K+"}
            ]} />
          </Fld>
        </div>
        <div style={{ flex:1, minWidth:120 }}>
          <Fld label="Max Subscribers">
            <Sel value={maxSubs} onChange={v=>setMaxSubs(Number(v))} options={[
              {value:0,label:"No limit"},{value:49999,label:"Under 50K"},
              {value:99999,label:"Under 100K"},{value:499999,label:"Under 500K"},
              {value:999999,label:"Under 1M"}
            ]} />
          </Fld>
        </div>
        <div>
          <Fld label=" ">
            <Btn onClick={runDiscovery} disabled={loading} color="#0D1B3E">
              {loading ? "🔍 Searching..." : "🔍 Run Discovery"}
            </Btn>
          </Fld>
        </div>
        {results.length > 0 && <div>
          <Fld label=" ">
            <Btn onClick={exportCSV} color="#059669" small>⬇ Export CSV</Btn>
          </Fld>
        </div>}
      </div>
      {error && <div style={{ color:"#EF4444", fontSize:13, marginTop:8 }}>{error}</div>}
    </Card>

    {loading && <div style={{ textAlign:"center", padding:60, color:"#6B7280" }}>
      <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
      <div style={{ fontWeight:600 }}>Searching YouTube and scoring creators...</div>
      <div style={{ fontSize:13, marginTop:8 }}>This takes about 15–20 seconds</div>
    </div>}

    {!loading && results.length === 0 && !error && <div style={{ textAlign:"center", padding:60, color:"#9CA3AF" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🎬</div>
      <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>Ready to discover creators</div>
      <div style={{ fontSize:14, marginTop:8 }}>Set your keywords and subscriber range above, then click Run Discovery</div>
    </div>}

    {results.length > 0 && <div style={{ marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:14, color:"#374151" }}>
        Found <strong>{results.length}</strong> creators · Sorted by discovery score
      </span>
      <span style={{ fontSize:12, color:"#9CA3AF" }}>
        {results.filter(r=>r.score>=70).length} high-priority (70+)
      </span>
    </div>}

    {results.map(c => {
      const sponsors = matchedSponsors(c);
      return <Card key={c.id} style={{ marginBottom:12, borderLeft:`4px solid ${scoreColor(c.score)}` }}>
        <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
          {c.thumbnail && <img src={c.thumbnail} alt={c.name}
            style={{ width:60, height:60, borderRadius:50, objectFit:"cover", flexShrink:0 }} />}
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontWeight:800, fontSize:16, color:"#0D1B3E" }}>{c.name}</span>
              <Badge label={c.tier.label} color={c.tier.color} bg={c.tier.bg} />
              <Badge label={c.niche} color="#6B7280" bg="#F3F4F6" />
              {c.country && <Badge label={c.country} color="#9CA3AF" bg="#F9FAFB" />}
              <span style={{ fontSize:11, color:"#9CA3AF" }}>{c.handle}</span>
            </div>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", fontSize:13, color:"#374151", marginBottom:8 }}>
              <span>👥 <strong>{fmt(c.subscriberCount)}</strong> subs</span>
              <span>👁️ <strong>{fmt(c.avgViews)}</strong> avg views</span>
              <span>🎬 <strong>{fmt(c.videoCount)}</strong> videos</span>
              <span>💰 Est. <strong>{fmtMoney(c.estMonthlyEarnings)}</strong>/mo earnings</span>
              {c.publishedAt && <span>📅 Since <strong>{new Date(c.publishedAt).getFullYear()}</strong></span>}
            </div>
            {c.description && <p style={{ fontSize:12, color:"#6B7280", margin:"0 0 8px", lineHeight:1.5 }}>
              {c.description}...</p>}
            {sponsors.length > 0 && <div style={{ fontSize:12, color:"#059669", marginBottom:8 }}>
              <strong>🎯 Matched sponsors:</strong> {sponsors.slice(0,4).map(s=>s.name).join(", ")}
              {sponsors.length > 4 && ` +${sponsors.length-4} more`}
            </div>}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end", flexShrink:0 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:28, fontWeight:900, color:scoreColor(c.score) }}>{c.score}</div>
              <div style={{ fontSize:10, color:"#9CA3AF", fontWeight:600 }}>SCORE</div>
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"flex-end" }}>
              {!inRoster(c.id)
                ? <Btn onClick={()=>onAddToRoster(c)} small color="#059669">+ Add to Roster</Btn>
                : <Badge label="✓ In Roster" color="#059669" bg="#ECFDF5" size="lg" />}
              <Btn onClick={()=>toggleWatch(c.id)} small
                color={inWatchlist(c.id)?"#F59E0B":"#F3F4F6"}
                text={inWatchlist(c.id)?"#fff":"#374151"}>
                {inWatchlist(c.id)?"★ Watching":"☆ Watch"}
              </Btn>
              <Btn onClick={()=>setSelected(c)} small color="#EFF6FF" text="#3B82F6">View</Btn>
              <a href={`https://youtube.com/${c.handle}`} target="_blank" rel="noopener noreferrer">
                <Btn small color="#F3F4F6" text="#374151">▶ YouTube</Btn>
              </a>
            </div>
          </div>
        </div>
      </Card>;
    })}

    {/* Creator Detail Modal */}
    {selected && <Modal title={selected.name} onClose={()=>setSelected(null)} wide>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        {[["Subscribers",fmt(selected.subscriberCount)],["Avg Views/Video",fmt(selected.avgViews)],
          ["Total Videos",fmt(selected.videoCount)],["Est Monthly Earnings",fmtMoney(selected.estMonthlyEarnings)],
          ["Score",`${selected.score}/100`],["Niche",selected.niche],
          ["Tier",selected.tier.label],["Channel Since",selected.publishedAt?new Date(selected.publishedAt).toLocaleDateString():"Unknown"]
        ].map(([k,v])=><div key={k} style={{ background:"#F9FAFB", borderRadius:8, padding:"10px 14px" }}>
          <div style={{ fontSize:11, color:"#9CA3AF", fontWeight:600 }}>{k}</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#0D1B3E" }}>{v}</div>
        </div>)}
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontWeight:700, color:"#0D1B3E", marginBottom:8 }}>🎯 Matched Sponsors ({matchedSponsors(selected).length})</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {matchedSponsors(selected).map(s => <div key={s.id} style={{ background:"#F0FDF4",
            border:"1px solid #BBF7D0", borderRadius:8, padding:"6px 12px" }}>
            <div style={{ fontWeight:700, fontSize:13, color:"#065F46" }}>{s.name}</div>
            <div style={{ fontSize:11, color:"#6B7280" }}>{fmtMoney(s.deal.min)}–{fmtMoney(s.deal.max)}</div>
          </div>)}
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <Fld label="Your Agency Name (for email)">
          <Inp value={agencyName} onChange={setAgencyName} placeholder="Your Agency Name" />
        </Fld>
        <div style={{ fontWeight:700, color:"#0D1B3E", marginBottom:8 }}>✉️ Personalized Outreach Email</div>
        <textarea readOnly value={generateEmail(selected, agencyName)}
          style={{ width:"100%", height:280, border:"1px solid #E5E7EB", borderRadius:8,
            padding:12, fontSize:12, fontFamily:"monospace", resize:"vertical", boxSizing:"border-box" }} />
        <Btn onClick={()=>navigator.clipboard.writeText(generateEmail(selected,agencyName))}
          small color="#EFF6FF" text="#3B82F6">Copy Email</Btn>
      </div>
      {!inRoster(selected.id) && <Btn onClick={()=>{onAddToRoster(selected);setSelected(null);}}
        full color="#059669">+ Add to Roster</Btn>}
    </Modal>}
  </div>;
}

// ─── ROSTER TAB ──────────────────────────────────────────────────────────────
function RosterTab({ roster, setRoster }) {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  function updateCreator(id, updates) {
    setRoster(r => r.map(c => c.id===id ? {...c,...updates} : c));
  }
  function removeCreator(id) {
    if (confirm("Remove this creator from roster?")) setRoster(r => r.filter(c=>c.id!==id));
  }

  const statuses = ["Prospect","Outreach Sent","In Talks","Signed","Active","Inactive"];

  const filtered = roster.filter(c => {
    const t = getTier(c.subscriberCount);
    const matchSearch = (c.name||"").toLowerCase().includes(search.toLowerCase()) ||
      (c.niche||"").toLowerCase().includes(search.toLowerCase());
    const matchTier = filterTier==="All" || t.label===filterTier;
    const matchStatus = filterStatus==="All" || c.status===filterStatus;
    return matchSearch && matchTier && matchStatus;
  });

  const statusColor = { "Prospect":"#9CA3AF","Outreach Sent":"#3B82F6","In Talks":"#F59E0B",
    "Signed":"#8B5CF6","Active":"#059669","Inactive":"#EF4444" };
  const statusBg = { "Prospect":"#F3F4F6","Outreach Sent":"#EFF6FF","In Talks":"#FFFBEB",
    "Signed":"#F5F3FF","Active":"#ECFDF5","Inactive":"#FEF2F2" };

  return <div>
    <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search roster..."
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 14px",
          fontSize:14, flex:1, minWidth:180, outline:"none" }} />
      <select value={filterTier} onChange={e=>setFilterTier(e.target.value)}
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 11px", fontSize:14, background:"#fff" }}>
        <option>All</option>
        {["Nano","Rising Star","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
      </select>
      <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 11px", fontSize:14, background:"#fff" }}>
        <option>All</option>
        {statuses.map(s=><option key={s}>{s}</option>)}
      </select>
      <span style={{ fontSize:13, color:"#9CA3AF" }}>{filtered.length} creators</span>
    </div>

    {roster.length === 0 && <div style={{ textAlign:"center", padding:60, color:"#9CA3AF" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🎬</div>
      <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>Your roster is empty</div>
      <div style={{ fontSize:14, marginTop:8 }}>Run Discovery and add creators to build your roster</div>
    </div>}

    {filtered.map(c => {
      const tier = getTier(c.subscriberCount);
      const commPct = c.commission || 15;
      return <Card key={c.id} style={{ marginBottom:10 }}>
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          {c.thumbnail && <img src={c.thumbnail} alt={c.name}
            style={{ width:48, height:48, borderRadius:50, objectFit:"cover", flexShrink:0 }} />}
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontWeight:800, fontSize:15, color:"#0D1B3E" }}>{c.name}</span>
              <Badge label={tier.label} color={tier.color} bg={tier.bg} />
              <Badge label={c.niche||"Unknown"} color="#6B7280" bg="#F3F4F6" />
            </div>
            <div style={{ fontSize:13, color:"#6B7280", marginBottom:6 }}>
              {fmt(c.subscriberCount)} subs · {fmt(c.avgViews)} avg views · Score: {c.score}
            </div>
            {c.notes && <div style={{ fontSize:12, color:"#374151", background:"#F9FAFB",
              borderRadius:6, padding:"6px 10px", marginBottom:6 }}>{c.notes}</div>}
            {c.followUpDate && <div style={{ fontSize:12, color:"#F59E0B", fontWeight:600 }}>
              📅 Follow up: {c.followUpDate}
            </div>}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
            <select value={c.status||"Prospect"}
              onChange={e=>updateCreator(c.id,{status:e.target.value})}
              style={{ border:`1px solid ${statusColor[c.status||"Prospect"]}`,
                background:statusBg[c.status||"Prospect"],
                color:statusColor[c.status||"Prospect"],
                borderRadius:8, padding:"4px 8px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              {statuses.map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{ fontSize:12, color:"#059669", fontWeight:600 }}>
              {commPct}% commission
            </span>
            <div style={{ display:"flex", gap:6 }}>
              <Btn small onClick={()=>setSelected(c)} color="#EFF6FF" text="#3B82F6">Details</Btn>
              <Btn small onClick={()=>removeCreator(c.id)} color="#FEF2F2" text="#EF4444">Remove</Btn>
            </div>
          </div>
        </div>
      </Card>;
    })}

    {selected && <Modal title={selected.name} onClose={()=>setSelected(null)}>
      <Fld label="Commission Rate (%)">
        <Inp type="number" value={selected.commission||15}
          onChange={v=>{updateCreator(selected.id,{commission:Number(v)});setSelected({...selected,commission:Number(v)});}} />
      </Fld>
      <Fld label="Agent / Manager (if any)">
        <Inp value={selected.agent||""} placeholder="Agent name"
          onChange={v=>{updateCreator(selected.id,{agent:v});setSelected({...selected,agent:v});}} />
      </Fld>
      <Fld label="Contact Email">
        <Inp value={selected.email||""} placeholder="creator@email.com"
          onChange={v=>{updateCreator(selected.id,{email:v});setSelected({...selected,email:v});}} />
      </Fld>
      <Fld label="Follow-Up Date">
        <Inp type="date" value={selected.followUpDate||""}
          onChange={v=>{updateCreator(selected.id,{followUpDate:v});setSelected({...selected,followUpDate:v});}} />
      </Fld>
      <Fld label="Notes">
        <textarea value={selected.notes||""} placeholder="Notes about this creator..."
          onChange={e=>{updateCreator(selected.id,{notes:e.target.value});setSelected({...selected,notes:e.target.value});}}
          style={{ width:"100%", border:"1px solid #D1D5DB", borderRadius:8,
            padding:"8px 11px", fontSize:14, resize:"vertical", height:80, boxSizing:"border-box" }} />
      </Fld>
      <Fld label="Contract Status">
        <Sel value={selected.contractStatus||"None"}
          onChange={v=>{updateCreator(selected.id,{contractStatus:v});setSelected({...selected,contractStatus:v});}}
          options={["None","Sent","Signed","Expired"]} />
      </Fld>
      <a href={`https://youtube.com/${selected.handle}`} target="_blank" rel="noopener noreferrer"
        style={{ display:"block", marginTop:12 }}>
        <Btn full color="#F3F4F6" text="#374151">▶ Open YouTube Channel</Btn>
      </a>
    </Modal>}
  </div>;
}

// ─── SPONSORS TAB ────────────────────────────────────────────────────────────
function SponsorsTab({ roster }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [matchNiche, setMatchNiche] = useState("");
  const [matchTier, setMatchTier] = useState("");
  const [matchResults, setMatchResults] = useState([]);

  function runMatch() {
    let matched = SPONSORS;
    if (matchNiche) {
      const ids = NICHE_SPONSOR_MAP[matchNiche] || [];
      matched = matched.filter(s => ids.includes(s.id));
    }
    if (matchTier) matched = matched.filter(s => s.tiers.includes(matchTier));
    setMatchResults(matched);
  }

  const filtered = SPONSORS.filter(s => {
    const matchS = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subcategory.toLowerCase().includes(search.toLowerCase());
    const matchC = catFilter==="All" || s.category===catFilter;
    const matchT = tierFilter==="All" || s.tiers.includes(tierFilter);
    return matchS && matchC && matchT;
  });

  const niches = [...new Set(roster.map(c=>c.niche).filter(Boolean))];

  return <div>
    {/* Match Engine */}
    <Card style={{ marginBottom:20, background:"#0D1B3E" }}>
      <div style={{ color:"#C9A84C", fontWeight:800, fontSize:16, marginBottom:12 }}>
        🎯 Sponsor Match Engine
      </div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"flex-end" }}>
        <div style={{ flex:1, minWidth:140 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#94A3B8",
            textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>Creator Niche</label>
          <select value={matchNiche} onChange={e=>setMatchNiche(e.target.value)}
            style={{ width:"100%", border:"1px solid #334155", borderRadius:8,
              padding:"8px 11px", fontSize:14, background:"#1E293B", color:"#fff" }}>
            <option value="">All Niches</option>
            {Object.keys(NICHE_SPONSOR_MAP).map(n=><option key={n}>{n}</option>)}
          </select>
        </div>
        <div style={{ flex:1, minWidth:140 }}>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#94A3B8",
            textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>Creator Tier</label>
          <select value={matchTier} onChange={e=>setMatchTier(e.target.value)}
            style={{ width:"100%", border:"1px solid #334155", borderRadius:8,
              padding:"8px 11px", fontSize:14, background:"#1E293B", color:"#fff" }}>
            <option value="">All Tiers</option>
            {["Nano","Micro","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <Btn onClick={runMatch} color="#C9A84C" text="#0D1B3E">Find Matches</Btn>
      </div>
      {matchResults.length > 0 && <div style={{ marginTop:14 }}>
        <div style={{ color:"#94A3B8", fontSize:12, marginBottom:8 }}>
          {matchResults.length} matched sponsors:
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {matchResults.map(s => <button key={s.id} onClick={()=>setSelected(s)}
            style={{ background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.3)",
              color:"#C9A84C", borderRadius:8, padding:"6px 12px", cursor:"pointer",
              fontSize:12, fontWeight:600 }}>
            {s.name} · {fmtMoney(s.deal.min)}–{fmtMoney(s.deal.max)}
          </button>)}
        </div>
      </div>}
    </Card>

    {/* Sponsor Directory */}
    <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sponsors..."
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 14px",
          fontSize:14, flex:1, minWidth:180, outline:"none" }} />
      <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 11px", fontSize:14, background:"#fff" }}>
        <option>All</option>
        {CATEGORIES.map(c=><option key={c}>{c}</option>)}
      </select>
      <select value={tierFilter} onChange={e=>setTierFilter(e.target.value)}
        style={{ border:"1px solid #D1D5DB", borderRadius:8, padding:"8px 11px", fontSize:14, background:"#fff" }}>
        <option>All</option>
        {["Nano","Micro","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
      </select>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
      {filtered.map(s => <Card key={s.id} style={{ cursor:"pointer" }} >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:15, color:"#0D1B3E" }}>{s.name}</div>
            <div style={{ fontSize:12, color:"#9CA3AF" }}>{s.category} · {s.subcategory}</div>
          </div>
          <Badge label={s.category} color="#6B7280" bg="#F3F4F6" />
        </div>
        <div style={{ fontSize:13, color:"#059669", fontWeight:600, marginBottom:6 }}>
          {fmtMoney(s.deal.min)} – {fmtMoney(s.deal.max)} per deal
        </div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:8 }}>
          {s.tiers.map(t => {
            const tier = getTier(t==="Micro"?15000:t==="Mid-Tier"?100000:t==="Macro"?600000:t==="Mega"?2000000:5000);
            return <Badge key={t} label={t} color={tier.color} bg={tier.bg} />;
          })}
        </div>
        <p style={{ fontSize:12, color:"#6B7280", margin:0, lineHeight:1.5 }}>{s.notes}</p>
        <div style={{ marginTop:10, display:"flex", gap:8 }}>
          <Btn small onClick={()=>setSelected(s)} color="#EFF6FF" text="#3B82F6">Details</Btn>
          <a href={`mailto:${s.email}`}>
            <Btn small color="#F0FDF4" text="#059669">✉ Contact</Btn>
          </a>
        </div>
      </Card>)}
    </div>

    {selected && <Modal title={selected.name} onClose={()=>setSelected(null)}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        {[["Category",selected.category],["Subcategory",selected.subcategory],
          ["Deal Min",fmtMoney(selected.deal.min)],["Deal Max",fmtMoney(selected.deal.max)]
        ].map(([k,v])=><div key={k} style={{ background:"#F9FAFB", borderRadius:8, padding:"10px 14px" }}>
          <div style={{ fontSize:11, color:"#9CA3AF", fontWeight:600 }}>{k}</div>
          <div style={{ fontSize:14, fontWeight:700, color:"#0D1B3E" }}>{v}</div>
        </div>)}
      </div>
      <Fld label="Works With">
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {selected.tiers.map(t=><Badge key={t} label={t} color="#8B5CF6" bg="#F5F3FF" size="lg" />)}
        </div>
      </Fld>
      <Fld label="Contact Email">
        <div style={{ background:"#F0FDF4", borderRadius:8, padding:"10px 14px",
          fontFamily:"monospace", fontSize:13, color:"#065F46" }}>{selected.email}</div>
      </Fld>
      <Fld label="Notes">{selected.notes}</Fld>
      {roster.length > 0 && <div>
        <div style={{ fontWeight:700, color:"#0D1B3E", marginBottom:8 }}>
          Your Matching Roster Creators
        </div>
        {roster.filter(c => selected.tiers.includes(getTier(c.subscriberCount).label) ||
          (NICHE_SPONSOR_MAP[c.niche]||[]).includes(selected.id))
          .slice(0,5).map(c => <div key={c.id} style={{ display:"flex", justifyContent:"space-between",
            padding:"8px 0", borderBottom:"1px solid #F3F4F6", fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#0D1B3E" }}>{c.name}</span>
            <span style={{ color:"#9CA3AF" }}>{fmt(c.subscriberCount)} subs</span>
          </div>)}
      </div>}
      <div style={{ marginTop:16, display:"flex", gap:10 }}>
        <a href={`mailto:${selected.email}?subject=Creator Partnership Opportunity`} style={{ flex:1 }}>
          <Btn full color="#059669">✉ Send Pitch Email</Btn>
        </a>
      </div>
    </Modal>}
  </div>;
}

// ─── DEALS TAB ───────────────────────────────────────────────────────────────
function DealsTab({ deals, setDeals, roster }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showInvoice, setShowInvoice] = useState(null);
  const [form, setForm] = useState({ creatorId:"", brand:"", value:"", commission:15, type:"Integration", status:"Prospect", date:"" });

  const pipeline = deals.filter(d=>!["Completed","Declined"].includes(d.status)).reduce((s,d)=>s+Number(d.value),0);
  const earned = deals.filter(d=>d.status==="Completed").reduce((s,d)=>s+Math.round(Number(d.value)*d.commission/100),0);
  const thisMonth = new Date().toISOString().slice(0,7);
  const monthEarned = deals.filter(d=>d.status==="Completed"&&d.date?.startsWith(thisMonth))
    .reduce((s,d)=>s+Math.round(Number(d.value)*d.commission/100),0);

  function addDeal() {
    const creator = roster.find(c=>c.id===form.creatorId);
    setDeals(d=>[...d,{...form,id:Date.now(),value:Number(form.value),
      commission:Number(form.commission||creator?.commission||15)}]);
    setShowAdd(false);
    setForm({ creatorId:"", brand:"", value:"", commission:15, type:"Integration", status:"Prospect", date:"" });
  }
  function updateStatus(id, status) { setDeals(d=>d.map(x=>x.id===id?{...x,status}:x)); }
  function removeDeal(id) { if(confirm("Remove deal?")) setDeals(d=>d.filter(x=>x.id!==id)); }

  const statusColor = { "Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6",
    "Signed":"#8B5CF6","Completed":"#059669","Declined":"#EF4444" };
  const statusBg = { "Prospect":"#F3F4F6","In Talks":"#FFFBEB","Proposed":"#EFF6FF",
    "Signed":"#F5F3FF","Completed":"#ECFDF5","Declined":"#FEF2F2" };
  const statuses = ["Prospect","In Talks","Proposed","Signed","Completed","Declined"];

  return <div>
    <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:20 }}>
      <StatBox label="Pipeline Value" value={fmtMoney(pipeline)} color="#C9A84C" sub="open deals" />
      <StatBox label="Total Earned" value={fmtMoney(earned)} color="#059669" sub="completed deals" />
      <StatBox label="This Month" value={fmtMoney(monthEarned)} color="#3B82F6" sub="commissions" />
      <StatBox label="Total Deals" value={deals.length} color="#0D1B3E" sub="all time" />
    </div>

    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
      <span style={{ fontSize:14, color:"#374151" }}>{deals.length} deals</span>
      <Btn onClick={()=>setShowAdd(true)} color="#C9A84C" text="#0D1B3E">+ Add Deal</Btn>
    </div>

    {deals.length === 0 && <div style={{ textAlign:"center", padding:60, color:"#9CA3AF" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🤝</div>
      <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>No deals yet</div>
      <div style={{ fontSize:14, marginTop:8 }}>Add your first brand deal to start tracking commissions</div>
    </div>}

    {[...deals].sort((a,b)=>b.value-a.value).map(d => {
      const creator = roster.find(c=>c.id===d.creatorId);
      const comm = Math.round(Number(d.value)*d.commission/100);
      return <Card key={d.id} style={{ marginBottom:10 }}>
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontWeight:800, fontSize:15, color:"#0D1B3E" }}>{d.brand}</span>
              <span style={{ fontSize:13, color:"#9CA3AF" }}>×</span>
              <span style={{ fontWeight:600, fontSize:14, color:"#374151" }}>{creator?.name||"Unknown Creator"}</span>
              <Badge label={d.type} color="#6B7280" bg="#F3F4F6" />
            </div>
            <div style={{ fontSize:13, color:"#6B7280" }}>
              Deal: <strong style={{ color:"#0D1B3E" }}>{fmtMoney(d.value)}</strong>
              &nbsp;·&nbsp;Your commission ({d.commission}%): <strong style={{ color:"#059669" }}>{fmtMoney(comm)}</strong>
              {d.date && <>&nbsp;·&nbsp;{d.date}</>}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            <select value={d.status} onChange={e=>updateStatus(d.id,e.target.value)}
              style={{ border:`1px solid ${statusColor[d.status]}`,
                background:statusBg[d.status], color:statusColor[d.status],
                borderRadius:8, padding:"4px 8px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              {statuses.map(s=><option key={s}>{s}</option>)}
            </select>
            {d.status==="Completed" && <Btn small onClick={()=>setShowInvoice(d)}
              color="#F0FDF4" text="#059669">Invoice</Btn>}
            <Btn small onClick={()=>removeDeal(d.id)} color="#FEF2F2" text="#EF4444">×</Btn>
          </div>
        </div>
      </Card>;
    })}

    {showAdd && <Modal title="Add Deal" onClose={()=>setShowAdd(false)}>
      <Fld label="Creator">
        <Sel value={form.creatorId} onChange={v=>setForm(f=>({...f,creatorId:v,commission:roster.find(c=>c.id===v)?.commission||15}))}
          options={[{value:"",label:"Select creator..."},...roster.map(c=>({value:c.id,label:`${c.name} (${fmt(c.subscriberCount)} subs)`}))]} />
      </Fld>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Fld label="Brand Name"><Inp value={form.brand} onChange={v=>setForm(f=>({...f,brand:v}))} placeholder="NordVPN" /></Fld>
        <Fld label="Deal Value ($)"><Inp type="number" value={form.value} onChange={v=>setForm(f=>({...f,value:v}))} placeholder="5000" /></Fld>
        <Fld label="Commission %"><Inp type="number" value={form.commission} onChange={v=>setForm(f=>({...f,commission:v}))} /></Fld>
        <Fld label="Type"><Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["Integration","Dedicated","Shorts","Bundle","Affiliate"]} /></Fld>
        <Fld label="Status"><Sel value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={statuses} /></Fld>
        <Fld label="Date (YYYY-MM)"><Inp value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} placeholder={new Date().toISOString().slice(0,7)} /></Fld>
      </div>
      {form.value && form.commission && <div style={{ background:"#ECFDF5", borderRadius:8,
        padding:"10px 14px", fontSize:13, color:"#059669", marginTop:8 }}>
        Your commission: <strong>{fmtMoney(Math.round(Number(form.value)*Number(form.commission)/100))}</strong>
      </div>}
      <div style={{ display:"flex", gap:10, marginTop:16, justifyContent:"flex-end" }}>
        <Btn onClick={()=>setShowAdd(false)} color="#F3F4F6" text="#374151">Cancel</Btn>
        <Btn onClick={addDeal} disabled={!form.brand||!form.value||!form.creatorId}>Add Deal</Btn>
      </div>
    </Modal>}

    {showInvoice && <Modal title="Commission Invoice" onClose={()=>setShowInvoice(null)}>
      <textarea readOnly value={generateInvoice(showInvoice, roster.find(c=>c.id===showInvoice.creatorId))}
        style={{ width:"100%", height:320, border:"1px solid #E5E7EB", borderRadius:8,
          padding:12, fontSize:12, fontFamily:"monospace", resize:"none", boxSizing:"border-box" }} />
      <div style={{ marginTop:12 }}>
        <Btn full onClick={()=>navigator.clipboard.writeText(generateInvoice(showInvoice,roster.find(c=>c.id===showInvoice.creatorId)))}
          color="#059669">Copy Invoice</Btn>
      </div>
    </Modal>}
  </div>;
}

// ─── DASHBOARD TAB ───────────────────────────────────────────────────────────
function DashboardTab({ roster, deals }) {
  const pipeline = deals.filter(d=>!["Completed","Declined"].includes(d.status)).reduce((s,d)=>s+Number(d.value),0);
  const earned = deals.filter(d=>d.status==="Completed").reduce((s,d)=>s+Math.round(Number(d.value)*d.commission/100),0);
  const activeDeals = deals.filter(d=>["Signed","Proposed","In Talks"].includes(d.status));
  const followUps = roster.filter(c=>c.followUpDate && new Date(c.followUpDate) <= new Date());

  const tierCounts = [
    {label:"Nano",color:"#6B7280"},{label:"Rising Star",color:"#3B82F6"},
    {label:"Mid-Tier",color:"#8B5CF6"},{label:"Macro",color:"#F59E0B"},{label:"Mega",color:"#EF4444"}
  ].map(t=>({...t,count:roster.filter(c=>getTier(c.subscriberCount).label===t.label).length}));

  const topDeals = [...deals].sort((a,b)=>b.value-a.value).slice(0,5);
  const statusCounts = ["Prospect","In Talks","Proposed","Signed","Completed"].map(s=>({
    status:s, count:deals.filter(d=>d.status===s).length,
    value:deals.filter(d=>d.status===s).reduce((a,d)=>a+Number(d.value),0)
  }));

  return <div>
    <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
      <StatBox label="Total Creators" value={roster.length} sub="on roster" />
      <StatBox label="Active Deals" value={activeDeals.length} color="#3B82F6" sub="in pipeline" />
      <StatBox label="Pipeline Value" value={fmtMoney(pipeline)} color="#C9A84C" sub="open deals" />
      <StatBox label="Commission Earned" value={fmtMoney(earned)} color="#059669" sub="completed" />
    </div>

    {followUps.length > 0 && <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A",
      borderRadius:12, padding:"14px 18px", marginBottom:20 }}>
      <div style={{ fontWeight:700, color:"#92400E", marginBottom:8 }}>
        ⏰ {followUps.length} Follow-up{followUps.length>1?"s":""} Due
      </div>
      {followUps.map(c=><div key={c.id} style={{ fontSize:13, color:"#374151" }}>
        • {c.name} — {c.followUpDate}
      </div>)}
    </div>}

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
      <Card>
        <h3 style={{ margin:"0 0 14px", color:"#0D1B3E", fontSize:15 }}>Roster by Tier</h3>
        {tierCounts.map(t=><div key={t.label} style={{ display:"flex", alignItems:"center",
          gap:10, marginBottom:10 }}>
          <span style={{ width:80, fontSize:12, fontWeight:700, color:t.color }}>{t.label}</span>
          <div style={{ flex:1, height:8, background:"#F3F4F6", borderRadius:999, overflow:"hidden" }}>
            <div style={{ height:"100%", width:roster.length>0?`${(t.count/roster.length)*100}%`:"0%",
              background:t.color, borderRadius:999, transition:"width 0.5s" }} />
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:"#374151", width:20, textAlign:"right" }}>{t.count}</span>
        </div>)}
      </Card>

      <Card>
        <h3 style={{ margin:"0 0 14px", color:"#0D1B3E", fontSize:15 }}>Deal Pipeline</h3>
        {statusCounts.map(({status,count,value})=>{
          const colors = { "Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6","Signed":"#8B5CF6","Completed":"#059669" };
          return <div key={status} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ width:80, fontSize:12, color:colors[status], fontWeight:600 }}>{status}</span>
            <span style={{ background:colors[status]+"22", color:colors[status],
              borderRadius:999, padding:"1px 8px", fontSize:12, fontWeight:700, minWidth:22, textAlign:"center" }}>{count}</span>
            {value>0 && <span style={{ fontSize:12, color:"#374151" }}>{fmtMoney(value)}</span>}
          </div>;
        })}
      </Card>
    </div>

    <Card>
      <h3 style={{ margin:"0 0 14px", color:"#0D1B3E", fontSize:15 }}>Top Deals</h3>
      {topDeals.length===0 && <p style={{ color:"#9CA3AF", fontSize:13 }}>No deals yet — add your first deal in the Deals tab.</p>}
      {topDeals.map((d,i)=>{
        const creator = roster.find(c=>c.id===d.creatorId);
        const statusColor = {"Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6","Signed":"#8B5CF6","Completed":"#059669","Declined":"#EF4444"};
        const comm = Math.round(Number(d.value)*d.commission/100);
        return <div key={d.id} style={{ display:"flex", alignItems:"center", gap:14,
          padding:"10px 0", borderBottom:i<topDeals.length-1?"1px solid #F3F4F6":"none" }}>
          <span style={{ fontSize:18, fontWeight:900, color:"#E5E7EB", width:22 }}>{i+1}</span>
          <div style={{ flex:1 }}>
            <span style={{ fontWeight:700, color:"#0D1B3E" }}>{d.brand}</span>
            <span style={{ color:"#9CA3AF", fontSize:12, marginLeft:8 }}>× {creator?.name||"Unknown"}</span>
          </div>
          <Badge label={d.status} color={statusColor[d.status]} bg={statusColor[d.status]+"18"} />
          <span style={{ fontWeight:800, color:"#0D1B3E" }}>{fmtMoney(d.value)}</span>
          <span style={{ fontSize:12, color:"#059669" }}>+{fmtMoney(comm)}</span>
        </div>;
      })}
    </Card>
  </div>;
}

// ─── SETTINGS TAB ────────────────────────────────────────────────────────────
function SettingsTab({ apiKey, setApiKey }) {
  const [key, setKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  function save() { setApiKey(key); setSaved(true); setTimeout(()=>setSaved(false),2000); }

  return <div style={{ maxWidth:600 }}>
    <Card style={{ marginBottom:20 }}>
      <h3 style={{ margin:"0 0 16px", color:"#0D1B3E" }}>YouTube API Key</h3>
      <Fld label="API Key">
        <Inp value={key} onChange={setKey} placeholder="AIza..." type="password" />
      </Fld>
      <p style={{ fontSize:13, color:"#6B7280", marginBottom:14 }}>
        Get your free YouTube Data API v3 key from{" "}
        <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer"
          style={{ color:"#3B82F6" }}>console.cloud.google.com</a>
        {" "}→ APIs & Services → Credentials
      </p>
      <Btn onClick={save} color={saved?"#059669":"#0D1B3E"}>
        {saved ? "✓ Saved!" : "Save API Key"}
      </Btn>
    </Card>

    <Card style={{ marginBottom:20 }}>
      <h3 style={{ margin:"0 0 16px", color:"#0D1B3E" }}>HubSpot Integration</h3>
      <p style={{ fontSize:13, color:"#6B7280", marginBottom:14 }}>
        Connect HubSpot to automatically sync creators and deals. You'll need a HubSpot Private App token.
      </p>
      <Fld label="HubSpot Access Token">
        <Inp value="" onChange={()=>{}} placeholder="pat-na1-..." type="password" />
      </Fld>
      <Btn color="#FF7A59" text="#fff">Connect HubSpot</Btn>
    </Card>

    <Card>
      <h3 style={{ margin:"0 0 16px", color:"#0D1B3E" }}>Deployment on Render.com</h3>
      <p style={{ fontSize:13, color:"#6B7280", marginBottom:10 }}>
        To run this app 24/7 with automatic overnight agent runs, deploy to Render.com for free:
      </p>
      <ol style={{ fontSize:13, color:"#374151", paddingLeft:20, lineHeight:2 }}>
        <li>Download this app's source code</li>
        <li>Push it to a GitHub repository</li>
        <li>Go to <strong>render.com</strong> → New → Web Service</li>
        <li>Connect your GitHub repo</li>
        <li>Add your YouTube API key as an environment variable: <code style={{ background:"#F3F4F6", padding:"1px 6px", borderRadius:4 }}>YOUTUBE_API_KEY</code></li>
        <li>Deploy — your agent runs automatically every night</li>
      </ol>
      <div style={{ marginTop:12 }}>
        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
          <Btn color="#46E3B7" text="#0D1B3E">Open Render.com</Btn>
        </a>
      </div>
    </Card>
  </div>;
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [apiKey, setApiKey] = useState("");
  const [roster, setRoster] = useState([]);
  const [deals, setDeals] = useState([]);

  function addToRoster(creator) {
    if (roster.some(c=>c.id===creator.id)) return;
    setRoster(r=>[...r,{ ...creator, status:"Prospect", commission:15, addedAt:new Date().toISOString() }]);
  }

  const tabs = [
    { key:"dashboard", label:"📊 Dashboard" },
    { key:"discovery", label:"🔍 Discovery" },
    { key:"roster",    label:"🎬 Roster" },
    { key:"sponsors",  label:"💼 Sponsors" },
    { key:"deals",     label:"🤝 Deals" },
    { key:"settings",  label:"⚙️ Settings" },
  ];

  const needsKey = tab==="discovery" && !apiKey;

  return <div style={{ minHeight:"100vh", background:"#F8FAFC",
    fontFamily:"'Inter','Segoe UI',system-ui,-apple-system,sans-serif" }}>
    {/* Header */}
    <div style={{ background:"#0D1B3E", padding:"0 20px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex",
        alignItems:"center", justifyContent:"space-between", height:58 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:"#C9A84C", fontSize:20, fontWeight:900 }}>⚡</span>
          <span style={{ color:"#fff", fontWeight:800, fontSize:17, letterSpacing:"-0.02em" }}>
            Creator Agency OS
          </span>
        </div>
        <div style={{ display:"flex", gap:16, fontSize:12, color:"#64748B" }}>
          <span>{roster.length} creators</span>
          <span>{deals.length} deals</span>
          {apiKey && <span style={{ color:"#059669" }}>✓ API Connected</span>}
        </div>
      </div>
    </div>

    {/* Nav */}
    <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px",
        display:"flex", gap:0, overflowX:"auto" }}>
        {tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)}
          style={{ padding:"13px 18px", border:"none", background:"none",
            cursor:"pointer", fontSize:13, fontWeight:tab===t.key?700:500,
            color:tab===t.key?"#0D1B3E":"#6B7280", whiteSpace:"nowrap",
            borderBottom:`2px solid ${tab===t.key?"#C9A84C":"transparent"}`,
            transition:"all 0.15s" }}>{t.label}</button>)}
      </div>
    </div>

    {/* API Key Banner */}
    {needsKey && <div style={{ background:"#FFFBEB", borderBottom:"1px solid #FDE68A",
      padding:"12px 20px", textAlign:"center", fontSize:13, color:"#92400E" }}>
      ⚠️ YouTube API key required for Discovery.{" "}
      <button onClick={()=>setTab("settings")}
        style={{ color:"#D97706", fontWeight:700, background:"none", border:"none",
          cursor:"pointer", textDecoration:"underline" }}>Add it in Settings →</button>
    </div>}

    {/* Content */}
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 20px" }}>
      {tab==="dashboard" && <DashboardTab roster={roster} deals={deals} />}
      {tab==="discovery" && <DiscoveryTab apiKey={apiKey} onAddToRoster={addToRoster} roster={roster} />}
      {tab==="roster"    && <RosterTab roster={roster} setRoster={setRoster} />}
      {tab==="sponsors"  && <SponsorsTab roster={roster} />}
      {tab==="deals"     && <DealsTab deals={deals} setDeals={setDeals} roster={roster} />}
      {tab==="settings"  && <SettingsTab apiKey={apiKey} setApiKey={setApiKey} />}
    </div>
  </div>;
}

