"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Menu, X, LogIn } from "lucide-react";

import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";

const navLinks = [{ label: "Learn", href: "/learn" }];

export default function Header() {
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 12);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const closeMenu = () => setMenuOpen(false);

		window.addEventListener("resize", closeMenu);

		return () => window.removeEventListener("resize", closeMenu);
	}, []);

	return (
		<header
			className={[
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
				scrolled
					? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/70 dark:border-zinc-800/70 shadow-sm"
					: "bg-transparent",
			].join(" ")}
		>
			<nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">
					{/* ── Logo ── */}
					<div className="flex items-center">
						<Link
							href="/"
							className="group flex items-center gap-2 select-none"
							aria-label="playwithcode home"
						>
							{/* Logo badge: emerald green instead of zinc-900 */}
							<span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 dark:bg-emerald-400 transition-transform duration-200 group-hover:scale-105 shadow-sm shadow-emerald-500/30">
								<span className="text-sm font-bold text-white dark:text-zinc-900">
									{"</>"}
								</span>
							</span>

							<span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-zinc-100">
								play
								{/* "with" gets the emerald tint instead of plain zinc */}
								<span className="text-emerald-500 dark:text-emerald-400">
									with
								</span>
								code
							</span>
						</Link>
					</div>

					{/* ── Center Navigation ── */}
					<div className="hidden md:flex items-center justify-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="relative px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400
								rounded-md transition-colors duration-150
								hover:text-emerald-600 dark:hover:text-emerald-400
								hover:bg-emerald-50 dark:hover:bg-emerald-950/40
								focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* ── Right Controls ── */}
					<div className="flex items-center justify-end gap-2">
						{/* Desktop */}
						<div className="hidden md:flex items-center gap-3">
							<ModeToggle />

							{/* Emerald CTA button */}
							<Button
								onClick={() => router.push("/login")}
								className="h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 transition-colors duration-150 border-0 cursor-pointer"
							>
								<LogIn className="w-4 h-4" />
								Play
							</Button>
						</div>

						{/* Mobile */}
						<div className="flex md:hidden items-center gap-2">
							<ModeToggle />

							{/* Emerald CTA button */}
							<Button
								onClick={() => router.push("/login")}
								className="h-9 px-4 rounded-md bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 transition-colors duration-150 border-0 cursor-pointer"
							>
								<LogIn className="w-4 h-4" />
								Play
							</Button>

							<Button
								variant={"ghost"}
								onClick={() => setMenuOpen((prev) => !prev)}
								aria-label={
									menuOpen ? "Close menu" : "Open menu"
								}
								aria-expanded={menuOpen}
								className="inline-flex items-center justify-center w-9 h-9 rounded-md
								text-zinc-600 dark:text-zinc-400
								hover:text-emerald-600 dark:hover:text-emerald-400
								hover:bg-emerald-50 dark:hover:bg-emerald-950/40
								focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
								transition-colors duration-150"
							>
								{menuOpen ? (
									<X className="w-5 h-5" />
								) : (
									<Menu className="w-5 h-5" />
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* ── Mobile Dropdown ── */}
				<div
					className={[
						"md:hidden overflow-hidden transition-all duration-300 ease-in-out",
						menuOpen
							? "max-h-60 opacity-100 pb-4"
							: "max-h-0 opacity-0",
					].join(" ")}
					aria-hidden={!menuOpen}
				>
					<div className="flex flex-col gap-1 pt-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className="px-3 py-2.5 rounded-lg text-sm font-medium
                           text-zinc-700 dark:text-zinc-300
                           hover:text-emerald-600 dark:hover:text-emerald-400
                           hover:bg-emerald-50 dark:hover:bg-emerald-950/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                           transition-colors duration-150"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}
