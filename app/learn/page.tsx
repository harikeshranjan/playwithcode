"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Types ─── */
type Lesson = {
	title: string;
	description: string;
	icon: string;
	href: string;
	isNew: boolean;
	isComingSoon: boolean;
	color: string; // accent colour per card
	glow: string; // tailwind shadow-color class
	tag: string; // language tag shown in corner
	modules: number;
	exercises: number;
	level: "Beginner" | "Intermediate" | "Advanced";
};

/* ─── Data ─── */
const lessons: Lesson[] = [
	{
		title: "TypeScript",
		description:
			"Go from JavaScript fundamentals to typed, production-grade TypeScript. Learn interfaces, generics, utility types, and real-world patterns used at top tech companies.",
		icon: "TS",
		href: "/learn/typescript",
		isNew: true,
		isComingSoon: false,
		color: "#3178c6",
		glow: "shadow-[0_0_40px_rgba(49,120,198,0.25)]",
		tag: "TypeScript",
		modules: 12,
		exercises: 48,
		level: "Beginner",
	},
	{
		title: "Swift",
		description:
			"Build real iOS & macOS apps from scratch. Master Swift syntax, SwiftUI layouts, optionals, closures, and the entire Apple development ecosystem.",
		icon: "SW",
		href: "/learn/swift",
		isNew: false,
		isComingSoon: true,
		color: "#f05138",
		glow: "shadow-[0_0_40px_rgba(240,81,56,0.25)]",
		tag: "Swift",
		modules: 14,
		exercises: 56,
		level: "Beginner",
	},
];

/* ─── Tiny stat pill ─── */
function StatPill({ value, label }: { value: string | number; label: string }) {
	return (
		<div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
			<span className="font-['Syne'] font-bold text-base text-slate-100 leading-none">
				{value}
			</span>
			<span className="font-['DM_Sans'] text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">
				{label}
			</span>
		</div>
	);
}

