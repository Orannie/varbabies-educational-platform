// Enhanced Past Papers Website JavaScript with SA Papers Integration
// Exclusive integration with SA Papers backend (sapapers.co.za sources)
// Using SA Papers as the primary and only source for all past papers

// Global variables
let currentPapers = [];
let allPapers = {};
let filteredPapers = [];
let currentFilters = {
    grade: '',
    subject: '',
    year: '',
    session: '',
    type: '',
    language: 'all'
};

// Initialize the application
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Past Papers with SA Papers integration (exclusive backend)...');
    initializeApplication();
    initializePopularSubjects();
});

async function initializeApplication() {
    try {
        // Show loading indicator
        showLoadingIndicator('Loading papers from SA Papers sources (exclusive backend)...');
        
        // Load papers from SA Papers (exclusive source)
        await loadSAPapers();
        
        // Set default to Grade 12 papers
        currentPapers = allPapers['grade-12'] || [];
        filteredPapers = [...currentPapers];
        
        console.log(`Initialized with ${currentPapers.length} Grade 12 papers`);
        console.log(`Total papers across all grades: ${Object.values(allPapers).reduce((total, gradePapers) => total + gradePapers.length, 0)}`);
        
        // Initialize UI components
        initializeFilters();
        renderPapers();
        setupEventListeners();
        hideLoadingIndicator();
        
        // Show success message
        showNotification(`Papers loaded successfully! ${currentPapers.length} papers available for Grade 12`, 'success');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        hideLoadingIndicator();
        showNotification('Error loading papers. Please refresh the page.', 'error');
    }
}

/**
 * Load papers from SA Papers (exclusive source)
 */
async function loadSAPapers() {
    try {
        showLoadingIndicator('Loading papers from SA Papers...');
        
        // Load ALL papers from SA Papers (not just grade 12)
        const response = await fetch('/api/papers');
        if (response.ok) {
            const data = await response.json();
            console.log('SA Papers API response:', data);
            console.log('SA Papers loaded:', data.count, 'papers');
            
            // Debug: Check structure of first few papers
            console.log('First 3 papers:', data.papers.slice(0, 3));
            
            // Organize papers by grade
            allPapers = {};
            for (let grade = 8; grade <= 12; grade++) {
                allPapers[`grade-${grade}`] = data.papers.filter(paper => paper.grade === grade.toString());
                console.log(`Grade ${grade}: ${allPapers[`grade-${grade}`].length} papers (filtering ${grade.toString()})`);
            }
            
            console.log('Papers organized by grade:');
            for (let grade = 8; grade <= 12; grade++) {
                console.log(`Grade ${grade}: ${allPapers[`grade-${grade}`].length} papers`);
            }
            
            return true;
        } else {
            throw new Error('Failed to fetch papers from SA Papers');
        }
        
    } catch (error) {
        console.error('Error loading SA Papers:', error);
        showNotification('Error loading papers from SA Papers', 'error');
        return false;
    }
}





