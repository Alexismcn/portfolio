function initDarkMode() {
    // Vérifier si le mode sombre est activé dans les paramètres
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Écouter les changements de thème
window.addEventListener('storage', (e) => {
    if (e.key === 'darkMode') {
        if (e.newValue === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
});

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', initDarkMode);
