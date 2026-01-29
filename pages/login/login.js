const btnLogin = document.getElementById('tab-login');
const btnSignup = document.getElementById('tab-signup');
const formLogin = document.getElementById('form-login');
const formSignup = document.getElementById('form-signup');
const title = document.getElementById('header-title');
const desc = document.getElementById('header-desc');

function switchTab(tab) {
    if (tab === 'login') {
        btnLogin.className = "px-6 py-1.5 text-sm font-semibold rounded-md shadow-sm bg-white text-tech-blue transition-all";
        btnSignup.className = "px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-tech-blue transition-all";
        
        title.innerText = "Welcome back.";
        desc.innerText = "Enter your credentials to access the terminal.";

        formLogin.classList.remove('hidden');
        formLogin.classList.add('flex');
        formSignup.classList.add('hidden');
        formSignup.classList.remove('flex');
    } else {
        btnSignup.className = "px-6 py-1.5 text-sm font-semibold rounded-md shadow-sm bg-white text-tech-blue transition-all";
        btnLogin.className = "px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-tech-blue transition-all";

        title.innerText = "New Account";
        desc.innerText = "Register your lab credentials for access.";

        formSignup.classList.remove('hidden');
        formSignup.classList.add('flex');
        formLogin.classList.add('hidden');
        formLogin.classList.remove('flex');
    }
}

btnLogin.addEventListener('click', () => switchTab('login'));
btnSignup.addEventListener('click', () => switchTab('signup'));