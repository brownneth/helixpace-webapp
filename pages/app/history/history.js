import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar, setupNavbarListeners } from '/src/components/AppNavbar.js';
import { request } from '/src/api/client.js';

document.getElementById('sidebar-mount').innerHTML = Sidebar('history');
document.getElementById('navbar-mount').innerHTML = AppNavbar('Search History');
setupNavbarListeners();

const tableContainer = document.querySelector('.flex-1.overflow-auto');

async function loadHistory() {
    try {
        const response = await request('/sequences/me');
        const sequences = response.data;

        if (!sequences || sequences.length === 0) {
            tableContainer.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">No analysis history found.</div>`;
            return;
        }

        const rows = sequences.map(seq => `
            <div class="h-16 border-b border-slate-100 flex items-center px-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div class="w-28 text-xs text-slate-500 font-medium">${new Date(seq.created_at).toLocaleDateString()}</div>
                <div class="w-24 font-mono text-xs font-bold text-tech-blue">#SEQ-${seq.id}</div>
                <div class="flex-1 pr-8">
                    <div class="text-xs font-bold text-helix-dark">Batch Analysis</div>
                    <div class="text-[10px] text-slate-400 truncate max-w-[200px]">${seq.sequence}</div>
                </div>
                <div class="w-24 font-mono text-xs text-slate-600 text-right">${seq.gc_content}% GC</div>
                <div class="w-24 pl-4">
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success-green/10 text-success-green text-[10px] font-bold border border-success-green/20">COMPLETE</span>
                </div>
            </div>
        `).join('');

        tableContainer.innerHTML = rows;

    } catch (err) {
        console.error(err);
        tableContainer.innerHTML = `<div class="p-8 text-center text-error-red text-sm font-bold">Failed to load history.</div>`;
    }
}

loadHistory();