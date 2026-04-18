import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface DarkItem { id:string; name:string; tag:string; description:string; preview:React.ReactNode; html:string; css:string; }
const BG='#0a0a0f';

export const items: DarkItem[] = [
  {id:'dark-glass-card',name:'Dark Glass Card',tag:'card',description:'Glassmorphism card for dark backgrounds.',
    preview:(<div style={{background:'linear-gradient(135deg,#1a0533,#0d0d2b)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,borderRadius:12,width:'100%',height:'100%'}}>
      <div style={{background:'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:16,padding:20,color:'#fff',width:180}}>
        <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>Dark Glass Card</div>
        <div style={{fontSize:11,opacity:0.4}}>Glassmorphism style</div>
      </div>
    </div>),
    html:`<div class="dark-glass-card">
  <h3>Dark Glass Card</h3>
  <p>Card description here.</p>
</div>`,
    css:`.dark-glass-card { background: rgba(255,255,255,0.06); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px; color: #fff; font-family: system-ui, sans-serif; }
.dark-glass-card h3 { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
.dark-glass-card p { font-size: 13px; opacity: 0.45; line-height: 1.5; }`
  },
  {id:'dark-card-gradient',name:'Dark Gradient Card',tag:'card',description:'Subtle gradient dark card with glowing border.',
    preview:(<div style={{background:BG,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{background:'linear-gradient(145deg,rgba(99,102,241,0.12),rgba(168,85,247,0.06))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:16,padding:20,color:'#fff',width:180}}>
        <div style={{fontSize:12,fontWeight:600,color:'#a5b4fc',marginBottom:4}}>Pro Plan</div>
        <div style={{fontSize:22,fontWeight:700,marginBottom:4}}>$29<span style={{fontSize:12,opacity:0.5}}>/mo</span></div>
        <div style={{fontSize:11,opacity:0.4}}>Unlimited everything</div>
      </div>
    </div>),
    html:`<div class="dark-grad-card">
  <span class="dark-grad-card__label">Pro Plan</span>
  <div class="dark-grad-card__price">$29<span>/mo</span></div>
  <p>Unlimited everything</p>
</div>`,
    css:`.dark-grad-card { background: linear-gradient(145deg, rgba(99,102,241,0.12), rgba(168,85,247,0.06)); border: 1px solid rgba(99,102,241,0.25); border-radius: 16px; padding: 24px; color: #fff; font-family: system-ui, sans-serif; }
.dark-grad-card__label { font-size: 11px; font-weight: 700; color: #a5b4fc; letter-spacing: 0.08em; text-transform: uppercase; }
.dark-grad-card__price { font-size: 28px; font-weight: 700; margin: 8px 0; }
.dark-grad-card__price span { font-size: 14px; opacity: 0.5; }
.dark-grad-card p { font-size: 13px; opacity: 0.4; }`
  },
  {id:'dark-button-primary',name:'Dark Primary Button',tag:'button',description:'Dark mode solid primary CTA button.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:BG}}>
      <button style={{background:'#6366f1',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontSize:14,fontWeight:600,cursor:'pointer'}}>Get Started</button>
    </div>),
    html:`<button class="dark-btn-primary">Get Started</button>`,
    css:`.dark-btn-primary { background: #6366f1; color: #fff; border: none; border-radius: 8px; padding: 10px 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: system-ui, sans-serif; transition: all 0.2s ease; }
.dark-btn-primary:hover { background: #4f46e5; box-shadow: 0 4px 16px rgba(99,102,241,0.4); transform: translateY(-1px); }`
  },
  {id:'dark-button-ghost',name:'Dark Ghost Button',tag:'button',description:'Transparent button with subtle hover for dark UIs.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:BG}}>
      <button style={{background:'transparent',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'10px 24px',fontSize:14,fontWeight:500,cursor:'pointer'}}>Learn More</button>
    </div>),
    html:`<button class="dark-btn-ghost">Learn More</button>`,
    css:`.dark-btn-ghost { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: system-ui, sans-serif; transition: all 0.2s ease; }
.dark-btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); color: #fff; }`
  },
  {id:'dark-nav',name:'Dark Navigation Bar',tag:'navbar',description:'Dark app navbar with blur and subtle border.',
    preview:(<div style={{background:'rgba(10,10,20,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
      <div style={{fontWeight:700,fontSize:14,color:'#B8FB3C'}}>⬡ App</div>
      <div style={{display:'flex',gap:16,fontSize:12,color:'rgba(255,255,255,0.45)'}}><span>Home</span><span>Docs</span><span>Pricing</span></div>
      <button style={{background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,padding:'5px 12px',fontSize:11,cursor:'pointer'}}>Sign In</button>
    </div>),
    html:`<nav class="dark-navbar">
  <a class="dark-navbar__logo" href="#">⬡ App</a>
  <ul class="dark-navbar__links">
    <li><a href="#">Home</a></li><li><a href="#">Docs</a></li><li><a href="#">Pricing</a></li>
  </ul>
  <button class="dark-navbar__btn">Sign In</button>
</nav>`,
    css:`.dark-navbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 28px; background: rgba(10,10,20,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
.dark-navbar__logo { font-weight: 700; font-size: 18px; color: #B8FB3C; text-decoration: none; }
.dark-navbar__links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }
.dark-navbar__links a { font-size: 14px; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
.dark-navbar__links a:hover { color: #fff; }
.dark-navbar__btn { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 7px 16px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.dark-navbar__btn:hover { background: rgba(255,255,255,0.12); color: #fff; }`
  },
  {id:'dark-input',name:'Dark Input Field',tag:'form',description:'Dark mode text input with focus ring.',
    preview:(<div style={{display:'flex',flexDirection:'column',gap:6,padding:'16px 24px',background:BG}}>
      <label style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.6)'}}>Email address</label>
      <input defaultValue="user@example.com" readOnly style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'9px 12px',fontSize:13,color:'#fff',outline:'none',width:200}} />
    </div>),
    html:`<div class="dark-field">
  <label class="dark-label" for="email">Email address</label>
  <input class="dark-input" id="email" type="email" placeholder="you@example.com">
</div>`,
    css:`.dark-field { display: flex; flex-direction: column; gap: 6px; }
.dark-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.6); font-family: system-ui, sans-serif; }
.dark-input { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; font-size: 14px; color: #fff; outline: none; font-family: system-ui, sans-serif; transition: border-color 0.2s, box-shadow 0.2s; }
.dark-input:focus { border-color: rgba(99,102,241,0.6); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.dark-input::placeholder { color: rgba(255,255,255,0.25); }`
  },
  {id:'dark-select',name:'Dark Select',tag:'form',description:'Native-style dark select dropdown.',
    preview:(<div style={{display:'flex',flexDirection:'column',gap:6,padding:'16px 24px',background:BG}}>
      <label style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.6)'}}>Plan</label>
      <select style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'9px 12px',fontSize:13,color:'#fff',outline:'none',width:180}}>
        <option>Free</option><option>Pro</option><option>Enterprise</option>
      </select>
    </div>),
    html:`<div class="dark-field">
  <label class="dark-label" for="plan">Plan</label>
  <select class="dark-select" id="plan">
    <option>Free</option>
    <option>Pro</option>
    <option>Enterprise</option>
  </select>
</div>`,
    css:`.dark-select { appearance: none; background: rgba(255,255,255,0.06) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E") no-repeat right 12px center; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 36px 10px 14px; font-size: 14px; color: #fff; outline: none; cursor: pointer; font-family: system-ui, sans-serif; }
.dark-select:focus { border-color: rgba(99,102,241,0.6); }`
  },
  {id:'dark-toggle',name:'Dark Toggle Switch',tag:'form',description:'Custom CSS toggle for dark UI settings.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:12,padding:'16px 24px',background:BG}}>
      <div style={{position:'relative',width:44,height:24,background:'#6366f1',borderRadius:12,cursor:'pointer',flexShrink:0}}>
        <div style={{position:'absolute',top:2,right:2,width:20,height:20,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}} />
      </div>
      <span style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>Dark mode enabled</span>
    </div>),
    html:`<label class="dark-toggle" for="dark-mode">
  <input class="dark-toggle__input" type="checkbox" id="dark-mode" checked>
  <span class="dark-toggle__track"></span>
  <span class="dark-toggle__label">Dark mode enabled</span>
</label>`,
    css:`.dark-toggle { display: flex; align-items: center; gap: 12px; cursor: pointer; font-family: system-ui, sans-serif; }
.dark-toggle__input { position: absolute; opacity: 0; width: 0; height: 0; }
.dark-toggle__track { position: relative; width: 44px; height: 24px; background: rgba(255,255,255,0.1); border-radius: 12px; transition: background 0.2s; flex-shrink: 0; }
.dark-toggle__track::after { content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.3); transition: transform 0.25s; }
.dark-toggle__input:checked + .dark-toggle__track { background: #6366f1; }
.dark-toggle__input:checked + .dark-toggle__track::after { transform: translateX(20px); }
.dark-toggle__label { font-size: 14px; color: rgba(255,255,255,0.7); }`
  },
  {id:'dark-alert',name:'Dark Alert Banner',tag:'alert',description:'Warning alert for dark UI contexts.',
    preview:(<div style={{display:'flex',alignItems:'flex-start',gap:10,background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.25)',borderLeft:'3px solid #f59e0b',borderRadius:'0 8px 8px 0',padding:'12px 14px',fontFamily:'system-ui',maxWidth:280}}>
      <span style={{color:'#fbbf24',fontSize:16}}>⚠</span>
      <div><p style={{fontSize:12,fontWeight:600,color:'#fef3c7',margin:'0 0 2px'}}>Subscription expiring</p><p style={{fontSize:11,color:'rgba(254,243,199,0.6)',margin:0}}>Your plan ends in 3 days. Upgrade now.</p></div>
    </div>),
    html:`<div class="dark-alert dark-alert--warning" role="alert">
  <span class="dark-alert__icon">⚠</span>
  <div>
    <p class="dark-alert__title">Subscription expiring</p>
    <p class="dark-alert__msg">Your plan ends in 3 days.</p>
  </div>
</div>`,
    css:`.dark-alert { display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; border-radius: 8px; font-family: system-ui, sans-serif; }
.dark-alert__icon { font-size: 16px; flex-shrink: 0; }
.dark-alert__title { font-size: 13px; font-weight: 600; margin: 0 0 3px; }
.dark-alert__msg { font-size: 12px; margin: 0; opacity: 0.65; line-height: 1.4; }
.dark-alert--warning { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); border-left: 3px solid #f59e0b; border-radius: 0 8px 8px 0; }
.dark-alert--warning .dark-alert__icon { color: #fbbf24; }
.dark-alert--warning .dark-alert__title { color: #fef3c7; }`
  },
  {id:'dark-tag',name:'Dark Tag Chips',tag:'misc',description:'Dark mode category tag/chip collection.',
    preview:(<div style={{display:'flex',flexWrap:'wrap',gap:6,padding:'12px 0',background:BG}}>
      {[['CSS','rgba(99,102,241,0.15)','#a5b4fc','rgba(99,102,241,0.3)'],['Design','rgba(168,85,247,0.12)','#c084fc','rgba(168,85,247,0.25)'],['React','rgba(6,182,212,0.12)','#67e8f9','rgba(6,182,212,0.25)'],['Open Source','rgba(34,197,94,0.1)','#4ade80','rgba(34,197,94,0.2)']].map(([l,bg,c,border])=>(<span key={l} style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:50,background:bg,color:c,border:`1px solid ${border}`}}>{l}</span>))}
    </div>),
    html:`<span class="dark-tag dark-tag--indigo">CSS</span>
<span class="dark-tag dark-tag--purple">Design</span>
<span class="dark-tag dark-tag--cyan">React</span>
<span class="dark-tag dark-tag--green">Open Source</span>`,
    css:`.dark-tag { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 50px; font-family: system-ui, sans-serif; }
.dark-tag--indigo { background: rgba(99,102,241,0.15); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.3); }
.dark-tag--purple { background: rgba(168,85,247,0.12); color: #c084fc; border: 1px solid rgba(168,85,247,0.25); }
.dark-tag--cyan { background: rgba(6,182,212,0.12); color: #67e8f9; border: 1px solid rgba(6,182,212,0.25); }
.dark-tag--green { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }`
  },
  {id:'dark-searchbar',name:'Dark Search Bar',tag:'form',description:'Dark floating search bar with icon.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'9px 14px',width:240}}>
      <span style={{color:'rgba(255,255,255,0.25)',fontSize:14}}>🔍</span>
      <span style={{fontSize:13,color:'rgba(255,255,255,0.25)'}}>Search components…</span>
    </div>),
    html:`<div class="dark-searchbar">
  <svg class="dark-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
  <input class="dark-search-input" type="search" placeholder="Search components…">
</div>`,
    css:`.dark-searchbar { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 16px; transition: border-color 0.2s; }
.dark-searchbar:focus-within { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.dark-search-icon { width: 16px; height: 16px; color: rgba(255,255,255,0.3); flex-shrink: 0; }
.dark-search-input { background: none; border: none; color: #fff; font-size: 14px; outline: none; width: 100%; font-family: system-ui, sans-serif; }
.dark-search-input::placeholder { color: rgba(255,255,255,0.25); }`
  },
];

