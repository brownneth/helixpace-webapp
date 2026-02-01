import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar, setupNavbarListeners } from '/src/components/AppNavbar.js';
import { request } from '/src/api/client.js';

document.getElementById('sidebar-mount').innerHTML = Sidebar('history');
document.getElementById('navbar-mount').innerHTML = AppNavbar('Search History');
setupNavbarListeners();

const tableContainer = document.getElementById('history-table-body');
const searchInput = document.getElementById('history-search');

let allSequences = [];
async function initHistory() {
    try {
        const response = await request('/sequences/me');
        const data = response.data;
        if (!data || data.length === 0) {
            renderTable([]);
            return;
        }
        allSequences = data;
        renderTable(allSequences);

    } catch (err) {
        console.error(err);
        tableContainer.innerHTML = `<div class="p-8 text-center text-error-red text-sm font-bold">Failed to load system logs.</div>`;
    }
}

function renderTable(sequences) {
    if (sequences.length === 0) {
        tableContainer.innerHTML = `<div class="p-12 text-center text-slate-400 text-xs font-mono uppercase tracking-wider">No matching records found</div>`;
        return;
    }

    const rows = sequences.map(seq => {
        const projectName = seq.description || "Untitled Batch";
        
        return `
        <div class="lab-row group">
            <div class="w-32 lab-col text-xs text-slate-500 font-medium">
                ${new Date(seq.created_at).toLocaleDateString()}
            </div>
            
            <div class="w-32 lab-col">
                <span class="data-id">#SEQ-${seq.id}</span>
            </div>

            <div class="w-48 lab-col">
                <span class="text-xs font-bold text-slate-700 truncate">${projectName}</span>
            </div>

            <div class="flex-1 lab-col">
                <div class="data-mono text-slate-400 truncate max-w-[300px] opacity-70 group-hover:opacity-100">
                    ${seq.sequence}
                </div>
            </div>

            <div class="w-24 lab-col justify-end">
                <span class="data-mono">${seq.gc_content}%</span>
            </div>

            <div class="w-32 lab-col pl-6">
                <div class="status-indicator status-complete">
                    <div class="status-dot"></div>
                    <span>PROCESSED</span>
                </div>
            </div>
        </div>
    `}).join('');

    tableContainer.innerHTML = rows;
}
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allSequences.filter(seq => {
        const idMatch = seq.id.toString().includes(term);
        const seqMatch = seq.sequence.toLowerCase().includes(term);
        const dateMatch = new Date(seq.created_at).toLocaleDateString().toLowerCase().includes(term);
        
        const descMatch = (seq.description || "Untitled Batch").toLowerCase().includes(term);

        return idMatch || seqMatch || dateMatch || descMatch;
    });

    renderTable(filtered);
});
initHistory();