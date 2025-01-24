// Ajouter l'icône qui change en fonction du mode
function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-switch i');
    if (themeIcon) {
        themeIcon.className = document.body.classList.contains('dark-mode')
            ? 'fas fa-sun'
            : 'fas fa-moon';
    }
}

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) {
        console.error('Dark mode toggle not found');
        return;
    }

    // Check if dark mode is enabled
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        updateThemeIcon();
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
        updateThemeIcon();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Initialiser l'état du toggle
    darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';

    // Gérer le changement d'état
    darkModeToggle.addEventListener('change', (e) => {
        localStorage.setItem('darkMode', e.target.checked);
        // Le changement sera appliqué via l'événement 'storage'
    });
});
