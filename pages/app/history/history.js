import { Sidebar } from '/src/components/Sidebar.js';
import { AppNavbar } from '/src/components/AppNavbar.js';

document.getElementById('sidebar-mount').innerHTML = Sidebar('history');
document.getElementById('navbar-mount').innerHTML = AppNavbar('Search History');