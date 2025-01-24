function applyTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Appliquer le thème au chargement de la page
document.addEventListener('DOMContentLoaded', applyTheme);

// Écouter les changements de thème
window.addEventListener('storage', (e) => {
    if (e.key === 'darkMode') {
        applyTheme();
    }
});
