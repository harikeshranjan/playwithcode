"use client";

import { MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── tiny animated code snippet for the glass card ─── */
const CODE_LINES = [
	{
		indent: 0,
		tokens: [
			{ t: "function ", c: "kw" },
			{ t: "greet", c: "fn" },
			{ t: "(", c: "punc" },
			{ t: "name", c: "param" },
			{ t: ") {", c: "punc" },
		],
	},
	{
		indent: 1,
		tokens: [
			{ t: "return ", c: "kw" },
			{ t: '"Hello, "', c: "str" },
			{ t: " + ", c: "op" },
			{ t: "name", c: "param" },
		],
	},
	{ indent: 0, tokens: [{ t: "}", c: "punc" }] },
	{ indent: 0, tokens: [] },
	{
		indent: 0,
		tokens: [
			{ t: "greet", c: "fn" },
			{ t: "(", c: "punc" },
			{ t: '"World"', c: "str" },
			{ t: ")", c: "punc" },
		],
	},
];

const TOKEN_COLORS: Record<string, string> = {
	kw: "#7dd3b0",
	fn: "#6ee7b7",
	str: "#fbbf24",
	param: "#93c5fd",
	punc: "#94a3b8",
	op: "#cbd5e1",
};

const STATS = [
	{ value: "50+", label: "Lessons" },
	{ value: "200+", label: "Challenges" },
	{ value: "10k+", label: "Learners" },
];

const FEATURES = [
	{ icon: "📚", label: "Beginner lessons" },
	{ icon: "💻", label: "Live coding" },
	{ icon: "🧠", label: "Interview prep" },
	{ icon: "📈", label: "Progress tracking" },
];

/* ─── floating orb ─── */
function Orb({
	cx,
	cy,
	r,
	color,
	blur,
	opacity,
}: {
	cx: string;
	cy: string;
	r: string;
	color: string;
	blur: string;
	opacity: number;
}) {
	return (
		<div
			style={{
				position: "absolute",
				left: cx,
				top: cy,
				width: r,
				height: r,
				borderRadius: "50%",
				background: color,
				filter: `blur(${blur})`,
				opacity,
				transform: "translate(-50%, -50%)",
				pointerEvents: "none",
			}}
		/>
	);
}

export default function Home() {
	const [typedLines, setTypedLines] = useState(0);
	const [cursor, setCursor] = useState(true);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	/* reveal code lines one at a time */
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setTypedLines((prev) => {
				if (prev >= CODE_LINES.length) {
					clearInterval(intervalRef.current!);
					return prev;
				}
				return prev + 1;
			});
		}, 520);
		return () => clearInterval(intervalRef.current!);
	}, []);

	/* blinking cursor */
	useEffect(() => {
		const t = setInterval(() => setCursor((p) => !p), 530);
		return () => clearInterval(t);
	}, []);

	return (
		<main
			style={{
				minHeight: "100vh",
				background: "#080c0f",
				position: "relative",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				paddingTop: "80px",
			}}
		>
			{/* ── Background orbs ── */}
			<Orb
				cx="18%"
				cy="30%"
				r="520px"
				color="#10b981"
				blur="160px"
				opacity={0.13}
			/>
			<Orb
				cx="80%"
				cy="60%"
				r="400px"
				color="#059669"
				blur="140px"
				opacity={0.1}
			/>
			<Orb
				cx="55%"
				cy="10%"
				r="300px"
				color="#34d399"
				blur="120px"
				opacity={0.07}
			/>

			{/* ── Subtle grid overlay ── */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
					pointerEvents: "none",
				}}
			/>

			{/* ── Content ── */}
			<div
				style={{
					maxWidth: "1120px",
					margin: "0 auto",
					padding: "60px 24px 80px",
					width: "100%",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "56px",
						alignItems: "center",
					}}
					className="hero-grid"
				>
					{/* ── Left: Text ── */}
					<div>
						{/* Badge */}
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: "8px",
								padding: "6px 14px",
								borderRadius: "999px",
								background: "rgba(16,185,129,0.12)",
								border: "1px solid rgba(16,185,129,0.28)",
								marginBottom: "28px",
								backdropFilter: "blur(8px)",
							}}
						>
							<span
								style={{
									width: 7,
									height: 7,
									borderRadius: "50%",
									background: "#10b981",
									display: "inline-block",
									boxShadow: "0 0 8px #10b981",
								}}
							/>
							<span
								style={{
									fontSize: "13px",
									color: "#6ee7b7",
									fontFamily: "'DM Sans', sans-serif",
									fontWeight: 500,
									letterSpacing: "0.02em",
								}}
							>
								Free to start · No credit card
							</span>
						</div>

						{/* Headline */}
						<h1
							style={{
								fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
								fontFamily: "'Syne', sans-serif",
								fontWeight: 800,
								lineHeight: 1.08,
								color: "#f1f5f9",
								margin: "0 0 20px",
								letterSpacing: "-0.02em",
							}}
						>
							Learn to code.{" "}
							<span
								style={{
									background:
										"linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							>
								Play your way.
							</span>
						</h1>

						{/* Sub */}
						<p
							style={{
								fontSize: "1.1rem",
								color: "#94a3b8",
								lineHeight: 1.7,
								margin: "0 0 36px",
								maxWidth: "440px",
								fontFamily: "'DM Sans', sans-serif",
							}}
						>
							Beginner-friendly lessons, hands-on coding, and
							interview prep — all in one place. Start learning
							today and become{" "}
							<span style={{ color: "#cbd5e1" }}>
								interview-ready
							</span>
							.
						</p>

						{/* CTAs */}
						<div
							style={{
								display: "flex",
								gap: "14px",
								flexWrap: "wrap",
								marginBottom: "52px",
							}}
						>
							<button
								style={{
									padding: "14px 30px",
									borderRadius: "10px",
									background: "#10b981",
									color: "#fff",
									fontFamily: "'DM Sans', sans-serif",
									fontWeight: 600,
									fontSize: "15px",
									border: "none",
									cursor: "pointer",
									boxShadow:
										"0 0 28px rgba(16,185,129,0.35), 0 4px 16px rgba(16,185,129,0.2)",
									transition:
										"transform 0.15s, box-shadow 0.15s",
									letterSpacing: "0.01em",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
								onMouseEnter={(e) => {
									(
										e.currentTarget as HTMLButtonElement
									).style.transform = "translateY(-2px)";
									(
										e.currentTarget as HTMLButtonElement
									).style.boxShadow =
										"0 0 36px rgba(16,185,129,0.5), 0 8px 24px rgba(16,185,129,0.3)";
								}}
								onMouseLeave={(e) => {
									(
										e.currentTarget as HTMLButtonElement
									).style.transform = "translateY(0)";
									(
										e.currentTarget as HTMLButtonElement
									).style.boxShadow =
										"0 0 28px rgba(16,185,129,0.35), 0 4px 16px rgba(16,185,129,0.2)";
								}}
							>
								Start Playing <MoveRight />
							</button>
						</div>

						{/* Stats */}
						<div style={{ display: "flex", gap: "36px" }}>
							{STATS.map((s) => (
								<div key={s.label}>
									<div
										style={{
											fontSize: "1.6rem",
											fontFamily: "'Syne', sans-serif",
											fontWeight: 800,
											color: "#10b981",
											lineHeight: 1,
											marginBottom: "4px",
										}}
									>
										{s.value}
									</div>
									<div
										style={{
											fontSize: "12px",
											color: "#64748b",
											fontFamily: "'DM Sans', sans-serif",
											textTransform: "uppercase",
											letterSpacing: "0.08em",
										}}
									>
										{s.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* ── Right: Glass Code Card + feature pills ── */}
					<div style={{ position: "relative" }}>
						{/* Decorative ring behind card */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: "420px",
								height: "420px",
								borderRadius: "50%",
								border: "1px solid rgba(16,185,129,0.1)",
								pointerEvents: "none",
							}}
						/>
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: "520px",
								height: "520px",
								borderRadius: "50%",
								border: "1px solid rgba(16,185,129,0.05)",
								pointerEvents: "none",
							}}
						/>

						{/* Glass code editor card */}
						<div
							style={{
								background: "rgba(15,23,30,0.55)",
								backdropFilter: "blur(24px)",
								WebkitBackdropFilter: "blur(24px)",
								border: "1px solid rgba(255,255,255,0.08)",
								borderRadius: "18px",
								overflow: "hidden",
								boxShadow:
									"0 0 0 1px rgba(16,185,129,0.08), 0 32px 64px rgba(0,0,0,0.5)",
							}}
						>
							{/* Window chrome */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "14px 18px",
									borderBottom:
										"1px solid rgba(255,255,255,0.06)",
									background: "rgba(255,255,255,0.025)",
								}}
							>
								<span
									style={{
										width: 12,
										height: 12,
										borderRadius: "50%",
										background: "#ff5f57",
									}}
								/>
								<span
									style={{
										width: 12,
										height: 12,
										borderRadius: "50%",
										background: "#febc2e",
									}}
								/>
								<span
									style={{
										width: 12,
										height: 12,
										borderRadius: "50%",
										background: "#28c840",
									}}
								/>
								<span
									style={{
										marginLeft: "auto",
										fontSize: "12px",
										color: "#475569",
										fontFamily: "monospace",
									}}
								>
									hello.js
								</span>
							</div>

							{/* Code area */}
							<div
								style={{
									padding: "24px 20px 28px",
									fontFamily:
										"'JetBrains Mono', 'Fira Code', monospace",
									fontSize: "14px",
									lineHeight: "1.85",
									minHeight: "200px",
								}}
							>
								{CODE_LINES.slice(0, typedLines).map(
									(line, li) => (
										<div
											key={li}
											style={{ display: "flex" }}
										>
											<span
												style={{
													color: "#374151",
													width: "28px",
													textAlign: "right",
													marginRight: "20px",
													userSelect: "none",
													fontSize: "12px",
													paddingTop: "1px",
												}}
											>
												{li + 1}
											</span>
											<span
												style={{
													paddingLeft: `${line.indent * 18}px`,
												}}
											>
												{line.tokens.map((tok, ti) => (
													<span
														key={ti}
														style={{
															color:
																TOKEN_COLORS[
																	tok.c
																] ?? "#e2e8f0",
														}}
													>
														{tok.t}
													</span>
												))}
												{li === typedLines - 1 && (
													<span
														style={{
															display:
																"inline-block",
															width: "2px",
															height: "15px",
															background:
																"#10b981",
															verticalAlign:
																"middle",
															marginLeft: "2px",
															opacity: cursor
																? 1
																: 0,
														}}
													/>
												)}
											</span>
										</div>
									),
								)}
							</div>

							{/* Output bar */}
							{typedLines >= CODE_LINES.length && (
								<div
									style={{
										borderTop:
											"1px solid rgba(255,255,255,0.06)",
										padding: "12px 20px",
										background: "rgba(16,185,129,0.05)",
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<span
										style={{
											fontSize: "10px",
											background: "#10b981",
											color: "#fff",
											padding: "2px 8px",
											borderRadius: "4px",
											fontWeight: 700,
											letterSpacing: "0.05em",
											fontFamily: "monospace",
										}}
									>
										OUTPUT
									</span>
									<span
										style={{
											fontSize: "13px",
											color: "#6ee7b7",
											fontFamily: "monospace",
										}}
									>
										Hello, World
									</span>
								</div>
							)}
						</div>

						{/* Floating feature pills */}
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "10px",
								marginTop: "16px",
							}}
						>
							{FEATURES.map((f) => (
								<div
									key={f.label}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
										padding: "12px 16px",
										borderRadius: "12px",
										background: "rgba(15,23,30,0.5)",
										backdropFilter: "blur(16px)",
										WebkitBackdropFilter: "blur(16px)",
										border: "1px solid rgba(255,255,255,0.07)",
										fontSize: "13px",
										color: "#94a3b8",
										fontFamily: "'DM Sans', sans-serif",
										fontWeight: 500,
									}}
								>
									<span style={{ fontSize: "16px" }}>
										{f.icon}
									</span>
									{f.label}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* ── Motto strip ── */}
				<div
					style={{
						marginTop: "72px",
						textAlign: "center",
					}}
				>
					<p
						style={{
							fontSize: "clamp(1rem, 2vw, 1.25rem)",
							color: "#475569",
							fontFamily: "'DM Sans', sans-serif",
							fontStyle: "italic",
							letterSpacing: "0.01em",
						}}
					>
						"Learn coding by{" "}
						<span
							style={{
								color: "#10b981",
								fontStyle: "normal",
								fontWeight: 600,
							}}
						>
							playing with code
						</span>{" "}
						and prepare for your dream job at the same time."
					</p>
				</div>
			</div>

			{/* ── Google Fonts ── */}
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
				@media (max-width: 768px) {
					.hero-grid {
						grid-template-columns: 1fr !important;
					}
				}
				* { box-sizing: border-box; }
			`}</style>
		</main>
	);
}
