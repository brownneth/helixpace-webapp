export function Sidebar(activePage) {
    const getClasses = (pageName) => {
        const base = "h-10 w-10 rounded-lg flex items-center justify-center transition-all group relative";
        if (activePage === pageName) {
            return `${base} bg-surface-gray text-tech-blue shadow-sm`;
        }
        return `${base} text-slate-400 hover:bg-surface-gray hover:text-helix-dark`;
    };

    return `
    <aside class="w-16 h-full bg-white border-r border-slate-200 flex flex-col items-center py-6 z-50 flex-shrink-0 gap-8 overflow-visible">
        
        <a href="/pages/app/entry/index.html" class="h-10 w-10 text-slate-400 hover:bg-surface-gray hover:text-helix-dark rounded-lg flex items-center justify-center transition-all group relative">
            <span class="material-symbols-sharp text-xl">grid_view</span>
            <span class="absolute left-14 bg-helix-dark text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Dashboard</span>
        </a>

        <div class="flex flex-col gap-4 w-full items-center">
            
            <a href="/pages/app/entry/index.html" class="${getClasses('entry')}">
                <span class="material-symbols-sharp text-xl">add_circle</span>
                <span class="absolute left-14 bg-helix-dark text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">New Entry</span>
            </a>

            <a href="/pages/app/history/index.html" class="${getClasses('history')}">
                <span class="material-symbols-sharp text-xl">history</span>
                <span class="absolute left-14 bg-helix-dark text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">History</span>
            </a>

            <a href="/pages/app/results/index.html" class="${getClasses('results')}">
                <span class="material-symbols-sharp text-xl">science</span>
                <span class="absolute left-14 bg-helix-dark text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Results</span>
            </a>
        </div>

        <div class="mt-auto flex flex-col gap-4 w-full items-center">
             <button class="h-10 w-10 text-slate-400 hover:text-helix-dark hover:bg-surface-gray rounded-lg flex items-center justify-center transition-all group relative">
                <span class="material-symbols-sharp text-xl">settings</span>
                <span class="absolute left-14 bg-helix-dark text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
            </button>
        </div>
    </aside>
    `;
}