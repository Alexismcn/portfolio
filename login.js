// Données utilisateurs par défaut
const defaultUsers = {
    admin: {
        username: 'admin',
        password: 'admin123',
        isAdmin: true
    },
    user: {
        username: 'user',
        password: 'user123',
        isAdmin: false
    }
};

// Initialiser les utilisateurs dans le localStorage s'ils n'existent pas
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Gestion du switch utilisateur/admin
const switchBtns = document.querySelectorAll('.switch-btn');
const adminCodeField = document.querySelector('.admin-code');
let isAdminMode = false;

switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        isAdminMode = btn.dataset.type === 'admin';
        adminCodeField.style.display = isAdminMode ? 'flex' : 'none';
    });
});

// Gestion du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const button = e.target.querySelector('button');

    button.innerHTML = 'Connexion en cours...';

    setTimeout(() => {
        // Vérifier les identifiants
        const user = Object.values(users).find(u =>
            u.username === username && u.password === password);

        if (user) {
            if (isAdminMode && !user.isAdmin) {
                alert('Accès administrateur refusé');
            } else {
                // Stocker la session
                localStorage.setItem('currentUser', JSON.stringify({
                    username: user.username,
                    isAdmin: user.isAdmin,
                    loginTime: new Date().toISOString()
                }));

                alert(`Connexion réussie ! Bienvenue ${user.username}`);
                window.location.href = user.isAdmin ? 'admin-dashboard.html' : 'index.html';
            }
        } else {
            alert('Identifiants incorrects');
        }

        button.innerHTML = 'Se connecter';
    }, 1000);
});

// Vérifier si l'utilisateur est déjà connecté
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.isAdmin) {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}

// Ajouter un bouton de déconnexion
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Vérifier l'auth au chargement de la page
document.addEventListener('DOMContentLoaded', checkAuth);
