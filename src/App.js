import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dknqmrjktqwlrurylfll.supabase.co";
const SUPABASE_KEY = "sb_publishable_mFJ5xY6pJB-u8PQG4wJBKQ_iCXRXHnN";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── SPONSOR DATABASE ────────────────────────────────────────────────────────
const SPONSORS = [
  { id:1, name:"NordVPN", category:"Tech", subcategory:"VPN/Security", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:50000}, email:"partnerships@nordvpn.com", notes:"Very active on YouTube. Loves gaming, tech, finance creators." },
  { id:2, name:"ExpressVPN", category:"Tech", subcategory:"VPN/Security", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:75000}, email:"influencer@expressvpn.com", notes:"Top spender on YouTube. High CPM." },
  { id:3, name:"Surfshark", category:"Tech", subcategory:"VPN/Security", tiers:["Nano","Micro","Mid-Tier"], deal:{min:200,max:15000}, email:"partnerships@surfshark.com", notes:"Good for smaller creators." },
  { id:4, name:"Skillshare", category:"Education", subcategory:"Learning", tiers:["Micro","Mid-Tier","Macro"], deal:{min:1000,max:30000}, email:"creators@skillshare.com", notes:"Education, productivity, creative niches." },
  { id:5, name:"Squarespace", category:"Tech", subcategory:"Website Builder", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1500,max:40000}, email:"sponsorships@squarespace.com", notes:"One of YouTube's biggest spenders." },
  { id:6, name:"Grammarly", category:"Tech", subcategory:"Productivity", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"partnerships@grammarly.com", notes:"One of the biggest YouTube sponsors ever." },
  { id:7, name:"Audible", category:"Education", subcategory:"Audio/Books", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:60000}, email:"influencer@audible.com", notes:"Amazon property. Large budget." },
  { id:8, name:"Brilliant", category:"Education", subcategory:"STEM Learning", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"partnerships@brilliant.org", notes:"Science, math, tech niches." },
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
  { id:21, name:"HelloFresh", category:"Lifestyle", subcategory:"Meal Kits", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"influencer@hellofresh.com", notes:"One of the biggest YouTube sponsors." },
  { id:22, name:"Manscaped", category:"Lifestyle", subcategory:"Grooming", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@manscaped.com", notes:"Male lifestyle, comedy, gaming creators." },
  { id:23, name:"BetterHelp", category:"Lifestyle", subcategory:"Mental Health", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:1000,max:50000}, email:"partnerships@betterhelp.com", notes:"Very active YouTube sponsor." },
  { id:24, name:"Calm", category:"Lifestyle", subcategory:"Wellness", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"influencer@calm.com", notes:"Wellness and lifestyle creators." },
  { id:25, name:"MyProtein", category:"Fitness", subcategory:"Supplements", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"influencer@myprotein.com", notes:"Fitness and health creators." },
  { id:26, name:"Gymshark", category:"Fitness", subcategory:"Apparel", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:50000}, email:"partnerships@gymshark.com", notes:"Fitness creators. Top brand." },
  { id:27, name:"Athletic Greens (AG1)", category:"Fitness", subcategory:"Supplements", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"partnerships@athleticgreens.com", notes:"Health and wellness. Very popular." },
  { id:28, name:"Whoop", category:"Fitness", subcategory:"Wearables", tiers:["Mid-Tier","Macro","Mega"], deal:{min:2000,max:40000}, email:"influencer@whoop.com", notes:"Fitness and sports creators." },
  { id:29, name:"Liquid IV", category:"Fitness", subcategory:"Hydration", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"influencer@liquid-iv.com", notes:"Health, fitness, lifestyle." },
  { id:30, name:"IPSY", category:"Beauty", subcategory:"Beauty Box", tiers:["Nano","Micro","Mid-Tier","Macro"], deal:{min:200,max:20000}, email:"influencer@ipsy.com", notes:"Beauty creators. Very active sponsor." },
  { id:31, name:"Morphe", category:"Beauty", subcategory:"Makeup", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@morphe.com", notes:"Beauty creators." },
  { id:32, name:"Glossier", category:"Beauty", subcategory:"Skincare", tiers:["Micro","Mid-Tier","Macro"], deal:{min:500,max:25000}, email:"partnerships@glossier.com", notes:"Lifestyle and beauty creators." },
  { id:33, name:"Fashion Nova", category:"Fashion", subcategory:"Apparel", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:40000}, email:"partnerships@fashionnova.com", notes:"Fashion and lifestyle creators." },
  { id:34, name:"Booking.com", category:"Travel", subcategory:"Hotels", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"influencer@booking.com", notes:"Travel creators. Large budget." },
  { id:35, name:"Airbnb", category:"Travel", subcategory:"Accommodation", tiers:["Mid-Tier","Macro","Mega"], deal:{min:5000,max:100000}, email:"partnerships@airbnb.com", notes:"Travel and lifestyle creators." },
  { id:36, name:"MasterClass", category:"Education", subcategory:"Learning", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:60000}, email:"influencer@masterclass.com", notes:"Business, creative, lifestyle creators." },
  { id:37, name:"Shopify", category:"Business", subcategory:"E-commerce", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:75000}, email:"influencer@shopify.com", notes:"Business and entrepreneurship niches." },
  { id:38, name:"Honey (PayPal)", category:"Lifestyle", subcategory:"Shopping", tiers:["Mid-Tier","Macro","Mega"], deal:{min:3000,max:75000}, email:"influencer@joinhoney.com", notes:"One of YouTube's biggest sponsors." },
  { id:39, name:"Simplisafe", category:"Home", subcategory:"Security", tiers:["Micro","Mid-Tier","Macro","Mega"], deal:{min:500,max:30000}, email:"partnerships@simplisafe.com", notes:"Home and lifestyle creators." },
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
  "Gaming":[16,17,18,19,20,1,2,41],
  "Finance":[11,12,13,14,15,44,48,7,36],
  "Tech":[1,2,3,5,6,9,10,41,47,50],
  "Lifestyle":[21,22,23,24,38,39,43],
  "Beauty":[30,31,32],
  "Fitness":[25,26,27,28,29],
  "Food":[21,49,29],
  "Education":[4,7,8,36,46],
  "Business":[37,42,5,10,50],
  "Travel":[34,35],
  "Entertainment":[40],
  "Pets":[45],
  "Fashion":[30,31,33],
  "Health":[23,24,27,29,48],
};

const CATEGORIES = [...new Set(SPONSORS.map(s=>s.category))].sort();

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmt(n){n=Number(n);if(n>=1000000)return(n/1000000).toFixed(1)+"M";if(n>=1000)return(n/1000).toFixed(0)+"K";return n.toLocaleString();}
function fmtMoney(n){return "$"+Number(n).toLocaleString();}
function calcScore(subs,views,videos){subs=Number(subs)||0;views=Number(views)||0;videos=Number(videos)||0;let score=0;if(subs>=500000)score+=20;else if(subs>=100000)score+=25;else if(subs>=50000)score+=15;else if(subs>=25000)score+=10;const ratio=videos>0?views/Math.max(subs,1):0;if(ratio>=0.2)score+=30;else if(ratio>=0.1)score+=20;else if(ratio>=0.05)score+=10;if(videos>=200)score+=20;else if(videos>=50)score+=15;else if(videos>=20)score+=8;return Math.min(score,100);}
function getTier(subs){subs=Number(subs)||0;if(subs>=1000000)return{label:"Mega",color:"#EF4444",bg:"#FEF2F2"};if(subs>=500000)return{label:"Macro",color:"#F59E0B",bg:"#FFFBEB"};if(subs>=50000)return{label:"Mid-Tier",color:"#8B5CF6",bg:"#F5F3FF"};if(subs>=25000)return{label:"Rising Star",color:"#3B82F6",bg:"#EFF6FF"};return{label:"Nano",color:"#6B7280",bg:"#F3F4F6"};}
function scoreColor(s){if(s>=80)return"#059669";if(s>=70)return"#3B82F6";if(s>=60)return"#F59E0B";return"#9CA3AF";}
function detectNiche(title="",desc=""){const text=(title+" "+desc).toLowerCase();if(/gaming|game|gamer|minecraft|fortnite|playstation|xbox|nintendo|streamer/.test(text))return"Gaming";if(/finance|invest|money|stock|crypto|bitcoin|wealth|trading|financial/.test(text))return"Finance";if(/tech|technology|software|coding|programming|ai|gadget|review/.test(text))return"Tech";if(/fitness|workout|gym|exercise|nutrition|health|weight/.test(text))return"Fitness";if(/beauty|makeup|skincare|cosmetic|fashion|style|outfit/.test(text))return"Beauty";if(/food|recipe|cooking|chef|baking|restaurant|eat/.test(text))return"Food";if(/travel|vlog|adventure|explore|trip|destination/.test(text))return"Travel";if(/education|learn|teach|school|study|science|math/.test(text))return"Education";if(/business|entrepreneur|startup|marketing|career|productivity/.test(text))return"Business";if(/lifestyle|life|daily|routine|personal|family|home/.test(text))return"Lifestyle";return"General";}
function generateEmail(creator,agencyName="Your Agency"){const niche=creator.niche||"content";return`Subject: Partnership opportunity — ${creator.name} x [Brand Name]\n\nHi [Brand Contact Name],\n\nI'm [Your Name] from ${agencyName}, a creator talent agency. I'm reaching out on behalf of ${creator.name}, a ${niche} creator with ${fmt(creator.subscriber_count)} subscribers.\n\nWhy I thought of [Brand]:\n• ${creator.name}'s audience is highly engaged with ${niche.toLowerCase()} content\n• Average of ${fmt(creator.avg_views)} views per video\n• Established channel with ${fmt(creator.video_count)}+ videos\n\nWould you have 15 minutes this week to explore a fit?\n\nBest,\n[Your Name]\n${agencyName} | [Phone] | [Email]`;}
function generateInvoice(deal,creator){return`COMMISSION INVOICE\n\nFrom: [Your Agency Name]\nTo: ${creator?.name||"Creator"}\nDate: ${new Date().toLocaleDateString()}\nInvoice #: INV-${Date.now().toString().slice(-6)}\n\nDEAL DETAILS\nBrand: ${deal.brand}\nDeal Value: ${fmtMoney(deal.value)}\nCommission Rate: ${deal.commission}%\nType: ${deal.type}\nDate: ${deal.date}\n\nAMOUNT DUE\nCommission: ${fmtMoney(Math.round(deal.value*deal.commission/100))}\nDue Date: ${new Date(Date.now()+15*24*60*60*1000).toLocaleDateString()}\n\nThank you!`;}

