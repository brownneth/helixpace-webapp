import { request, auth } from '/src/api/client.js';

const btnLoginTab = document.getElementById('tab-login');
const btnSignupTab = document.getElementById('tab-signup');
const formLogin = document.getElementById('form-login');
const formSignup = document.getElementById('form-signup');
const title = document.getElementById('header-title');
const desc = document.getElementById('header-desc');
const errorMsg = document.getElementById('error-msg');

function switchTab(tab) {
    errorMsg.classList.add('hidden');
    if (tab === 'login') {
        btnLoginTab.className = "px-6 py-1.5 text-sm font-semibold rounded-md shadow-sm bg-white text-tech-blue transition-all";
        btnSignupTab.className = "px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-tech-blue transition-all";
        
        title.innerText = "Welcome back.";
        desc.innerText = "Enter your credentials to access the terminal.";

        formLogin.classList.remove('hidden');
        formLogin.classList.add('flex');
        formSignup.classList.add('hidden');
        formSignup.classList.remove('flex');
    } else {
        btnSignupTab.className = "px-6 py-1.5 text-sm font-semibold rounded-md shadow-sm bg-white text-tech-blue transition-all";
        btnLoginTab.className = "px-6 py-1.5 text-sm font-medium rounded-md text-slate-500 hover:text-tech-blue transition-all";

        title.innerText = "New Account";
        desc.innerText = "Register your lab credentials for access.";

        formSignup.classList.remove('hidden');
        formSignup.classList.add('flex');
        formLogin.classList.add('hidden');
        formLogin.classList.remove('flex');
    }
}

btnLoginTab.addEventListener('click', () => switchTab('login'));
btnSignupTab.addEventListener('click', () => switchTab('signup'));
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {

        const data = await request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        auth.setToken(data.token);
        window.location.href = '/pages/app/entry/index.html';

    } catch (err) {
        errorMsg.innerText = "Login Failed: " + err.message;
        errorMsg.classList.remove('hidden');
    }
});

formSignup.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const lab_code = document.getElementById('signup-labcode').value;

    try {

        await request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, lab_code })
        });

        alert('Account created! Please log in.');
        switchTab('login');

    } catch (err) {
        errorMsg.innerText = "Signup Failed: " + err.message;
        errorMsg.classList.remove('hidden');
    }
});