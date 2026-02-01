import { auth } from '/src/api/client.js';

export function AppNavbar(pageTitle) {
    let userName = localStorage.getItem('helixpace_user_name');
    if (!userName || userName === 'undefined' || userName === 'null') {
        userName = 'Researcher';
    }
    
    const firstInitial = userName.charAt(0).toUpperCase();

    return `
    <nav class="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 relative z-50">
        <h2 class="text-lg font-bold text-slate-700 tracking-tight">${pageTitle}</h2>

        <div class="flex items-center gap-4">
            
            <button class="w-8 h-8 rounded-full bg-surface-gray text-slate-400 hover:text-tech-blue hover:bg-blue-50 flex items-center justify-center transition-all">
                <span class="material-symbols-sharp text-[18px]">notifications</span>
            </button>

            <div class="h-8 w-[1px] bg-slate-200"></div>

            <div class="relative">
                <button id="profile-btn" class="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div class="text-right hidden sm:block">
                        <div class="text-sm font-bold text-helix-dark">${userName}</div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BIOMED YEAR 5 LABS</div>
                    </div>
                    
                    <div class="w-9 h-9 rounded-full bg-surface-gray border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                        ${firstInitial}
                    </div>
                </button>

                <div id="profile-menu" class="hidden absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-1 transform origin-top-right transition-all">
                    <div class="px-4 py-3 border-b border-slate-50">
                        <p class="text-xs text-slate-500">Signed in as</p>
                        <p class="text-xs font-bold text-helix-dark truncate">${userName}</p>
                    </div>
                    <button id="btn-logout" class="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-error-red hover:text-white transition-colors flex items-center gap-2">
                        <span class="material-symbols-sharp text-[16px]">logout</span>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </nav>
    `;
}
export function setupNavbarListeners() {
    const btn = document.getElementById('profile-btn');
    const menu = document.getElementById('profile-menu');
    const logout = document.getElementById('btn-logout');

    if (btn && menu) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
        menu.addEventListener('click', (e) => e.stopPropagation());
    }
    if (logout) {
        logout.addEventListener('click', () => {
            auth.clearToken();
            localStorage.removeItem('helixpace_user_name');
            localStorage.removeItem('helixpace_last_result');
            window.location.href = '/pages/login/index.html';
        });
    }
}