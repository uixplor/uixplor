import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface FeedbackItem { id:string; name:string; tag:string; description:string; preview:React.ReactNode; html:string; css:string; }

export const items: FeedbackItem[] = [
  {
    id:'toast-success', name:'Success Toast', tag:'toast', description:'Green success toast notification.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:10,background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'12px 16px',fontFamily:'system-ui',maxWidth:280}}>
      <span style={{width:22,height:22,borderRadius:'50%',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,flexShrink:0}}>✓</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#166534',margin:0}}>Changes saved!</p><p style={{fontSize:11,color:'#16a34a',margin:0}}>Your profile was updated.</p></div>
    </div>),
    html:`<div class="toast toast--success" role="alert">
  <span class="toast__icon">✓</span>
  <div class="toast__body">
    <p class="toast__title">Changes saved!</p>
    <p class="toast__message">Your profile was updated.</p>
  </div>
</div>`,
    css:`.toast { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 10px; font-family: system-ui, sans-serif; max-width: 320px; animation: slideIn 0.3s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
.toast__icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: bold; flex-shrink: 0; }
.toast__title { font-size: 13px; font-weight: 600; margin: 0 0 2px; }
.toast__message { font-size: 12px; margin: 0; }
.toast--success { background: #f0fdf4; border: 1px solid #bbf7d0; }
.toast--success .toast__icon { background: #22c55e; }
.toast--success .toast__title { color: #166534; }
.toast--success .toast__message { color: #16a34a; }`
  },
  {
    id:'toast-error', name:'Error Toast', tag:'toast', description:'Red error toast for failure states.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:10,background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'12px 16px',fontFamily:'system-ui',maxWidth:280}}>
      <span style={{width:22,height:22,borderRadius:'50%',background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,flexShrink:0}}>✕</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#991b1b',margin:0}}>Upload failed!</p><p style={{fontSize:11,color:'#dc2626',margin:0}}>File size exceeds 5MB limit.</p></div>
    </div>),
    html:`<div class="toast toast--error" role="alert">
  <span class="toast__icon">✕</span>
  <div class="toast__body">
    <p class="toast__title">Upload failed!</p>
    <p class="toast__message">File size exceeds 5MB limit.</p>
  </div>
</div>`,
    css:`.toast--error { background: #fef2f2; border: 1px solid #fecaca; }
.toast--error .toast__icon { background: #ef4444; }
.toast--error .toast__title { color: #991b1b; }
.toast--error .toast__message { color: #dc2626; }`
  },
  {
    id:'toast-dark', name:'Dark Toast', tag:'toast', description:'Dark floating toast for dark-mode apps.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:10,background:'#18181b',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'12px 16px',fontFamily:'system-ui',maxWidth:280,boxShadow:'0 8px 24px rgba(0,0,0,0.4)'}}>
      <span style={{width:22,height:22,borderRadius:'50%',background:'#B8FB3C',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontSize:12,flexShrink:0}}>✓</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#fff',margin:0}}>Link copied!</p><p style={{fontSize:11,color:'rgba(255,255,255,0.45)',margin:0}}>Ready to share.</p></div>
    </div>),
    html:`<div class="toast toast--dark" role="alert">
  <span class="toast__icon">✓</span>
  <div>
    <p class="toast__title">Link copied!</p>
    <p class="toast__message">Ready to share.</p>
  </div>
</div>`,
    css:`.toast--dark { background: #18181b; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
.toast--dark .toast__icon { background: #B8FB3C; color: #000; }
.toast--dark .toast__title { color: #ffffff; }
.toast--dark .toast__message { color: rgba(255,255,255,0.45); }`
  },
  {
    id:'alert-info', name:'Info Alert', tag:'alert', description:'Blue informational alert banner.',
    preview:(<div style={{display:'flex',alignItems:'flex-start',gap:10,background:'#eff6ff',border:'1px solid #bfdbfe',borderLeft:'4px solid #3b82f6',borderRadius:'0 8px 8px 0',padding:'12px 16px',fontFamily:'system-ui',maxWidth:320}}>
      <span style={{color:'#3b82f6',fontSize:18,flexShrink:0}}>ℹ</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#1e40af',margin:'0 0 2px'}}>Heads up</p><p style={{fontSize:12,color:'#1d4ed8',margin:0}}>Your trial ends in 3 days. Upgrade to keep access.</p></div>
    </div>),
    html:`<div class="alert alert--info" role="alert">
  <span class="alert__icon">ℹ</span>
  <div>
    <p class="alert__title">Heads up</p>
    <p class="alert__message">Your trial ends in 3 days. Upgrade to keep access.</p>
  </div>
</div>`,
    css:`.alert { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 8px; font-family: system-ui, sans-serif; }
.alert__icon { font-size: 18px; flex-shrink: 0; line-height: 1.4; }
.alert__title { font-size: 13px; font-weight: 600; margin: 0 0 3px; }
.alert__message { font-size: 12px; margin: 0; line-height: 1.5; }
.alert--info { background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; }
.alert--info .alert__icon { color: #3b82f6; }
.alert--info .alert__title { color: #1e40af; }
.alert--info .alert__message { color: #1d4ed8; }`
  },
  {
    id:'alert-warning', name:'Warning Alert', tag:'alert', description:'Amber warning alert with icon and message.',
    preview:(<div style={{display:'flex',alignItems:'flex-start',gap:10,background:'#fffbeb',border:'1px solid #fde68a',borderLeft:'4px solid #f59e0b',borderRadius:'0 8px 8px 0',padding:'12px 16px',fontFamily:'system-ui',maxWidth:320}}>
      <span style={{color:'#f59e0b',fontSize:18,flexShrink:0}}>⚠</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#92400e',margin:'0 0 2px'}}>Action required</p><p style={{fontSize:12,color:'#b45309',margin:0}}>Please verify your email address to continue.</p></div>
    </div>),
    html:`<div class="alert alert--warning" role="alert">
  <span class="alert__icon">⚠</span>
  <div>
    <p class="alert__title">Action required</p>
    <p class="alert__message">Please verify your email address to continue.</p>
  </div>
</div>`,
    css:`.alert--warning { background: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; }
.alert--warning .alert__icon { color: #f59e0b; }
.alert--warning .alert__title { color: #92400e; }
.alert--warning .alert__message { color: #b45309; }`
  },
  {
    id:'alert-success', name:'Success Alert', tag:'alert', description:'Green success confirmation alert banner.',
    preview:(<div style={{display:'flex',alignItems:'flex-start',gap:10,background:'#f0fdf4',border:'1px solid #bbf7d0',borderLeft:'4px solid #22c55e',borderRadius:'0 8px 8px 0',padding:'12px 16px',fontFamily:'system-ui',maxWidth:320}}>
      <span style={{color:'#22c55e',fontSize:18,flexShrink:0}}>✓</span>
      <div><p style={{fontSize:13,fontWeight:600,color:'#166534',margin:'0 0 2px'}}>Payment confirmed</p><p style={{fontSize:12,color:'#16a34a',margin:0}}>Receipt sent to your email address.</p></div>
    </div>),
    html:`<div class="alert alert--success" role="alert">
  <span class="alert__icon">✓</span>
  <div>
    <p class="alert__title">Payment confirmed</p>
    <p class="alert__message">Receipt sent to your email address.</p>
  </div>
</div>`,
    css:`.alert--success { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #22c55e; border-radius: 0 8px 8px 0; }
.alert--success .toast__icon { color: #22c55e; }
.alert--success .alert__title { color: #166534; }
.alert--success .alert__message { color: #16a34a; }`
  },
  {
    id:'progress-basic', name:'Progress Bar', tag:'progress', description:'Labelled horizontal progress bar with percentage.',
    preview:(<div style={{fontFamily:'system-ui',width:'100%',maxWidth:280}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:12,color:'#374151',fontWeight:500}}>Uploading file</span><span style={{fontSize:12,color:'#6b7280'}}>68%</span></div>
      <div style={{height:8,background:'#e5e7eb',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:'68%',background:'linear-gradient(90deg,#6366f1,#a855f7)',borderRadius:4}} /></div>
    </div>),
    html:`<div class="progress-wrap">
  <div class="progress-header">
    <span>Uploading file</span>
    <span>68%</span>
  </div>
  <div class="progress-track">
    <div class="progress-fill" style="width: 68%"></div>
  </div>
</div>`,
    css:`.progress-wrap { width: 100%; }
.progress-header { display: flex; justify-content: space-between; font-size: 13px; color: #374151; margin-bottom: 6px; font-family: system-ui, sans-serif; }
.progress-track { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #a855f7); border-radius: 4px; transition: width 0.4s ease; }`
  },
  {
    id:'progress-striped', name:'Striped Progress', tag:'progress', description:'Animated striped progress bar for active transfers.',
    preview:(<div style={{width:'100%',maxWidth:280}}>
      <div style={{height:12,background:'#e5e7eb',borderRadius:6,overflow:'hidden'}}>
        <div style={{height:'100%',width:'55%',background:'repeating-linear-gradient(45deg,#22c55e,#22c55e 10px,#16a34a 10px,#16a34a 20px)',borderRadius:6}} />
      </div>
      <div style={{fontSize:11,color:'#6b7280',marginTop:4,textAlign:'center'}}>55% — Syncing…</div>
    </div>),
    html:`<div class="progress-track striped">
  <div class="progress-fill" style="width: 55%"></div>
</div>
<p class="progress-label">55% — Syncing…</p>`,
    css:`.progress-track.striped { height: 12px; background: #e5e7eb; border-radius: 6px; overflow: hidden; }
.progress-track.striped .progress-fill { height: 100%; border-radius: 6px; background: repeating-linear-gradient(45deg, #22c55e, #22c55e 10px, #16a34a 10px, #16a34a 20px); background-size: 28px 28px; animation: stripe-move 0.6s linear infinite; }
@keyframes stripe-move { from { background-position: 0 0; } to { background-position: 28px 0; } }
.progress-label { font-size: 12px; color: #6b7280; text-align: center; margin-top: 6px; }`
  },
  {
    id:'progress-steps', name:'Step Progress', tag:'progress', description:'Step-by-step progress indicator with labels.',
    preview:(<div style={{display:'flex',alignItems:'center',fontFamily:'system-ui',width:'100%',maxWidth:280}}>
      {[['1','Done'],['2','Done'],['3','Active'],['4','']].map(([n,state],i)=>[
        <div key={n} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:state==='Done'?'#6366f1':state==='Active'?'#6366f1':'#e5e7eb',display:'flex',alignItems:'center',justifyContent:'center',color:state?'#fff':'#9ca3af',fontSize:12,fontWeight:700}}>{state==='Done'?'✓':n}</div>
          <span style={{fontSize:9,color:state?'#6366f1':'#9ca3af',fontWeight:500}}>{['Setup','Profile','Plan','Done'][i]}</span>
        </div>,
        i<3 && <div key={`line-${i}`} style={{flex:1,height:2,background:state==='Done'?'#6366f1':'#e5e7eb',marginBottom:14}} />
      ])}
    </div>),
    html:`<ol class="step-progress">
  <li class="step done"><span class="step__num">✓</span><span class="step__label">Setup</span></li>
  <li class="step done"><span class="step__num">✓</span><span class="step__label">Profile</span></li>
  <li class="step active"><span class="step__num">3</span><span class="step__label">Plan</span></li>
  <li class="step"><span class="step__num">4</span><span class="step__label">Done</span></li>
</ol>`,
    css:`.step-progress { display: flex; align-items: center; list-style: none; margin: 0; padding: 0; gap: 0; }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; position: relative; }
.step:not(:last-child)::after { content: ''; position: absolute; top: 14px; left: 50%; width: 100%; height: 2px; background: #e5e7eb; }
.step.done::after, .step.active::after { background: #6366f1; }
.step__num { position: relative; z-index: 1; width: 28px; height: 28px; border-radius: 50%; background: #e5e7eb; color: #9ca3af; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
.step.done .step__num, .step.active .step__num { background: #6366f1; color: #fff; }
.step__label { font-size: 10px; font-weight: 500; color: #9ca3af; }
.step.done .step__label, .step.active .step__label { color: #6366f1; }`
  },
  {
    id:'empty-state', name:'Empty State', tag:'empty', description:'Illustrated empty state with CTA for zero-content screens.',
    preview:(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:'system-ui',textAlign:'center',background:'#f9fafb',borderRadius:12,border:'1px dashed #d1d5db',maxWidth:240}}>
      <div style={{fontSize:36,marginBottom:10}}>📭</div>
      <div style={{fontSize:14,fontWeight:600,color:'#374151',marginBottom:4}}>No messages yet</div>
      <div style={{fontSize:12,color:'#9ca3af',lineHeight:1.5,marginBottom:12}}>When you receive messages,<br/>they{"'"}ll appear here.</div>
      <div style={{background:'#6366f1',color:'#fff',borderRadius:6,padding:'7px 16px',fontSize:12,fontWeight:600}}>Compose</div>
    </div>),
    html:`<div class="empty-state">
  <div class="empty-state__icon">📭</div>
  <h3 class="empty-state__title">No messages yet</h3>
  <p class="empty-state__desc">When you receive messages, they will appear here.</p>
  <a class="empty-state__cta" href="#">Compose</a>
</div>`,
    css:`.empty-state { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px 24px; background: #f9fafb; border: 1px dashed #d1d5db; border-radius: 12px; }
.empty-state__icon { font-size: 48px; margin-bottom: 12px; }
.empty-state__title { font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.empty-state__desc { font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 20px; }
.empty-state__cta { background: #6366f1; color: #fff; border-radius: 6px; padding: 8px 20px; font-size: 13px; font-weight: 600; text-decoration: none; }`
  },
  {
    id:'empty-dark', name:'Dark Empty State', tag:'empty', description:'Dark empty state panel for dashboard UIs.',
    preview:(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:'system-ui',textAlign:'center',background:'rgba(255,255,255,0.03)',borderRadius:12,border:'1px dashed rgba(255,255,255,0.1)',maxWidth:240}}>
      <div style={{fontSize:32,marginBottom:10}}>🗃️</div>
      <div style={{fontSize:13,fontWeight:600,color:'#fff',marginBottom:4}}>No results found</div>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',lineHeight:1.5}}>Try adjusting your filters.</div>
    </div>),
    html:`<div class="empty-dark">
  <div class="empty-dark__icon">🗃️</div>
  <h3 class="empty-dark__title">No results found</h3>
  <p class="empty-dark__desc">Try adjusting your filters.</p>
</div>`,
    css:`.empty-dark { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px 24px; background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; }
.empty-dark__icon { font-size: 40px; margin-bottom: 12px; }
.empty-dark__title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; }
.empty-dark__desc { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.5; }`
  },
  {
    id:'snackbar', name:'Snackbar', tag:'snackbar', description:'Bottom-anchored snackbar with action link.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#1f2937',color:'#fff',borderRadius:8,padding:'11px 16px',fontFamily:'system-ui',gap:16,maxWidth:280}}>
      <span style={{fontSize:12}}>Item moved to trash.</span>
      <span style={{fontSize:12,color:'#B8FB3C',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>Undo</span>
    </div>),
    html:`<div class="snackbar" role="status">
  <span class="snackbar__msg">Item moved to trash.</span>
  <button class="snackbar__action">Undo</button>
</div>`,
    css:`.snackbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: #1f2937; color: #fff; border-radius: 8px; padding: 12px 18px; font-family: system-ui, sans-serif; min-width: 280px; box-shadow: 0 6px 20px rgba(0,0,0,0.25); animation: snackIn 0.3s ease; }
@keyframes snackIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.snackbar__msg { font-size: 13px; }
.snackbar__action { background: none; border: none; color: #B8FB3C; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; padding: 0; }`
  },
  {
    id:'snackbar-colored', name:'Colored Snackbar', tag:'snackbar', description:'Purple-branded snackbar with close button.',
    preview:(<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#6366f1',color:'#fff',borderRadius:8,padding:'11px 16px',fontFamily:'system-ui',gap:12,maxWidth:280}}>
      <span style={{fontSize:12}}>✓ Profile updated successfully!</span>
      <span style={{fontSize:14,cursor:'pointer',opacity:0.7}}>✕</span>
    </div>),
    html:`<div class="snackbar-colored" role="status">
  <span>✓ Profile updated successfully!</span>
  <button class="snackbar-close" aria-label="Close">✕</button>
</div>`,
    css:`.snackbar-colored { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #6366f1; color: #fff; border-radius: 8px; padding: 12px 18px; font-family: system-ui, sans-serif; font-size: 13px; min-width: 260px; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
.snackbar-close { background: none; border: none; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; padding: 0; line-height: 1; transition: color 0.2s; }
.snackbar-close:hover { color: #fff; }`
  },
  {
    id:'badge-status', name:'Status Badges', tag:'badge', description:'Collection of colored status badge pills.',
    preview:(<div style={{display:'flex',flexWrap:'wrap',gap:6,padding:'8px 0',fontFamily:'system-ui'}}>
      {[['Active','#dcfce7','#166534'],['Pending','#fef9c3','#854d0e'],['Failed','#fef2f2','#991b1b'],['Draft','#f1f5f9','#475569'],['New','#eff6ff','#1e40af']].map(([label,bg,color])=>(<span key={label} style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:50,background:bg,color}}>{label}</span>))}
    </div>),
    html:`<span class="badge badge--active">Active</span>
<span class="badge badge--pending">Pending</span>
<span class="badge badge--failed">Failed</span>
<span class="badge badge--draft">Draft</span>
<span class="badge badge--new">New</span>`,
    css:`.badge { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 50px; font-family: system-ui, sans-serif; }
.badge--active { background: #dcfce7; color: #166534; }
.badge--pending { background: #fef9c3; color: #854d0e; }
.badge--failed { background: #fef2f2; color: #991b1b; }
.badge--draft { background: #f1f5f9; color: #475569; }
.badge--new { background: #eff6ff; color: #1e40af; }`
  },
  {
    id:'toast-action', name:'Action Toast', tag:'toast', description:'Toast with embedded action button.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:10,background:'#18181b',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 14px',fontFamily:'system-ui',maxWidth:280,boxShadow:'0 8px 24px rgba(0,0,0,0.4)'}}>
      <div style={{flex:1}}><p style={{fontSize:12,fontWeight:600,color:'#fff',margin:0}}>New message from Alex</p><p style={{fontSize:11,color:'rgba(255,255,255,0.4)',margin:'2px 0 0'}}>Hey, are you free later?</p></div>
      <div style={{background:'#6366f1',color:'#fff',borderRadius:6,padding:'5px 10px',fontSize:11,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>Reply</div>
    </div>),
    html:`<div class="toast-action" role="alert">
  <div class="toast-action__body">
    <p class="toast-action__title">New message from Alex</p>
    <p class="toast-action__desc">Hey, are you free later?</p>
  </div>
  <button class="toast-action__btn">Reply</button>
</div>`,
    css:`.toast-action { display: flex; align-items: center; gap: 12px; background: #18181b; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); font-family: system-ui, sans-serif; }
.toast-action__body { flex: 1; }
.toast-action__title { font-size: 13px; font-weight: 600; color: #fff; margin: 0 0 2px; }
.toast-action__desc { font-size: 12px; color: rgba(255,255,255,0.4); margin: 0; }
.toast-action__btn { background: #6366f1; color: #fff; border: none; border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }`
  },
  {
    id:'progress-multi', name:'Multi-Step Progress', tag:'progress', description:'Segmented multi-value progress bar.',
    preview:(<div style={{width:'100%',maxWidth:280,fontFamily:'system-ui'}}>
      <div style={{display:'flex',gap:3,height:10,borderRadius:5,overflow:'hidden',marginBottom:6}}>
        {[['42%','#6366f1'],['28%','#a855f7'],['18%','#ec4899']].map(([w,c])=>(<div key={c} style={{width:w,background:c,flex:'none'}} />))}
        <div style={{flex:1,background:'#e5e7eb'}} />
      </div>
      <div style={{display:'flex',gap:12,fontSize:10,color:'#6b7280'}}>
        <span style={{color:'#6366f1'}}>● CSS 42%</span>
        <span style={{color:'#a855f7'}}>● JS 28%</span>
        <span style={{color:'#ec4899'}}>● HTML 18%</span>
      </div>
    </div>),
    html:`<div class="multi-progress">
  <div class="multi-progress__track">
    <div class="multi-progress__seg" style="width:42%; background:#6366f1"></div>
    <div class="multi-progress__seg" style="width:28%; background:#a855f7"></div>
    <div class="multi-progress__seg" style="width:18%; background:#ec4899"></div>
  </div>
  <div class="multi-progress__legend">
    <span style="color:#6366f1">● CSS 42%</span>
    <span style="color:#a855f7">● JS 28%</span>
    <span style="color:#ec4899">● HTML 18%</span>
  </div>
</div>`,
    css:`.multi-progress { width: 100%; font-family: system-ui, sans-serif; }
.multi-progress__track { display: flex; height: 10px; border-radius: 5px; overflow: hidden; background: #e5e7eb; gap: 2px; }
.multi-progress__seg { height: 100%; flex: none; transition: width 0.4s ease; }
.multi-progress__legend { display: flex; gap: 14px; margin-top: 8px; font-size: 11px; color: #6b7280; }`
  },
  {
    id:'dot-loader', name:'Dot Loader', tag:'loader', description:'Three bouncing dots loading animation.',
    preview:(<div style={{display:'flex',alignItems:'center',gap:5,padding:'12px 0'}}>
      {[0,1,2].map(i=>(<div key={i} style={{width:8,height:8,borderRadius:'50%',background:'#6366f1',animation:`bounce${i} 1.4s ease-in-out ${i*0.16}s infinite`}} />))}
      <style>{`@keyframes bounce0{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}@keyframes bounce1{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}@keyframes bounce2{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
    </div>),
    html:`<div class="dot-loader" role="status" aria-label="Loading">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>`,
    css:`.dot-loader { display: flex; align-items: center; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #6366f1; animation: dotBounce 1.4s ease-in-out infinite both; }
.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }
@keyframes dotBounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }`
  },
  {
    id:'inline-error', name:'Inline Error State', tag:'error', description:'Field-level inline error message.',
    preview:(<div style={{fontFamily:'system-ui',width:220}}>
      <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:4}}>Email</label>
      <input defaultValue="bad@" style={{width:'100%',border:'1px solid #ef4444',borderRadius:6,padding:'7px 10px',fontSize:12,outline:'none',boxSizing:'border-box',background:'#fef2f2',color:'#111'}} readOnly />
      <p style={{fontSize:11,color:'#ef4444',marginTop:4}}>⚠ Please enter a valid email address.</p>
    </div>),
    html:`<div class="field field--error">
  <label class="field__label" for="email">Email</label>
  <input class="field__input" id="email" type="email" value="bad@" aria-invalid="true" aria-describedby="email-error">
  <p class="field__error" id="email-error">⚠ Please enter a valid email address.</p>
</div>`,
    css:`.field { display: flex; flex-direction: column; gap: 5px; }
.field__label { font-size: 13px; font-weight: 600; color: #374151; }
.field__input { padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; }
.field__input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.field--error .field__input { border-color: #ef4444; background: #fef2f2; }
.field--error .field__input:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.15); }
.field__error { font-size: 12px; color: #ef4444; }`
  },
  {
    id:'skeleton-card', name:'Skeleton Loader', tag:'loader', description:'Content placeholder skeleton animation.',
    preview:(<div style={{width:220,background:'#fff',borderRadius:12,padding:16,border:'1px solid #e5e7eb'}}>
      <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}`}</style>
      {[80,140,70,100].map((w,i)=>(<div key={i} style={{height:i===0?40:10,width:i===0?'100%':`${w}px`,borderRadius:i===0?8:4,background:'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)',backgroundSize:'800px 100%',animation:'shimmer 1.5s infinite linear',marginBottom:i===0?12:i===3?0:8}} />))}
    </div>),
    html:`<div class="skeleton-card">
  <div class="skeleton skeleton--image"></div>
  <div class="skeleton skeleton--line" style="width: 80%"></div>
  <div class="skeleton skeleton--line" style="width: 60%"></div>
  <div class="skeleton skeleton--line" style="width: 40%"></div>
</div>`,
    css:`.skeleton-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
.skeleton { background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%); background-size: 800px 100%; animation: shimmer 1.5s infinite linear; border-radius: 4px; margin-bottom: 10px; }
.skeleton--image { height: 120px; border-radius: 8px; margin-bottom: 14px; }
.skeleton--line { height: 10px; }
@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`
  },
  {
    id:'badge-dark', name:'Dark Status Badges', tag:'badge', description:'Dark-mode status badge variants.',
    preview:(<div style={{display:'flex',flexWrap:'wrap',gap:6,padding:'8px 0'}}>
      {[['Live','rgba(34,197,94,0.15)','#4ade80'],['Idle','rgba(255,255,255,0.08)','rgba(255,255,255,0.5)'],['Error','rgba(239,68,68,0.12)','#f87171']].map(([l,bg,c])=>(<span key={l} style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:50,background:bg,color:c,border:`1px solid ${c}40`}}>{l}</span>))}
    </div>),
    html:`<span class="badge-dark badge-dark--live">Live</span>
<span class="badge-dark badge-dark--idle">Idle</span>
<span class="badge-dark badge-dark--error">Error</span>`,
    css:`.badge-dark { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 50px; font-family: system-ui; }
.badge-dark--live { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
.badge-dark--idle { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1); }
.badge-dark--error { background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.25); }`
  },
];

const CATS = [{key:'all',label:'All'},{key:'toast',label:'Toasts'},{key:'alert',label:'Alerts'},{key:'snackbar',label:'Snackbars'},{key:'progress',label:'Progress'},{key:'empty',label:'Empty States'},{key:'badge',label:'Badges'},{key:'loader',label:'Loaders'},{key:'error',label:'Error States'}];

function buildSections(item: FeedbackItem): CodeSection[] {
  return [{label:'HTML',language:'html',code:item.html},{label:'CSS',language:'css',code:item.css}];
}

export default function Feedback() {
  const [selected, setSelected] = useState<FeedbackItem|null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO title="CSS UI Feedback Components — Toasts, Alerts, Progress Bars — UIXplor" description={`${items.length} copy-paste CSS feedback components: success toasts, error alerts, progress bars, step indicators, skeleton loaders, empty states, and badges. Production HTML + CSS.`} path="/collections/feedback" keywords={['CSS toast notification','alert CSS','progress bar CSS','skeleton loader CSS','empty state CSS','snackbar CSS','badge CSS','UI feedback components']} jsonLd={[{'@context':'https://schema.org','@type':'CollectionPage',name:'CSS UI Feedback Components — UIXplor',url:'https://uixplor.com/collections/feedback',numberOfItems:items.length,isPartOf:{'@type':'WebSite',name:'UIXplor',url:'https://uixplor.com'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://uixplor.com'},{'@type':'ListItem',position:2,name:'Collections',item:'https://uixplor.com/collections'},{'@type':'ListItem',position:3,name:'UI Feedback',item:'https://uixplor.com/collections/feedback'}]}]}/>
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">UI Feedback</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">UI Feedback <span className="text-[#B8FB3C]">Components</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} toasts, alerts, snackbars, progress bars, skeleton loaders, and empty states. Copy HTML + CSS instantly.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]"/>{items.length} components</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">{CATS.map(c=><button key={c.key} onClick={()=>setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat===c.key?'bg-[#B8FB3C] text-[#0a0a0f]':'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item,index)=>(<motion.article key={item.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:index*0.02}} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center p-4 bg-white/[0.02]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={()=>setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=feedback`}
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
