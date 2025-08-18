// Search Component
class SearchComponent {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        this.createSearchElements();
        this.setupEventListeners();
    }

    createSearchElements() {
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        searchContainer.className = 'search-container';
        
        // Create search input
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'search';
        this.searchInput.id = 'search-input';
        this.searchInput.placeholder = 'Ürün ara...';
        this.searchInput.autocomplete = 'off';
        
        // Create search icon
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fas fa-search search-icon';
        
        // Create results container
        this.searchResults = document.createElement('div');
        this.searchResults.id = 'search-results';
        this.searchResults.className = 'search-results';
        
        // Assemble the search component
        searchContainer.appendChild(searchIcon);
        searchContainer.appendChild(this.searchInput);
        searchContainer.appendChild(this.searchResults);
        
        // Add to header
        const header = document.querySelector('header .container');
        if (header) {
            header.insertBefore(searchContainer, header.firstChild);
        }
    }

    setupEventListeners() {
        // Handle search input
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                this.performSearch(query);
            } else {
                this.clearResults();
            }
        });
        
        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#search-container')) {
                this.clearResults();
            }
        });
    }

    async performSearch(query) {
        try {
            // In a real application, you would fetch results from your backend
            // For demo purposes, we'll use a simulated search
            const results = this.simulateSearch(query);
            this.displayResults(results);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Arama sırasında bir hata oluştu.');
        }
    }

    simulateSearch(query) {
        // This is a demo function - in a real app, you would search your actual data
        const allProducts = [
            { id: 1, name: 'SO2 Hile 1 Aylık', category: 'Hileler', price: '100 TL' },
            { id: 2, name: 'SO2 Hile 3 Aylık', category: 'Hileler', price: '250 TL' },
            { id: 3, name: 'SO2 Hile 6 Aylık', category: 'Hileler', price: '450 TL' },
            { id: 4, name: 'Özel Yapım Hile', category: 'Özel', price: 'Özel Fiyat' },
            { id: 5, name: 'Kurumsal Hile', category: 'Kurumsal', price: 'İletişime Geçin' },
        ];

        // Simple case-insensitive search
        const searchTerm = query.toLowerCase();
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    displayResults(results) {
        this.clearResults();
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = 'Sonuç bulunamadı.';
            this.searchResults.appendChild(noResults);
            return;
        }
        
        results.forEach(item => {
            const resultItem = document.createElement('a');
            resultItem.href = `#product-${item.id}`; // In a real app, link to the actual product page
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">${item.name}</div>
                <div class="search-result-meta">
                    <span class="search-result-category">${item.category}</span>
                    <span class="search-result-price">${item.price}</span>
                </div>
            `;
            
            resultItem.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real app, you would navigate to the product page
                console.log('Selected product:', item);
                this.clearResults();
                this.searchInput.value = item.name;
                // Scroll to the product (if it exists on the page)
                const targetElement = document.getElementById(`product-${item.id}`);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            this.searchResults.appendChild(resultItem);
        });
        
        this.searchResults.style.display = 'block';
    }

    clearResults() {
        this.searchResults.innerHTML = '';
        this.searchResults.style.display = 'none';
    }

    showError(message) {
        this.clearResults();
        const errorMsg = document.createElement('div');
        errorMsg.className = 'search-error';
        errorMsg.textContent = message;
        this.searchResults.appendChild(errorMsg);
        this.searchResults.style.display = 'block';
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('header')) {
        window.searchComponent = new SearchComponent();
    }
});
