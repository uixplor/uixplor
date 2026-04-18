import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface CardItem {
	id: string;
	name: string;
	tag: string;
	description: string;
	preview: React.ReactNode;
	html: string;
	css: string;
}

export const cards: CardItem[] = [
	{
		id: 'glass-card',
		name: 'Glass Card',
		tag: 'glassmorphism',
		description: 'Frosted glass effect with backdrop blur and translucent background.',
		preview: (
			<div className="w-full h-full flex items-center justify-center"
				style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
				<div style={{
					background: 'rgba(255,255,255,0.1)',
					backdropFilter: 'blur(12px)',
					border: '1px solid rgba(255,255,255,0.2)',
					borderRadius: '16px',
					padding: '24px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Glass Card</div>
					<div style={{ fontSize: 11, opacity: 0.6 }}>Frosted glass effect</div>
				</div>
			</div>
		),
		html: `<div class="glass-card">
  <h3>Glass Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
}`,
	},
	{
		id: 'elevated-card',
		name: 'Elevated Card',
		tag: 'shadow',
		description: 'Layered box shadows create a sense of physical elevation above the surface.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-gray-100">
				<div style={{
					background: '#fff',
					borderRadius: '16px',
					padding: '24px',
					boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)',
					color: '#1a1a2e',
					width: '80%',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Elevated Card</div>
					<div style={{ fontSize: 11, color: '#6b7280' }}>Layered shadow depth</div>
				</div>
			</div>
		),
		html: `<div class="elevated-card">
  <h3>Elevated Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.elevated-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 12px 32px rgba(0, 0, 0, 0.08);
  color: #1a1a2e;
}`,
	},
	{
		id: 'dark-card',
		name: 'Dark Surface Card',
		tag: 'dark',
		description: 'Subtle dark surface with soft border and refined typography for dark themes.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: '#12121a',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '24px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Dark Card</div>
					<div style={{ fontSize: 11, opacity: 0.4 }}>Refined dark surface</div>
				</div>
			</div>
		),
		html: `<div class="dark-card">
  <h3>Dark Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.dark-card {
  background: #12121a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  box-shadow:
    0 4px 12px rgba(255, 255, 255, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}`,
	},
	{
		id: 'gradient-card',
		name: 'Gradient Border Card',
		tag: 'gradient',
		description: 'Vivid gradient border using a CSS pseudo-element technique.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: '#0a0a0f',
					borderRadius: '16px',
					padding: '24px',
					color: '#fff',
					width: '80%',
					position: 'relative',
					border: '1px solid transparent',
					backgroundClip: 'padding-box',
					boxShadow: '0 0 0 1px transparent',
					outline: '1px solid transparent',
					WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
				}}>
					<div style={{
						position: 'absolute', inset: 0, borderRadius: 16,
						background: 'linear-gradient(135deg, #6366f1, #a855f7)',
						WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
						WebkitMaskComposite: 'xor',
						maskComposite: 'exclude',
						padding: 1,
					}} />
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, position: 'relative' }}>Gradient Border</div>
					<div style={{ fontSize: 11, opacity: 0.5, position: 'relative' }}>CSS mask technique</div>
				</div>
			</div>
		),
		html: `<div class="gradient-border-card">
  <h3>Gradient Border</h3>
  <p>Your content here</p>
</div>`,
		css: `.gradient-border-card {
  background: #0a0a0f;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  position: relative;
  background-clip: padding-box;
  border: 1px solid transparent;
}

.gradient-border-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}`,
	},
	{
		id: 'neon-card',
		name: 'Neon Glow Card',
		tag: 'glow',
		description: 'Electric neon accent border with glowing ambient light effect.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: '#0a0a0f',
					border: '1px solid rgba(184,251,60,0.3)',
					borderRadius: '16px',
					padding: '24px',
					color: '#fff',
					width: '80%',
					boxShadow: '0 0 30px rgba(184,251,60,0.1), 0 4px 20px rgba(0,0,0,0.5)',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#B8FB3C' }}>Neon Card</div>
					<div style={{ fontSize: 11, opacity: 0.5 }}>Electric glow effect</div>
				</div>
			</div>
		),
		html: `<div class="neon-card">
  <h3>Neon Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.neon-card {
  background: #0a0a0f;
  border: 1px solid rgba(184, 251, 60, 0.3);
  border-radius: 16px;
  padding: 24px;
  color: #B8FB3C;
  box-shadow:
    0 0 20px rgba(184, 251, 60, 0.08),
    0 0 60px rgba(184, 251, 60, 0.04),
    0 4px 20px rgba(0, 0, 0, 0.5);
}`,
	},
	{
		id: 'outline-card',
		name: 'Outline Card',
		tag: 'minimal',
		description: 'Clean outlined card with transparent background. Works on any surface.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-gray-50">
				<div style={{
					background: 'transparent',
					border: '2px solid rgba(0,0,0,0.12)',
					borderRadius: '16px',
					padding: '24px',
					color: '#1a1a2e',
					width: '80%',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Outline Card</div>
					<div style={{ fontSize: 11, color: '#6b7280' }}>Borderline minimal</div>
				</div>
			</div>
		),
		html: `<div class="outline-card">
  <h3>Outline Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.outline-card {
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 24px;
  color: #1a1a2e;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.outline-card:hover {
  border-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}`,
	},
	{
		id: 'neumorphic-card',
		name: 'Neumorphic Card',
		tag: 'neumorphism',
		description: 'Soft UI style with dual shadows creating an extruded look.',
		preview: (
			<div className="w-full h-full flex items-center justify-center" style={{ background: '#e0e5ec' }}>
				<div style={{
					background: '#e0e5ec',
					borderRadius: '20px',
					padding: '24px',
					color: '#636e7b',
					width: '80%',
					boxShadow: '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#4a5568' }}>Neumorphic</div>
					<div style={{ fontSize: 11 }}>Soft UI style</div>
				</div>
			</div>
		),
		html: `<div class="neumorphic-card">
  <h3>Neumorphic Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.neumorphic-card {
  background: #e0e5ec;
  border-radius: 20px;
  padding: 24px;
  color: #4a5568;
  box-shadow:
    9px 9px 16px rgba(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
}`,
	},
	{
		id: 'frosted-dark-card',
		name: 'Frosted Dark Card',
		tag: 'glassmorphism',
		description: 'Dark glassmorphism with layered blur for immersive backgrounds.',
		preview: (
			<div className="w-full h-full flex items-center justify-center"
				style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
				<div style={{
					background: 'rgba(0,0,0,0.35)',
					backdropFilter: 'blur(16px)',
					border: '1px solid rgba(255,255,255,0.08)',
					borderRadius: '20px',
					padding: '24px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Frosted Dark</div>
					<div style={{ fontSize: 11, opacity: 0.5 }}>Dark blur glass</div>
				</div>
			</div>
		),
		html: `<div class="frosted-dark-card">
  <h3>Frosted Dark</h3>
  <p>Your content here</p>
</div>`,
		css: `.frosted-dark-card {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  color: #ffffff;
}`,
	},
	{
		id: 'stat-card',
		name: 'Stat Card',
		tag: 'ui',
		description: 'Dashboard-style stat card with label, value, and color accent.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ fontSize: 11, opacity: 0.5, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Revenue</div>
					<div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>$84.2k</div>
					<div style={{ fontSize: 11, color: '#B8FB3C' }}>↑ 12.4% this month</div>
				</div>
			</div>
		),
		html: `<div class="stat-card">
  <span class="stat-label">Revenue</span>
  <div class="stat-value">$84.2k</div>
  <span class="stat-change">↑ 12.4% this month</span>
</div>`,
		css: `.stat-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  color: #ffffff;
}

.stat-label {
  font-size: 11px;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-change {
  font-size: 12px;
  color: #B8FB3C;
}`,
	},
	{
		id: 'profile-card',
		name: 'Profile Card',
		tag: 'ui',
		description: 'User profile card with avatar, name, role, and action buttons.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '80%',
					textAlign: 'center',
				}}>
					<div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', margin: '0 auto 10px' }} />
					<div style={{ fontSize: 13, fontWeight: 600 }}>Alex Turner</div>
					<div style={{ fontSize: 11, opacity: 0.45, marginTop: 3 }}>UI Designer</div>
				</div>
			</div>
		),
		html: `<div class="profile-card">
  <div class="profile-avatar"></div>
  <h3 class="profile-name">Alex Turner</h3>
  <p class="profile-role">UI Designer</p>
</div>`,
		css: `.profile-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  color: #ffffff;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  margin: 0 auto 12px;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.profile-role {
  font-size: 13px;
  opacity: 0.45;
}`,
	},
	{
		id: 'pricing-card',
		name: 'Pricing Card',
		tag: 'ui',
		description: 'SaaS pricing card with plan name, price, features, and CTA button.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))',
					border: '1px solid rgba(99,102,241,0.3)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ fontSize: 11, color: '#a5b4fc', marginBottom: 8, fontWeight: 600 }}>PRO</div>
					<div style={{ fontSize: 26, fontWeight: 700 }}>$29<span style={{ fontSize: 14, opacity: 0.5 }}>/mo</span></div>
					<div style={{ marginTop: 12, fontSize: 11, opacity: 0.6 }}>✓ Unlimited projects</div>
				</div>
			</div>
		),
		html: `<div class="pricing-card">
  <span class="plan-name">PRO</span>
  <div class="plan-price">$29<span>/mo</span></div>
  <ul class="plan-features">
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  <button class="plan-cta">Get Started</button>
</div>`,
		css: `.pricing-card {
  background: linear-gradient(145deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08));
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 16px;
  padding: 28px;
  color: #ffffff;
}

.plan-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #a5b4fc;
}

.plan-price {
  font-size: 36px;
  font-weight: 700;
  margin: 8px 0;
}

.plan-price span {
  font-size: 16px;
  opacity: 0.5;
}

.plan-features {
  list-style: none;
  margin: 16px 0;
  font-size: 14px;
  opacity: 0.7;
}

.plan-features li::before {
  content: '✓ ';
  color: #a5b4fc;
}

.plan-cta {
  width: 100%;
  padding: 10px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}`,
	},
	{
		id: 'notification-card',
		name: 'Notification Card',
		tag: 'ui',
		description: 'Compact notification-style card with icon, message, and timestamp.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: '#12121a',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '14px',
					padding: '14px 16px',
					color: '#fff',
					width: '85%',
					display: 'flex',
					alignItems: 'center',
					gap: 12,
				}}>
					<div style={{ width: 32, height: 32, borderRadius: '50%', background: '#B8FB3C', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#000' }}>✓</div>
					<div>
						<div style={{ fontSize: 12, fontWeight: 600 }}>Deploy successful</div>
						<div style={{ fontSize: 11, opacity: 0.45, marginTop: 2 }}>2 min ago</div>
					</div>
				</div>
			</div>
		),
		html: `<div class="notification-card">
  <div class="notif-icon">✓</div>
  <div class="notif-body">
    <p class="notif-title">Deploy successful</p>
    <span class="notif-time">2 min ago</span>
  </div>
</div>`,
		css: `.notification-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #12121a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 14px 16px;
  color: #ffffff;
}

.notif-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #B8FB3C;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

.notif-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 3px;
}

.notif-time {
  font-size: 11px;
  opacity: 0.45;
}`,
	},
	{
		id: 'hover-lift-card',
		name: 'Hover Lift Card',
		tag: 'interactive',
		description: 'Card that smoothly lifts and gains shadow on hover for tactile feel.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-gray-50">
				<div style={{
					background: '#fff',
					borderRadius: '16px',
					padding: '24px',
					color: '#1a1a2e',
					width: '80%',
					boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.06)',
					transition: 'all 0.25s ease',
					transform: 'translateY(-4px)',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Hover Lift</div>
					<div style={{ fontSize: 11, color: '#6b7280' }}>↑ Lifting off</div>
				</div>
			</div>
		),
		html: `<div class="hover-lift-card">
  <h3>Hover Lift</h3>
  <p>Hover me!</p>
</div>`,
		css: `.hover-lift-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 24px;
  color: #1a1a2e;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 14px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.hover-lift-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 16px 40px rgba(0, 0, 0, 0.1);
}`,
	},
	{
		id: 'tag-card',
		name: 'Tag Card',
		tag: 'content',
		description: 'Content card with title, description, and category tag chips.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '85%',
				}}>
					<div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
						<span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 50, background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>CSS</span>
						<span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 50, background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.25)' }}>UI</span>
					</div>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Tag Card</div>
					<div style={{ fontSize: 11, opacity: 0.45 }}>With category chips</div>
				</div>
			</div>
		),
		html: `<div class="tag-card">
  <div class="tags">
    <span class="tag tag--primary">CSS</span>
    <span class="tag tag--secondary">UI</span>
  </div>
  <h3>Tag Card</h3>
  <p>Card description goes here.</p>
</div>`,
		css: `.tag-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  color: #ffffff;
}

.tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 50px;
}

.tag--primary {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.25);
}

.tag--secondary {
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.25);
}`,
	},
	{
		id: 'image-card',
		name: 'Image Card',
		tag: 'content',
		description: 'Classic content card with image area, title, excerpt, and read more link.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					overflow: 'hidden',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ height: 60, background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)' }} />
					<div style={{ padding: '12px 14px' }}>
						<div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Article Title</div>
						<div style={{ fontSize: 10, opacity: 0.4 }}>Short excerpt here...</div>
					</div>
				</div>
			</div>
		),
		html: `<div class="image-card">
  <div class="image-card__cover"></div>
  <div class="image-card__body">
    <h3>Article Title</h3>
    <p>Short excerpt goes here...</p>
    <a href="#">Read more →</a>
  </div>
</div>`,
		css: `.image-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  color: #ffffff;
  transition: transform 0.25s ease;
}

.image-card:hover {
  transform: translateY(-4px);
}

.image-card__cover {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #1e1b4b, #4c1d95);
  object-fit: cover;
}

.image-card__body {
  padding: 20px;
}

.image-card__body h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.image-card__body p {
  font-size: 14px;
  opacity: 0.55;
  margin-bottom: 12px;
  line-height: 1.5;
}

.image-card__body a {
  font-size: 13px;
  color: #B8FB3C;
  text-decoration: none;
}`,
	},
	{
		id: 'cta-card',
		name: 'CTA Card',
		tag: 'interactive',
		description: 'Call-to-action card with headline, subtext and a prominent action button.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.12))',
					border: '1px solid rgba(99,102,241,0.25)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '85%',
					textAlign: 'center',
				}}>
					<div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Start for free</div>
					<div style={{ fontSize: 10, opacity: 0.55, marginBottom: 12 }}>No credit card required</div>
					<div style={{ background: '#6366f1', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, display: 'inline-block' }}>Get Started</div>
				</div>
			</div>
		),
		html: `<div class="cta-card">
  <h2>Start for free</h2>
  <p>No credit card required</p>
  <button class="cta-btn">Get Started</button>
</div>`,
		css: `.cta-card {
  background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.12));
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 16px;
  padding: 32px 24px;
  color: #ffffff;
  text-align: center;
}

.cta-card h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.cta-card p {
  font-size: 14px;
  opacity: 0.55;
  margin-bottom: 20px;
}

.cta-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.4);
}`,
	},
	{
		id: 'inset-shadow-card',
		name: 'Inset Depth Card',
		tag: 'shadow',
		description: 'Carved-in appearance using inset shadows for a premium tactile feel.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-gray-100">
				<div style={{
					background: '#f0f1f4',
					borderRadius: '16px',
					padding: '24px',
					color: '#1a1a2e',
					width: '80%',
					boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.08)',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Inset Card</div>
					<div style={{ fontSize: 11, color: '#6b7280' }}>Carved-in depth</div>
				</div>
			</div>
		),
		html: `<div class="inset-card">
  <h3>Inset Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.inset-card {
  background: #f0f1f4;
  border-radius: 16px;
  padding: 24px;
  color: #1a1a2e;
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 2px rgba(0, 0, 0, 0.08),
    inset 0 -1px 2px rgba(255, 255, 255, 0.5);
}`,
	},
	{
		id: 'skeleton-card',
		name: 'Skeleton Loader Card',
		tag: 'loading',
		description: 'Animated skeleton placeholder card for loading states.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: '#12121a',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					width: '80%',
				}}>
					<div style={{ height: 40, borderRadius: 8, background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '200% 100%', marginBottom: 12 }} />
					<div style={{ height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.05)', marginBottom: 8, width: '80%' }} />
					<div style={{ height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.03)', width: '60%' }} />
				</div>
			</div>
		),
		html: `<div class="skeleton-card">
  <div class="skeleton skeleton--image"></div>
  <div class="skeleton skeleton--line"></div>
  <div class="skeleton skeleton--line skeleton--short"></div>
</div>`,
		css: `.skeleton-card {
  background: #12121a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
}

.skeleton {
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton--image {
  height: 120px;
  border-radius: 10px;
  margin-bottom: 14px;
}

.skeleton--line {
  height: 12px;
  margin-bottom: 8px;
  width: 80%;
}

.skeleton--short {
  width: 55%;
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}`,
	},
	{
		id: 'feature-card',
		name: 'Feature Card',
		tag: 'marketing',
		description: 'Marketing feature card with large icon, bold heading, and description.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '80%',
				}}>
					<div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(184,251,60,0.12)', border: '1px solid rgba(184,251,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 18 }}>⚡</div>
					<div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>Blazing Fast</div>
					<div style={{ fontSize: 11, opacity: 0.45, lineHeight: 1.5 }}>Optimized for speed with zero compromise.</div>
				</div>
			</div>
		),
		html: `<div class="feature-card">
  <div class="feature-icon">⚡</div>
  <h3>Blazing Fast</h3>
  <p>Optimized for speed with zero compromise on quality.</p>
</div>`,
		css: `.feature-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(184, 251, 60, 0.2);
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(184, 251, 60, 0.1);
  border: 1px solid rgba(184, 251, 60, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  opacity: 0.5;
  line-height: 1.6;
}`,
	},
	{
		id: 'bordered-gradient-card',
		name: 'Shimmer Border Card',
		tag: 'gradient',
		description: 'Card with an animated gradient border shimmer effect on hover.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{ position: 'relative', width: '80%', padding: 1, borderRadius: 17, background: 'linear-gradient(135deg, #B8FB3C, #6366f1, #a855f7)' }}>
					<div style={{
						background: '#0a0a0f',
						borderRadius: '16px',
						padding: '20px',
						color: '#fff',
					}}>
						<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Shimmer Border</div>
						<div style={{ fontSize: 11, opacity: 0.45 }}>Gradient border wrapper</div>
					</div>
				</div>
			</div>
		),
		html: `<div class="shimmer-border-wrapper">
  <div class="shimmer-card">
    <h3>Shimmer Border</h3>
    <p>Your content here</p>
  </div>
</div>`,
		css: `.shimmer-border-wrapper {
  background: linear-gradient(135deg, #B8FB3C, #6366f1, #a855f7);
  border-radius: 17px;
  padding: 1px;
  background-size: 200% 200%;
  animation: shimmer-border 3s linear infinite;
}

.shimmer-card {
  background: #0a0a0f;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
}

@keyframes shimmer-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
	},
	{
		id: 'minimal-white-card',
		name: 'Minimal White Card',
		tag: 'minimal',
		description: 'Clean white card with hairline border and subtle shadow. Light theme staple.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-gray-50">
				<div style={{
					background: '#fff',
					border: '1px solid #e5e7eb',
					borderRadius: '12px',
					padding: '24px',
					color: '#1a1a2e',
					width: '80%',
					boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
				}}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Minimal Card</div>
					<div style={{ fontSize: 11, color: '#6b7280' }}>Clean light theme</div>
				</div>
			</div>
		),
		html: `<div class="minimal-card">
  <h3>Minimal Card</h3>
  <p>Your content here</p>
</div>`,
		css: `.minimal-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  color: #1a1a2e;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;
}

