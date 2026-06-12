"use client";

export default function FooterBar() {
    return (
        <footer className="w-full border-t border-border-sep bg-background select-none theme-transition font-mono relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[960px] mx-auto py-10 px-6">
                {/* Brand Column */}
                <div className="flex flex-col gap-3">
                    <button className="flex w-fit cursor-pointer transform-gpu will-change-transform transition-transform duration-200 active:scale-95">
                        <span className="font-bold text-3xl text-text-main">
                            Kawa<span className="text-primary">ii</span>
                        </span>
                    </button>
                    <p className="text-text-muted text-xs leading-relaxed max-w-xs">
                        Eng so&apos;nggi anime yangiliklari, qiziqarli forumlar va eng sara anime musiqalari barchasi bitta platformada.
                    </p>
                </div>

                {/* Navigation Column */}
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-text-main text-sm uppercase mb-1">Navigatsiya</span>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Asosiy</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Profil</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Yangiliklar</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Radio</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Katalog</a>
                </div>

                {/* Support Column */}
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-text-main text-sm uppercase mb-1">Yordam</span>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Aloqa</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Qoidalar</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">F.A.Q.</a>
                    <a href="#" className="text-text-muted hover:text-primary text-xs uppercase transition-colors w-fit">Biz haqimizda</a>
                </div>
            </div>
            <div className="w-full text-center py-4 border-t border-border-sep/40 text-[10px] text-text-muted">
                &copy; {new Date().getFullYear()} Kawaii Platform. Barcha huquqlar himoyalangan.
            </div>
        </footer>
    );
}
