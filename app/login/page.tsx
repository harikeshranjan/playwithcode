"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BG_SNIPPETS = [
	{ text: "const learn = () => play();", cls: "top-[8%] left-[3%]" },
	{ text: "function crack(interview) {}", cls: "top-[18%] right-[4%]" },
	{ text: "import { confidence } from 'you';", cls: "top-[70%] left-[2%]" },
	{ text: "while (coding) { grow(); }", cls: "bottom-[14%] right-[3%]" },
	{ text: "git commit -m 'leveled up'", cls: "top-[42%] left-[1%]" },
	{ text: "async function getJob() {}", cls: "bottom-[28%] right-[2%]" },
	{ text: "export default Developer;", cls: "top-[88%] left-[28%]" },
	{ text: "return <YourDreamJob />;", cls: "top-[4%] right-[26%]" },
];

function GithubIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="20"
			height="20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
		</svg>
	);
}

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const handleGithubLogin = () => {
		setLoading(true);
		/* TODO: replace with real GitHub OAuth — e.g. signIn("github") from next-auth */
		setTimeout(() => setLoading(false), 2000);
	};

	return (
		<div className="relative min-h-screen bg-[#060a0d] flex items-center justify-center overflow-hidden px-4 py-10">
			{/* ── Fonts + keyframes (only what Tailwind can't express) ── */}
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
				@keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
				@keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
				@keyframes spinCW   { to{transform:rotate(360deg)} }
				@keyframes spinCCW  { to{transform:rotate(-360deg)} }
				@keyframes shimmer  { from{background-position:-400px 0} to{background-position:400px 0} }
				.anim-fade-up   { animation: fadeUp 0.65s ease both; }
				.anim-fade-up-2 { animation: fadeUp 0.65s 0.15s ease both; opacity:0; }
				.anim-fade-up-3 { animation: fadeUp 0.65s 0.28s ease both; opacity:0; }
				.anim-float     { animation: floatUp 7s  ease-in-out infinite; }
				.anim-float-s   { animation: floatUp 10s ease-in-out infinite; }
				.anim-spin-cw   { animation: spinCW  70s  linear infinite; }
				.anim-spin-ccw  { animation: spinCCW 100s linear infinite; }
				.shimmer-btn {
					background: linear-gradient(90deg,#d1dff7 0%,#e8f0fb 40%,#d1dff7 80%);
					background-size: 400px 100%;
					animation: shimmer 1.2s infinite linear;
				}
			`}</style>

			{/* ── Ambient orbs ── */}
			<div className="absolute top-1/4 left-[15%] w-[480px] h-[480px] rounded-full bg-emerald-500 blur-[150px] opacity-[0.09] pointer-events-none" />
			<div className="absolute bottom-[10%] right-[12%] w-[360px] h-[360px] rounded-full bg-emerald-700 blur-[130px] opacity-[0.08] pointer-events-none" />
			<div className="absolute top-[60%] left-[40%] w-[240px] h-[240px] rounded-full bg-emerald-400 blur-[100px] opacity-[0.05] pointer-events-none" />

			{/* ── Dot-grid texture ── */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
					backgroundSize: "52px 52px",
				}}
			/>

			{/* ── Floating code lines ── */}
			{mounted &&
				BG_SNIPPETS.map((s, i) => (
					<span
						key={i}
						className={`absolute font-mono text-xs text-emerald-500/[0.11] whitespace-nowrap pointer-events-none select-none ${s.cls} ${i % 2 === 0 ? "anim-float" : "anim-float-s"}`}
					>
						{s.text}
					</span>
				))}

			{/* ── Decorative rings ── */}
			<div className="absolute w-[540px] h-[540px] rounded-full border border-dashed border-emerald-500/[0.07] anim-spin-cw pointer-events-none" />
			<div className="absolute w-[680px] h-[680px] rounded-full border border-dashed border-emerald-500/[0.04] anim-spin-ccw pointer-events-none" />

			{/* ── Card wrapper ── */}
			<div className="relative z-10 w-full max-w-[420px] anim-fade-up">
				{/* Glass card */}
				<div className="bg-[#0a1218]/75 backdrop-blur-3xl border border-white/[0.08] rounded-3xl px-9 py-10 shadow-[0_0_0_1px_rgba(16,185,129,0.07),0_40px_80px_rgba(0,0,0,0.6)]">
					{/* ── Logo ── */}
					<div className="flex justify-center mb-7">
						<Link
							href="/"
							className="flex items-center gap-2.5 no-underline"
						>
							<span className="font-['Syne'] font-extrabold text-xl text-slate-100 tracking-tight">
								play
								<span className="text-emerald-400">with</span>
								code
							</span>
						</Link>
					</div>

					{/* ── Heading ── */}
					<div className="text-center mb-7">
						<h1 className="font-['Syne'] font-extrabold text-[1.8rem] text-slate-100 tracking-tight leading-tight mb-2">
							Continue with GitHub
						</h1>

						<p className="font-['DM_Sans'] text-[13.5px] text-slate-500 leading-relaxed">
							Learn coding, practice challenges, and become
							interview-ready.
						</p>
					</div>

					{/* ── Divider ── */}
					<div className="flex items-center gap-3 mb-5">
						<div className="flex-1 h-px bg-white/[0.07]" />
						<span className="text-[11px] text-slate-600 font-['DM_Sans'] uppercase tracking-widest">
							continue with
						</span>
						<div className="flex-1 h-px bg-white/[0.07]" />
					</div>

					{/* ── GitHub button ── */}
					<button
						onClick={handleGithubLogin}
						disabled={loading}
						aria-label="Continue with GitHub"
						className={`w-full flex items-center justify-center gap-3 py-[15px] px-6 rounded-xl font-['DM_Sans'] font-semibold text-[15px] text-[#0d1117] border-none transition-all duration-200
							${
								loading
									? "shimmer-btn cursor-not-allowed opacity-75"
									: "bg-[#f0f6ff] cursor-pointer hover:bg-white hover:-translate-y-0.5 active:translate-y-0"
							}`}
					>
						{loading ? (
							<>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#0d1117"
									strokeWidth="2.5"
									strokeLinecap="round"
									aria-hidden="true"
								>
									<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
										<animateTransform
											attributeName="transform"
											type="rotate"
											from="0 12 12"
											to="360 12 12"
											dur="0.9s"
											repeatCount="indefinite"
										/>
									</path>
								</svg>
								Connecting to GitHub…
							</>
						) : (
							<>
								<GithubIcon />
								Continue with GitHub
							</>
						)}
					</button>

					{/* ── Info note ── */}
					<div className="mt-5 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/[0.13] flex gap-2.5 items-start">
						<span className="text-emerald-500 text-sm mt-0.5 flex-shrink-0">
							ℹ
						</span>
						<p className="font-['DM_Sans'] text-[12.5px] text-slate-500 leading-[1.55]">
							We use GitHub only for secure authentication. We
							never post anything or access your repositories.
						</p>
					</div>
				</div>

				{/* ── Terms ── */}
				<p className="text-center mt-5 font-['DM_Sans'] text-[11.5px] text-slate-600 leading-relaxed anim-fade-up-2">
					By continuing, you agree to our{" "}
					<a
						href="/terms"
						className="text-slate-500 underline underline-offset-2 hover:text-slate-400 transition-colors"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="/privacy"
						className="text-slate-500 underline underline-offset-2 hover:text-slate-400 transition-colors"
					>
						Privacy Policy
					</a>
					.
				</p>

				{/* ── Feature teasers ── */}
				<div className="flex justify-center gap-6 mt-6 anim-fade-up-3">
					{[
						{ icon: "📚", text: "50+ lessons" },
						{ icon: "💻", text: "Live coding" },
						{ icon: "🧠", text: "Interview prep" },
					].map((f) => (
						<div
							key={f.text}
							className="flex items-center gap-1.5 font-['DM_Sans'] text-xs text-slate-600"
						>
							<span className="text-[13px]">{f.icon}</span>
							{f.text}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
