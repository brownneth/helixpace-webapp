import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar, setupNavbarListeners } from '/src/components/AppNavbar.js';

document.getElementById('sidebar-mount').innerHTML = Sidebar('results');
document.getElementById('navbar-mount').innerHTML = AppNavbar('Analysis Results');
setupNavbarListeners();
const rawData = localStorage.getItem('helixpace_last_result');
const tableBody = document.getElementById('result-table-body');
const revCompCard = document.getElementById('rev-comp-card');
const revCompText = document.getElementById('result-rev-comp');
const dateText = document.getElementById('result-date');

if (rawData) {
    const data = JSON.parse(rawData);
    dateText.innerText = `Batch #${data.id} processed on ${new Date(data.created_at).toLocaleDateString()}`;
    tableBody.innerHTML = `
        <div class="h-14 border-b border-slate-100 flex items-center px-6 hover:bg-slate-50 transition-colors group">
            <div class="w-24 font-mono text-xs font-medium text-tech-blue">#SEQ-${data.id}</div>
            <div class="flex-1 font-mono text-xs text-slate-400 truncate pr-8">
                <span class="text-helix-dark">${data.sequence.substring(0, 10)}</span>${data.sequence.length > 10 ? '...' : ''}
            </div>
            <div class="w-24 font-mono text-xs text-slate-600 text-right">${data.length} BP</div>
            <div class="w-24 font-mono text-xs text-slate-600 text-right">${data.gc_content}%</div>
            <div class="w-32 pl-6">
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success-green/10 text-success-green text-[10px] font-bold border border-success-green/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-success-green"></span>
                    COMPLETE
                </span>
            </div>
        </div>
    `;
    if (data.reverse_complement) {
        revCompCard.classList.remove('hidden');
        revCompText.innerText = data.reverse_complement;
    }
}