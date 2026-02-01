export function AppNavbar(pageTitle) {
    let userName = localStorage.getItem('helixpace_user_name');
    if (!userName || userName === 'undefined' || userName === 'null') {
        userName = 'Researcher';
    }
    
    const firstInitial = userName.charAt(0).toUpperCase();

    return `
    <nav class="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
        <h2 class="text-lg font-bold text-slate-700 tracking-tight">${pageTitle}</h2>

        <div class="flex items-center gap-4">
            
            <button class="w-8 h-8 rounded-full bg-surface-gray text-slate-400 hover:text-tech-blue hover:bg-blue-50 flex items-center justify-center transition-all">
                <span class="material-symbols-sharp text-[18px]">notifications</span>
            </button>

            <div class="h-8 w-[1px] bg-slate-200"></div>

            <div class="flex items-center gap-3 pl-2">
                <div class="text-right hidden sm:block">
                    <div class="text-sm font-bold text-helix-dark">${userName}</div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BIOMED YEAR 5 LABS</div>
                </div>
                
                <div class="w-9 h-9 rounded-full bg-surface-gray border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                    ${firstInitial}
                </div>
            </div>
        </div>
    </nav>
    `;
}