const CATS = [{key:'all',label:'All'},{key:'card',label:'Cards'},{key:'button',label:'Buttons'},{key:'navbar',label:'Navbars'},{key:'form',label:'Forms'},{key:'alert',label:'Alerts'},{key:'misc',label:'Misc'}];
function buildSections(item: DarkItem): CodeSection[] { return [{label:'HTML',language:'html',code:item.html},{label:'CSS',language:'css',code:item.css}]; }

export default function DarkMode() {
  const [selected, setSelected] = useState<DarkItem|null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO title="Dark Mode CSS Components — Cards, Navbars, Forms, Buttons — UIXplor" description={`${items.length} dark mode CSS components: dark glass cards, buttons, navbars, input fields, alerts, tags, and search bars. Copy HTML + CSS for dark-mode UIs instantly.`} path="/collections/dark-mode" keywords={['dark mode CSS','dark UI components','dark card CSS','dark navbar CSS','dark input CSS','dark button CSS','glassmorphism dark']} jsonLd={[{'@context':'https://schema.org','@type':'CollectionPage',name:'Dark Mode CSS Components — UIXplor',url:'https://uixplor.com/collections/dark-mode',numberOfItems:items.length,isPartOf:{'@type':'WebSite',name:'UIXplor',url:'https://uixplor.com'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://uixplor.com'},{'@type':'ListItem',position:2,name:'Collections',item:'https://uixplor.com/collections'},{'@type':'ListItem',position:3,name:'Dark Mode',item:'https://uixplor.com/collections/dark-mode'}]}]}/>
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Dark Mode</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Dark Mode <span className="text-[#B8FB3C]">Components</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} dark UI components ready to drop into your dark-mode design system. Copy HTML + CSS instantly.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]"/>{items.length} components</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">{CATS.map(c=><button key={c.key} onClick={()=>setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat===c.key?'bg-[#B8FB3C] text-[#0a0a0f]':'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item,index)=>(<motion.article key={item.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.02}} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center bg-[#0a0a0f]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={()=>setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=dark-mode`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
            </div>
          </motion.article>))}
        </div>
      </div>
    </main>
    <CodeViewerOverlay isOpen={!!selected} onClose={()=>setSelected(null)} title={selected?.name||''} sections={selected?buildSections(selected):[]}/>
  </>);
}