// Initialize filters
function initializeFilters() {
    // Set up grade filter
    const gradeFilter = document.getElementById('gradeFilter');
    if (gradeFilter) {
        gradeFilter.addEventListener('change', handleGradeChange);
        gradeFilter.value = '12'; // Default to Grade 12
    }
    
    // Set up other filters
    setupSubjectFilter();
    setupYearFilter();
    setupSessionFilter();
    setupTypeFilter();
    setupLanguageFilter();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// Handle grade change
async function handleGradeChange(event) {
    const selectedGrade = event.target.value;
    currentFilters.grade = selectedGrade;
    
    showLoadingIndicator('Loading papers...');
    
    try {
        // Get papers for the selected grade from our loaded data
        currentPapers = allPapers[`grade-${selectedGrade}`] || [];
        filteredPapers = [...currentPapers];
        
        console.log(`Switched to Grade ${selectedGrade}: ${currentPapers.length} papers available`);
        
        applyFilters();
        renderPapers();
        hideLoadingIndicator();
        
        showNotification(`Loaded ${currentPapers.length} papers for Grade ${selectedGrade}`, 'success');
        
    } catch (error) {
        console.error('Error loading papers for grade:', selectedGrade, error);
        hideLoadingIndicator();
        showNotification('Error loading papers for selected grade', 'error');
    }
}

// Setup subject filter
function setupSubjectFilter() {
    const subjectFilter = document.getElementById('subjectFilter');
    if (subjectFilter) {
        subjectFilter.addEventListener('change', (e) => {
            currentFilters.subject = e.target.value;
            applyFilters();
        });
    }
}

// Setup year filter
function setupYearFilter() {
    const yearFilter = document.getElementById('yearFilter');
    if (yearFilter) {
        yearFilter.addEventListener('change', (e) => {
            currentFilters.year = e.target.value;
            applyFilters();
        });
    }
}

// Setup session filter
function setupSessionFilter() {
    const sessionFilter = document.getElementById('sessionFilter');
    if (sessionFilter) {
        sessionFilter.addEventListener('change', (e) => {
            currentFilters.session = e.target.value;
            applyFilters();
        });
    }
}

// Setup type filter
function setupTypeFilter() {
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            currentFilters.type = e.target.value;
            applyFilters();
        });
    }
}

// Setup language filter
function setupLanguageFilter() {
    const languageFilter = document.getElementById('languageFilter');
    if (languageFilter) {
        languageFilter.addEventListener('change', (e) => {
            currentFilters.language = e.target.value;
            applyFilters();
        });
    }
}

// Handle search
async function handleSearch(event) {
    const query = event.target.value.trim();
    
    if (query.length === 0) {
        filteredPapers = [...currentPapers];
        applyFilters();
        return;
    }
    
    try {
        // Search using SA Papers API
        const searchParams = new URLSearchParams({
            search: query,
            grade: currentFilters.grade || '12'
        });
        
        const response = await fetch(`/api/papers?${searchParams}`);
        if (response.ok) {
            const data = await response.json();
            filteredPapers = data.papers;
            console.log(`Found ${data.count} papers from SA Papers search`);
        } else {
            // Fallback to local search
            filteredPapers = currentPapers.filter(paper =>
                paper.title.toLowerCase().includes(query.toLowerCase()) ||
                paper.subject.toLowerCase().includes(query.toLowerCase()) ||
                (paper.description && paper.description.toLowerCase().includes(query.toLowerCase()))
            );
        }
        
        renderPapers();
        
    } catch (error) {
        console.error('Error searching papers:', error);
        showNotification('Error performing search, using local results', 'warning');
        // Fallback to local search
        filteredPapers = currentPapers.filter(paper =>
            paper.title.toLowerCase().includes(query.toLowerCase()) ||
            paper.subject.toLowerCase().includes(query.toLowerCase()) ||
            (paper.description && paper.description.toLowerCase().includes(query.toLowerCase()))
        );
        renderPapers();
    }
}

// Apply filters
function applyFilters() {
    filteredPapers = currentPapers.filter(paper => {
        if (currentFilters.subject && paper.subject !== currentFilters.subject) return false;
        if (currentFilters.year && paper.year !== currentFilters.year) return false;
        if (currentFilters.session && paper.session !== currentFilters.session) return false;
        if (currentFilters.type && paper.type !== currentFilters.type) return false;
        if (currentFilters.language !== 'all' && paper.language !== currentFilters.language) return false;
        return true;
    });
    
    renderPapers();
}

// Render papers
function renderPapers() {
    const papersContainer = document.getElementById('papersContainer');
    const resultsCount = document.getElementById('resultsCount');
    
    console.log('renderPapers called with:', filteredPapers.length, 'papers');
    console.log('filteredPapers sample:', filteredPapers.slice(0, 2));
    
    if (!papersContainer) {
        console.error('papersContainer not found');
        return;
    }
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `${filteredPapers.length} papers found`;
    }
    
    // Clear container
    papersContainer.innerHTML = '';
    
    if (filteredPapers.length === 0) {
        papersContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No papers found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button onclick="clearFilters()" class="btn btn-primary">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    // Render papers
    filteredPapers.forEach(paper => {
        const paperCard = createPaperCard(paper);
        papersContainer.appendChild(paperCard);
    });
    
    // Update dynamic filters
    updateDynamicFilters();
}