.minimal-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}`,
	},
	{
		id: 'avatar-card',
		name: 'Team Member Card',
		tag: 'ui',
		description: 'Team member card with avatar, name, role, and social links.',
		preview: (
			<div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
				<div style={{
					background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25))',
					border: '1px solid rgba(255,255,255,0.06)',
					borderRadius: '16px',
					padding: '20px',
					color: '#fff',
					width: '80%',
					textAlign: 'center',
				}}>
					<div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', margin: '0 auto 10px', border: '2px solid rgba(255,255,255,0.12)' }} />
					<div style={{ fontSize: 13, fontWeight: 600 }}>Sarah Kim</div>
					<div style={{ fontSize: 11, color: '#06b6d4', marginTop: 3 }}>Product Designer</div>
				</div>
			</div>
		),
		html: `<div class="team-card">
  <div class="team-avatar"></div>
  <h3 class="team-name">Sarah Kim</h3>
  <p class="team-role">Product Designer</p>
</div>`,
		css: `.team-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.25));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 28px 24px;
  color: #ffffff;
  text-align: center;
  transition: transform 0.2s ease;
}

.team-card:hover {
  transform: translateY(-4px);
}

.team-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  margin: 0 auto 14px;
  border: 2px solid rgba(255, 255, 255, 0.12);
}

