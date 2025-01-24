// Vérification de l'authentification admin
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'login.html';
    }
    document.getElementById('adminName').textContent = currentUser.username;
}

// Obtenir les vraies données des utilisateurs
function getRealUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return Object.entries(users).map(([key, user]) => ({
        name: user.username,
        type: user.isAdmin ? 'Admin' : 'Utilisateur',
        createdAt: user.createdAt || new Date().toISOString().split('T')[0]
    }));
}

// Mise à jour des statistiques réelles
function updateStats() {
    const users = getRealUsers();
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const stats = {
        userCount: users.length,
        messageCount: messages.length, // Mise à jour pour utiliser la longueur réelle du tableau messages
        visitCount: localStorage.getItem('visitCount') || 0
    };

    document.getElementById('userCount').textContent = stats.userCount;
    document.getElementById('messageCount').textContent = stats.messageCount;
    document.getElementById('visitCount').textContent = stats.visitCount;
}

// Remplir le tableau avec les vrais utilisateurs
function populateUserTable() {
    const users = getRealUsers();
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.type}</td>
            <td>${user.createdAt}</td>
            <td class="action-buttons">
                <button onclick="editUser('${user.name}')" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                ${user.type !== 'Admin' ? `
                    <button onclick="deleteUser('${user.name}')" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Gestion des utilisateurs
function editUser(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users[username];

    if (user) {
        // Implémenter la logique d'édition ici
        alert('Fonctionnalité en développement');
    }
}

function deleteUser(username) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username} ?`)) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users[username] && !users[username].isAdmin) {
            delete users[username];
            localStorage.setItem('users', JSON.stringify(users));
            updateStats();
            populateUserTable();
        }
    }
}

// Ajouter console.log pour le débogage
console.log('admin.js chargé');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, vérification de l\'authentification...');
    checkAdminAuth();
    updateStats();
    populateUserTable();
});