function generateContractPDF(contractText, fileName, signedInfo){
  import("jspdf").then(({default:jsPDF})=>{
    const doc=new jsPDF({unit:"pt",format:"letter"});
    const pageWidth=doc.internal.pageSize.getWidth();
    const margin=56;
    const maxWidth=pageWidth-margin*2;
    let y=64;

    doc.setFont("times","bold");
    doc.setFontSize(16);
    doc.text("MOTH MEDIA EXCLUSIVE AGREEMENT",pageWidth/2,y,{align:"center"});
    y+=30;

    doc.setFont("times","normal");
    doc.setFontSize(10.5);
    const bodyText=contractText.replace("MOTH MEDIA EXCLUSIVE AGREEMENT\n\n","");
    const lines=doc.splitTextToSize(bodyText,maxWidth);
    const lineHeight=14;
    const pageHeight=doc.internal.pageSize.getHeight();

    lines.forEach(line=>{
      if(y>pageHeight-70){doc.addPage();y=56;}
      doc.text(line,margin,y);
      y+=lineHeight;
    });

    if(signedInfo){
      if(y>pageHeight-140){doc.addPage();y=56;}
      y+=20;
      doc.setDrawColor(180,180,180);
      doc.line(margin,y,pageWidth-margin,y);
      y+=24;
      doc.setFont("times","bold");
      doc.setFontSize(11);
      doc.text("ELECTRONIC SIGNATURE RECORD",margin,y);
      y+=18;
      doc.setFont("times","normal");
      doc.setFontSize(10);
      doc.text(`Signed by: ${signedInfo.name}`,margin,y); y+=15;
      doc.text(`Address: ${signedInfo.address||"N/A"}`,margin,y); y+=15;
      doc.text(`Date & Time: ${signedInfo.date}`,margin,y); y+=15;
      doc.text(`IP Address: ${signedInfo.ip||"N/A"}`,margin,y); y+=15;
      doc.setFont("times","italic");
      doc.setFontSize(8.5);
      doc.text("This electronic signature is legally binding under the U.S. ESIGN Act and UETA.",margin,y);
    }

    doc.save(fileName);
  }).catch(()=>{
    alert("PDF library failed to load. Please check your internet connection and try again.");
  });
}


function Badge({label,color,bg,size="sm"}){return<span style={{background:bg||"#F3F4F6",color:color||"#374151",padding:size==="lg"?"4px 12px":"2px 8px",borderRadius:999,fontSize:size==="lg"?13:11,fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>;}
function Card({children,style={}}){return<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:"20px 22px",...style}}>{children}</div>;}
function StatBox({label,value,color,sub}){return<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"18px 20px",flex:1,minWidth:120}}><div style={{fontSize:26,fontWeight:900,color:color||"#0D1B3E"}}>{value}</div><div style={{fontSize:12,fontWeight:600,color:"#374151",marginTop:2}}>{label}</div>{sub&&<div style={{fontSize:11,color:"#9CA3AF",marginTop:3}}>{sub}</div>}</div>;}
function Modal({title,onClose,children,wide=false}){return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:wide?800:560,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 22px",borderBottom:"1px solid #E5E7EB",position:"sticky",top:0,background:"#fff",zIndex:1}}><h3 style={{margin:0,color:"#0D1B3E",fontSize:17}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#9CA3AF"}}>×</button></div><div style={{padding:"20px 22px"}}>{children}</div></div></div>;}
function Fld({label,children}){return<div style={{marginBottom:14}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{label}</label>{children}</div>;}
function Inp({value,onChange,placeholder,type="text",disabled=false}){return<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled} style={{width:"100%",border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,outline:"none",background:disabled?"#F9FAFB":"#fff",boxSizing:"border-box",color:"#111"}}/>;}
function Sel({value,onChange,options}){return<select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#fff",color:"#111",outline:"none",boxSizing:"border-box"}}>{options.map(o=><option key={typeof o==="string"?o:o.value} value={typeof o==="string"?o:o.value}>{typeof o==="string"?o:o.label}</option>)}</select>;}
function Btn({children,onClick,color="#0D1B3E",text="#fff",small=false,disabled=false,full=false}){return<button onClick={onClick} disabled={disabled} style={{background:disabled?"#E5E7EB":color,color:disabled?"#9CA3AF":text,border:"none",borderRadius:8,padding:small?"6px 14px":"10px 20px",cursor:disabled?"not-allowed":"pointer",fontWeight:700,fontSize:small?12:14,width:full?"100%":"auto",transition:"opacity 0.15s",opacity:disabled?0.7:1}}>{children}</button>;}

// ─── DISCOVERY TAB ────────────────────────────────────────────────────────────
function DiscoveryTab({apiKey,onAddToRoster,roster}){
  const[query,setQuery]=useState("gaming lifestyle finance tech beauty");
  const[minSubs,setMinSubs]=useState(25000);
  const[maxSubs,setMaxSubs]=useState(0);
  const[results,setResults]=useState([]);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[selected,setSelected]=useState(null);
  const[watchlist,setWatchlist]=useState([]);
  const[agencyName,setAgencyName]=useState("Your Agency Name");

  async function runDiscovery(){
    if(!apiKey){setError("Please set your YouTube API key in Settings first.");return;}
    setLoading(true);setError("");setResults([]);
    try{
      const searchRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=50&order=viewCount&key=${apiKey}`);
      const searchData=await searchRes.json();
      if(searchData.error)throw new Error(searchData.error.message);
      const channelIds=[...new Set((searchData.items||[]).map(i=>i.snippet.channelId))];
      if(!channelIds.length){setError("No results found. Try different keywords.");setLoading(false);return;}
      let allChannels=[];
      for(let i=0;i<channelIds.length;i+=10){
        const chunk=channelIds.slice(i,i+10).join(",");
        const chanRes=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${chunk}&key=${apiKey}`);
        const chanData=await chanRes.json();
        if(chanData.items)allChannels=[...allChannels,...chanData.items];
      }
      const processed=allChannels.map(ch=>{
        const subs=Number(ch.statistics?.subscriberCount)||0;
        const views=Number(ch.statistics?.viewCount)||0;
        const videos=Number(ch.statistics?.videoCount)||0;
        const avg_views=videos>0?Math.round(views/videos):0;
        const score=calcScore(subs,views,videos);
        const niche=detectNiche(ch.snippet?.title,ch.snippet?.description);
        return{id:ch.id,name:ch.snippet?.title,handle:ch.snippet?.customUrl||"@"+ch.id,description:ch.snippet?.description?.slice(0,200),thumbnail:ch.snippet?.thumbnails?.medium?.url,published_at:ch.snippet?.publishedAt,country:ch.snippet?.country||"",subscriber_count:subs,view_count:views,video_count:videos,avg_views,est_monthly_earnings:Math.round(avg_views*3.5/1000),score,niche,tier:getTier(subs),hidden:ch.statistics?.hiddenSubscriberCount};
      }).filter(c=>{if(c.hidden)return false;if(c.subscriber_count<minSubs)return false;if(maxSubs>0&&c.subscriber_count>maxSubs)return false;return true;}).sort((a,b)=>b.score-a.score);
      setResults(processed);
    }catch(e){setError("Error: "+e.message);}
    setLoading(false);
  }

  const inRoster=id=>roster.some(r=>r.id===id);
  const inWatchlist=id=>watchlist.includes(id);
  const toggleWatch=id=>setWatchlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const matchedSponsors=c=>{if(!c)return[];const ids=NICHE_SPONSOR_MAP[c.niche]||[];return SPONSORS.filter(s=>ids.includes(s.id)&&s.tiers.includes(c.tier.label));};

  function exportCSV(){
    const headers=["Name","Handle","Subscribers","Avg Views","Score","Niche","Tier","Country","YouTube URL"];
    const rows=results.map(c=>[c.name,c.handle,c.subscriber_count,c.avg_views,c.score,c.niche,c.tier.label,c.country,`https://youtube.com/${c.handle}`]);
    const csv=[headers,...rows].map(r=>r.join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="creator_discovery.csv";a.click();
  }

  return<div>
    <Card style={{marginBottom:20}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div style={{flex:2,minWidth:200}}>
          <Fld label="Search Keywords"><Inp value={query} onChange={setQuery} placeholder="gaming lifestyle finance tech beauty"/></Fld>
        </div>
        <div style={{flex:1,minWidth:120}}>
          <Fld label="Min Subscribers">
            <Sel value={minSubs} onChange={v=>setMinSubs(Number(v))} options={[{value:0,label:"Any"},{value:10000,label:"10K+"},{value:25000,label:"25K+"},{value:50000,label:"50K+"},{value:100000,label:"100K+"},{value:500000,label:"500K+"}]}/>
          </Fld>
        </div>
        <div style={{flex:1,minWidth:120}}>
          <Fld label="Max Subscribers">
            <Sel value={maxSubs} onChange={v=>setMaxSubs(Number(v))} options={[{value:0,label:"No limit"},{value:49999,label:"Under 50K"},{value:99999,label:"Under 100K"},{value:499999,label:"Under 500K"},{value:999999,label:"Under 1M"}]}/>
          </Fld>
        </div>
        <div><Fld label=" "><Btn onClick={runDiscovery} disabled={loading}>{loading?"🔍 Searching...":"🔍 Run Discovery"}</Btn></Fld></div>
        {results.length>0&&<div><Fld label=" "><Btn onClick={exportCSV} color="#059669" small>⬇ Export CSV</Btn></Fld></div>}
      </div>
      {error&&<div style={{color:"#EF4444",fontSize:13,marginTop:8}}>{error}</div>}
    </Card>

    {loading&&<div style={{textAlign:"center",padding:60,color:"#6B7280"}}><div style={{fontSize:36,marginBottom:12}}>🔍</div><div style={{fontWeight:600}}>Searching YouTube and scoring creators...</div><div style={{fontSize:13,marginTop:8}}>This takes about 15–20 seconds</div></div>}
    {!loading&&results.length===0&&!error&&<div style={{textAlign:"center",padding:60,color:"#9CA3AF"}}><div style={{fontSize:48,marginBottom:12}}>🎬</div><div style={{fontSize:16,fontWeight:600,color:"#374151"}}>Ready to discover creators</div><div style={{fontSize:14,marginTop:8}}>Set your keywords and subscriber range above, then click Run Discovery</div></div>}

    {results.length>0&&<div style={{marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,color:"#374151"}}>Found <strong>{results.length}</strong> creators</span><span style={{fontSize:12,color:"#9CA3AF"}}>{results.filter(r=>r.score>=70).length} high-priority (70+)</span></div>}

    {results.map(c=>{
      const sponsors=matchedSponsors(c);
      return<Card key={c.id} style={{marginBottom:12,borderLeft:`4px solid ${scoreColor(c.score)}`}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          {c.thumbnail&&<img src={c.thumbnail} alt={c.name} style={{width:60,height:60,borderRadius:50,objectFit:"cover",flexShrink:0}}/>}
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:6}}>
              <span style={{fontWeight:800,fontSize:16,color:"#0D1B3E"}}>{c.name}</span>
              <Badge label={c.tier.label} color={c.tier.color} bg={c.tier.bg}/>
              <Badge label={c.niche} color="#6B7280" bg="#F3F4F6"/>
              {c.country&&<Badge label={c.country} color="#9CA3AF" bg="#F9FAFB"/>}
            </div>
            <div style={{display:"flex",gap:20,flexWrap:"wrap",fontSize:13,color:"#374151",marginBottom:8}}>
              <span>👥 <strong>{fmt(c.subscriber_count)}</strong> subs</span>
              <span>👁️ <strong>{fmt(c.avg_views)}</strong> avg views</span>
              <span>🎬 <strong>{fmt(c.video_count)}</strong> videos</span>
              <span>💰 Est. <strong>{fmtMoney(c.est_monthly_earnings)}</strong>/mo</span>
            </div>
            {c.description&&<p style={{fontSize:12,color:"#6B7280",margin:"0 0 8px",lineHeight:1.5}}>{c.description}...</p>}
            {sponsors.length>0&&<div style={{fontSize:12,color:"#059669",marginBottom:8}}><strong>🎯 Matched sponsors:</strong> {sponsors.slice(0,4).map(s=>s.name).join(", ")}{sponsors.length>4&&` +${sponsors.length-4} more`}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",flexShrink:0}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:900,color:scoreColor(c.score)}}>{c.score}</div><div style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>SCORE</div></div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
              {!inRoster(c.id)?<Btn onClick={()=>onAddToRoster(c)} small color="#059669">+ Add to Roster</Btn>:<Badge label="✓ In Roster" color="#059669" bg="#ECFDF5" size="lg"/>}
              <Btn onClick={()=>toggleWatch(c.id)} small color={inWatchlist(c.id)?"#F59E0B":"#F3F4F6"} text={inWatchlist(c.id)?"#fff":"#374151"}>{inWatchlist(c.id)?"★":"☆"} Watch</Btn>
              <Btn onClick={()=>setSelected(c)} small color="#EFF6FF" text="#3B82F6">View</Btn>
              <a href={`https://youtube.com/${c.handle}`} target="_blank" rel="noopener noreferrer"><Btn small color="#F3F4F6" text="#374151">▶ YouTube</Btn></a>
            </div>
          </div>
        </div>
      </Card>;
    })}

    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {[["Subscribers",fmt(selected.subscriber_count)],["Avg Views",fmt(selected.avg_views)],["Total Videos",fmt(selected.video_count)],["Est Monthly Earnings",fmtMoney(selected.est_monthly_earnings)],["Score",`${selected.score}/100`],["Niche",selected.niche],["Tier",selected.tier.label],["Country",selected.country||"Unknown"]].map(([k,v])=><div key={k} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><div style={{fontSize:11,color:"#9CA3AF",fontWeight:600}}>{k}</div><div style={{fontSize:15,fontWeight:700,color:"#0D1B3E"}}>{v}</div></div>)}
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontWeight:700,color:"#0D1B3E",marginBottom:8}}>🎯 Matched Sponsors ({matchedSponsors(selected).length})</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {matchedSponsors(selected).map(s=><div key={s.id} style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:8,padding:"6px 12px"}}><div style={{fontWeight:700,fontSize:13,color:"#065F46"}}>{s.name}</div><div style={{fontSize:11,color:"#6B7280"}}>{fmtMoney(s.deal.min)}–{fmtMoney(s.deal.max)}</div></div>)}
        </div>
      </div>
      <Fld label="Your Agency Name"><Inp value={agencyName} onChange={setAgencyName}/></Fld>
      <Fld label="✉️ Personalized Outreach Email">
        <textarea readOnly value={generateEmail(selected,agencyName)} style={{width:"100%",height:220,border:"1px solid #E5E7EB",borderRadius:8,padding:12,fontSize:12,fontFamily:"monospace",resize:"vertical",boxSizing:"border-box"}}/>
      </Fld>
      <div style={{display:"flex",gap:10}}>
        <Btn onClick={()=>navigator.clipboard.writeText(generateEmail(selected,agencyName))} small color="#EFF6FF" text="#3B82F6">Copy Email</Btn>
        {!inRoster(selected.id)&&<Btn onClick={()=>{onAddToRoster(selected);setSelected(null);}} color="#059669">+ Add to Roster</Btn>}
      </div>
    </Modal>}
  </div>;
}