// Create paper card
function createPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'paper-card';
    card.setAttribute('data-paper-id', paper.id);
    
    const typeIcon = paper.type === 'memorandum' ? 'fas fa-clipboard-check' : 'fas fa-file-alt';
    const typeClass = paper.type === 'memorandum' ? 'memorandum' : 'question-paper';
    
    card.innerHTML = `
        <div class="paper-header">
            <div class="paper-type-badge ${typeClass}">
                <i class="${typeIcon}"></i>
                ${paper.type === 'memorandum' ? 'Memo' : 'Paper'}
            </div>
            <div class="paper-meta">
                <span class="subject">${formatSubjectName(paper.subject)}</span>
                <span class="year-session">${paper.year} ${capitalizeFirst(paper.session)}</span>
            </div>
        </div>
        
        <div class="paper-body">
            <h3 class="paper-title">${paper.title}</h3>
            <p class="paper-description">${paper.description}</p>
            
            <div class="paper-info">
                <div class="info-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Grade ${paper.grade}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-language"></i>
                    <span>${capitalizeFirst(paper.language)}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-file-pdf"></i>
                    <span>${paper.fileSize}</span>
                </div>
            </div>
            
            ${paper.topics ? `
                <div class="paper-topics">
                    ${paper.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                    ${paper.topics.length > 3 ? `<span class="topic-tag more">+${paper.topics.length - 3} more</span>` : ''}
                </div>
            ` : ''}
        </div>
        
        <div class="paper-actions">
            <button onclick="previewPaper('${paper.id}')" class="btn btn-secondary">
                <i class="fas fa-eye"></i>
                Preview
            </button>
            <button onclick="downloadPaper('${paper.id}')" class="btn btn-primary">
                <i class="fas fa-download"></i>
                Download
            </button>
        </div>
    `;
    
    return card;
}

// Update dynamic filters based on current papers
function updateDynamicFilters() {
    updateSubjectFilterOptions();
    updateYearFilterOptions();
    updateSessionFilterOptions();
}

// Update subject filter options
function updateSubjectFilterOptions() {
    const subjectFilter = document.getElementById('subjectFilter');
    if (!subjectFilter) return;
    
    const subjects = [...new Set(currentPapers.map(paper => paper.subject))].sort();
    const currentValue = subjectFilter.value;
    
    subjectFilter.innerHTML = '<option value="">All Subjects</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = formatSubjectName(subject);
        subjectFilter.appendChild(option);
    });
    
    subjectFilter.value = currentValue;
}

// Update year filter options
function updateYearFilterOptions() {
    const yearFilter = document.getElementById('yearFilter');
    if (!yearFilter) return;
    
    const years = [...new Set(currentPapers.map(paper => paper.year))].sort((a, b) => b - a);
    const currentValue = yearFilter.value;
    
    yearFilter.innerHTML = '<option value="">All Years</option>';
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
    
    yearFilter.value = currentValue;
}

// Update session filter options
function updateSessionFilterOptions() {
    const sessionFilter = document.getElementById('sessionFilter');
    if (!sessionFilter) return;
    
    const sessions = [...new Set(currentPapers.map(paper => paper.session))].sort();
    const currentValue = sessionFilter.value;
    
    sessionFilter.innerHTML = '<option value="">All Sessions</option>';
    sessions.forEach(session => {
        const option = document.createElement('option');
        option.value = session;
        option.textContent = capitalizeFirst(session);
        sessionFilter.appendChild(option);
    });
    
    sessionFilter.value = currentValue;
}