.team-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.team-role {
  font-size: 13px;
  color: #06b6d4;
}`,
	},
];

function CardGrid() {
	const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{cards.map((card, index) => (
					<motion.div
						key={card.id}
						className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.04)]"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.06 }}
					>
						{/* Card Preview */}
						<div className="h-44 overflow-hidden rounded-t-2xl">
							{card.preview}
						</div>

						{/* Info */}
						<div className="px-5 py-4 border-t border-white/6">
							<div className="flex items-start justify-between gap-3 mb-2">
								<div>
									<h3 className="text-sm font-semibold text-white">{card.name}</h3>
									<p className="text-xs text-white/40 mt-0.5 leading-relaxed">{card.description}</p>
								</div>
							</div>
							<div className="flex items-center justify-between mt-3">
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">
									{card.tag}
								</span>
								<button
									onClick={() => setSelectedCard(card)}
									className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-[#B8FB3C] hover:text-[#0a0a0f] hover:border-[#B8FB3C] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(184,251,60,0.2)] transition-all duration-300 cursor-pointer"
								>
									View Code →
								</button>
                      <Link
                        href={`/component/${card.id}?collection=cards`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<CodeViewerOverlay
				isOpen={!!selectedCard}
				onClose={() => setSelectedCard(null)}
				title={selectedCard?.name || ''}
				sections={selectedCard ? [
					{ label: 'HTML', language: 'html', code: selectedCard.html },
					{ label: 'CSS', language: 'css', code: selectedCard.css },
				] : []}
			/>
		</>
	);
}

export default function Cards() {
	return (
		<>
			<PageSEO
				title="CSS Card Components – Dark Mode Card UI Examples – UIXplor"
				description="20+ CSS card components — glass cards, dark mode cards, gradient cards, neumorphic and hover cards. Copy any card design with HTML and CSS in one click."
				path="/collections/cards"
				keywords={['CSS card component', 'card UI design', 'glass card CSS', 'dark mode card', 'gradient card CSS', 'neumorphic card', 'hover card CSS']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Card Components Collection – UIXplor',
						description: '20+ CSS card components including glassmorphism cards, dark mode cards, gradient cards, neumorphic designs, and interactive hover cards.',
						url: 'https://uixplor.com/collections/cards',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'Card Components', item: 'https://uixplor.com/collections/cards' },
						],
					},
				]}
			/>

			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					{/* Breadcrumbs */}
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Cards</li>
						</ol>
					</nav>

					{/* Hero */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
							Card Components
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Modern card layouts — glass, dark, gradient, neumorphic and more. Click any to copy code.
						</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20">
							<span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]" />
							{cards.length} cards
						</span>
					</motion.div>

					<CardGrid />
				</div>
			</main>
		</>
	);
}
