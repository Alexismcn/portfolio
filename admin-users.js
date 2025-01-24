console.log('admin-users.js chargé');

let currentEditUserId = null;
const modal = document.getElementById('userModal');

// Simplifier la fonction de vérification d'authentification
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'login.html';
        return false;
    }
    document.getElementById('adminName').textContent = currentUser.username;
    return true;
}

// Fonction de chargement des utilisateurs simplifiée
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const tbody = document.getElementById('userTableBody');
    const searchTerm = (document.getElementById('userSearch')?.value || '').toLowerCase();
    const filterType = document.getElementById('userTypeFilter')?.value || 'all';

    console.log('Chargement des utilisateurs:', users); // Debug

    tbody.innerHTML = '';

    Object.entries(users).forEach(([username, user]) => {
        // Vérification des filtres
        if ((filterType === 'admin' && !user.isAdmin) || (filterType === 'user' && user.isAdmin)) {
            return;
        }

        if (searchTerm && !username.toLowerCase().includes(searchTerm) &&
            !user.fullname?.toLowerCase().includes(searchTerm)) {
            return;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.fullname || 'N/A'}</td>
            <td>${user.username}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.ip || 'IP non disponible'}</td>
            <td><span class="badge ${user.isAdmin ? 'admin' : 'user'}">${user.isAdmin ? 'Admin' : 'Utilisateur'}</span></td>
            <td>${user.createdAt || 'N/A'}</td>
            <td class="action-buttons">
                <button onclick="editUser('${username}')" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                ${!user.isAdmin ? `
                    <button onclick="deleteUser('${username}')" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Simplifier l'initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation de la page admin-users');
    if (checkAdminAuth()) {
        loadUsers();

        // Gestionnaires d'événements
        document.getElementById('userSearch')?.addEventListener('input', loadUsers);
        document.getElementById('userTypeFilter')?.addEventListener('change', loadUsers);
    }
});

function showAddUserModal() {
    currentEditUserId = null;
    document.getElementById('modalTitle').textContent = 'Ajouter un utilisateur';
    document.getElementById('userForm').reset();
    document.getElementById('password').required = true;
    modal.style.display = 'block';
}

function editUser(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users[username];
    if (!user) return;

    currentEditUserId = username;
    document.getElementById('modalTitle').textContent = 'Modifier l\'utilisateur';
    document.getElementById('fullname').value = user.fullname;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('userType').value = user.isAdmin ? 'admin' : 'user';
    document.getElementById('password').required = false;
    modal.style.display = 'block';
}

function deleteUser(username) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username} ?`)) {
        const users = JSON.parse(localStorage.getItem('users'));
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page admin-users.html chargée');

    // Vérifier l'authentification admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'login.html';
        return;
    }

    // Afficher le nom de l'admin
    document.getElementById('adminName').textContent = currentUser.username;

    // Charger les utilisateurs initialement
    loadUsers();

    // Gestionnaires d'événements
    document.getElementById('userSearch')?.addEventListener('input', loadUsers);
    document.getElementById('userTypeFilter')?.addEventListener('change', loadUsers);

    // Fermeture du modal
    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Soumission du formulaire
    document.getElementById('userForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const username = document.getElementById('username').value;

        if (!currentEditUserId && users[username]) {
            alert('Ce nom d\'utilisateur existe déjà');
            return;
        }

        const userData = {
            username: username,
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            isAdmin: document.getElementById('userType').value === 'admin',
            createdAt: currentEditUserId ? users[currentEditUserId].createdAt : new Date().toISOString().split('T')[0]
        };

        const password = document.getElementById('password').value;
        if (password) {
            userData.password = password;
        } else if (!currentEditUserId) {
            alert('Le mot de passe est requis pour un nouvel utilisateur');
            return;
        }

        if (currentEditUserId) {
            delete users[currentEditUserId];
        }

        users[username] = userData;
        localStorage.setItem('users', JSON.stringify(users));
        modal.style.display = 'none';
        loadUsers();
    });
});
