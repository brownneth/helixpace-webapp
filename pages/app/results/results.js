import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar } from '/src/components/AppNavbar.js';

document.getElementById('sidebar-mount').innerHTML = Sidebar('results');
document.getElementById('navbar-mount').innerHTML = AppNavbar('Analysis Results');