import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
    });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch checked={isDark} onCheckedChange={setIsDark} />
      <Moon className="h-4 w-4" />
    </div>
  );
}
