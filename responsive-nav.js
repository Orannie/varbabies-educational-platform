// Responsive Navigation System - Apply index navbar on every page
// Updated to remove bulk download functionality

class ResponsiveNavigation {
    constructor() {
        this.init();
    }

    init() {
        // Remove any existing responsive navbar elements
        this.removeResponsiveElements();
        
        // Ensure original header is visible on all screen sizes
        this.enableOriginalHeader();
        
        // Remove any bulk download links that may exist
        this.removeBulkDownloadLinks();
    }

    removeResponsiveElements() {
        // Remove mobile toggle button if it exists
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.remove();
        }

        // Remove responsive navbar if it exists
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.remove();
        }
    }

    enableOriginalHeader() {
        // Ensure the original header is always visible
        const headers = document.querySelectorAll('.header');
        headers.forEach(header => {
            header.style.display = 'flex';
        });

        // Reset main content margins
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.marginLeft = '0';
            mainContent.style.marginTop = '0';
        }
    }

    removeBulkDownloadLinks() {
        // Find and remove any bulk download links
        const bulkDownloadLinks = document.querySelectorAll('a[href="bulk-download.html"], a[href*="bulk-download"]');
        bulkDownloadLinks.forEach(link => {
            const parentLi = link.closest('li');
            if (parentLi) {
                parentLi.remove();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ResponsiveNavigation();
});

// Add styles to ensure original navbar works on all pages
const navStyles = document.createElement('style');
navStyles.textContent = `
/* Ensure original header is always visible */
.header {
    display: flex !important;
}

/* Reset any responsive navigation styles */
.navbar {
    display: none !important;
}

.mobile-menu-toggle {
    display: none !important;
}

/* Ensure main content has no extra margins */
.main-content {
    margin-left: 0 !important;
    margin-top: 0 !important;
}

/* Make sure navigation works on all screen sizes */
@media (max-width: 768px) {
    .header {
        display: flex !important;
        padding-left: 1rem !important;
    }
    
    .nav-list {
        flex-wrap: wrap;
        gap: 2rem !important;
    }
    
    .nav-list-list a {
        font-size: 2rem !important;
        letter-spacing: 0.3rem !important;
        padding: 1rem 0 !important;
    }
    
    .logo {
        height: 6rem !important;
    }
}

@media (max-width: 480px) {
    .header {
        flex-direction: column !important;
        gap: 2rem !important;
        padding: 2rem !important;
    }
    
    .nav-list {
        justify-content: center !important;
    }
    
    .nav-list-list a {
        font-size: 1.8rem !important;
        letter-spacing: 0.2rem !important;
    }
}
`;

document.head.appendChild(navStyles);
