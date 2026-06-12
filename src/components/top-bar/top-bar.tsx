"use client";

import Image from "next/image";
import { useThemeHook } from "./_hooks/top-bar-hooks";

export default function TopBar() {
    const { theme, toggleTheme } = useThemeHook();

    return (
        <nav className="sticky flex items-center justify-center top-0 h-16 w-full border-b border-border-sep bg-background select-none z-[999] overflow-hidden theme-transition">
            <div className="flex items-center justify-between w-full max-w-[960px] mx-auto px-6">
                {/* Logo */}
                <button className="flex cursor-pointer transform-gpu will-change-transform transition-transform duration-200 active:scale-95">
                    <span className="font-bold text-3xl font-mono tracking-tight text-text-main">
                        Kawa<span className="text-primary">ii</span>
                    </span>
                </button>

                {/* Nav Links (hidden on mobile, shown on md and up) */}
                <div className="hidden md:flex items-center justify-center text-text-main h-full gap-4 lg:gap-6 font-mono">
                    <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-foreground/5 active:scale-95">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m21.78 20.72-4.34-4.34a8.702 8.702 0 0 0 2.06-5.63C19.5 5.925 15.575 2 10.75 2S2 5.925 2 10.75s3.925 8.75 8.75 8.75a8.702 8.702 0 0 0 5.63-2.06l4.34 4.34 1.06-1.06ZM3.5 10.75c0-4 3.25-7.25 7.25-7.25S18 6.75 18 10.75 14.75 18 10.75 18 3.5 14.75 3.5 10.75Z"></path>
                        </svg>
                    </button>
                    <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-foreground/5 active:scale-95">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.75 3.5c-.69 0-1.25.56-1.25 1.25V16.8c.375-.192.8-.3 1.25-.3H18.5v-13H6.75ZM18.5 18H6.75a1.25 1.25 0 1 0 0 2.5H18.5V18ZM4 19.25V4.75A2.75 2.75 0 0 1 6.75 2H20v20H6.75A2.75 2.75 0 0 1 4 19.25Z"></path>
                        </svg>
                        <span className="font-medium text-text-main text-sm">Katalog</span>
                    </button>
                    <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-foreground/5 active:scale-95">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.77 21.7c.155.065.32.095.48.095l.005-.005c.32 0 .64-.125.88-.365L11.56 18h7.69A2.755 2.755 0 0 0 22 15.25v-9.5A2.755 2.755 0 0 0 19.25 3H4.75A2.755 2.755 0 0 0 2 5.75v9.5A2.755 2.755 0 0 0 4.75 18H6v2.545c0 .51.3.96.77 1.155ZM3.5 5.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25h-8.31L7.5 19.94V16.5H4.75c-.69 0-1.25-.56-1.25-1.25v-9.5ZM17.5 8h-11v1.5h11V8Zm-4 3.5h-7V13h7v-1.5Z"></path>
                        </svg>
                        <span className="font-medium text-text-main text-sm">Forumlar</span>
                    </button>
                    <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-foreground/5 active:scale-95">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m20.15 21.09-2.73-.35a2.752 2.752 0 0 1-2.375-3.08l.385-2.975a2.737 2.737 0 0 1 1.045-1.825 2.72 2.72 0 0 1 2.03-.55l1.24.16.02-.145c.285-2.23-.4-4.48-1.885-6.165a7.816 7.816 0 0 0-5.875-2.655c-2.25 0-4.39.97-5.875 2.655a7.815 7.815 0 0 0-1.885 6.165l.02.145 1.24-.16c.73-.095 1.45.1 2.03.55.58.45.955 1.1 1.045 1.825l.38 2.975a2.755 2.755 0 0 1-2.375 3.08l-2.73.35-1.1-8.575a9.34 9.34 0 0 1 2.25-7.35A9.34 9.34 0 0 1 12.01 2c2.68 0 5.23 1.155 7.005 3.165a9.334 9.334 0 0 1 2.25 7.35l-1.1 8.575h-.015Zm-1.995-7.305c-.275 0-.54.09-.76.26-.265.205-.435.5-.475.83l-.385 2.975a1.253 1.253 0 0 0 1.08 1.4l1.24.16.7-5.455-1.24-.16a1.83 1.83 0 0 0-.16-.01Zm-13.705.17.7 5.455 1.24-.16a1.25 1.25 0 0 0 1.08-1.4l-.385-2.975a1.252 1.252 0 0 0-1.4-1.08l-1.24.16h.005Z"></path>
                        </svg>
                        <span className="font-medium text-text-main text-sm">Radio</span>
                    </button>
                </div>

                {/* Right Side Settings */}
                <div className="flex items-center justify-end gap-3.5">
                    {/* Theme Toggle Button */}
                    <button 
                        className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-200 cursor-pointer text-text-main hover:bg-foreground/5 active:scale-95" 
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d={theme === "light" ? "M12 22C6.485 22 2 17.515 2 12c0-5.02 3.755-9.28 8.735-9.91l1.11-.14-.29 1.08c-.2.75-.305 1.495-.305 2.225 0 4.685 3.815 8.5 8.5 8.5a8.78 8.78 0 0 0 1.075-.075l1.11-.14-.29 1.08A10.01 10.01 0 0 1 12 22.005V22ZM9.865 3.78C6.17 4.735 3.5 8.1 3.5 12c0 4.685 3.815 8.5 8.5 8.5 3.46 0 6.55-2.11 7.845-5.25h-.095c-5.515 0-10-4.485-10-10 0-.485.04-.975.115-1.47Z" : "M12.75 1h-1.5v3h1.5V1ZM23 11.25h-3v1.5h3v-1.5Zm-19 0H1v1.5h3v-1.5Zm15.246-7.557-2.121 2.12 1.06 1.062 2.122-2.122-1.061-1.06ZM4.75 3.685 3.69 4.746l2.12 2.121 1.062-1.06L4.75 3.685Zm1.06 13.448-2.12 2.12 1.06 1.061 2.122-2.12-1.061-1.061ZM12 18.5A6.506 6.506 0 0 1 5.5 12c0-3.585 2.915-6.5 6.5-6.5s6.5 2.915 6.5 6.5-2.915 6.5-6.5 6.5ZM12 7c-2.755 0-5 2.245-5 5s2.245 5 5 5 5-2.245 5-5-2.245-5-5-5Zm.75 13h-1.5v3h1.5v-3Zm5.435-2.875-1.06 1.061 2.12 2.122 1.061-1.061-2.12-2.122Z"}></path>
                        </svg>
                    </button>
                    
                    {/* Notification Button */}
                    <button className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-200 cursor-pointer text-text-main hover:bg-foreground/5 active:scale-95">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m20 15.05-1.5-2.6V8.5C18.5 4.915 15.585 2 12 2a6.506 6.506 0 0 0-6.5 6.5v3.95L4 15.05V19h4.325c.35 1.71 1.865 3 3.675 3 1.81 0 3.325-1.29 3.675-3H20v-3.95Zm-8 5.45c-.975 0-1.8-.63-2.11-1.5h4.225c-.31.87-1.135 1.5-2.11 1.5H12Zm6.5-3h-13v-2.05l1.5-2.6V8.495c0-2.755 2.245-5 5-5s5 2.245 5 5v4.355l1.5 2.6v2.05Z"></path>
                        </svg>
                    </button>

                    {/* Profile Picture */}
                    <button className="flex shrink-0 h-9 w-9 rounded-sm border border-border-sep bg-foreground/5 transform-gpu will-change-transform cursor-pointer transition-transform overflow-hidden duration-200 active:scale-95">
                        <div className="relative w-full h-full">
                            <Image className="object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlk0JfikQBJpYrg_nlYLZUcjDOcEaanRtykudQ9_X1slNjDwOINg9RYk&s=10" alt="Profile image" draggable={false} fill unoptimized priority/>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    );
}
