function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesList = document.getElementById('messagesList');
    const searchTerm = document.getElementById('messageSearch').value.toLowerCase();
    const statusFilter = document.getElementById('messageStatus').value;

    messagesList.innerHTML = '';

    messages
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(message => {
            if (statusFilter === 'unread' && message.status !== 'non lu') return false;
            if (statusFilter === 'read' && message.status === 'non lu') return false;
            if (searchTerm && !message.subject.toLowerCase().includes(searchTerm) &&
                !message.message.toLowerCase().includes(searchTerm)) return false;
            return true;
        })
        .forEach(message => {
            const messageCard = document.createElement('div');
            messageCard.className = `message-card ${message.status === 'non lu' ? 'unread' : ''}`;
            messageCard.innerHTML = `
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-sender">${message.name}</span>
                        <span class="message-date">${new Date(message.date).toLocaleString()}</span>
                    </div>
                </div>
                <div class="message-subject">${message.subject}</div>
                <div class="message-content">${message.message}</div>
                <div class="message-actions">
                    ${message.status === 'non lu' ?
                    `<button onclick="markAsRead('${message.date}')" class="mark-read-btn">
                            <i class="fas fa-check"></i> Marquer comme lu
                        </button>` : ''
                }
                    <button onclick="deleteMessage('${message.date}')" class="delete-btn">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            `;
            messagesList.appendChild(messageCard);
        });
}

function markAsRead(messageDate) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageIndex = messages.findIndex(m => m.date === messageDate);
    if (messageIndex !== -1) {
        messages[messageIndex].status = 'lu';
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
    }
}

function deleteMessage(messageDate) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const newMessages = messages.filter(m => m.date !== messageDate);
        localStorage.setItem('messages', JSON.stringify(newMessages));
        localStorage.setItem('messageCount', newMessages.length);
        loadMessages();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadMessages();

    document.getElementById('messageSearch').addEventListener('input', loadMessages);
    document.getElementById('messageStatus').addEventListener('change', loadMessages);
});
