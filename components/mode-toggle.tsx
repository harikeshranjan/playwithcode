import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			variant={"outline"}
			onClick={toggleTheme}
			className={"cursor-pointer"}
		>
			{theme === "light" ? <Sun /> : <Moon />}
		</Button>
	);
}
