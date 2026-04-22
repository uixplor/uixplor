import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface LayoutItem { id:string; name:string; tag:string; description:string; preview:React.ReactNode; html:string; css:string; }

export const items: LayoutItem[] = [
  {id:'hero-centered',name:'Centered Hero',tag:'hero',description:'Full-width centered hero with headline, sub and CTAs.',
    preview:(<div style={{background:'linear-gradient(135deg,#0f0c29,#302b63)',padding:'28px 20px',textAlign:'center',fontFamily:'system-ui',width:'100%'}}>
      <div style={{fontSize:11,background:'rgba(184,251,60,0.12)',color:'#B8FB3C',border:'1px solid rgba(184,251,60,0.25)',borderRadius:50,padding:'3px 12px',display:'inline-block',marginBottom:10}}>New — v2.0 is live 🎉</div>
      <div style={{fontSize:20,fontWeight:800,color:'#fff',lineHeight:1.2,marginBottom:8}}>Build beautiful UIs<br/><span style={{color:'#B8FB3C'}}>in seconds</span></div>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginBottom:16}}>Copy-paste components for any project.</div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <div style={{background:'#B8FB3C',color:'#000',borderRadius:8,padding:'7px 16px',fontSize:12,fontWeight:700}}>Get Started</div>
        <div style={{background:'transparent',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,padding:'7px 14px',fontSize:12}}>View Docs</div>
      </div>
    </div>),
    html:`<section class="hero-centered">
  <span class="hero-badge">New — v2.0 is live 🎉</span>
  <h1 class="hero-title">Build beautiful UIs<br><span>in seconds</span></h1>
  <p class="hero-sub">Copy-paste components for any project.</p>
  <div class="hero-actions">
    <a class="btn-primary" href="#">Get Started</a>
    <a class="btn-ghost" href="#">View Docs</a>
  </div>
</section>`,
    css:`.hero-centered { padding: 80px 24px; text-align: center; background: linear-gradient(135deg, #0f0c29, #302b63); font-family: system-ui, sans-serif; }
.hero-badge { display: inline-block; background: rgba(184,251,60,0.12); color: #B8FB3C; border: 1px solid rgba(184,251,60,0.25); border-radius: 50px; padding: 4px 14px; font-size: 12px; font-weight: 500; margin-bottom: 16px; }
.hero-title { font-size: 48px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 16px; }
.hero-title span { color: #B8FB3C; }
.hero-sub { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 28px; }
.hero-actions { display: flex; gap: 10px; justify-content: center; }
.btn-primary { background: #B8FB3C; color: #000; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 700; text-decoration: none; }
.btn-ghost { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px 20px; font-size: 14px; text-decoration: none; }`
  },
  {id:'feature-grid',name:'Feature Grid',tag:'features',description:'Three-column feature highlights with icons.',
    preview:(<div style={{background:'#fff',borderRadius:12,padding:'16px 12px',fontFamily:'system-ui'}}>
      <div style={{textAlign:'center',marginBottom:14}}><div style={{fontSize:13,fontWeight:700,color:'#111'}}>Why UIXplor</div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
        {[['⚡','Fast','Zero config'],['🎨','Beautiful','Pro quality'],['📋','Copy-paste','No setup']].map(([icon,title,sub])=>(<div key={title} style={{textAlign:'center',padding:'10px 6px',background:'#f9fafb',borderRadius:8}}>
          <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
          <div style={{fontSize:11,fontWeight:600,color:'#111',marginBottom:2}}>{title}</div>
          <div style={{fontSize:10,color:'#9ca3af'}}>{sub}</div>
        </div>))}
      </div>
    </div>),
    html:`<section class="feature-grid">
  <h2>Why UIXplor</h2>
  <div class="features">
    <div class="feature"><span class="feature__icon">⚡</span><h3>Fast</h3><p>Zero config</p></div>
    <div class="feature"><span class="feature__icon">🎨</span><h3>Beautiful</h3><p>Pro quality</p></div>
    <div class="feature"><span class="feature__icon">📋</span><h3>Copy-paste</h3><p>No setup</p></div>
  </div>
</section>`,
    css:`.feature-grid { padding: 64px 24px; font-family: system-ui, sans-serif; text-align: center; }
.feature-grid h2 { font-size: 28px; font-weight: 700; color: #111; margin-bottom: 32px; }
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.feature { padding: 28px 20px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
.feature__icon { font-size: 28px; display: block; margin-bottom: 12px; }
.feature h3 { font-size: 16px; font-weight: 600; color: #111; margin-bottom: 6px; }
.feature p { font-size: 13px; color: #6b7280; line-height: 1.5; }`
  },
  {id:'pricing-table',name:'Pricing Table',tag:'pricing',description:'Three-tier comparison pricing layout.',
    preview:(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,fontFamily:'system-ui',padding:'8px 4px',width:'100%'}}>
      {[{plan:'Free',price:'$0',color:'#e5e7eb',text:'#374151',features:['5 Projects','Community'],highlight:false},{plan:'Pro',price:'$29',color:'#6366f1',text:'#fff',features:['∞ Projects','Priority'],highlight:true},{plan:'Team',price:'$79',color:'#18181b',text:'#fff',features:['Everything','24/7 Support'],highlight:false}].map(p=>(<div key={p.plan} style={{background:p.highlight?p.color:'#fff',border:`1.5px solid ${p.highlight?p.color:'#e5e7eb'}`,borderRadius:10,padding:'10px 8px',textAlign:'center',transform:p.highlight?'scale(1.02)':'none'}}>
        <div style={{fontSize:10,fontWeight:700,color:p.highlight?'#fff':p.text,marginBottom:4}}>{p.plan}</div>
        <div style={{fontSize:16,fontWeight:800,color:p.highlight?'#fff':p.text,marginBottom:6}}>{p.price}</div>
        {p.features.map(f=>(<div key={f} style={{fontSize:9,color:p.highlight?'rgba(255,255,255,0.7)':'#9ca3af',marginBottom:2}}>{f}</div>))}
        <div style={{marginTop:8,background:p.highlight?'rgba(255,255,255,0.2)':'#6366f1',color:p.highlight?'#fff':'#fff',borderRadius:5,padding:'4px 0',fontSize:9,fontWeight:700}}>Choose</div>
      </div>))}
    </div>),
    html:`<div class="pricing-table">
  <div class="pricing-plan"><span class="plan-tier">Free</span><p class="plan-price">$0</p><ul class="plan-list"><li>5 Projects</li><li>Community</li></ul><a class="plan-cta" href="#">Get started</a></div>
  <div class="pricing-plan pricing-plan--featured"><span class="plan-tier">Pro</span><p class="plan-price">$29</p><ul class="plan-list"><li>∞ Projects</li><li>Priority support</li></ul><a class="plan-cta" href="#">Get started</a></div>
  <div class="pricing-plan"><span class="plan-tier">Team</span><p class="plan-price">$79</p><ul class="plan-list"><li>Everything</li><li>24/7 Support</li></ul><a class="plan-cta" href="#">Get started</a></div>
</div>`,
    css:`.pricing-table { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px; font-family: system-ui, sans-serif; align-items: start; }
.pricing-plan { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 24px 20px; text-align: center; }
.pricing-plan--featured { background: #6366f1; border-color: #6366f1; transform: scale(1.03); }
.plan-tier { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
.pricing-plan--featured .plan-tier { color: rgba(255,255,255,0.8); }
.plan-price { font-size: 36px; font-weight: 800; color: #111; margin: 8px 0; }
.pricing-plan--featured .plan-price { color: #fff; }
.plan-list { list-style: none; margin: 12px 0; padding: 0; font-size: 13px; color: #6b7280; }
.pricing-plan--featured .plan-list { color: rgba(255,255,255,0.75); }
.plan-list li { padding: 4px 0; }
.plan-cta { display: block; background: #6366f1; color: #fff; border-radius: 8px; padding: 10px; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 16px; }
.pricing-plan--featured .plan-cta { background: rgba(255,255,255,0.2); }`
  },
  {id:'testimonial-card',name:'Testimonial Card',tag:'testimonial',description:'Quote card with avatar, name, and star rating.',
    preview:(<div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:14,padding:'16px',fontFamily:'system-ui',maxWidth:240}}>
      <div style={{fontSize:14,color:'#f59e0b',marginBottom:8}}>★★★★★</div>
      <p style={{fontSize:12,color:'#374151',lineHeight:1.6,marginBottom:12,fontStyle:'italic'}}>"UIXplor saved me hours of work. The snippets are production-ready and beautiful."</p>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700}}>S</div>
        <div><div style={{fontSize:12,fontWeight:600,color:'#111'}}>Sarah K.</div><div style={{fontSize:10,color:'#9ca3af'}}>Frontend Dev</div></div>
      </div>
    </div>),
    html:`<figure class="testimonial">
  <div class="testimonial__stars">★★★★★</div>
  <blockquote class="testimonial__quote">UIXplor saved me hours of work. The snippets are production-ready and beautiful.</blockquote>
  <figcaption class="testimonial__author">
    <div class="author-avatar">S</div>
    <div><strong>Sarah K.</strong><span>Frontend Dev</span></div>
  </figcaption>
</figure>`,
    css:`.testimonial { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; font-family: system-ui, sans-serif; }
.testimonial__stars { color: #f59e0b; font-size: 16px; margin-bottom: 10px; }
.testimonial__quote { font-size: 14px; color: #374151; line-height: 1.65; font-style: italic; margin-bottom: 16px; }
.testimonial__author { display: flex; align-items: center; gap: 10px; }
.author-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.testimonial__author strong { display: block; font-size: 13px; color: #111; }
.testimonial__author span { font-size: 11px; color: #9ca3af; }`
  },
  {id:'cta-section',name:'CTA Section',tag:'cta',description:'Full-width call-to-action banner with gradient.',
    preview:(<div style={{background:'linear-gradient(135deg,#6366f1,#a855f7)',padding:'24px 20px',textAlign:'center',borderRadius:14,fontFamily:'system-ui'}}>
      <div style={{fontSize:16,fontWeight:800,color:'#fff',marginBottom:6}}>Ready to build faster?</div>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.65)',marginBottom:14}}>Join 10,000+ developers already using UIXplor.</div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <div style={{background:'#fff',color:'#6366f1',borderRadius:8,padding:'7px 16px',fontSize:12,fontWeight:700}}>Start Free</div>
        <div style={{background:'transparent',color:'rgba(255,255,255,0.8)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:8,padding:'7px 14px',fontSize:12}}>See Demo</div>
      </div>
    </div>),
    html:`<section class="cta-section">
  <h2 class="cta-title">Ready to build faster?</h2>
  <p class="cta-sub">Join 10,000+ developers already using UIXplor.</p>
  <div class="cta-actions">
    <a class="cta-btn cta-btn--primary" href="#">Start Free</a>
    <a class="cta-btn cta-btn--ghost" href="#">See Demo</a>
  </div>
</section>`,
    css:`.cta-section { padding: 64px 24px; text-align: center; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 20px; font-family: system-ui, sans-serif; }
.cta-title { font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 10px; }
.cta-sub { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 28px; }
.cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.cta-btn { border-radius: 8px; padding: 11px 24px; font-size: 14px; font-weight: 600; text-decoration: none; transition: opacity 0.2s; }
.cta-btn--primary { background: #fff; color: #6366f1; }
.cta-btn--ghost { background: transparent; color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.35); }
.cta-btn:hover { opacity: 0.88; }`
  },
  {id:'stats-row',name:'Stats Row',tag:'stats',description:'Horizontal stat band with large numbers.',
    preview:(<div style={{display:'flex',gap:0,fontFamily:'system-ui',background:'#0f172a',borderRadius:12,overflow:'hidden'}}>
      {[['150k+','Developers'],['3M+','Snippets copied'],['98%','Satisfaction']].map(([val,label],i)=>(<div key={label} style={{flex:1,textAlign:'center',padding:'14px 8px',borderRight:i<2?'1px solid rgba(255,255,255,0.06)':'none'}}>
        <div style={{fontSize:18,fontWeight:800,color:'#B8FB3C'}}>{val}</div>
        <div style={{fontSize:9,color:'rgba(255,255,255,0.35)',marginTop:2}}>{label}</div>
      </div>))}
    </div>),
    html:`<div class="stats-row">
  <div class="stat-item"><strong>150k+</strong><span>Developers</span></div>
  <div class="stat-item"><strong>3M+</strong><span>Snippets copied</span></div>
  <div class="stat-item"><strong>98%</strong><span>Satisfaction</span></div>
</div>`,
    css:`.stats-row { display: flex; background: #0f172a; border-radius: 16px; overflow: hidden; font-family: system-ui, sans-serif; }
.stat-item { flex: 1; text-align: center; padding: 28px 16px; border-right: 1px solid rgba(255,255,255,0.06); }
.stat-item:last-child { border-right: none; }
.stat-item strong { display: block; font-size: 32px; font-weight: 800; color: #B8FB3C; margin-bottom: 4px; }
.stat-item span { font-size: 12px; color: rgba(255,255,255,0.4); }`
  },
  {id:'faq-accordion',name:'FAQ Accordion',tag:'faq',description:'Single-open FAQ accordion with chevron animation.',
    preview:(<div style={{fontFamily:'system-ui',width:'100%'}}>
      {[{q:'Is it really free?',a:'Yes! All snippets are free to use in personal and commercial projects.',open:true},{q:'Do I need a framework?',a:'',open:false}].map(item=>(<div key={item.q} style={{borderBottom:'1px solid #f3f4f6'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',cursor:'pointer'}}>
          <span style={{fontSize:13,fontWeight:600,color:'#111'}}>{item.q}</span>
          <span style={{fontSize:12,color:'#9ca3af',transform:item.open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▾</span>
        </div>
        {item.open&&<div style={{fontSize:12,color:'#6b7280',paddingBottom:10,lineHeight:1.5}}>{item.a}</div>}
      </div>))}
    </div>),
    html:`<div class="faq">
  <details class="faq-item" open>
    <summary class="faq-question">Is it really free?</summary>
    <p class="faq-answer">Yes! All snippets are free to use in personal and commercial projects.</p>
  </details>
  <details class="faq-item">
    <summary class="faq-question">Do I need a framework?</summary>
    <p class="faq-answer">No — all snippets are pure HTML + CSS. Works with any stack.</p>
  </details>
</div>`,
    css:`.faq { font-family: system-ui, sans-serif; }
.faq-item { border-bottom: 1px solid #f3f4f6; }
.faq-item[open] { border-bottom-color: #e5e7eb; }
.faq-question { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; font-size: 15px; font-weight: 600; color: #111827; cursor: pointer; list-style: none; }
.faq-question::-webkit-details-marker { display: none; }
.faq-question::after { content: '▾'; color: #9ca3af; transition: transform 0.25s ease; font-size: 14px; }
.faq-item[open] .faq-question::after { transform: rotate(180deg); }
.faq-answer { font-size: 14px; color: #6b7280; line-height: 1.65; padding-bottom: 16px; }`
  },
  {id:'blog-grid',name:'Blog Card Grid',tag:'grid',description:'Responsive two-column blog post card grid.',
    preview:(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontFamily:'system-ui',width:'100%'}}>
      {[{tag:'CSS',title:'10 Shadow Tricks'},
        {tag:'Design',title:'Glass Effects Guide'}].map(p=>(<div key={p.title} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden'}}>
          <div style={{height:36,background:'linear-gradient(135deg,#e0e7ff,#ede9fe)'}} />
          <div style={{padding:'8px 10px'}}>
            <span style={{fontSize:9,padding:'2px 7px',borderRadius:50,background:'#eff6ff',color:'#3b82f6',fontWeight:600}}>{p.tag}</span>
            <div style={{fontSize:11,fontWeight:700,color:'#111',marginTop:5}}>{p.title}</div>
          </div>
        </div>))}
    </div>),
    html:`<div class="blog-grid">
  <article class="blog-card">
    <div class="blog-card__cover"></div>
    <div class="blog-card__body">
      <span class="blog-tag">CSS</span>
      <h3>10 Shadow Tricks</h3>
    </div>
  </article>
  <article class="blog-card">
    <div class="blog-card__cover"></div>
    <div class="blog-card__body">
      <span class="blog-tag">Design</span>
      <h3>Glass Effects Guide</h3>
    </div>
  </article>
</div>`,
    css:`.blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; font-family: system-ui, sans-serif; }
@media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
.blog-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
.blog-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
.blog-card__cover { width: 100%; height: 140px; background: linear-gradient(135deg, #ddd6fe, #bae6fd); object-fit: cover; }
.blog-card__body { padding: 16px; }
.blog-tag { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 50px; background: #eff6ff; color: #3b82f6; }
.blog-card h3 { font-size: 15px; font-weight: 700; color: #111; margin: 10px 0 0; }`
  },
  {id:'hero-split',name:'Split Hero',tag:'hero',description:'Left-text, right-visual two-column hero layout.',
    preview:(<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontFamily:'system-ui',padding:'12px',background:'#fff',borderRadius:12,border:'1px solid #e5e7eb',alignItems:'center'}}>
      <div>
        <div style={{fontSize:16,fontWeight:800,color:'#111',lineHeight:1.2,marginBottom:6}}>Modern UI<br/>Library</div>
        <div style={{fontSize:10,color:'#6b7280',marginBottom:10}}>100+ components ready to use.</div>
        <div style={{background:'#6366f1',color:'#fff',borderRadius:6,padding:'5px 12px',fontSize:11,fontWeight:600,display:'inline-block'}}>Explore →</div>
      </div>
      <div style={{background:'linear-gradient(135deg,#e0e7ff,#ede9fe)',borderRadius:8,height:80,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🎨</div>
    </div>),
    html:`<section class="hero-split">
  <div class="hero-split__content">
    <h1>Modern UI Library</h1>
    <p>100+ components ready to use.</p>
    <a class="hero-split__cta" href="#">Explore →</a>
  </div>
  <div class="hero-split__visual">🎨</div>
</section>`,
    css:`.hero-split { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; padding: 64px 24px; font-family: system-ui, sans-serif; background: #fff; }
.hero-split__content h1 { font-size: 40px; font-weight: 800; color: #111; line-height: 1.2; margin-bottom: 14px; }
.hero-split__content p { font-size: 16px; color: #6b7280; margin-bottom: 24px; }
.hero-split__cta { background: #6366f1; color: #fff; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block; }
.hero-split__visual { background: linear-gradient(135deg, #e0e7ff, #ede9fe); border-radius: 16px; width: 100%; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; font-size: 48px; }`
  },
];

const CATS = [{key:'all',label:'All'},{key:'hero',label:'Hero'},{key:'features',label:'Features'},{key:'pricing',label:'Pricing'},{key:'testimonial',label:'Testimonials'},{key:'cta',label:'CTA'},{key:'stats',label:'Stats'},{key:'faq',label:'FAQ'},{key:'grid',label:'Grids'}];
function buildSections(item: LayoutItem): CodeSection[] { return [{label:'HTML',language:'html',code:item.html},{label:'CSS',language:'css',code:item.css}]; }

export default function Layouts() {
  const [selected, setSelected] = useState<LayoutItem|null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO title="CSS Layout Sections — Hero, Pricing, Testimonials, FAQ — UIXplor" description={`${items.length} CSS layout sections: hero banners, feature grids, pricing tables, testimonial cards, CTA sections, stats rows, FAQ accordions, and blog grids. Copy HTML + CSS.`} path="/collections/layouts" keywords={['CSS hero section','pricing table CSS','testimonial CSS','FAQ accordion CSS','CTA section CSS','CSS layout sections','landing page CSS']} jsonLd={[{'@context':'https://schema.org','@type':'CollectionPage',name:'CSS Layout Sections — UIXplor',url:'https://uixplor.com/collections/layouts',numberOfItems:items.length,isPartOf:{'@type':'WebSite',name:'UIXplor',url:'https://uixplor.com'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://uixplor.com'},{'@type':'ListItem',position:2,name:'Collections',item:'https://uixplor.com/collections'},{'@type':'ListItem',position:3,name:'Layouts',item:'https://uixplor.com/collections/layouts'}]}]}/>
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Layouts</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">CSS Layout <span className="text-[#B8FB3C]">Sections</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} complete page sections: hero banners, pricing tables, testimonials, stat rows, FAQ accordions, and CTAs. Copy HTML + CSS.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]"/>{items.length} layouts</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">{CATS.map(c=><button key={c.key} onClick={()=>setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat===c.key?'bg-[#B8FB3C] text-[#0a0a0f]':'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item,index)=>(<motion.article key={item.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.02}} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-44 sm:h-52 flex items-center justify-center p-4 bg-white/[0.02]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={()=>setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=layouts`}
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
