import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface NavItem { id:string; name:string; tag:string; description:string; preview:React.ReactNode; html:string; css:string; }

export const items: NavItem[] = [
  {
    id:'topnav-minimal', name:'Minimal Topbar', tag:'navbar', description:'Clean topbar with logo, nav links, and CTA.',
    preview:(<div style={{background:'#fff',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #e5e7eb',fontFamily:'system-ui'}}>
      <div style={{fontWeight:700,fontSize:15}}>Logo</div>
      <div style={{display:'flex',gap:20,fontSize:13,color:'#6b7280'}}>
        <span>Home</span><span>Docs</span><span>Pricing</span>
      </div>
      <div style={{background:'#111',color:'#fff',borderRadius:6,padding:'6px 14px',fontSize:12,fontWeight:600}}>Sign In</div>
    </div>),
    html:`<nav class="topnav">
  <a class="topnav__logo" href="#">Logo</a>
  <ul class="topnav__links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Pricing</a></li>
  </ul>
  <a class="topnav__cta" href="#">Sign In</a>
</nav>`,
    css:`.topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}
.topnav__logo { font-weight: 700; font-size: 18px; color: #111; text-decoration: none; }
.topnav__links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }
.topnav__links a { font-size: 14px; color: #6b7280; text-decoration: none; transition: color 0.2s; }
.topnav__links a:hover { color: #111; }
.topnav__cta { background: #111; color: #fff; border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 600; text-decoration: none; transition: opacity 0.2s; }
.topnav__cta:hover { opacity: 0.85; }`
  },
  {
    id:'topnav-dark', name:'Dark Navbar', tag:'navbar', description:'Dark glassmorphism navbar for dark-mode apps.',
    preview:(<div style={{background:'rgba(10,10,20,0.95)',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
      <div style={{fontWeight:700,fontSize:15,color:'#B8FB3C'}}>Brand</div>
      <div style={{display:'flex',gap:20,fontSize:13,color:'rgba(255,255,255,0.5)'}}>
        <span>Features</span><span>Docs</span><span>Blog</span>
      </div>
      <div style={{background:'#B8FB3C',color:'#000',borderRadius:6,padding:'6px 14px',fontSize:12,fontWeight:700}}>Get Started</div>
    </div>),
    html:`<nav class="dark-nav">
  <a class="dark-nav__logo" href="#">Brand</a>
  <ul class="dark-nav__links">
    <li><a href="#">Features</a></li>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Blog</a></li>
  </ul>
  <a class="dark-nav__cta" href="#">Get Started</a>
</nav>`,
    css:`.dark-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px; background: rgba(10,10,20,0.95);
  backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06);
}
.dark-nav__logo { font-weight: 700; font-size: 18px; color: #B8FB3C; text-decoration: none; }
.dark-nav__links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
.dark-nav__links a { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
.dark-nav__links a:hover { color: #fff; }
.dark-nav__cta { background: #B8FB3C; color: #000; border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 700; text-decoration: none; }`
  },
  {
    id:'nav-glass', name:'Glass Navbar', tag:'navbar', description:'Frosted glass navbar with blur effect and subtle border.',
    preview:(<div style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(12px)',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid rgba(255,255,255,0.15)',borderRadius:12}}>
      <div style={{fontWeight:700,fontSize:14,color:'#fff'}}>◆ App</div>
      <div style={{display:'flex',gap:16,fontSize:12,color:'rgba(255,255,255,0.6)'}}><span>Home</span><span>About</span><span>Contact</span></div>
      <div style={{border:'1px solid rgba(255,255,255,0.3)',color:'#fff',borderRadius:6,padding:'5px 12px',fontSize:12}}>Login</div>
    </div>),
    html:`<nav class="glass-nav">
  <a class="glass-nav__logo" href="#">◆ App</a>
  <ul class="glass-nav__links">
    <li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li>
  </ul>
  <a class="glass-nav__btn" href="#">Login</a>
</nav>`,
    css:`.glass-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px; background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
}
.glass-nav__logo { font-weight: 700; font-size: 18px; color: #fff; text-decoration: none; }
.glass-nav__links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }
.glass-nav__links a { font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
.glass-nav__links a:hover { color: #fff; }
.glass-nav__btn { border: 1px solid rgba(255,255,255,0.3); color: #fff; border-radius: 6px; padding: 7px 18px; font-size: 13px; text-decoration: none; transition: background 0.2s; }
.glass-nav__btn:hover { background: rgba(255,255,255,0.1); }`
  },
  {
    id:'breadcrumb-slash', name:'Slash Breadcrumbs', tag:'breadcrumb', description:'Classic slash-separated breadcrumb trail.',
    preview:(<div style={{padding:'12px 0',fontFamily:'system-ui'}}>
      <ol style={{display:'flex',alignItems:'center',gap:6,listStyle:'none',margin:0,padding:0,fontSize:13}}>
        <li><a href="#" style={{color:'#6366f1',textDecoration:'none'}}>Home</a></li>
        <li style={{color:'#9ca3af'}}>/</li>
        <li><a href="#" style={{color:'#6366f1',textDecoration:'none'}}>Collections</a></li>
        <li style={{color:'#9ca3af'}}>/</li>
        <li style={{color:'#111',fontWeight:500}}>Navigation</li>
      </ol>
    </div>),
    html:`<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-slash">
    <li><a href="#">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="#">Collections</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page">Navigation</li>
  </ol>
</nav>`,
    css:`.breadcrumb-slash {
  display: flex; align-items: center; gap: 8px;
  list-style: none; margin: 0; padding: 0; font-size: 14px;
}
.breadcrumb-slash a { color: #6366f1; text-decoration: none; transition: color 0.2s; }
.breadcrumb-slash a:hover { color: #4f46e5; text-decoration: underline; }
.breadcrumb-slash li[aria-hidden] { color: #9ca3af; user-select: none; }
.breadcrumb-slash li[aria-current] { color: #111827; font-weight: 500; }`
  },
  {
    id:'breadcrumb-chevron', name:'Chevron Breadcrumbs', tag:'breadcrumb', description:'Breadcrumbs with chevron arrow separators.',
    preview:(<div style={{padding:'12px 0',fontFamily:'system-ui',background:'#f9fafb',borderRadius:8,paddingLeft:16}}>
      <ol style={{display:'flex',alignItems:'center',gap:4,listStyle:'none',margin:0,padding:0,fontSize:13}}>
        <li><span style={{color:'#6366f1'}}>Dashboard</span></li>
        <li style={{color:'#d1d5db'}}>›</li>
        <li><span style={{color:'#6366f1'}}>Settings</span></li>
        <li style={{color:'#d1d5db'}}>›</li>
        <li style={{color:'#374151',fontWeight:500}}>Profile</li>
      </ol>
    </div>),
    html:`<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-chevron">
    <li><a href="#">Dashboard</a></li>
    <li><a href="#">Settings</a></li>
    <li aria-current="page">Profile</li>
  </ol>
</nav>`,
    css:`.breadcrumb-chevron {
  display: flex; align-items: center; list-style: none;
  margin: 0; padding: 0; gap: 4px; font-size: 14px;
}
.breadcrumb-chevron li:not(:last-child)::after {
  content: '›'; margin-left: 4px; color: #d1d5db; font-size: 16px;
}
.breadcrumb-chevron a { color: #6366f1; text-decoration: none; }
.breadcrumb-chevron a:hover { text-decoration: underline; }
.breadcrumb-chevron li[aria-current] { color: #374151; font-weight: 500; }`
  },
  {
    id:'tabs-underline', name:'Underline Tabs', tag:'tabs', description:'Minimal tabs with animated underline indicator.',
    preview:(<div style={{fontFamily:'system-ui',borderBottom:'1px solid #e5e7eb'}}>
      <div style={{display:'flex',gap:0}}>
        {['Overview','Analytics','Reports','Settings'].map((t,i)=>(<div key={t} style={{padding:'10px 18px',fontSize:13,fontWeight:i===0?700:500,color:i===0?'#6366f1':'#6b7280',borderBottom:i===0?'2px solid #6366f1':'2px solid transparent',cursor:'pointer'}}>{t}</div>))}
      </div>
    </div>),
    html:`<div class="tabs-underline" role="tablist">
  <button class="tab active" role="tab" aria-selected="true">Overview</button>
  <button class="tab" role="tab">Analytics</button>
  <button class="tab" role="tab">Reports</button>
  <button class="tab" role="tab">Settings</button>
</div>`,
    css:`.tabs-underline { display: flex; border-bottom: 1px solid #e5e7eb; }
.tab { padding: 10px 20px; font-size: 14px; font-weight: 500; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; margin-bottom: -1px; }
.tab:hover { color: #374151; }
.tab.active { color: #6366f1; border-bottom-color: #6366f1; font-weight: 600; }`
  },
  {
    id:'tabs-pill', name:'Pill Tabs', tag:'tabs', description:'Rounded pill-style tabs on a tinted background track.',
    preview:(<div style={{background:'#f3f4f6',borderRadius:10,padding:4,display:'inline-flex',gap:2}}>
      {['All','Active','Draft','Archived'].map((t,i)=>(<div key={t} style={{padding:'7px 16px',borderRadius:8,fontSize:13,fontWeight:i===0?600:400,background:i===0?'#fff':'transparent',color:i===0?'#111':'#6b7280',boxShadow:i===0?'0 1px 4px rgba(0,0,0,0.08)':'none',cursor:'pointer'}}>{t}</div>))}
    </div>),
    html:`<div class="tabs-pill" role="tablist">
  <button class="tab-pill active" role="tab">All</button>
  <button class="tab-pill" role="tab">Active</button>
  <button class="tab-pill" role="tab">Draft</button>
  <button class="tab-pill" role="tab">Archived</button>
</div>`,
    css:`.tabs-pill { display: inline-flex; gap: 4px; padding: 4px; background: #f3f4f6; border-radius: 10px; }
.tab-pill { padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 500; color: #6b7280; background: transparent; border: none; cursor: pointer; transition: all 0.2s; }
.tab-pill.active { background: #fff; color: #111; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }`
  },
  {
    id:'tabs-dark', name:'Dark Pill Tabs', tag:'tabs', description:'Dark mode pill tabs for dark-background interfaces.',
    preview:(<div style={{background:'rgba(255,255,255,0.06)',borderRadius:10,padding:4,display:'inline-flex',gap:2}}>
      {['Overview','Stats','Logs'].map((t,i)=>(<div key={t} style={{padding:'7px 16px',borderRadius:8,fontSize:12,fontWeight:i===0?600:400,background:i===0?'rgba(255,255,255,0.1)':'transparent',color:i===0?'#fff':'rgba(255,255,255,0.4)',cursor:'pointer'}}>{t}</div>))}
    </div>),
    html:`<div class="tabs-dark" role="tablist">
  <button class="tab-dark active">Overview</button>
  <button class="tab-dark">Stats</button>
  <button class="tab-dark">Logs</button>
</div>`,
    css:`.tabs-dark { display: inline-flex; gap: 4px; padding: 4px; background: rgba(255,255,255,0.06); border-radius: 10px; }
.tab-dark { padding: 8px 18px; border-radius: 8px; font-size: 13px; color: rgba(255,255,255,0.4); background: transparent; border: none; cursor: pointer; transition: all 0.2s; font-weight: 500; }
.tab-dark.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }`
  },
  {
    id:'pagination-simple', name:'Simple Pagination', tag:'pagination', description:'Numbered page navigation with prev/next arrows.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:4,fontFamily:'system-ui'}}>
      {['←','1','2','3','...','8','→'].map((p,i)=>(<div key={i} style={{width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,border:'1px solid',borderColor:i===2?'#6366f1':'#e5e7eb',background:i===2?'#6366f1':'#fff',color:i===2?'#fff':'#374151',fontSize:13,fontWeight:i===2?600:400,cursor:'pointer'}}>{p}</div>))}
    </div>),
    html:`<nav class="pagination" aria-label="Pagination">
  <a class="page-btn" href="#" aria-label="Previous">←</a>
  <a class="page-btn" href="#">1</a>
  <a class="page-btn active" href="#" aria-current="page">2</a>
  <a class="page-btn" href="#">3</a>
  <span class="page-ellipsis">...</span>
  <a class="page-btn" href="#">8</a>
  <a class="page-btn" href="#" aria-label="Next">→</a>
</nav>`,
    css:`.pagination { display: flex; align-items: center; gap: 4px; }
.page-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; color: #374151; font-size: 14px; text-decoration: none; transition: all 0.2s; }
.page-btn:hover { border-color: #6366f1; color: #6366f1; }
.page-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; font-weight: 600; }
.page-ellipsis { display: flex; align-items: center; justify-content: center; width: 36px; color: #9ca3af; }`
  },
  {
    id:'pagination-minimal', name:'Minimal Pagination', tag:'pagination', description:'Clean text-only pagination for blog-style layouts.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',fontFamily:'system-ui',width:'100%'}}>
      <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#6366f1',cursor:'pointer'}}>← <span>Previous</span></div>
      <span style={{fontSize:12,color:'#9ca3af'}}>Page 3 of 12</span>
      <div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#6366f1',cursor:'pointer'}}><span>Next</span> →</div>
    </div>),
    html:`<nav class="pagination-minimal" aria-label="Pagination">
  <a class="pag-prev" href="#">← Previous</a>
  <span class="pag-info">Page 3 of 12</span>
  <a class="pag-next" href="#">Next →</a>
</nav>`,
    css:`.pagination-minimal { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; }
.pag-prev, .pag-next { color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 500; transition: opacity 0.2s; }
.pag-prev:hover, .pag-next:hover { opacity: 0.7; }
.pag-info { font-size: 13px; color: #9ca3af; }`
  },
  {
    id:'sidebar-left', name:'Left Sidebar', tag:'sidebar', description:'Vertical navigation sidebar with icons and labels.',
    preview:(<div style={{width:130,background:'#111',minHeight:160,borderRadius:12,padding:'12px 0',fontFamily:'system-ui'}}>
      {[{icon:'⊞',label:'Dashboard',active:true},{icon:'◈',label:'Analytics'},{icon:'⊡',label:'Projects'},{icon:'⚙',label:'Settings'}].map(item=>(<div key={item.label} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',fontSize:12,color:item.active?'#B8FB3C':'rgba(255,255,255,0.45)',background:item.active?'rgba(184,251,60,0.08)':'transparent'}}>
        <span>{item.icon}</span><span>{item.label}</span>
      </div>))}
    </div>),
    html:`<nav class="sidebar">
  <a class="sidebar__item active" href="#"><span class="sidebar__icon">⊞</span>Dashboard</a>
  <a class="sidebar__item" href="#"><span class="sidebar__icon">◈</span>Analytics</a>
  <a class="sidebar__item" href="#"><span class="sidebar__icon">⊡</span>Projects</a>
  <a class="sidebar__item" href="#"><span class="sidebar__icon">⚙</span>Settings</a>
</nav>`,
    css:`.sidebar { width: 220px; background: #111827; min-height: 100vh; padding: 16px 0; }
.sidebar__item { display: flex; align-items: center; gap: 10px; padding: 10px 20px; font-size: 14px; color: rgba(255,255,255,0.45); text-decoration: none; transition: all 0.2s; }
.sidebar__item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
.sidebar__item.active { color: #B8FB3C; background: rgba(184,251,60,0.08); }
.sidebar__icon { font-size: 16px; }`
  },
  {
    id:'sidebar-minimal', name:'Icon Sidebar', tag:'sidebar', description:'Compact icon-only collapsed sidebar.',
    preview:(<div style={{width:52,background:'#18181b',minHeight:160,borderRadius:12,padding:'12px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:4,fontFamily:'system-ui'}}>
      {['⊞','◈','⊡','⚙'].map((icon,i)=>(<div key={i} style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,background:i===0?'rgba(184,251,60,0.12)':'transparent',color:i===0?'#B8FB3C':'rgba(255,255,255,0.35)',fontSize:16,cursor:'pointer'}}>{icon}</div>))}
    </div>),
    html:`<nav class="icon-sidebar" aria-label="Main navigation">
  <a class="icon-sidebar__item active" href="#" title="Dashboard">⊞</a>
  <a class="icon-sidebar__item" href="#" title="Analytics">◈</a>
  <a class="icon-sidebar__item" href="#" title="Projects">⊡</a>
  <a class="icon-sidebar__item" href="#" title="Settings">⚙</a>
</nav>`,
    css:`.icon-sidebar { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 60px; background: #18181b; min-height: 100vh; padding: 16px 0; }
.icon-sidebar__item { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 8px; font-size: 18px; color: rgba(255,255,255,0.35); text-decoration: none; transition: all 0.2s; }
.icon-sidebar__item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); }
.icon-sidebar__item.active { color: #B8FB3C; background: rgba(184,251,60,0.12); }`
  },
  {
    id:'megamenu', name:'Mega Menu', tag:'megamenu', description:'Full-width dropdown mega menu with categories and links.',
    preview:(<div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:20,boxShadow:'0 8px 32px rgba(0,0,0,0.08)',fontFamily:'system-ui',width:'100%'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
        {[{title:'Design',items:['Shadows','Gradients','Glass']},{title:'Components',items:['Buttons','Cards','Inputs']},{title:'Patterns',items:['Navigation','Layouts','Forms']}].map(col=>(<div key={col.title}>
          <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',letterSpacing:'0.08em',marginBottom:8}}>{col.title}</div>
          {col.items.map(item=>(<div key={item} style={{fontSize:13,color:'#374151',padding:'4px 0',cursor:'pointer'}}>{item}</div>))}
        </div>))}
      </div>
    </div>),
    html:`<div class="mega-menu">
  <div class="mega-col">
    <p class="mega-col__title">Design</p>
    <a href="#">Shadows</a><a href="#">Gradients</a><a href="#">Glass</a>
  </div>
  <div class="mega-col">
    <p class="mega-col__title">Components</p>
    <a href="#">Buttons</a><a href="#">Cards</a><a href="#">Inputs</a>
  </div>
  <div class="mega-col">
    <p class="mega-col__title">Patterns</p>
    <a href="#">Navigation</a><a href="#">Layouts</a><a href="#">Forms</a>
  </div>
</div>`,
    css:`.mega-menu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
.mega-col__title { font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
.mega-col a { display: block; font-size: 14px; color: #374151; text-decoration: none; padding: 5px 0; transition: color 0.2s; }
.mega-col a:hover { color: #6366f1; }`
  },
  {
    id:'nav-gradient', name:'Gradient Brand Nav', tag:'navbar', description:'Vibrant gradient navbar for bold landing pages.',
    preview:(<div style={{background:'linear-gradient(135deg,#6366f1,#a855f7)',padding:'12px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderRadius:0}}>
      <div style={{fontWeight:800,fontSize:15,color:'#fff'}}>✦ Spark</div>
      <div style={{display:'flex',gap:18,fontSize:12,color:'rgba(255,255,255,0.7)'}}><span>Features</span><span>Pricing</span><span>Blog</span></div>
      <div style={{background:'#fff',color:'#6366f1',borderRadius:6,padding:'6px 14px',fontSize:12,fontWeight:700}}>Try Free</div>
    </div>),
    html:`<nav class="gradient-nav">
  <a class="gradient-nav__logo" href="#">✦ Spark</a>
  <ul class="gradient-nav__links">
    <li><a href="#">Features</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Blog</a></li>
  </ul>
  <a class="gradient-nav__cta" href="#">Try Free</a>
</nav>`,
    css:`.gradient-nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 28px; background: linear-gradient(135deg, #6366f1, #a855f7); }
.gradient-nav__logo { font-weight: 800; font-size: 20px; color: #fff; text-decoration: none; }
.gradient-nav__links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
.gradient-nav__links a { font-size: 14px; color: rgba(255,255,255,0.75); text-decoration: none; transition: color 0.2s; }
.gradient-nav__links a:hover { color: #fff; }
.gradient-nav__cta { background: #fff; color: #6366f1; border-radius: 6px; padding: 8px 20px; font-size: 13px; font-weight: 700; text-decoration: none; }`
  },
  {
    id:'breadcrumb-dark', name:'Dark Breadcrumbs', tag:'breadcrumb', description:'Breadcrumbs for dark interfaces with muted separators.',
    preview:(<div style={{padding:'10px 0'}}>
      <ol style={{display:'flex',alignItems:'center',gap:6,listStyle:'none',margin:0,padding:0,fontSize:12}}>
        <li><span style={{color:'rgba(255,255,255,0.45)'}}>Home</span></li>
        <li style={{color:'rgba(255,255,255,0.2)'}}>›</li>
        <li><span style={{color:'rgba(255,255,255,0.45)'}}>Collections</span></li>
        <li style={{color:'rgba(255,255,255,0.2)'}}>›</li>
        <li style={{color:'#fff',fontWeight:500}}>Navigation</li>
      </ol>
    </div>),
    html:`<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-dark">
    <li><a href="#">Home</a></li>
    <li aria-hidden="true">›</li>
    <li><a href="#">Collections</a></li>
    <li aria-hidden="true">›</li>
    <li aria-current="page">Navigation</li>
  </ol>
</nav>`,
    css:`.breadcrumb-dark { display: flex; align-items: center; gap: 8px; list-style: none; margin: 0; padding: 0; font-size: 13px; }
.breadcrumb-dark a { color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
.breadcrumb-dark a:hover { color: #fff; }
.breadcrumb-dark li[aria-hidden] { color: rgba(255,255,255,0.2); }
.breadcrumb-dark li[aria-current] { color: #fff; font-weight: 500; }`
  },
  {
    id:'tabs-boxed', name:'Boxed Tabs', tag:'tabs', description:'Solid boxed tab buttons in a contained group.',
    preview:(<div style={{display:'inline-flex',border:'1px solid #e5e7eb',borderRadius:8,overflow:'hidden',fontFamily:'system-ui'}}>
      {['Month','Quarter','Year'].map((t,i)=>(<div key={t} style={{padding:'8px 18px',fontSize:13,fontWeight:i===0?600:500,background:i===0?'#6366f1':'#fff',color:i===0?'#fff':'#6b7280',borderRight:i<2?'1px solid #e5e7eb':'none',cursor:'pointer'}}>{t}</div>))}
    </div>),
    html:`<div class="tabs-boxed" role="tablist">
  <button class="tab-box active">Month</button>
  <button class="tab-box">Quarter</button>
  <button class="tab-box">Year</button>
</div>`,
    css:`.tabs-boxed { display: inline-flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.tab-box { padding: 9px 20px; font-size: 14px; font-weight: 500; background: #fff; color: #6b7280; border: none; border-right: 1px solid #e5e7eb; cursor: pointer; transition: all 0.2s; }
.tab-box:last-child { border-right: none; }
.tab-box:hover { background: #f9fafb; }
.tab-box.active { background: #6366f1; color: #fff; font-weight: 600; }`
  },
  {
    id:'pagination-compact', name:'Compact Pagination', tag:'pagination', description:'Small two-sided prev/next pagination for tight spaces.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'system-ui'}}>
      <div style={{padding:'6px 14px',border:'1px solid #e5e7eb',borderRadius:6,fontSize:12,color:'#374151',background:'#fff',cursor:'pointer'}}>← Prev</div>
      <span style={{fontSize:12,color:'#9ca3af'}}>5 / 20</span>
      <div style={{padding:'6px 14px',border:'1px solid #e5e7eb',borderRadius:6,fontSize:12,color:'#374151',background:'#fff',cursor:'pointer'}}>Next →</div>
    </div>),
    html:`<nav class="pag-compact" aria-label="Pagination">
  <a class="pag-compact__btn" href="#">← Prev</a>
  <span class="pag-compact__info">5 / 20</span>
  <a class="pag-compact__btn" href="#">Next →</a>
</nav>`,
    css:`.pag-compact { display: flex; align-items: center; gap: 10px; }
.pag-compact__btn { padding: 7px 16px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; color: #374151; background: #fff; text-decoration: none; transition: all 0.2s; }
.pag-compact__btn:hover { border-color: #6366f1; color: #6366f1; }
.pag-compact__info { font-size: 13px; color: #9ca3af; }`
  },
  {
    id:'sidebar-group', name:'Grouped Sidebar', tag:'sidebar', description:'Sidebar with grouped sections and dividers.',
    preview:(<div style={{width:140,background:'#fff',minHeight:180,borderRadius:12,padding:'12px 0',fontFamily:'system-ui',border:'1px solid #e5e7eb'}}>
      <div style={{padding:'4px 14px',fontSize:10,color:'#9ca3af',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:2}}>Main</div>
      {['Dashboard','Projects'].map((l,i)=>(<div key={l} style={{padding:'7px 14px',fontSize:12,color:i===0?'#6366f1':'#374151',background:i===0?'rgba(99,102,241,0.06)':'transparent',borderRadius:4,margin:'0 4px',cursor:'pointer'}}>{l}</div>))}
      <div style={{borderTop:'1px solid #f3f4f6',margin:'8px 0',padding:'8px 14px 0'}}>
        <div style={{fontSize:10,color:'#9ca3af',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:2}}>Account</div>
        {['Settings','Billing'].map(l=>(<div key={l} style={{padding:'7px 0',fontSize:12,color:'#374151',cursor:'pointer'}}>{l}</div>))}
      </div>
    </div>),
    html:`<nav class="sidebar-grouped">
  <p class="sidebar-group__label">Main</p>
  <a class="sidebar-group__item active" href="#">Dashboard</a>
  <a class="sidebar-group__item" href="#">Projects</a>
  <hr class="sidebar-group__divider">
  <p class="sidebar-group__label">Account</p>
  <a class="sidebar-group__item" href="#">Settings</a>
  <a class="sidebar-group__item" href="#">Billing</a>
</nav>`,
    css:`.sidebar-grouped { width: 220px; background: #fff; border-right: 1px solid #e5e7eb; min-height: 100vh; padding: 16px 0; }
.sidebar-group__label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; padding: 0 16px; margin-bottom: 4px; }
.sidebar-group__item { display: block; font-size: 14px; color: #374151; text-decoration: none; padding: 8px 12px; margin: 0 8px; border-radius: 6px; transition: all 0.2s; }
.sidebar-group__item:hover { background: #f9fafb; }
.sidebar-group__item.active { background: rgba(99,102,241,0.07); color: #6366f1; font-weight: 500; }
.sidebar-group__divider { border: none; border-top: 1px solid #f3f4f6; margin: 10px 0; }`
  },
  {
    id:'tabs-icon', name:'Icon Tabs', tag:'tabs', description:'Tabs with leading icons for visual context.',
    preview:(<div style={{borderBottom:'1px solid #e5e7eb',fontFamily:'system-ui',display:'flex'}}>
      {[['⊞','Overview'],['◈','Stats'],['✉','Messages']].map(([icon,label],i)=>(<div key={label} style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',fontSize:13,fontWeight:i===0?600:500,color:i===0?'#6366f1':'#6b7280',borderBottom:i===0?'2px solid #6366f1':'2px solid transparent',cursor:'pointer'}}>
        <span style={{fontSize:14}}>{icon}</span>{label}
      </div>))}
    </div>),
    html:`<div class="icon-tabs" role="tablist">
  <button class="icon-tab active" role="tab"><span>⊞</span>Overview</button>
  <button class="icon-tab" role="tab"><span>◈</span>Stats</button>
  <button class="icon-tab" role="tab"><span>✉</span>Messages</button>
</div>`,
    css:`.icon-tabs { display: flex; border-bottom: 1px solid #e5e7eb; }
.icon-tab { display: flex; align-items: center; gap: 6px; padding: 10px 18px; font-size: 14px; font-weight: 500; color: #6b7280; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; margin-bottom: -1px; transition: all 0.2s; }
.icon-tab span { font-size: 16px; }
.icon-tab:hover { color: #374151; }
.icon-tab.active { color: #6366f1; border-bottom-color: #6366f1; font-weight: 600; }`
  },
  {
    id:'pagination-dots', name:'Dot Pagination', tag:'pagination', description:'Dot indicator style pagination for carousels and slides.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px 0'}}>
      {[0,1,2,3,4].map(i=>(<div key={i} style={{width:i===1?24:8,height:8,borderRadius:4,background:i===1?'#6366f1':'#e5e7eb',transition:'all 0.3s',cursor:'pointer'}} />))}
    </div>),
    html:`<nav class="dot-pagination" aria-label="Slide navigation">
  <button class="dot" aria-label="Slide 1"></button>
  <button class="dot active" aria-label="Slide 2" aria-current="true"></button>
  <button class="dot" aria-label="Slide 3"></button>
  <button class="dot" aria-label="Slide 4"></button>
  <button class="dot" aria-label="Slide 5"></button>
</nav>`,
    css:`.dot-pagination { display: flex; align-items: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 4px; background: #e5e7eb; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0; }
.dot:hover { background: #d1d5db; }
.dot.active { width: 24px; background: #6366f1; }`
  },
];