// Paper actions
async function previewPaper(paperId) {
    try {
        showLoadingIndicator('Loading preview...');
        
        // Use SA Papers API endpoint for preview
        const response = await fetch(`/api/preview/${paperId}`);
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.paper.previewUrl) {
                window.open(data.paper.previewUrl, '_blank');
                showNotification('Preview opened in new window', 'success');
            } else {
                showNotification('Preview not available for this paper', 'warning');
            }
        } else {
            throw new Error('Failed to get preview URL');
        }
    } catch (error) {
        console.error('Error previewing paper:', error);
        showNotification('Error loading preview', 'error');
    } finally {
        hideLoadingIndicator();
    }
}

async function downloadPaper(paperId) {
    try {
        showLoadingIndicator('Starting download...');
        
        // Track download
        const paper = findPaperById(paperId);
        if (paper) {
            trackPaperDownload(paper);
        }
        
        // Create download link and trigger click
        const downloadLink = document.createElement('a');
        downloadLink.href = `/api/download/${paperId}`;
        downloadLink.download = ''; // This will let the browser handle the filename
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showNotification('Download started', 'success');
        
    } catch (error) {
        console.error('Error downloading paper:', error);
        showNotification('Error starting download', 'error');
    } finally {
        hideLoadingIndicator();
    }
}

// Utility functions
function findPaperById(paperId) {
    return filteredPapers.find(paper => paper.id === paperId);
}

function formatSubjectName(subject) {
    return subject.split('-').map(word => capitalizeFirst(word)).join(' ');
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Clear all filters
function clearFilters() {
    currentFilters = {
        grade: currentFilters.grade, // Keep grade filter
        subject: '',
        year: '',
        session: '',
        type: '',
        language: 'all'
    };
    
    // Reset filter elements
    const filters = ['subjectFilter', 'yearFilter', 'sessionFilter', 'typeFilter', 'languageFilter'];
    filters.forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) element.value = '';
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    filteredPapers = [...currentPapers];
    renderPapers();
    
    showNotification('Filters cleared', 'info');
}

// Refresh papers from Google Drive




// Track paper downloads for analytics
function trackPaperDownload(paper) {
    try {
        const downloadData = {
            paperId: paper.id,
            subject: paper.subject,
            grade: paper.grade,
            year: paper.year,
            session: paper.session,
            type: paper.type,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage for analytics
        const downloads = JSON.parse(localStorage.getItem('paper_downloads') || '[]');
        downloads.push(downloadData);
        
        // Keep only last 100 downloads
        if (downloads.length > 100) {
            downloads.splice(0, downloads.length - 100);
        }
        
        localStorage.setItem('paper_downloads', JSON.stringify(downloads));
        
    } catch (error) {
        console.error('Error tracking download:', error);
    }
}

// Show/hide loading indicator
function showLoadingIndicator(message = 'Loading...') {
    let loader = document.getElementById('loadingIndicator');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loadingIndicator';
        loader.className = 'loading-indicator';
        document.body.appendChild(loader);
    }
    
    loader.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    loader.style.display = 'flex';
}

function hideLoadingIndicator() {
    const loader = document.getElementById('loadingIndicator');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Quick access toolbar
    const quickAccessBtns = document.querySelectorAll('.toolbar-btn');
    quickAccessBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('onclick');
            if (action) {
                eval(action);
            }
        });
    });
}

// Quick access functions for toolbar
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showRandomPaper() {
    if (filteredPapers.length === 0) {
        showNotification('No papers available', 'warning');
        return;
    }
    
    const randomPaper = filteredPapers[Math.floor(Math.random() * filteredPapers.length)];
    previewPaper(randomPaper.id);
}

function showRecentPapers() {
    // Filter for recent papers (current year)
    const currentYear = new Date().getFullYear().toString();
    currentFilters.year = currentYear;
    
    const yearFilter = document.getElementById('yearFilter');
    if (yearFilter) yearFilter.value = currentYear;
    
    applyFilters();
    scrollToSection('.papers-section');
    
    showNotification(`Showing papers from ${currentYear}`, 'info');
}