// ─── ROSTER TAB ───────────────────────────────────────────────────────────────
function RosterTab({roster,setRoster}){
  const[search,setSearch]=useState("");
  const[filterTier,setFilterTier]=useState("All");
  const[filterStatus,setFilterStatus]=useState("All");
  const[selected,setSelected]=useState(null);
  const statuses=["Prospect","Outreach Sent","In Talks","Signed","Active","Inactive"];
  const statusColor={"Prospect":"#9CA3AF","Outreach Sent":"#3B82F6","In Talks":"#F59E0B","Signed":"#8B5CF6","Active":"#059669","Inactive":"#EF4444"};
  const statusBg={"Prospect":"#F3F4F6","Outreach Sent":"#EFF6FF","In Talks":"#FFFBEB","Signed":"#F5F3FF","Active":"#ECFDF5","Inactive":"#FEF2F2"};

  async function updateCreator(id,updates){
    setRoster(r=>r.map(c=>c.id===id?{...c,...updates}:c));
    await supabase.from("creators").update(updates).eq("id",id);
  }
  async function removeCreator(id){
    if(confirm("Remove this creator?")){
      setRoster(r=>r.filter(c=>c.id!==id));
      await supabase.from("creators").delete().eq("id",id);
    }
  }

  const filtered=roster.filter(c=>{
    const t=getTier(c.subscriber_count);
    return(c.name||"").toLowerCase().includes(search.toLowerCase())&&(filterTier==="All"||t.label===filterTier)&&(filterStatus==="All"||c.status===filterStatus);
  });

  return<div>
    <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search roster..." style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 14px",fontSize:14,flex:1,minWidth:180,outline:"none"}}/>
      <select value={filterTier} onChange={e=>setFilterTier(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#fff"}}>
        <option>All</option>{["Nano","Rising Star","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
      </select>
      <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#fff"}}>
        <option>All</option>{statuses.map(s=><option key={s}>{s}</option>)}
      </select>
      <span style={{fontSize:13,color:"#9CA3AF"}}>{filtered.length} creators</span>
    </div>

    {roster.length===0&&<div style={{textAlign:"center",padding:60,color:"#9CA3AF"}}><div style={{fontSize:48,marginBottom:12}}>🎬</div><div style={{fontSize:16,fontWeight:600,color:"#374151"}}>Your roster is empty</div><div style={{fontSize:14,marginTop:8}}>Run Discovery and add creators to build your roster</div></div>}

    {filtered.map(c=>{
      const tier=getTier(c.subscriber_count);
      return<Card key={c.id} style={{marginBottom:10}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          {c.thumbnail&&<img src={c.thumbnail} alt={c.name} style={{width:48,height:48,borderRadius:50,objectFit:"cover",flexShrink:0}}/>}
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
              <span style={{fontWeight:800,fontSize:15,color:"#0D1B3E"}}>{c.name}</span>
              <Badge label={tier.label} color={tier.color} bg={tier.bg}/>
              <Badge label={c.niche||"Unknown"} color="#6B7280" bg="#F3F4F6"/>
            </div>
            <div style={{fontSize:13,color:"#6B7280",marginBottom:6}}>{fmt(c.subscriber_count)} subs · {fmt(c.avg_views)} avg views · Score: {c.score}</div>
            {c.notes&&<div style={{fontSize:12,color:"#374151",background:"#F9FAFB",borderRadius:6,padding:"6px 10px",marginBottom:6}}>{c.notes}</div>}
            {c.follow_up_date&&<div style={{fontSize:12,color:"#F59E0B",fontWeight:600}}>📅 Follow up: {c.follow_up_date}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
            <select value={c.status||"Prospect"} onChange={e=>updateCreator(c.id,{status:e.target.value})} style={{border:`1px solid ${statusColor[c.status||"Prospect"]}`,background:statusBg[c.status||"Prospect"],color:statusColor[c.status||"Prospect"],borderRadius:8,padding:"4px 8px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {statuses.map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{fontSize:12,color:"#059669",fontWeight:600}}>{c.commission||15}% commission</span>
            <div style={{display:"flex",gap:6}}>
              <Btn small onClick={()=>setSelected(c)} color="#EFF6FF" text="#3B82F6">Details</Btn>
              <Btn small onClick={()=>removeCreator(c.id)} color="#FEF2F2" text="#EF4444">Remove</Btn>
            </div>
          </div>
        </div>
      </Card>;
    })}

    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)}>
      <Fld label="Commission Rate (%)"><Inp type="number" value={selected.commission||15} onChange={v=>{updateCreator(selected.id,{commission:Number(v)});setSelected({...selected,commission:Number(v)});}}/></Fld>
      <Fld label="Agent / Manager"><Inp value={selected.agent||""} placeholder="Agent name" onChange={v=>{updateCreator(selected.id,{agent:v});setSelected({...selected,agent:v});}}/></Fld>
      <Fld label="Contact Email"><Inp value={selected.email||""} placeholder="creator@email.com" onChange={v=>{updateCreator(selected.id,{email:v});setSelected({...selected,email:v});}}/></Fld>
      <Fld label="Follow-Up Date"><Inp type="date" value={selected.follow_up_date||""} onChange={v=>{updateCreator(selected.id,{follow_up_date:v});setSelected({...selected,follow_up_date:v});}}/></Fld>
      <Fld label="Niche">
        <Sel value={selected.niche||"General"} onChange={v=>{updateCreator(selected.id,{niche:v});setSelected({...selected,niche:v});}} options={["General","Gaming","Finance","Tech","Fitness","Beauty","Food","Travel","Education","Business","Lifestyle","Health","Fashion","Entertainment","Pets"]}/>
      </Fld>
      <Fld label="Notes">
        <textarea value={selected.notes||""} placeholder="Notes..." onChange={e=>{updateCreator(selected.id,{notes:e.target.value});setSelected({...selected,notes:e.target.value});}} style={{width:"100%",border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,resize:"vertical",height:80,boxSizing:"border-box"}}/>
      </Fld>
      <Fld label="Contract Status">
        <Sel value={selected.contract_status||"None"} onChange={v=>{updateCreator(selected.id,{contract_status:v});setSelected({...selected,contract_status:v});}} options={["None","Sent","Signed","Expired"]}/>
      </Fld>
      <a href={`https://youtube.com/${selected.handle}`} target="_blank" rel="noopener noreferrer" style={{display:"block",marginTop:12}}>
        <Btn full color="#F3F4F6" text="#374151">▶ Open YouTube Channel</Btn>
      </a>
    </Modal>}
  </div>;
}

// ─── SPONSORS TAB ─────────────────────────────────────────────────────────────
function SponsorsTab({roster}){
  const[search,setSearch]=useState("");
  const[catFilter,setCatFilter]=useState("All");
  const[tierFilter,setTierFilter]=useState("All");
  const[selected,setSelected]=useState(null);
  const[matchNiche,setMatchNiche]=useState("");
  const[matchTier,setMatchTier]=useState("");
  const[matchResults,setMatchResults]=useState([]);

  function runMatch(){
    let matched=SPONSORS;
    if(matchNiche){const ids=NICHE_SPONSOR_MAP[matchNiche]||[];matched=matched.filter(s=>ids.includes(s.id));}
    if(matchTier)matched=matched.filter(s=>s.tiers.includes(matchTier));
    setMatchResults(matched);
  }

  const filtered=SPONSORS.filter(s=>{
    const matchS=s.name.toLowerCase().includes(search.toLowerCase())||s.subcategory.toLowerCase().includes(search.toLowerCase());
    return matchS&&(catFilter==="All"||s.category===catFilter)&&(tierFilter==="All"||s.tiers.includes(tierFilter));
  });

  return<div>
    <Card style={{marginBottom:20,background:"#0D1B3E"}}>
      <div style={{color:"#C9A84C",fontWeight:800,fontSize:16,marginBottom:12}}>🎯 Sponsor Match Engine</div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div style={{flex:1,minWidth:140}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Creator Niche</label>
          <select value={matchNiche} onChange={e=>setMatchNiche(e.target.value)} style={{width:"100%",border:"1px solid #334155",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#1E293B",color:"#fff"}}>
            <option value="">All Niches</option>{Object.keys(NICHE_SPONSOR_MAP).map(n=><option key={n}>{n}</option>)}
          </select>
        </div>
        <div style={{flex:1,minWidth:140}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Creator Tier</label>
          <select value={matchTier} onChange={e=>setMatchTier(e.target.value)} style={{width:"100%",border:"1px solid #334155",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#1E293B",color:"#fff"}}>
            <option value="">All Tiers</option>{["Nano","Micro","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <Btn onClick={runMatch} color="#C9A84C" text="#0D1B3E">Find Matches</Btn>
      </div>
      {matchResults.length>0&&<div style={{marginTop:14}}><div style={{color:"#94A3B8",fontSize:12,marginBottom:8}}>{matchResults.length} matched sponsors:</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{matchResults.map(s=><button key={s.id} onClick={()=>setSelected(s)} style={{background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",color:"#C9A84C",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>{s.name} · {fmtMoney(s.deal.min)}–{fmtMoney(s.deal.max)}</button>)}</div></div>}
    </Card>

    <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sponsors..." style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 14px",fontSize:14,flex:1,minWidth:180,outline:"none"}}/>
      <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#fff"}}>
        <option>All</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
      </select>
      <select value={tierFilter} onChange={e=>setTierFilter(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:8,padding:"8px 11px",fontSize:14,background:"#fff"}}>
        <option>All</option>{["Nano","Micro","Mid-Tier","Macro","Mega"].map(t=><option key={t}>{t}</option>)}
      </select>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
      {filtered.map(s=><Card key={s.id}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div><div style={{fontWeight:800,fontSize:15,color:"#0D1B3E"}}>{s.name}</div><div style={{fontSize:12,color:"#9CA3AF"}}>{s.category} · {s.subcategory}</div></div>
        </div>
        <div style={{fontSize:13,color:"#059669",fontWeight:600,marginBottom:6}}>{fmtMoney(s.deal.min)} – {fmtMoney(s.deal.max)}</div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{s.tiers.map(t=><Badge key={t} label={t} color="#8B5CF6" bg="#F5F3FF"/>)}</div>
        <p style={{fontSize:12,color:"#6B7280",margin:0,lineHeight:1.5}}>{s.notes}</p>
        <div style={{marginTop:10,display:"flex",gap:8}}>
          <Btn small onClick={()=>setSelected(s)} color="#EFF6FF" text="#3B82F6">Details</Btn>
          <a href={`mailto:${s.email}`}><Btn small color="#F0FDF4" text="#059669">✉ Contact</Btn></a>
        </div>
      </Card>)}
    </div>

    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[["Category",selected.category],["Subcategory",selected.subcategory],["Deal Min",fmtMoney(selected.deal.min)],["Deal Max",fmtMoney(selected.deal.max)]].map(([k,v])=><div key={k} style={{background:"#F9FAFB",borderRadius:8,padding:"10px 14px"}}><div style={{fontSize:11,color:"#9CA3AF",fontWeight:600}}>{k}</div><div style={{fontSize:14,fontWeight:700,color:"#0D1B3E"}}>{v}</div></div>)}
      </div>
      <Fld label="Works With"><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{selected.tiers.map(t=><Badge key={t} label={t} color="#8B5CF6" bg="#F5F3FF" size="lg"/>)}</div></Fld>
      <Fld label="Contact Email"><div style={{background:"#F0FDF4",borderRadius:8,padding:"10px 14px",fontFamily:"monospace",fontSize:13,color:"#065F46"}}>{selected.email}</div></Fld>
      <Fld label="Notes">{selected.notes}</Fld>
      {roster.length>0&&<div><div style={{fontWeight:700,color:"#0D1B3E",marginBottom:8}}>Your Matching Creators</div>{roster.filter(c=>selected.tiers.includes(getTier(c.subscriber_count).label)).slice(0,5).map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F3F4F6",fontSize:13}}><span style={{fontWeight:600,color:"#0D1B3E"}}>{c.name}</span><span style={{color:"#9CA3AF"}}>{fmt(c.subscriber_count)} subs</span></div>)}</div>}
      <div style={{marginTop:16}}><a href={`mailto:${selected.email}?subject=Creator Partnership Opportunity`}><Btn full color="#059669">✉ Send Pitch Email</Btn></a></div>
    </Modal>}
  </div>;
}

// ─── DEALS TAB ────────────────────────────────────────────────────────────────
function DealsTab({deals,setDeals,roster}){
  const[showAdd,setShowAdd]=useState(false);
  const[showInvoice,setShowInvoice]=useState(null);
  const[form,setForm]=useState({creator_id:"",brand:"",value:"",commission:15,type:"Integration",status:"Prospect",date:""});

  const pipeline=deals.filter(d=>!["Completed","Declined"].includes(d.status)).reduce((s,d)=>s+Number(d.value),0);
  const earned=deals.filter(d=>d.status==="Completed").reduce((s,d)=>s+Math.round(Number(d.value)*d.commission/100),0);
  const statuses=["Prospect","In Talks","Proposed","Signed","Completed","Declined"];
  const statusColor={"Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6","Signed":"#8B5CF6","Completed":"#059669","Declined":"#EF4444"};
  const statusBg={"Prospect":"#F3F4F6","In Talks":"#FFFBEB","Proposed":"#EFF6FF","Signed":"#F5F3FF","Completed":"#ECFDF5","Declined":"#FEF2F2"};

  async function addDeal(){
    const newDeal={...form,value:Number(form.value),commission:Number(form.commission)};
    const{data}=await supabase.from("deals").insert(newDeal).select().single();
    if(data)setDeals(d=>[...d,data]);
    setShowAdd(false);
    setForm({creator_id:"",brand:"",value:"",commission:15,type:"Integration",status:"Prospect",date:""});
  }
  async function updateStatus(id,status){
    setDeals(d=>d.map(x=>x.id===id?{...x,status}:x));
    await supabase.from("deals").update({status}).eq("id",id);
  }
  async function removeDeal(id){
    if(confirm("Remove deal?")){setDeals(d=>d.filter(x=>x.id!==id));await supabase.from("deals").delete().eq("id",id);}
  }

  return<div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
      <StatBox label="Pipeline Value" value={fmtMoney(pipeline)} color="#C9A84C" sub="open deals"/>
      <StatBox label="Total Earned" value={fmtMoney(earned)} color="#059669" sub="completed"/>
      <StatBox label="Total Deals" value={deals.length} color="#0D1B3E" sub="all time"/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <span style={{fontSize:14,color:"#374151"}}>{deals.length} deals</span>
      <Btn onClick={()=>setShowAdd(true)} color="#C9A84C" text="#0D1B3E">+ Add Deal</Btn>
    </div>

    {deals.length===0&&<div style={{textAlign:"center",padding:60,color:"#9CA3AF"}}><div style={{fontSize:48,marginBottom:12}}>🤝</div><div style={{fontSize:16,fontWeight:600,color:"#374151"}}>No deals yet</div></div>}

    {[...deals].sort((a,b)=>b.value-a.value).map(d=>{
      const creator=roster.find(c=>c.id===d.creator_id);
      const comm=Math.round(Number(d.value)*d.commission/100);
      return<Card key={d.id} style={{marginBottom:10}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
              <span style={{fontWeight:800,fontSize:15,color:"#0D1B3E"}}>{d.brand}</span>
              <span style={{fontSize:13,color:"#9CA3AF"}}>×</span>
              <span style={{fontWeight:600,fontSize:14,color:"#374151"}}>{creator?.name||"Unknown"}</span>
              <Badge label={d.type} color="#6B7280" bg="#F3F4F6"/>
            </div>
            <div style={{fontSize:13,color:"#6B7280"}}>Deal: <strong style={{color:"#0D1B3E"}}>{fmtMoney(d.value)}</strong> · Commission: <strong style={{color:"#059669"}}>{fmtMoney(comm)}</strong>{d.date&&<> · {d.date}</>}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
            <select value={d.status} onChange={e=>updateStatus(d.id,e.target.value)} style={{border:`1px solid ${statusColor[d.status]}`,background:statusBg[d.status],color:statusColor[d.status],borderRadius:8,padding:"4px 8px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {statuses.map(s=><option key={s}>{s}</option>)}
            </select>
            {d.status==="Completed"&&<Btn small onClick={()=>setShowInvoice(d)} color="#F0FDF4" text="#059669">Invoice</Btn>}
            <Btn small onClick={()=>removeDeal(d.id)} color="#FEF2F2" text="#EF4444">×</Btn>
          </div>
        </div>
      </Card>;
    })}

    {showAdd&&<Modal title="Add Deal" onClose={()=>setShowAdd(false)}>
      <Fld label="Creator">
        <Sel value={form.creator_id} onChange={v=>setForm(f=>({...f,creator_id:v,commission:roster.find(c=>c.id===v)?.commission||15}))} options={[{value:"",label:"Select creator..."},...roster.map(c=>({value:c.id,label:`${c.name} (${fmt(c.subscriber_count)} subs)`}))]}/>
      </Fld>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Fld label="Brand Name"><Inp value={form.brand} onChange={v=>setForm(f=>({...f,brand:v}))} placeholder="NordVPN"/></Fld>
        <Fld label="Deal Value ($)"><Inp type="number" value={form.value} onChange={v=>setForm(f=>({...f,value:v}))} placeholder="5000"/></Fld>
        <Fld label="Commission %"><Inp type="number" value={form.commission} onChange={v=>setForm(f=>({...f,commission:v}))}/></Fld>
        <Fld label="Type"><Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["Integration","Dedicated","Shorts","Bundle","Affiliate"]}/></Fld>
        <Fld label="Status"><Sel value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={statuses}/></Fld>
        <Fld label="Date (YYYY-MM)"><Inp value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} placeholder={new Date().toISOString().slice(0,7)}/></Fld>
      </div>
      {form.value&&<div style={{background:"#ECFDF5",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#059669",marginTop:8}}>Your commission: <strong>{fmtMoney(Math.round(Number(form.value)*Number(form.commission)/100))}</strong></div>}
      <div style={{display:"flex",gap:10,marginTop:16,justifyContent:"flex-end"}}>
        <Btn onClick={()=>setShowAdd(false)} color="#F3F4F6" text="#374151">Cancel</Btn>
        <Btn onClick={addDeal} disabled={!form.brand||!form.value||!form.creator_id}>Add Deal</Btn>
      </div>
    </Modal>}

    {showInvoice&&<Modal title="Commission Invoice" onClose={()=>setShowInvoice(null)}>
      <textarea readOnly value={generateInvoice(showInvoice,roster.find(c=>c.id===showInvoice.creator_id))} style={{width:"100%",height:320,border:"1px solid #E5E7EB",borderRadius:8,padding:12,fontSize:12,fontFamily:"monospace",resize:"none",boxSizing:"border-box"}}/>
      <div style={{marginTop:12}}><Btn full onClick={()=>navigator.clipboard.writeText(generateInvoice(showInvoice,roster.find(c=>c.id===showInvoice.creator_id)))} color="#059669">Copy Invoice</Btn></div>
    </Modal>}
  </div>;
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({roster,deals}){
  const pipeline=deals.filter(d=>!["Completed","Declined"].includes(d.status)).reduce((s,d)=>s+Number(d.value),0);
  const earned=deals.filter(d=>d.status==="Completed").reduce((s,d)=>s+Math.round(Number(d.value)*d.commission/100),0);
  const followUps=roster.filter(c=>c.follow_up_date&&new Date(c.follow_up_date)<=new Date());
  const tierCounts=[{label:"Nano",color:"#6B7280"},{label:"Rising Star",color:"#3B82F6"},{label:"Mid-Tier",color:"#8B5CF6"},{label:"Macro",color:"#F59E0B"},{label:"Mega",color:"#EF4444"}].map(t=>({...t,count:roster.filter(c=>getTier(c.subscriber_count).label===t.label).length}));
  const topDeals=[...deals].sort((a,b)=>b.value-a.value).slice(0,5);
  const statusCounts=["Prospect","In Talks","Proposed","Signed","Completed"].map(s=>({status:s,count:deals.filter(d=>d.status===s).length,value:deals.filter(d=>d.status===s).reduce((a,d)=>a+Number(d.value),0)}));

  return<div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
      <StatBox label="Total Creators" value={roster.length} sub="on roster"/>
      <StatBox label="Active Deals" value={deals.filter(d=>["Signed","Proposed","In Talks"].includes(d.status)).length} color="#3B82F6" sub="in pipeline"/>
      <StatBox label="Pipeline Value" value={fmtMoney(pipeline)} color="#C9A84C" sub="open deals"/>
      <StatBox label="Commission Earned" value={fmtMoney(earned)} color="#059669" sub="completed"/>
    </div>

    {followUps.length>0&&<div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:12,padding:"14px 18px",marginBottom:20}}>
      <div style={{fontWeight:700,color:"#92400E",marginBottom:8}}>⏰ {followUps.length} Follow-up{followUps.length>1?"s":""} Due</div>
      {followUps.map(c=><div key={c.id} style={{fontSize:13,color:"#374151"}}>• {c.name} — {c.follow_up_date}</div>)}
    </div>}

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <Card>
        <h3 style={{margin:"0 0 14px",color:"#0D1B3E",fontSize:15}}>Roster by Tier</h3>
        {tierCounts.map(t=><div key={t.label} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{width:80,fontSize:12,fontWeight:700,color:t.color}}>{t.label}</span>
          <div style={{flex:1,height:8,background:"#F3F4F6",borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",width:roster.length>0?`${(t.count/roster.length)*100}%`:"0%",background:t.color,borderRadius:999,transition:"width 0.5s"}}/></div>
          <span style={{fontSize:13,fontWeight:800,color:"#374151",width:20,textAlign:"right"}}>{t.count}</span>
        </div>)}
      </Card>
      <Card>
        <h3 style={{margin:"0 0 14px",color:"#0D1B3E",fontSize:15}}>Deal Pipeline</h3>
        {statusCounts.map(({status,count,value})=>{
          const colors={"Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6","Signed":"#8B5CF6","Completed":"#059669"};
          return<div key={status} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{width:80,fontSize:12,color:colors[status],fontWeight:600}}>{status}</span>
            <span style={{background:colors[status]+"22",color:colors[status],borderRadius:999,padding:"1px 8px",fontSize:12,fontWeight:700,minWidth:22,textAlign:"center"}}>{count}</span>
            {value>0&&<span style={{fontSize:12,color:"#374151"}}>{fmtMoney(value)}</span>}
          </div>;
        })}
      </Card>
    </div>

    <Card>
      <h3 style={{margin:"0 0 14px",color:"#0D1B3E",fontSize:15}}>Top Deals</h3>
      {topDeals.length===0&&<p style={{color:"#9CA3AF",fontSize:13}}>No deals yet — add your first deal in the Deals tab.</p>}
      {topDeals.map((d,i)=>{
        const creator=roster.find(c=>c.id===d.creator_id);
        const sc={"Prospect":"#9CA3AF","In Talks":"#F59E0B","Proposed":"#3B82F6","Signed":"#8B5CF6","Completed":"#059669","Declined":"#EF4444"};
        return<div key={d.id} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 0",borderBottom:i<topDeals.length-1?"1px solid #F3F4F6":"none"}}>
          <span style={{fontSize:18,fontWeight:900,color:"#E5E7EB",width:22}}>{i+1}</span>
          <div style={{flex:1}}><span style={{fontWeight:700,color:"#0D1B3E"}}>{d.brand}</span><span style={{color:"#9CA3AF",fontSize:12,marginLeft:8}}>× {creator?.name||"Unknown"}</span></div>
          <Badge label={d.status} color={sc[d.status]} bg={sc[d.status]+"18"}/>
          <span style={{fontWeight:800,color:"#0D1B3E"}}>{fmtMoney(d.value)}</span>
          <span style={{fontSize:12,color:"#059669"}}>+{fmtMoney(Math.round(Number(d.value)*d.commission/100))}</span>
        </div>;
      })}
    </Card>
  </div>;
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
// ─── CONTRACT TEMPLATE ────────────────────────────────────────────────────────
const CONTRACT_TEMPLATE = (creator, agencyName, agencyAddress, repName, creatorAddress) => `MOTH MEDIA EXCLUSIVE AGREEMENT

This Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString()}, ("Effective Date") by and between ${agencyName||"MOTH MEDIA"}, with its principal place of business located at ${agencyAddress||"_______________________________"} ("COMPANY"), and ${creator?.name||"_______________________________"}, residing at ${creatorAddress||"_______________________________"} ("CLIENT"). COMPANY and CLIENT are referred to herein individually as a "Party" and collectively as "Parties".

1. ENGAGEMENT - CLIENT hereby engages COMPANY on an exclusive basis to commercially promote and market CLIENT's name, likeness, social media account(s), biographical data, and any other skill, talent, or product of CLIENT.

2. SERVICES - COMPANY shall promote and market CLIENT to brands, prospective employers, agencies, vendors, and/or other third parties, in relation to the Entertainment Industry.

3. COMPANY'S AUTHORITY - COMPANY may commercially use CLIENT's name, likeness, facsimile signature, and related materials in any and all media now known or hereinafter created, for the purposes of promoting CLIENT, CLIENT work product and CLIENT's name in the Entertainment Industry. COMPANY may additionally use CLIENT's name and likeness, in COMPANY'S marketing and promotional materials identifying CLIENT as a client of COMPANY. CLIENT shall retain all creative control over content, posting schedule, video concepts, and anything pertaining to video / channel creative or activities related to creative.

4. TERM - CLIENT hereby engages COMPANY on an exclusive basis for a period of (12 months) commencing on the Effective Date (the "Initial Term"). At the end of the initial term, Both CLIENT and COMPANY must mutually agree in writing the intent to renew this agreement for a period of 12 months.

5. COMPENSATION - In consideration of COMPANY's services under this Agreement, CLIENT agrees to pay COMPANY twenty percent (20%) of any and all gross revenue, monies, earnings, funds, compensation and/or other consideration ("Gross Earnings") received by COMPANY in connection with COMPANY's outbound services (meaning third party engagements provided by COMPANY to CLIENT) under this Agreement for CLIENT's services in the Entertainment Industry during the Term of this Agreement including any agreements entered into and/or negotiated, during the Term. All Gross Earnings shall be collected by and made payable to COMPANY. The commissions due to COMPANY hereunder shall be made payable to COMPANY immediately upon receipt of the Gross Earnings upon which the commission is based. Upon CLIENT's prior written or verbal request, COMPANY agrees to provide CLIENT with inbound services (meaning COMPANY's administration and/or negotiation of third party inquiries and/or engagements received by CLIENT directly in connection with CLIENT's social media platforms) concerning CLIENT's social media platforms. CLIENT agrees to pay COMPANY twenty percent (20%) of any and all gross revenue inbound services, monies, earnings, funds, compensation and/or other consideration ("Gross Earnings") received by COMPANY in connection with COMPANY's inbound services under this Agreement.

6. TERMINATION - Either Party may terminate this agreement at any time by providing written notice to the other Party. CLIENT's payment obligations hereunder shall remain in full force and effect upon the termination or expiration of the Agreement for any agreements entered into or negotiated prior to the date of termination or expiration of this Agreement.

7. ENTIRE AGREEMENT - This Agreement including the standard terms and conditions attached hereto (via hyperlink) contains the entire understanding of the Parties hereto relating to the subject matter hereof and cannot be modified or terminated except by an instrument signed by both Parties.

8. THIRD PARTY DEALINGS - During the Term, Client may be approached by, or may independently engage with, third parties in connection with potential brand sponsorships, endorsements, or other commercial engagements (collectively, "Third Party Opportunities"). In the event such Third Party Opportunities arise, Client shall promptly notify Company and provide all material terms and information related thereto. Company shall have the right to review and approve any such Third Party Opportunity, which approval shall not be unreasonably withheld, conditioned, or delayed. If Company approves the Third Party Opportunity, such opportunity shall be governed by, and subject to, the same terms and conditions set forth in this agreement, unless otherwise agreed in writing by the Parties.

9. GOVERNING LAW - This Agreement shall be deemed to have been executed in and shall be construed in accordance with California law.

IN WITNESS WHEREOF, the parties hereto have caused this Exclusive Agreement to be executed as of the date indicated below.

In witness whereof, with the parties hereto have executed this Agreement as of the date first above written in full good faith and understanding with a mutual goal of building a successful brand-creator relationship.

COMPANY: ${agencyName||"MOTH MEDIA"}
Name: ${repName||"_______________________________"}

CREATOR:
Name: ${creator?.name||"_______________________________"}

${agencyName||"Moth Media"} • This Agreement does not constitute legal advice; both Parties are encouraged to seek independent counsel.`;

// ─── CONTRACTS TAB ─────────────────────────────────────────────────────────────
function ContractsTab({roster,setRoster,agencySettings,setAgencySettings}){
  const[selected,setSelected]=useState(null);
  const[showSettings,setShowSettings]=useState(false);
  const[localSettings,setLocalSettings]=useState(agencySettings);
  const[contracts,setContracts]=useState({}); // creator_id -> latest contract record
  const[linkCopied,setLinkCopied]=useState(false);

  useEffect(()=>{
    async function loadContracts(){
      const{data}=await supabase.from("contracts").select("*").order("created_at",{ascending:false});
      if(data){
        const map={};
        data.forEach(c=>{ if(!map[c.creator_id]) map[c.creator_id]=c; }); // first = most recent due to order
        setContracts(map);
      }
    }
    loadContracts();
    const sub=supabase.channel("contracts").on("postgres_changes",{event:"*",schema:"public",table:"contracts"},loadContracts).subscribe();
    return()=>sub.unsubscribe();
  },[]);

  function saveSettings(){setAgencySettings(localSettings);setShowSettings(false);}

  async function generateAndSend(creator){
    const contractId=(crypto.randomUUID?crypto.randomUUID():"c_"+Date.now()+"_"+Math.random().toString(36).slice(2));
    const text=CONTRACT_TEMPLATE(creator,agencySettings.name,agencySettings.address,agencySettings.repName);
    const record={
      id:contractId, creator_id:creator.id, creator_name:creator.name,
      contract_text:text, agency_name:agencySettings.name||"Moth Media", status:"Sent"
    };
    const{data,error}=await supabase.from("contracts").insert(record).select().single();
    if(error){alert("Error creating contract: "+error.message);return null;}
    setContracts(c=>({...c,[creator.id]:data}));
    await supabase.from("creators").update({contract_status:"Sent",contract_sent_at:new Date().toISOString()}).eq("id",creator.id);
    setRoster(r=>r.map(c=>c.id===creator.id?{...c,contract_status:"Sent"}:c));
    return data;
  }

  function signingUrl(contractId){
    return `${window.location.origin}${window.location.pathname}#sign/${contractId}`;
  }

  const statusColor={"None":"#9CA3AF","Sent":"#F59E0B","Signed":"#059669","Expired":"#EF4444"};
  const statusBg={"None":"#F3F4F6","Sent":"#FFFBEB","Signed":"#ECFDF5","Expired":"#FEF2F2"};

  return<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <h2 style={{margin:0,color:"#0D1B3E",fontSize:18}}>📄 Contracts</h2>
        <p style={{margin:"4px 0 0",fontSize:13,color:"#6B7280"}}>Generate, send, and track signed representation agreements</p>
      </div>
      <Btn onClick={()=>{setLocalSettings(agencySettings);setShowSettings(true);}} color="#F3F4F6" text="#374151" small>⚙️ Agency Details</Btn>
    </div>

    {roster.length===0&&<div style={{textAlign:"center",padding:60,color:"#9CA3AF"}}>
      <div style={{fontSize:48,marginBottom:12}}>📄</div>
      <div style={{fontSize:16,fontWeight:600,color:"#374151"}}>No creators in roster yet</div>
      <div style={{fontSize:14,marginTop:8}}>Add creators from Discovery first, then generate contracts here</div>
    </div>}

    {roster.map(c=>{
      const contract=contracts[c.id];
      const status=contract?.status||"None";
      return<Card key={c.id} style={{marginBottom:10}}>
        <div style={{display:"flex",gap:14,alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            {c.thumbnail&&<img src={c.thumbnail} alt={c.name} style={{width:44,height:44,borderRadius:50,objectFit:"cover"}}/>}
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#0D1B3E"}}>{c.name}</div>
              <div style={{fontSize:12,color:"#9CA3AF"}}>{fmt(c.subscriber_count)} subs · {c.niche}</div>
              {status==="Signed"&&contract.signed_at&&<div style={{fontSize:11,color:"#059669",fontWeight:600,marginTop:2}}>
                ✓ Signed by {contract.signed_name} on {new Date(contract.signed_at).toLocaleString()}
              </div>}
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <Badge label={status} color={statusColor[status]} bg={statusBg[status]} size="lg"/>
            <Btn small onClick={()=>setSelected(c)} color="#EFF6FF" text="#3B82F6">View / Generate</Btn>
          </div>
        </div>
      </Card>;
    })}

    {selected&&<Modal title={`Contract — ${selected.name}`} onClose={()=>{setSelected(null);setLinkCopied(false);}} wide>
      {(()=>{
        const contract=contracts[selected.id];
        const text=contract?.contract_text||CONTRACT_TEMPLATE(selected,agencySettings.name,agencySettings.address,agencySettings.repName);
        return<>
          <div style={{marginBottom:16}}>
            <textarea readOnly value={text}
              style={{width:"100%",height:320,border:"1px solid #E5E7EB",borderRadius:8,padding:14,fontSize:12,fontFamily:"Georgia,serif",lineHeight:1.6,resize:"vertical",boxSizing:"border-box"}}/>
          </div>

          {contract&&contract.status==="Signed"&&<div style={{background:"#ECFDF5",border:"1px solid #BBF7D0",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
            <div style={{fontWeight:800,color:"#065F46",marginBottom:6}}>✓ Contract Signed</div>
            <div style={{fontSize:13,color:"#374151"}}>Signed name: <strong>{contract.signed_name}</strong></div>
            <div style={{fontSize:13,color:"#374151"}}>Address: <strong>{contract.signed_address||"Not provided"}</strong></div>
            <div style={{fontSize:13,color:"#374151"}}>Date & time: <strong>{new Date(contract.signed_at).toLocaleString()}</strong></div>
            <div style={{fontSize:11,color:"#9CA3AF",marginTop:4}}>Recorded IP: {contract.signed_ip||"Not captured"}</div>
            <div style={{marginTop:12}}>
              <Btn small onClick={()=>generateContractPDF(contract.contract_text,`${selected.name.replace(/\s+/g,"_")}_Signed_Agreement.pdf`,{name:contract.signed_name,address:contract.signed_address,date:new Date(contract.signed_at).toLocaleString(),ip:contract.signed_ip})} color="#059669">⬇ Download Signed PDF</Btn>
            </div>
          </div>}

          {!contract&&<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Btn onClick={async()=>{const c=await generateAndSend(selected);if(c)setSelected({...selected});}} color="#059669">📤 Generate & Create Signing Link</Btn>
            <Btn onClick={()=>generateContractPDF(text,`${selected.name.replace(/\s+/g,"_")}_Blank_Agreement.pdf`,null)} color="#F3F4F6" text="#374151">⬇ Download Blank PDF</Btn>
          </div>}

          {contract&&contract.status==="Sent"&&<div>
            <div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"14px 16px",marginBottom:12}}>
              <div style={{fontWeight:700,color:"#92400E",marginBottom:8}}>Signing Link Ready</div>
              <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:6,padding:"8px 10px",fontFamily:"monospace",fontSize:12,wordBreak:"break-all",marginBottom:10}}>
                {signingUrl(contract.id)}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Btn small onClick={()=>{navigator.clipboard.writeText(signingUrl(contract.id));setLinkCopied(true);setTimeout(()=>setLinkCopied(false),2000);}} color={linkCopied?"#059669":"#0D1B3E"}>
                  {linkCopied?"✓ Copied!":"Copy Signing Link"}
                </Btn>
                {selected.email&&<a href={`mailto:${selected.email}?subject=${encodeURIComponent(agencySettings.name+" — Please sign your representation agreement")}&body=${encodeURIComponent("Hi "+selected.name+",\n\nPlease review and sign your representation agreement with "+agencySettings.name+" using the secure link below:\n\n"+signingUrl(contract.id)+"\n\nThis link lets you review the full agreement and sign electronically — no printing needed.\n\nBest,\n"+(agencySettings.repName||""))}`}>
                  <Btn small color="#059669">✉ Email Signing Link</Btn>
                </a>}
                <Btn small onClick={()=>generateContractPDF(contract.contract_text,`${selected.name.replace(/\s+/g,"_")}_Blank_Agreement.pdf`,null)} color="#F3F4F6" text="#374151">⬇ Download Blank PDF</Btn>
              </div>
              {!selected.email&&<div style={{fontSize:11,color:"#92400E",marginTop:8}}>Add creator's email in Roster → Details to send via email, or just copy the link and send it any way you like.</div>}
            </div>
          </div>}
        </>;
      })()}
      <div style={{marginTop:12,padding:"12px 14px",background:"#F3F4F6",borderRadius:8,fontSize:12,color:"#6B7280"}}>
        ⚠️ This is a template only. Have a licensed attorney review before using for actual signings.
      </div>
    </Modal>}

    {showSettings&&<Modal title="Agency Contract Details" onClose={()=>setShowSettings(false)}>
      <Fld label="Agency Legal Name"><Inp value={localSettings.name} onChange={v=>setLocalSettings(s=>({...s,name:v}))} placeholder="Moth Media"/></Fld>
      <Fld label="Principal Place of Business (Address)"><Inp value={localSettings.address} onChange={v=>setLocalSettings(s=>({...s,address:v}))} placeholder="123 Main St, Los Angeles, CA"/></Fld>
      <Fld label="Your Name (Company Representative)"><Inp value={localSettings.repName} onChange={v=>setLocalSettings(s=>({...s,repName:v}))} placeholder="Your full name"/></Fld>
      <Fld label="Agency Contact Email"><Inp value={localSettings.email} onChange={v=>setLocalSettings(s=>({...s,email:v}))} placeholder="you@agency.com"/></Fld>
      <Btn full onClick={saveSettings} color="#059669">Save Agency Details</Btn>
    </Modal>}
  </div>;
}

// ─── PUBLIC SIGNING PAGE ────────────────────────────────────────────────────────
function SigningPage({contractId}){
  const[contract,setContract]=useState(null);
  const[loading,setLoading]=useState(true);
  const[signedName,setSignedName]=useState("");
  const[signedAddress,setSignedAddress]=useState("");
  const[agreed,setAgreed]=useState(false);
  const[submitting,setSubmitting]=useState(false);
  const[done,setDone]=useState(false);
  const[error,setError]=useState("");

  useEffect(()=>{
    async function load(){
      const{data,error}=await supabase.from("contracts").select("*").eq("id",contractId).single();
      if(error||!data){setError("Contract not found. The link may be invalid or expired.");}
      else{setContract(data);if(data.status==="Signed")setDone(true);}
      setLoading(false);
    }
    load();
  },[contractId]);

  async function submitSignature(){
    if(!signedName.trim()){setError("Please type your full legal name.");return;}
    if(!signedAddress.trim()){setError("Please enter your residential address.");return;}
    if(!agreed){setError("Please check the box to confirm you agree to the terms.");return;}
    setSubmitting(true);setError("");
    let ip="";
    try{
      const ipRes=await fetch("https://api.ipify.org?format=json");
      const ipData=await ipRes.json();
      ip=ipData.ip||"";
    }catch(e){ip="unavailable";}

    const finalText=contract.contract_text.replace(
      "residing at _______________________________ (\"CLIENT\")",
      `residing at ${signedAddress.trim()} ("CLIENT")`
    );

    const{error:updateError}=await supabase.from("contracts").update({
      status:"Signed",
      signed_name:signedName.trim(),
      signed_address:signedAddress.trim(),
      signed_at:new Date().toISOString(),
      signed_ip:ip,
      contract_text:finalText
    }).eq("id",contractId);

    if(updateError){setError("Error submitting signature: "+updateError.message);setSubmitting(false);return;}

    await supabase.from("creators").update({contract_status:"Signed"}).eq("id",contract.creator_id);

    setDone(true);
    setSubmitting(false);
  }

  if(loading)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"system-ui"}}>
    <div style={{textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>📄</div><div style={{color:"#6B7280"}}>Loading contract...</div></div>
  </div>;

  if(error&&!contract)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"system-ui",padding:20}}>
    <Card style={{maxWidth:480,textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>⚠️</div><div style={{color:"#EF4444",fontWeight:600}}>{error}</div></Card>
  </div>;

  return<div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",padding:"30px 16px"}}>
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:32,marginBottom:8}}>⚡</div>
        <div style={{fontWeight:800,fontSize:20,color:"#0D1B3E"}}>{contract.agency_name}</div>
        <div style={{fontSize:13,color:"#6B7280",marginTop:4}}>Representation Agreement for {contract.creator_name}</div>
      </div>

      {done?<Card style={{textAlign:"center",padding:"40px 24px"}}>
        <div style={{fontSize:48,marginBottom:16}}>✅</div>
        <h2 style={{color:"#059669",margin:"0 0 10px"}}>Agreement Signed!</h2>
        <p style={{color:"#374151",fontSize:14,marginBottom:20}}>Thank you, {contract.signed_name||signedName}. Your representation agreement has been signed and recorded.</p>
        <div style={{background:"#F9FAFB",borderRadius:8,padding:"14px 18px",textAlign:"left",fontSize:13,color:"#6B7280"}}>
          <div>Signed by: <strong style={{color:"#0D1B3E"}}>{contract.signed_name||signedName}</strong></div>
          <div>Address: <strong style={{color:"#0D1B3E"}}>{contract.signed_address||signedAddress}</strong></div>
          <div>Date & time: <strong style={{color:"#0D1B3E"}}>{contract.signed_at?new Date(contract.signed_at).toLocaleString():new Date().toLocaleString()}</strong></div>
        </div>
        <div style={{marginTop:20}}>
          <Btn onClick={()=>generateContractPDF(contract.contract_text,`${(contract.creator_name||"Creator").replace(/\s+/g,"_")}_Signed_Agreement.pdf`,{name:contract.signed_name||signedName,address:contract.signed_address||signedAddress,date:contract.signed_at?new Date(contract.signed_at).toLocaleString():new Date().toLocaleString(),ip:contract.signed_ip})} color="#059669">⬇ Download Signed Copy (PDF)</Btn>
        </div>
        <p style={{color:"#9CA3AF",fontSize:12,marginTop:20}}>A copy of this signed agreement is on file with {contract.agency_name}. Keep your downloaded PDF for your records.</p>
      </Card>:<>
        <Card style={{marginBottom:20}}>
          <textarea readOnly value={contract.contract_text}
            style={{width:"100%",height:380,border:"1px solid #E5E7EB",borderRadius:8,padding:14,fontSize:13,fontFamily:"Georgia,serif",lineHeight:1.7,resize:"vertical",boxSizing:"border-box",background:"#FAFBFC"}}/>
        </Card>

        <Card>
          <h3 style={{margin:"0 0 16px",color:"#0D1B3E",fontSize:16}}>Sign This Agreement</h3>
          <Fld label="Type Your Full Legal Name">
            <Inp value={signedName} onChange={setSignedName} placeholder="e.g. Jane Marie Smith"/>
          </Fld>
          <Fld label="Your Residential Address">
            <Inp value={signedAddress} onChange={setSignedAddress} placeholder="e.g. 123 Main St, Los Angeles, CA 90001"/>
          </Fld>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:13,color:"#374151",marginBottom:18,cursor:"pointer"}}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{marginTop:3,width:16,height:16,flexShrink:0}}/>
            <span>I have read and agree to the terms of this Agreement. I understand that typing my name above and checking this box constitutes my electronic signature, legally binding under the U.S. ESIGN Act.</span>
          </label>
          {error&&<div style={{color:"#EF4444",fontSize:13,marginBottom:12}}>{error}</div>}
          <Btn full onClick={submitSignature} disabled={submitting} color="#059669">
            {submitting?"Submitting...":"✓ Sign & Submit Agreement"}
          </Btn>
        </Card>
      </>}
    </div>
  </div>;
}



// ─── INQUIRIES TAB ──────────────────────────────────────────────────────────────
function InquiriesTab({roster,agencySettings}){
  const[inquiryType,setInquiryType]=useState("creator");
  const[targetName,setTargetName]=useState("");
  const[targetEmail,setTargetEmail]=useState("");
  const[subject,setSubject]=useState("");
  const[customMessage,setCustomMessage]=useState("");
  const[selectedCreatorId,setSelectedCreatorId]=useState("");

  const creatorTemplate=`Hi ${targetName||"[Name]"},

My name is ${agencySettings.repName||"[Your Name]"} and I run ${agencySettings.name||"[Agency Name]"}, a creator talent agency. I came across your channel and your content genuinely stood out to me.

We represent creators by helping them secure brand partnerships, negotiate rates, and manage deal logistics — without you needing to chase down sponsors yourself. We earn a commission only when you get paid, so there's no upfront cost.

Would you be open to a quick call this week to see if we'd be a good fit to work together?

Best,
${agencySettings.repName||"[Your Name]"}
${agencySettings.name||"[Agency Name]"} | ${agencySettings.email||"[Your Email]"}`;

  const sponsorTemplate=`Hi ${targetName||"[Brand Contact Name]"},

I'm ${agencySettings.repName||"[Your Name]"} from ${agencySettings.name||"[Agency Name]"}, a creator talent agency. I wanted to reach out about a potential partnership between your brand and one of our creators.

${selectedCreatorId?(()=>{const c=roster.find(r=>r.id===selectedCreatorId);return c?`${c.name} is a ${c.niche} creator with ${fmt(c.subscriber_count)} subscribers and strong, engaged viewership — averaging ${fmt(c.avg_views)} views per video.`:"";})():"We have creators across multiple niches whose audiences may be a strong match for your brand."}

We'd love to explore a sponsored integration, dedicated video, or multi-platform package tailored to your campaign goals.

Would you have 15 minutes this week to discuss?

Best,
${agencySettings.repName||"[Your Name]"}
${agencySettings.name||"[Agency Name]"} | ${agencySettings.email||"[Your Email]"}`;

  const finalMessage=customMessage||(inquiryType==="creator"?creatorTemplate:sponsorTemplate);

  return<div style={{maxWidth:700}}>
    <h2 style={{margin:"0 0 4px",color:"#0D1B3E",fontSize:18}}>✉️ Send Inquiry</h2>
    <p style={{margin:"0 0 20px",fontSize:13,color:"#6B7280"}}>Draft and send outreach emails to creators or sponsors</p>

    <Card style={{marginBottom:16}}>
      <Fld label="Inquiry Type">
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setInquiryType("creator")} style={{flex:1,padding:"10px",borderRadius:8,border:`2px solid ${inquiryType==="creator"?"#0D1B3E":"#E5E7EB"}`,background:inquiryType==="creator"?"#0D1B3E":"#fff",color:inquiryType==="creator"?"#fff":"#374151",fontWeight:700,cursor:"pointer"}}>🎬 Creator</button>
          <button onClick={()=>setInquiryType("sponsor")} style={{flex:1,padding:"10px",borderRadius:8,border:`2px solid ${inquiryType==="sponsor"?"#0D1B3E":"#E5E7EB"}`,background:inquiryType==="sponsor"?"#0D1B3E":"#fff",color:inquiryType==="sponsor"?"#fff":"#374151",fontWeight:700,cursor:"pointer"}}>💼 Sponsor</button>
        </div>
      </Fld>

      {inquiryType==="sponsor"&&roster.length>0&&<Fld label="Featured Creator (optional)">
        <Sel value={selectedCreatorId} onChange={setSelectedCreatorId} options={[{value:"",label:"None — general inquiry"},...roster.map(c=>({value:c.id,label:c.name}))]}/>
      </Fld>}

      <Fld label="Recipient Name"><Inp value={targetName} onChange={setTargetName} placeholder={inquiryType==="creator"?"Creator name":"Brand contact name"}/></Fld>
      <Fld label="Recipient Email"><Inp value={targetEmail} onChange={setTargetEmail} placeholder="email@example.com"/></Fld>
      <Fld label="Subject Line"><Inp value={subject} onChange={setSubject} placeholder={inquiryType==="creator"?"Partnership opportunity":"Brand partnership opportunity"}/></Fld>

      <Fld label="Message (auto-generated — edit as needed)">
        <textarea value={finalMessage} onChange={e=>setCustomMessage(e.target.value)}
          style={{width:"100%",height:280,border:"1px solid #D1D5DB",borderRadius:8,padding:12,fontSize:13,fontFamily:"Arial",resize:"vertical",boxSizing:"border-box"}}/>
      </Fld>

      <div style={{display:"flex",gap:10}}>
        <Btn onClick={()=>navigator.clipboard.writeText(finalMessage)} color="#F3F4F6" text="#374151">Copy Message</Btn>
        {targetEmail&&<a href={`mailto:${targetEmail}?subject=${encodeURIComponent(subject||(inquiryType==="creator"?"Partnership opportunity":"Brand partnership opportunity"))}&body=${encodeURIComponent(finalMessage)}`}>
          <Btn color="#059669">✉ Open in Email App</Btn>
        </a>}
      </div>
    </Card>

    <div style={{fontSize:12,color:"#9CA3AF"}}>
      Clicking "Open in Email App" launches your default email client (Mail, Outlook, Gmail app) with everything pre-filled. You review and hit send from there.
    </div>
  </div>;
}

function SettingsTab({apiKey,setApiKey}){
  const[key,setKey]=useState(apiKey);
  const[saved,setSaved]=useState(false);
  function save(){setApiKey(key);setSaved(true);setTimeout(()=>setSaved(false),2000);}
  return<div style={{maxWidth:600}}>
    <Card style={{marginBottom:20}}>
      <h3 style={{margin:"0 0 16px",color:"#0D1B3E"}}>YouTube API Key</h3>
      <Fld label="API Key"><Inp value={key} onChange={setKey} placeholder="AIza..." type="password"/></Fld>
      <p style={{fontSize:13,color:"#6B7280",marginBottom:14}}>Get your free key from <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" style={{color:"#3B82F6"}}>console.cloud.google.com</a> → APIs & Services → Credentials</p>
      <Btn onClick={save} color={saved?"#059669":"#0D1B3E"}>{saved?"✓ Saved!":"Save API Key"}</Btn>
    </Card>
    <Card>
      <h3 style={{margin:"0 0 16px",color:"#0D1B3E"}}>✅ Real-Time Database</h3>
      <p style={{fontSize:13,color:"#059669",fontWeight:600}}>Connected to Supabase — all data syncs in real time across all devices and users.</p>
      <p style={{fontSize:13,color:"#6B7280",marginTop:8}}>Share your app URL with your partner and you'll both see the same data instantly: <strong>https://agency-os-6nnn.onrender.com</strong></p>
    </Card>
  </div>;
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const[tab,setTab]=useState("dashboard");
  const[apiKey,setApiKey]=useState("");
  const[roster,setRoster]=useState([]);
  const[deals,setDeals]=useState([]);
  const[loading,setLoading]=useState(true);
  const[agencySettings,setAgencySettings]=useState({name:"Moth Media",address:"",repName:"",email:""});
  const[signContractId,setSignContractId]=useState(null);

  useEffect(()=>{
    function checkHash(){
      const hash=window.location.hash;
      if(hash.startsWith("#sign/")){
        setSignContractId(hash.replace("#sign/",""));
      }else{
        setSignContractId(null);
      }
    }
    checkHash();
    window.addEventListener("hashchange",checkHash);
    return()=>window.removeEventListener("hashchange",checkHash);
  },[]);

  useEffect(()=>{
    async function loadData(){
      const[{data:creators},{data:dealData}]=await Promise.all([
        supabase.from("creators").select("*").order("added_at",{ascending:false}),
        supabase.from("deals").select("*").order("id",{ascending:false})
      ]);
      if(creators)setRoster(creators);
      if(dealData)setDeals(dealData);
      setLoading(false);
    }
    loadData();

    // Real-time subscriptions
    const creatorSub=supabase.channel("creators").on("postgres_changes",{event:"*",schema:"public",table:"creators"},()=>{
      supabase.from("creators").select("*").order("added_at",{ascending:false}).then(({data})=>{if(data)setRoster(data);});
    }).subscribe();

    const dealSub=supabase.channel("deals").on("postgres_changes",{event:"*",schema:"public",table:"deals"},()=>{
      supabase.from("deals").select("*").order("id",{ascending:false}).then(({data})=>{if(data)setDeals(data);});
    }).subscribe();

    return()=>{creatorSub.unsubscribe();dealSub.unsubscribe();};
  },[]);

  async function addToRoster(creator){
    if(roster.some(c=>c.id===creator.id))return;
    const newCreator={
      id:creator.id,
      name:creator.name,
      handle:creator.handle,
      thumbnail:creator.thumbnail||null,
      subscriber_count:Number(creator.subscriber_count)||0,
      view_count:Number(creator.view_count)||0,
      video_count:Number(creator.video_count)||0,
      avg_views:Number(creator.avg_views)||0,
      est_monthly_earnings:Number(creator.est_monthly_earnings)||0,
      score:Number(creator.score)||0,
      niche:creator.niche||"General",
      tier:creator.tier?.label||creator.tier||"Nano",
      country:creator.country||"",
      published_at:creator.published_at||null,
      status:"Prospect",
      commission:15,
      notes:"",
      agent:"",
      email:"",
      follow_up_date:null,
      contract_status:"None",
      added_at:new Date().toISOString()
    };
    const{data,error}=await supabase.from("creators").insert(newCreator).select().single();
    if(error){alert("Save error: "+error.message);return;}
    if(data)setRoster(r=>[data,...r]);
  }

  const tabs=[{key:"dashboard",label:"📊 Dashboard"},{key:"discovery",label:"🔍 Discovery"},{key:"roster",label:"🎬 Roster"},{key:"sponsors",label:"💼 Sponsors"},{key:"deals",label:"🤝 Deals"},{key:"contracts",label:"📄 Contracts"},{key:"inquiries",label:"✉️ Inquiries"},{key:"settings",label:"⚙️ Settings"}];

  if(signContractId)return<SigningPage contractId={signContractId}/>;

  if(loading)return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"system-ui",color:"#0D1B3E"}}><div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>⚡</div><div style={{fontSize:18,fontWeight:700}}>Loading Agency OS...</div></div></div>;

  return<div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:"'Inter','Segoe UI',system-ui,-apple-system,sans-serif"}}>
    <div style={{background:"#0D1B3E",padding:"0 20px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:58}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{color:"#C9A84C",fontSize:20,fontWeight:900}}>⚡</span>
          <span style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-0.02em"}}>Creator Agency OS</span>
        </div>
        <div style={{display:"flex",gap:16,fontSize:12,color:"#64748B"}}>
          <span>{roster.length} creators</span>
          <span>{deals.length} deals</span>
          <span style={{color:"#059669"}}>🟢 Live</span>
          {apiKey&&<span style={{color:"#059669"}}>✓ YouTube API</span>}
        </div>
      </div>
    </div>

    <div style={{background:"#fff",borderBottom:"1px solid #E5E7EB"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",gap:0,overflowX:"auto"}}>
        {tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"13px 18px",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:tab===t.key?700:500,color:tab===t.key?"#0D1B3E":"#6B7280",whiteSpace:"nowrap",borderBottom:`2px solid ${tab===t.key?"#C9A84C":"transparent"}`,transition:"all 0.15s"}}>{t.label}</button>)}
      </div>
    </div>

    {tab==="discovery"&&!apiKey&&<div style={{background:"#FFFBEB",borderBottom:"1px solid #FDE68A",padding:"12px 20px",textAlign:"center",fontSize:13,color:"#92400E"}}>⚠️ YouTube API key required. <button onClick={()=>setTab("settings")} style={{color:"#D97706",fontWeight:700,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Add it in Settings →</button></div>}

    <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>
      {tab==="dashboard"&&<DashboardTab roster={roster} deals={deals}/>}
      {tab==="discovery"&&<DiscoveryTab apiKey={apiKey} onAddToRoster={addToRoster} roster={roster}/>}
      {tab==="roster"&&<RosterTab roster={roster} setRoster={setRoster}/>}
      {tab==="sponsors"&&<SponsorsTab roster={roster}/>}
      {tab==="deals"&&<DealsTab deals={deals} setDeals={setDeals} roster={roster}/>}
      {tab==="contracts"&&<ContractsTab roster={roster} setRoster={setRoster} agencySettings={agencySettings} setAgencySettings={setAgencySettings}/>}
      {tab==="inquiries"&&<InquiriesTab roster={roster} agencySettings={agencySettings}/>}
      {tab==="settings"&&<SettingsTab apiKey={apiKey} setApiKey={setApiKey}/>}
    </div>
  </div>;
}
