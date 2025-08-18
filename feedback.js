// Feedback Button Component
class FeedbackButton {
    constructor() {
        this.button = null;
        this.modal = null;
        this.init();
    }

    init() {
        this.createButton();
        this.createModal();
        this.setupEventListeners();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'feedback-button';
        this.button.innerHTML = '<i class="far fa-comment-dots"></i> Geri Bildirim';
        document.body.appendChild(this.button);
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'feedback-modal';
        this.modal.style.display = 'none';
        this.modal.innerHTML = `
            <div class="feedback-modal-content">
                <div class="feedback-header">
                    <h3>Geri Bildirim Gönderin</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <form id="feedback-form">
                    <div class="form-group">
                        <label for="feedback-type">Konu</label>
                        <select id="feedback-type" class="form-control" required>
                            <option value="">Bir konu seçin</option>
                            <option value="bug">Hata Bildirimi</option>
                            <option value="suggestion">Öneri</option>
                            <option value="question">Soru</option>
                            <option value="other">Diğer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="feedback-message">Mesajınız</label>
                        <textarea id="feedback-message" class="form-control" rows="5" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="feedback-email">E-posta (isteğe bağlı)</label>
                        <input type="email" id="feedback-email" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Gönder</button>
                </form>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Toggle modal when button is clicked
        this.button.addEventListener('click', () => {
            this.toggleModal();
        });

        // Close modal when X is clicked
        this.modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        // Close when clicking outside the modal
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        // Handle form submission
        document.getElementById('feedback-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    toggleModal() {
        if (this.modal.style.display === 'block') {
            this.hideModal();
        } else {
            this.showModal();
        }
    }

    showModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    async handleSubmit() {
        const form = document.getElementById('feedback-form');
        const formData = {
            type: document.getElementById('feedback-type').value,
            message: document.getElementById('feedback-message').value.trim(),
            email: document.getElementById('feedback-email').value.trim(),
            page: window.location.href,
            timestamp: new Date().toISOString()
        };

        try {
            // In a real application, you would send this data to your backend
            console.log('Feedback submitted:', formData);
            
            // Show success message
            alert('Geri bildiriminiz için teşekkür ederiz! En kısa sürede dönüş yapacağız.');
            
            // Reset form
            form.reset();
            this.hideModal();
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Geri bildirim gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    }
}

// Initialize feedback button when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the button doesn't exist yet
    if (!document.getElementById('feedback-button')) {
        window.feedbackButton = new FeedbackButton();
    }
});
