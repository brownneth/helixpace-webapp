import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar } from '/src/components/AppNavbar.js';
import { validateSequence } from '/src/utils/dna.js';
import { request } from '/src/api/client.js'; 

document.getElementById('sidebar-mount').innerHTML = Sidebar('entry');
document.getElementById('navbar-mount').innerHTML = AppNavbar('New Sequence');

const input = document.getElementById('dna-input');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');
const statusIndicator = document.getElementById('status-indicator');
const btnAnalyze = document.getElementById('btn-analyze');
const charCount = document.getElementById('char-count');
const btnClear = document.getElementById('btn-clear');

input.addEventListener('input', (e) => {
    const result = validateSequence(e.target.value);
    if (input.value !== result.cleanSequence) {
        input.value = result.cleanSequence;
    }
    charCount.innerText = result.length;
    updateVisuals(result.status);
});

btnClear.addEventListener('click', () => {
    input.value = '';
    charCount.innerText = '0';
    updateVisuals('empty');
    input.focus();
});
btnAnalyze.addEventListener('click', async () => {
    const sequence = input.value;
    
    btnAnalyze.innerText = "Processing...";
    btnAnalyze.disabled = true;

    try {
   
        const result = await request('/api/sequence/analyze', {
            method: 'POST',
            body: JSON.stringify({ sequence_data: sequence })
        });

        alert(`Analysis Complete!\nLength: ${result.length}\nGC Content: ${result.gc_content}%`);
        window.location.href = '/pages/app/results/index.html';

    } catch (err) {
        alert("Error: " + err.message);
        btnAnalyze.innerText = "Run Analysis";
        btnAnalyze.disabled = false;
    }
});

function updateVisuals(status) {
    input.classList.remove('border-slate-200', 'border-error-red', 'border-success-green', 'focus:border-tech-blue', 'focus:border-error-red', 'focus:border-success-green');
    
    if (status === 'empty') {
        input.classList.add('border-slate-200', 'focus:border-tech-blue');
        statusText.innerText = "Awaiting Input";
        statusDot.className = "w-2 h-2 rounded-full bg-slate-300";
        statusIndicator.className = "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5";
        toggleButton(false);
    } 
    else if (status === 'invalid') {
        input.classList.add('border-error-red', 'focus:border-error-red');
        statusText.innerText = "Invalid Characters";
        statusDot.className = "w-2 h-2 rounded-full bg-error-red animate-pulse";
        statusIndicator.className = "text-[10px] font-mono font-bold text-error-red uppercase tracking-wider flex items-center gap-1.5";
        toggleButton(false);
    } 
    else if (status === 'valid') {
        input.classList.add('border-success-green', 'focus:border-success-green');
        statusText.innerText = "Sequence Valid";
        statusDot.className = "w-2 h-2 rounded-full bg-success-green";
        statusIndicator.className = "text-[10px] font-mono font-bold text-success-green uppercase tracking-wider flex items-center gap-1.5";
        toggleButton(true);
    }
}

function toggleButton(enabled) {
    btnAnalyze.disabled = !enabled;
    if (enabled) {
        btnAnalyze.className = "h-10 px-6 bg-tech-blue text-white font-semibold rounded-md hover:bg-pale-sky hover:text-tech-blue transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer text-sm";
    } else {
        btnAnalyze.className = "h-10 px-6 bg-slate-200 text-slate-400 font-semibold rounded-md transition-all shadow-none flex items-center gap-2 cursor-not-allowed text-sm";
    }
}