document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const loginMessage = document.getElementById('login-required-message');

    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Utilisateur non connecté
        contactForm.classList.add('hidden');
        loginMessage.classList.remove('hidden');
    } else {
        // Utilisateur connecté
        contactForm.classList.remove('hidden');
        loginMessage.classList.add('hidden');
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!currentUser) {
            alert('Vous devez être connecté pour envoyer un message');
            window.location.href = 'login.html';
            return;
        }

        const message = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString(),
            status: 'non lu',
            userId: currentUser.username
        };

        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        contactForm.reset();
        alert('Message envoyé avec succès !');
    });
});
