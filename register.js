async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'IP:', error);
        return 'IP non disponible';
    }
}

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userIP = await getUserIP();

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Ce nom d\'utilisateur est déjà pris');
        return;
    }

    // Créer le nouvel utilisateur avec tous les champs nécessaires
    const newUser = {
        username,
        fullname,
        email,
        password, // Note: Dans un vrai projet, le mot de passe devrait être hashé
        isAdmin: false,
        createdAt: new Date().toISOString().split('T')[0],
        ip: userIP
    };

    // Sauvegarder l'utilisateur
    users[username] = newUser;
    localStorage.setItem('users', JSON.stringify(users));

    // Connecter automatiquement l'utilisateur
    localStorage.setItem('currentUser', JSON.stringify({
        username: newUser.username,
        isAdmin: false,
        loginTime: new Date().toISOString()
    }));

    alert('Compte créé avec succès !');
    window.location.href = 'index.html';
});

// Validation en temps réel du mot de passe
document.getElementById('confirmPassword').addEventListener('input', function (e) {
    const password = document.getElementById('password').value;
    const confirmPassword = e.target.value;

    if (password !== confirmPassword) {
        e.target.setCustomValidity('Les mots de passe ne correspondent pas');
    } else {
        e.target.setCustomValidity('');
    }
});