/* ─── Level badge colour ─── */
const levelColor: Record<string, string> = {
	Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
	Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
	Advanced: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

/* ─── Single lesson card ─── */
function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			className={`relative group transition-all duration-500 ${lesson.isComingSoon ? "opacity-75" : ""}`}
			style={{ animationDelay: `${index * 120}ms` }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Glow behind card on hover */}
			<div
				className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
				style={{
					background: `radial-gradient(ellipse at 50% 0%, ${lesson.color}33 0%, transparent 70%)`,
				}}
			/>

			<Card className="relative bg-[#0d1117]/80 backdrop-blur-2xl border border-white/[0.07] rounded-2xl overflow-hidden group-hover:border-white/[0.13] transition-all duration-300">
				{/* Top accent bar */}
				<div
					className="h-[3px] w-full"
					style={{
						background: `linear-gradient(90deg, ${lesson.color}, ${lesson.color}55, transparent)`,
					}}
				/>

				<CardContent className="p-7">
					<div className="flex items-start justify-between gap-4 mb-5">
						{/* Language badge / icon */}
						<div
							className="flex items-center justify-center w-14 h-14 rounded-2xl font-['JetBrains_Mono'] font-bold text-[15px] text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
							style={{
								background: `linear-gradient(135deg, ${lesson.color}cc, ${lesson.color}88)`,
								boxShadow: hovered
									? `0 0 28px ${lesson.color}55`
									: `0 0 14px ${lesson.color}33`,
							}}
						>
							{lesson.icon}
						</div>

						{/* Badges top-right */}
						<div className="flex flex-wrap gap-2 justify-end">
							{lesson.isNew && (
								<Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-['DM_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
									✦ New
								</Badge>
							)}
							{lesson.isComingSoon && (
								<Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/25 font-['DM_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
									Coming Soon
								</Badge>
							)}
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-['DM_Sans'] border ${levelColor[lesson.level]}`}
							>
								{lesson.level}
							</span>
						</div>
					</div>

					{/* Title */}
					<h2 className="font-['Syne'] font-extrabold text-2xl text-slate-50 tracking-tight leading-tight mb-2">
						{lesson.title}
					</h2>

					{/* Description */}
					<p className="font-['DM_Sans'] text-sm text-slate-400 leading-relaxed mb-6">
						{lesson.description}
					</p>

					{/* Stats row */}
					<div className="flex gap-3 mb-7">
						<StatPill value={lesson.modules} label="Modules" />
						<StatPill value={lesson.exercises} label="Exercises" />
						<StatPill value={lesson.level} label="Level" />
					</div>

					{/* CTA */}
					{lesson.isComingSoon ? (
						<button
							disabled
							className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-['DM_Sans'] font-semibold text-sm text-slate-500 bg-white/[0.04] border border-white/[0.07] cursor-not-allowed"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
								/>
							</svg>
							Notify me when ready
						</button>
					) : (
						<Link
							href={lesson.href}
							className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white border-none no-underline transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
							style={{
								background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}bb)`,
								boxShadow: hovered
									? `0 8px 24px ${lesson.color}44`
									: `0 4px 14px ${lesson.color}33`,
							}}
						>
							Start Learning
							<svg
								className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								strokeWidth={2.5}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</Link>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

/* ─── Page ─── */
export default function Learn() {
	return (
		<div className="relative min-h-screen bg-[#060a0d] overflow-x-hidden">
			{/* Fonts */}
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
				@keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
				@keyframes fadeIn { from{opacity:0} to{opacity:1} }
				.anim-fade-up   { animation: fadeUp 0.7s ease both; }
				.anim-fade-up-2 { animation: fadeUp 0.7s 0.12s ease both; opacity:0; }
				.anim-fade-up-3 { animation: fadeUp 0.7s 0.22s ease both; opacity:0; }
				.anim-fade-up-4 { animation: fadeUp 0.7s 0.34s ease both; opacity:0; }
				.anim-fade-in   { animation: fadeIn 1s 0.1s ease both; opacity:0; }
			`}</style>

			{/* ── Ambient background ── */}
			<div className="absolute top-0 left-[20%] w-[500px] h-[400px] rounded-full bg-blue-600 blur-[160px] opacity-[0.07] pointer-events-none" />
			<div className="absolute top-[30%] right-[10%] w-[380px] h-[380px] rounded-full bg-orange-500 blur-[140px] opacity-[0.06] pointer-events-none" />
			<div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full bg-emerald-500 blur-[130px] opacity-[0.05] pointer-events-none" />

			{/* ── Grid texture ── */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)",
					backgroundSize: "52px 52px",
				}}
			/>

			{/* ── Main content ── */}
			<main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
				{/* ── Hero header ── */}
				<div className="mb-16">
					{/* eyebrow */}
					<div className="flex items-center gap-2.5 mb-5 anim-fade-up">
						<div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
							<span className="font-['DM_Sans'] text-xs font-semibold text-emerald-400 tracking-wide uppercase">
								Learning Paths
							</span>
						</div>
					</div>

					{/* headline */}
					<h1 className="font-['Syne'] font-extrabold text-5xl sm:text-6xl text-slate-50 tracking-tight leading-[1.05] mb-4 anim-fade-up-2">
						Pick your{" "}
						<span
							className="relative inline-block"
							style={{
								background:
									"linear-gradient(135deg,#10b981,#34d399,#6ee7b7)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							language.
						</span>
						<br />
						Start playing.
					</h1>

					{/* sub */}
					<p className="font-['DM_Sans'] text-base text-slate-400 leading-relaxed max-w-xl anim-fade-up-3">
						Choose a course below. Each one is packed with
						bite-sized lessons, interactive coding exercises, and
						interview challenges — designed to take you from zero to
						job-ready.
					</p>
				</div>

				{/* ── Filter / count bar ── */}
				<div className="flex items-center justify-between mb-8 anim-fade-up-4">
					<p className="font-['DM_Sans'] text-sm text-slate-500">
						<span className="text-slate-300 font-semibold">
							{lessons.length}
						</span>{" "}
						course{lessons.length !== 1 ? "s" : ""} available
					</p>

					<div className="flex items-center gap-2">
						{["All", "Available", "Coming Soon"].map((f) => (
							<button
								key={f}
								className={`px-3.5 py-1.5 rounded-lg font-['DM_Sans'] text-xs font-medium border transition-all duration-150 cursor-pointer
									${
										f === "All"
											? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
											: "bg-white/[0.03] text-slate-500 border-white/[0.07] hover:text-slate-400 hover:bg-white/[0.06]"
									}`}
							>
								{f}
							</button>
						))}
					</div>
				</div>

				{/* ── Cards grid ── */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{lessons.map((lesson, i) => (
						<LessonCard
							key={lesson.title}
							lesson={lesson}
							index={i}
						/>
					))}

					{/* Placeholder "More coming" card */}
					<div className="relative md:col-span-2 flex items-center justify-center py-10 px-8 rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.015]">
						<div className="text-center">
							<div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
								<svg
									className="w-5 h-5 text-slate-500"
									fill="none"
									stroke="currentColor"
									strokeWidth={1.8}
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							</div>
							<p className="font-['Syne'] font-bold text-slate-400 text-sm mb-1">
								More languages coming soon
							</p>
							<p className="font-['DM_Sans'] text-xs text-slate-600">
								Python, Rust, Go, and more are on the roadmap.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
