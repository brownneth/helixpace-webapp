export function AppNavbar(breadcrumbTitle) {
    return `
    <nav class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-10">
        <div class="flex items-center gap-3">
            <a href="/" class="font-bold tracking-tight text-lg text-helix-dark hover:text-tech-blue transition-colors cursor-pointer">Helixpace</a>
            <span class="text-slate-300 text-xs font-mono px-2">/</span>
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">${breadcrumbTitle}</span>
        </div>

        <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
                <p class="text-xs font-bold text-slate-900">Dr. Solomon Nwaneri</p>
                <p class="text-[10px] text-slate-500 font-mono">BIOMED YEAR 5 LABS</p>
            </div>
            <div class="h-8 w-8 rounded-full bg-tech-blue text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white cursor-pointer hover:ring-pale-sky transition-all">
                SN
            </div>
        </div>
    </nav>
    `;
}