const CATS = [{key:'all',label:'All'},{key:'navbar',label:'Navbars'},{key:'sidebar',label:'Sidebars'},{key:'breadcrumb',label:'Breadcrumbs'},{key:'tabs',label:'Tabs'},{key:'pagination',label:'Pagination'},{key:'megamenu',label:'Mega Menus'}];

function buildSections(item: NavItem): CodeSection[] {
  return [
    {label:'HTML',language:'html',code:item.html},
    {label:'CSS',language:'css',code:item.css},
  ];
}

export default function Navigation() {
  const [selected, setSelected] = useState<NavItem|null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO
      title="CSS Navigation Components — Navbars, Tabs, Sidebar & Breadcrumbs — UIXplor"
      description={`${items.length} copy-paste CSS navigation components: topbars, dark navbars, glass navbars, breadcrumbs, pill tabs, sidebars, and pagination. Production-ready HTML + CSS snippets.`}
      path="/collections/navigation"
      keywords={['CSS navbar','navigation CSS','tabs CSS','breadcrumbs CSS','sidebar CSS','pagination CSS','copy paste navigation']}
      jsonLd={[{'@context':'https://schema.org','@type':'CollectionPage',name:'CSS Navigation Components — UIXplor',url:'https://uixplor.com/collections/navigation',numberOfItems:items.length,isPartOf:{'@type':'WebSite',name:'UIXplor',url:'https://uixplor.com'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://uixplor.com'},{'@type':'ListItem',position:2,name:'Collections',item:'https://uixplor.com/collections'},{'@type':'ListItem',position:3,name:'Navigation',item:'https://uixplor.com/collections/navigation'}]}]}
    />
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Navigation</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">CSS Navigation <span className="text-[#B8FB3C]">Components</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} production-ready navbars, sidebars, breadcrumbs, tabs, and pagination components. Copy the HTML + CSS instantly.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]"/>{items.length} components</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATS.map(c=><button key={c.key} onClick={()=>setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat===c.key?'bg-[#B8FB3C] text-[#0a0a0f]':'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item,index)=>(<motion.article key={item.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.02}} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center p-4 bg-white/[0.02]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={()=>setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.18)] transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=navigation`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
            </div>
          </motion.article>))}
        </div>
        <article className="mt-20 max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">CSS Navigation Components — Copy & Paste</h2>
            <p className="text-white/50 leading-relaxed text-sm sm:text-base">Navigation is the backbone of every web application. UIXplor{"'"}s navigation collection gives you {items.length} production-ready CSS navigation components spanning every pattern a modern project needs — from minimal topbars and dark glassmorphism navbars to grouped sidebars, mega menus, animated tabs, and dot-indicator pagination. Every component is built with semantic HTML, uses no JavaScript frameworks, and is fully responsive. Simply click <strong className="text-white/70">View Code →</strong> on any card to copy the HTML and CSS and paste it directly into your project.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{href:'/collections/buttons',icon:'🖱️',title:'CSS Buttons',desc:'Hover, 3D and neon styles'},{href:'/collections/box-shadows',icon:'🔳',title:'Box Shadows',desc:'100 copy-paste shadows'},{href:'/collections/glass-effects',icon:'🪟',title:'Glass Effects',desc:'Glassmorphism snippets'}].map(l=><Link key={l.href} href={l.href} className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-[#B8FB3C]/30 hover:bg-[#B8FB3C]/5 transition-all duration-300"><span className="text-lg">{l.icon}</span><span className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">{l.title}</span><span className="text-xs text-white/40">{l.desc}</span></Link>)}
            </div>
          </section>
        </article>
      </div>
    </main>
    <CodeViewerOverlay isOpen={!!selected} onClose={()=>setSelected(null)} title={selected?.name||''} sections={selected?buildSections(selected):[]}/>
  </>);
}
