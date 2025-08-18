// Utility functions for Nyx Destek

// Live User Counter
class LiveUserCounter {
    constructor(elementId) {
        this.counterElement = document.getElementById(elementId);
        this.userCount = 0;
        this.init();
    }

    async init() {
        // Get initial count from server or use a random number for demo
        // In a real application, you would fetch this from your backend
        this.userCount = Math.floor(Math.random() * 50) + 10; // Random number between 10-60 for demo
        this.updateDisplay();
        
        // Simulate user count changes (in a real app, this would be handled by WebSockets)
        setInterval(() => this.simulateUserChange(), 30000);
    }

    updateDisplay() {
        if (this.counterElement) {
            this.counterElement.textContent = this.userCount;
        }
    }

    simulateUserChange() {
        // Randomly add or remove users (for demo purposes)
        const change = Math.random() > 0.5 ? 1 : -1;
        this.userCount = Math.max(5, this.userCount + change); // Never go below 5 users
        this.updateDisplay();
    }

    // Public method to manually update count (can be called from server events)
    updateCount(newCount) {
        this.userCount = newCount;
        this.updateDisplay();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize live user counter if element exists
    if (document.getElementById('live-user-count')) {
        window.userCounter = new LiveUserCounter('live-user-count');
    }
});