// Initialize popular subjects section
function initializePopularSubjects() {
    const popularSubjects = document.getElementById('popularSubjects');
    if (!popularSubjects) return;
    
    const subjects = [
        { name: 'Mathematics', key: 'mathematics', icon: 'fas fa-calculator' },
        { name: 'Physical Sciences', key: 'physical-sciences', icon: 'fas fa-atom' },
        { name: 'Life Sciences', key: 'life-sciences', icon: 'fas fa-dna' },
        { name: 'English', key: 'english', icon: 'fas fa-book' },
        { name: 'Mathematical Literacy', key: 'mathematical-literacy', icon: 'fas fa-chart-bar' },
        { name: 'Accounting', key: 'accounting', icon: 'fas fa-coins' }
    ];
    
    popularSubjects.innerHTML = subjects.map(subject => `
        <div class="subject-card" onclick="filterBySubject('${subject.key}')">
            <i class="${subject.icon}"></i>
            <h4>${subject.name}</h4>
            <p>Click to view papers</p>
        </div>
    `).join('');
}

function filterBySubject(subject) {
    currentFilters.subject = subject;
    
    const subjectFilter = document.getElementById('subjectFilter');
    if (subjectFilter) subjectFilter.value = subject;
    
    applyFilters();
    scrollToSection('.papers-section');
    
    showNotification(`Showing ${formatSubjectName(subject)} papers`, 'info');
}

// Slideshow functionality - matching React Native behavior
let currentSlideIndex = 0;
let slideTimer;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Initialize slideshow
function initializeSlideshow() {
    if (slides.length === 0) return;
    
    // Show first slide
    showSlide(0);
    
    // Start auto-advance timer (3 seconds like React Native)
    startSlideTimer();
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideTimer);
        slideshowContainer.addEventListener('mouseleave', startSlideTimer);
    }
}

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
    });
    
    // Ensure index is within bounds
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    
    // Show current slide and activate corresponding dot
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1; // Convert from 1-based to 0-based
    showSlide(currentSlideIndex);
    
    // Restart timer when manually navigating
    stopSlideTimer();
    startSlideTimer();
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    
    // Restart timer when manually navigating
    stopSlideTimer();
    startSlideTimer();
}

function startSlideTimer() {
    stopSlideTimer(); // Clear any existing timer
    slideTimer = setInterval(nextSlide, 3000); // 3 seconds like React Native
}

function stopSlideTimer() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// SA Papers integration function
function openSAPapers() {
    window.open('https://www.sapapers.co.za', '_blank');
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
});

// Grade card interaction with animation
document.addEventListener('DOMContentLoaded', function() {
    const gradeCards = document.querySelectorAll('.grade-card');
    gradeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation
    gradeCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
});

// Resource cards hover effects
document.addEventListener('DOMContentLoaded', function() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(126, 100, 59, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Main access button animation
document.addEventListener('DOMContentLoaded', function() {
    const mainButton = document.querySelector('.main-access-button');
    if (mainButton) {
        mainButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        mainButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        mainButton.addEventListener('click', function() {
            // Add click ripple effect
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }, 150);
        });
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for slideshow
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            if (slideTimer) {
                stopSlideTimer();
            } else {
                startSlideTimer();
            }
        }
    });
    
    // Add focus management for accessibility
    const slideBtns = document.querySelectorAll('.slide-btn');
    slideBtns.forEach(btn => {
        btn.addEventListener('focus', stopSlideTimer);
        btn.addEventListener('blur', startSlideTimer);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('focus', stopSlideTimer);
        dot.addEventListener('blur', startSlideTimer);
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        // Add keyboard support for dots
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentSlide(index + 1);
            }
        });
    });
});

// Smooth scroll to sections when navigating
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const slideImages = document.querySelectorAll('.slide img');
    slideImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
});

//# sourceMappingURL=main.js.map

