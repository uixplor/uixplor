import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface DashItem { id:string; name:string; tag:string; description:string; preview:React.ReactNode; html:string; css:string; }

export const items: DashItem[] = [
  {id:'stat-revenue',name:'Revenue Stat Card',tag:'stats',description:'Dark KPI card with trend indicator.',
    preview:(<div style={{background:'linear-gradient(145deg,rgba(255,255,255,0.04),rgba(0,0,0,0.25))',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:20,color:'#fff',width:200,fontFamily:'system-ui'}}>
      <div style={{fontSize:10,opacity:0.4,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Total Revenue</div>
      <div style={{fontSize:28,fontWeight:700,marginBottom:4}}>$84.2k</div>
      <div style={{fontSize:11,color:'#4ade80'}}>↑ 12.4% vs last month</div>
    </div>),
    html:`<div class="kpi-card">
  <span class="kpi-label">Total Revenue</span>
  <div class="kpi-value">$84.2k</div>
  <span class="kpi-trend kpi-trend--up">↑ 12.4% vs last month</span>
</div>`,
    css:`.kpi-card { background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25)); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; color: #fff; font-family: system-ui, sans-serif; }
.kpi-label { display: block; font-size: 11px; opacity: 0.4; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
.kpi-value { font-size: 32px; font-weight: 700; margin-bottom: 6px; }
.kpi-trend { font-size: 12px; }
.kpi-trend--up { color: #4ade80; }
.kpi-trend--down { color: #f87171; }`
  },
  {id:'stat-users',name:'Users Stat Card',tag:'stats',description:'User count card with sparkline placeholder.',
    preview:(<div style={{background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.08))',border:'1px solid rgba(99,102,241,0.25)',borderRadius:16,padding:20,color:'#fff',width:200,fontFamily:'system-ui'}}>
      <div style={{fontSize:10,color:'#a5b4fc',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Active Users</div>
      <div style={{fontSize:28,fontWeight:700,marginBottom:4}}>24,582</div>
      <div style={{display:'flex',gap:2,alignItems:'flex-end',height:24}}>
        {[40,60,45,70,55,80,65].map((h,i)=>(<div key={i} style={{width:8,height:`${h}%`,background:'rgba(99,102,241,0.6)',borderRadius:2}} />))}
      </div>
    </div>),
    html:`<div class="kpi-card kpi-card--indigo">
  <span class="kpi-label">Active Users</span>
  <div class="kpi-value">24,582</div>
  <div class="sparkline"><!-- chart bars --></div>
</div>`,
    css:`.kpi-card--indigo { background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08)); border: 1px solid rgba(99,102,241,0.25); }
.kpi-card--indigo .kpi-label { color: #a5b4fc; }
.sparkline { display: flex; align-items: flex-end; gap: 3px; height: 28px; }
.sparkline__bar { width: 8px; background: rgba(99,102,241,0.6); border-radius: 2px; }`
  },
  {id:'activity-feed',name:'Activity Feed',tag:'feed',description:'Vertical timeline activity list.',
    preview:(<div style={{fontFamily:'system-ui',width:220}}>
      {[{icon:'✓',label:'Deploy succeeded',time:'2m ago',c:'#4ade80'},{icon:'✎',label:'Config updated',time:'18m ago',c:'#60a5fa'},{icon:'⚠',label:'High memory usage',time:'1h ago',c:'#fbbf24'}].map((e,i)=>(<div key={i} style={{display:'flex',gap:10,paddingBottom:i<2?14:0,position:'relative'}}>
        {i<2&&<div style={{position:'absolute',left:12,top:26,bottom:0,width:1,background:'rgba(255,255,255,0.06)'}} />}
        <div style={{width:24,height:24,borderRadius:'50%',background:e.c+'22',border:`1px solid ${e.c}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:e.c,flexShrink:0}}>{e.icon}</div>
        <div><div style={{fontSize:12,color:'#fff',fontWeight:500}}>{e.label}</div><div style={{fontSize:10,color:'rgba(255,255,255,0.3)'}}>{e.time}</div></div>
      </div>))}
    </div>),
    html:`<ul class="activity-feed">
  <li class="activity-item">
    <span class="activity-icon activity-icon--success">✓</span>
    <div><p class="activity-label">Deploy succeeded</p><time class="activity-time">2m ago</time></div>
  </li>
  <li class="activity-item">
    <span class="activity-icon activity-icon--info">✎</span>
    <div><p class="activity-label">Config updated</p><time class="activity-time">18m ago</time></div>
  </li>
</ul>`,
    css:`.activity-feed { list-style: none; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
.activity-item { display: flex; gap: 10px; padding-bottom: 16px; position: relative; }
.activity-item:not(:last-child)::before { content: ''; position: absolute; left: 11px; top: 26px; bottom: 0; width: 1px; background: rgba(255,255,255,0.07); }
.activity-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; }
.activity-icon--success { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
.activity-icon--info { background: rgba(96,165,250,0.15); color: #60a5fa; border: 1px solid rgba(96,165,250,0.25); }
.activity-label { font-size: 13px; color: #fff; font-weight: 500; margin: 0 0 2px; }
.activity-time { font-size: 11px; color: rgba(255,255,255,0.35); }`
  },
  {id:'sidebar-dash',name:'Dashboard Sidebar',tag:'sidebar',description:'Full app sidebar with branding and nav groups.',
    preview:(<div style={{width:140,background:'#0f172a',minHeight:200,borderRadius:12,padding:'14px 0',fontFamily:'system-ui',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'0 14px 12px',fontWeight:700,fontSize:13,color:'#6366f1',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>⬡ AppDash</div>
      {[{icon:'⊞',l:'Dashboard',a:true},{icon:'◈',l:'Analytics'},{icon:'⊡',l:'Projects'},{icon:'✉',l:'Inbox'}].map(item=>(<div key={item.l} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',fontSize:11,color:item.a?'#fff':'rgba(255,255,255,0.35)',background:item.a?'rgba(99,102,241,0.15)':'transparent'}}>
        <span style={{color:item.a?'#6366f1':'rgba(255,255,255,0.25)'}}>{item.icon}</span>{item.l}
      </div>))}
    </div>),
    html:`<aside class="dash-sidebar">
  <div class="dash-sidebar__brand">⬡ AppDash</div>
  <nav class="dash-sidebar__nav">
    <a class="dash-nav-item active" href="#"><span>⊞</span>Dashboard</a>
    <a class="dash-nav-item" href="#"><span>◈</span>Analytics</a>
    <a class="dash-nav-item" href="#"><span>⊡</span>Projects</a>
    <a class="dash-nav-item" href="#"><span>✉</span>Inbox</a>
  </nav>
</aside>`,
    css:`.dash-sidebar { width: 220px; background: #0f172a; min-height: 100vh; display: flex; flex-direction: column; }
.dash-sidebar__brand { padding: 20px; font-weight: 700; font-size: 18px; color: #6366f1; border-bottom: 1px solid rgba(255,255,255,0.05); }
.dash-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 20px; font-size: 14px; color: rgba(255,255,255,0.4); text-decoration: none; transition: all 0.2s; }
.dash-nav-item span { font-size: 16px; }
.dash-nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.04); }
.dash-nav-item.active { color: #fff; background: rgba(99,102,241,0.15); }
.dash-nav-item.active span { color: #6366f1; }`
  },
  {id:'analytics-card',name:'Analytics Summary',tag:'stats',description:'Multi-metric overview card.',
    preview:(<div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:16,width:220,fontFamily:'system-ui'}}>
      <div style={{fontSize:11,fontWeight:700,color:'#6b7280',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.05em'}}>This Week</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {[['Sessions','4,821','↑ 8%','#6366f1'],['Bounce','62%','↓ 3%','#22c55e'],['Duration','3m 12s','↑ 5%','#f59e0b'],['Conv.','2.4%','↑ 1%','#ec4899']].map(([label,val,trend,color])=>(<div key={label}>
          <div style={{fontSize:9,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em'}}>{label}</div>
          <div style={{fontSize:16,fontWeight:700,color:'#111',margin:'2px 0'}}>{val}</div>
          <div style={{fontSize:10,color}}>{trend}</div>
        </div>))}
      </div>
    </div>),
    html:`<div class="analytics-card">
  <p class="analytics-period">This Week</p>
  <div class="analytics-grid">
    <div class="metric"><span class="metric__label">Sessions</span><span class="metric__value">4,821</span><span class="metric__trend up">↑ 8%</span></div>
    <div class="metric"><span class="metric__label">Bounce</span><span class="metric__value">62%</span><span class="metric__trend down">↓ 3%</span></div>
    <div class="metric"><span class="metric__label">Duration</span><span class="metric__value">3m 12s</span><span class="metric__trend">↑ 5%</span></div>
    <div class="metric"><span class="metric__label">Conv.</span><span class="metric__value">2.4%</span><span class="metric__trend">↑ 1%</span></div>
  </div>
</div>`,
    css:`.analytics-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px; font-family: system-ui, sans-serif; }
.analytics-period { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; }
.analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.metric { display: flex; flex-direction: column; gap: 2px; }
.metric__label { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
.metric__value { font-size: 18px; font-weight: 700; color: #111; }
.metric__trend { font-size: 11px; color: #6b7280; }
.metric__trend.up { color: #22c55e; }
.metric__trend.down { color: #ef4444; }`
  },
  {id:'profile-section',name:'Profile Section',tag:'profile',description:'Header profile card with avatar and stats.',
    preview:(<div style={{textAlign:'center',padding:'16px 20px',background:'#fff',borderRadius:16,border:'1px solid #e5e7eb',fontFamily:'system-ui',width:200}}>
      <div style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#a855f7)',margin:'0 auto 10px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:22,fontWeight:700}}>S</div>
      <div style={{fontSize:14,fontWeight:700,color:'#111'}}>Sarah Chen</div>
      <div style={{fontSize:11,color:'#9ca3af',marginBottom:12}}>UX Designer · San Francisco</div>
      <div style={{display:'flex',justifyContent:'center',gap:20,borderTop:'1px solid #f3f4f6',paddingTop:12}}>
        {[['28','Posts'],['4.2k','Followers'],['310','Following']].map(([v,l])=>(<div key={l}><div style={{fontSize:14,fontWeight:700,color:'#111'}}>{v}</div><div style={{fontSize:10,color:'#9ca3af'}}>{l}</div></div>))}
      </div>
    </div>),
    html:`<div class="profile-header">
  <div class="profile-avatar">S</div>
  <h2 class="profile-name">Sarah Chen</h2>
  <p class="profile-subtitle">UX Designer · San Francisco</p>
  <div class="profile-stats">
    <div class="profile-stat"><span class="stat-val">28</span><span class="stat-key">Posts</span></div>
    <div class="profile-stat"><span class="stat-val">4.2k</span><span class="stat-key">Followers</span></div>
    <div class="profile-stat"><span class="stat-val">310</span><span class="stat-key">Following</span></div>
  </div>
</div>`,
    css:`.profile-header { text-align: center; padding: 24px; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; font-family: system-ui, sans-serif; }
.profile-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: 700; }
.profile-name { font-size: 16px; font-weight: 700; color: #111; margin: 0 0 4px; }
.profile-subtitle { font-size: 12px; color: #9ca3af; margin-bottom: 16px; }
.profile-stats { display: flex; justify-content: center; gap: 24px; border-top: 1px solid #f3f4f6; padding-top: 14px; }
.profile-stat { display: flex; flex-direction: column; align-items: center; }
.stat-val { font-size: 15px; font-weight: 700; color: #111; }
.stat-key { font-size: 10px; color: #9ca3af; }`
  },
  {id:'chart-placeholder',name:'Chart Placeholder',tag:'chart',description:'Bar chart skeleton for analytics dashboards.',
    preview:(<div style={{background:'#0f172a',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16,width:220,fontFamily:'system-ui'}}>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:12}}>Monthly Revenue</div>
      <div style={{display:'flex',alignItems:'flex-end',gap:5,height:60}}>
        {[40,65,50,80,55,90,70,85,60,75,88,95].map((h,i)=>(<div key={i} style={{flex:1,height:`${h}%`,background:i===11?'#6366f1':'rgba(99,102,241,0.25)',borderRadius:'3px 3px 0 0'}} />))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:9,color:'rgba(255,255,255,0.2)'}}>
        {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m=>(<span key={m}>{m}</span>))}
      </div>
    </div>),
    html:`<div class="chart-card">
  <p class="chart-title">Monthly Revenue</p>
  <div class="bar-chart">
    <!-- Repeat .bar with varying heights -->
    <div class="bar" style="height:40%"></div>
    <div class="bar" style="height:65%"></div>
    <div class="bar bar--active" style="height:95%"></div>
  </div>
</div>`,
    css:`.chart-card { background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; font-family: system-ui, sans-serif; }
.chart-title { font-size: 12px; color: rgba(255,255,255,0.45); margin-bottom: 14px; }
.bar-chart { display: flex; align-items: flex-end; gap: 5px; height: 80px; }
.bar { flex: 1; background: rgba(99,102,241,0.25); border-radius: 3px 3px 0 0; transition: background 0.2s; }
.bar:hover, .bar--active { background: #6366f1; }`
  },
  {id:'table-row',name:'Data Table Row',tag:'table',description:'Styled table row with avatar, status badge, and actions.',
    preview:(<div style={{fontFamily:'system-ui',background:'#fff',borderRadius:12,border:'1px solid #e5e7eb',overflow:'hidden',width:300}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:0,fontSize:11,fontWeight:700,color:'#9ca3af',padding:'8px 14px',borderBottom:'1px solid #f3f4f6',textTransform:'uppercase',letterSpacing:'0.05em'}}>
        <span>User</span><span>Status</span><span style={{paddingLeft:12}}>Role</span>
      </div>
      {[['J','Jamie Lee','Admin','#dcfce7','#166534'],['M','Morgan','Editor','#eff6ff','#1e40af']].map(([init,name,role,bg,color])=>(<div key={name} style={{display:'grid',gridTemplateColumns:'1fr auto auto',alignItems:'center',gap:0,padding:'10px 14px',borderBottom:'1px solid #f9fafb',fontSize:12}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{init}</div>{name}</div>
        <span style={{fontSize:10,padding:'2px 8px',borderRadius:50,background:bg,color,fontWeight:600}}>{role}</span>
        <span style={{paddingLeft:12,fontSize:11,color:'#6366f1',cursor:'pointer'}}>Edit</span>
      </div>))}
    </div>),
    html:`<table class="data-table">
  <thead><tr><th>User</th><th>Status</th><th>Action</th></tr></thead>
  <tbody>
    <tr class="data-row">
      <td class="data-cell-user"><div class="d-avatar">J</div>Jamie Lee</td>
      <td><span class="role-badge role--admin">Admin</span></td>
      <td><a class="data-action" href="#">Edit</a></td>
    </tr>
  </tbody>
</table>`,
    css:`.data-table { width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
.data-table th { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 16px; border-bottom: 1px solid #f3f4f6; text-align: left; }
.data-row td { padding: 12px 16px; border-bottom: 1px solid #f9fafb; font-size: 13px; color: #374151; }
.data-cell-user { display: flex; align-items: center; gap: 8px; }
.d-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.role-badge { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 50px; }
.role--admin { background: #dcfce7; color: #166534; }
.data-action { color: #6366f1; text-decoration: none; font-size: 12px; }`
  },
  {id:'notification-center',name:'Notification Center',tag:'feed',description:'Dropdown notification list with read/unread states.',
    preview:(<div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,width:240,fontFamily:'system-ui',boxShadow:'0 8px 24px rgba(0,0,0,0.08)'}}>
      <div style={{padding:'10px 14px',fontWeight:700,fontSize:12,borderBottom:'1px solid #f3f4f6',display:'flex',justifyContent:'space-between'}}><span>Notifications</span><span style={{color:'#6366f1',fontSize:11}}>Mark all read</span></div>
      {[{dot:true,msg:'Alex commented on your post',t:'5m'},{dot:false,msg:'New release: v2.1 is ready',t:'1h'}].map((n,i)=>(<div key={i} style={{display:'flex',gap:10,padding:'10px 14px',borderBottom:'1px solid #f9fafb',background:n.dot?'#fafafa':'#fff'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:n.dot?'#6366f1':'transparent',marginTop:5,flexShrink:0}} />
        <div><div style={{fontSize:12,color:'#111'}}>{n.msg}</div><div style={{fontSize:10,color:'#9ca3af'}}>{n.t} ago</div></div>
      </div>))}
    </div>),
    html:`<div class="notif-center">
  <div class="notif-header">
    <span>Notifications</span>
    <button class="notif-mark-read">Mark all read</button>
  </div>
  <div class="notif-item unread">
    <span class="notif-dot"></span>
    <div><p class="notif-msg">Alex commented on your post</p><time>5m ago</time></div>
  </div>
  <div class="notif-item">
    <span class="notif-dot notif-dot--read"></span>
    <div><p class="notif-msg">New release: v2.1 is ready</p><time>1h ago</time></div>
  </div>
</div>`,
    css:`.notif-center { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); font-family: system-ui, sans-serif; overflow: hidden; }
.notif-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f3f4f6; font-size: 13px; font-weight: 700; color: #111; }
.notif-mark-read { background: none; border: none; color: #6366f1; font-size: 12px; cursor: pointer; }
.notif-item { display: flex; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #f9fafb; }
.notif-item.unread { background: #fafafa; }
.notif-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; margin-top: 5px; flex-shrink: 0; }
.notif-dot--read { background: transparent; }
.notif-msg { font-size: 13px; color: #111827; margin: 0 0 2px; line-height: 1.4; }
time { font-size: 11px; color: #9ca3af; }`
  },
  {id:'admin-header',name:'Admin Panel Header',tag:'admin',description:'Top bar header for admin dashboards.',
    preview:(<div style={{background:'#fff',borderBottom:'1px solid #e5e7eb',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'system-ui',width:300}}>
      <div style={{fontWeight:700,fontSize:14,color:'#111'}}>Admin Panel</div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{background:'#f3f4f6',borderRadius:6,padding:'5px 10px',fontSize:11,color:'#6b7280',cursor:'text'}}>🔍 Search</div>
        <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#a855f7)'}} />
      </div>
    </div>),
    html:`<header class="admin-header">
  <span class="admin-header__title">Admin Panel</span>
  <div class="admin-header__actions">
    <div class="admin-search">🔍 Search</div>
    <div class="admin-avatar"></div>
  </div>
</header>`,
    css:`.admin-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; background: #fff; border-bottom: 1px solid #e5e7eb; font-family: system-ui, sans-serif; }
.admin-header__title { font-size: 16px; font-weight: 700; color: #111; }
.admin-header__actions { display: flex; align-items: center; gap: 12px; }
.admin-search { background: #f3f4f6; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #6b7280; cursor: pointer; }
.admin-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); }`
  },
];

const CATS = [{key:'all',label:'All'},{key:'stats',label:'Stats'},{key:'sidebar',label:'Sidebar'},{key:'feed',label:'Feed'},{key:'chart',label:'Charts'},{key:'table',label:'Tables'},{key:'profile',label:'Profile'},{key:'admin',label:'Admin'}];
function buildSections(item: DashItem): CodeSection[] { return [{label:'HTML',language:'html',code:item.html},{label:'CSS',language:'css',code:item.css}]; }

export default function Dashboard() {
  const [selected, setSelected] = useState<DashItem|null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO title="CSS Dashboard Components — Stats Cards, Sidebars, Tables — UIXplor" description={`${items.length} CSS dashboard UI components: KPI stat cards, sidebar navigation, activity feeds, analytics summaries, data tables, admin headers. Copy HTML + CSS instantly.`} path="/collections/dashboard" keywords={['dashboard CSS','stat card CSS','admin UI CSS','data table CSS','sidebar navigation CSS','analytics card CSS']} jsonLd={[{'@context':'https://schema.org','@type':'CollectionPage',name:'CSS Dashboard Components — UIXplor',url:'https://uixplor.com/collections/dashboard',numberOfItems:items.length,isPartOf:{'@type':'WebSite',name:'UIXplor',url:'https://uixplor.com'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://uixplor.com'},{'@type':'ListItem',position:2,name:'Collections',item:'https://uixplor.com/collections'},{'@type':'ListItem',position:3,name:'Dashboard',item:'https://uixplor.com/collections/dashboard'}]}]}/>
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Dashboard</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Dashboard <span className="text-[#B8FB3C]">Components</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} production-ready dashboard UI components: stat cards, sidebars, analytics, data tables, and admin panels.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]"/>{items.length} components</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">{CATS.map(c=><button key={c.key} onClick={()=>setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat===c.key?'bg-[#B8FB3C] text-[#0a0a0f]':'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item,index)=>(<motion.article key={item.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.02}} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-44 sm:h-52 flex items-center justify-center p-4 bg-white/[0.02]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={()=>setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=dashboard`}
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
