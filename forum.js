// Forum Page JavaScript - Material 3 Inspired Functionality

// Data structures matching the React Native app
const universities = [
    {id: 'wits', name: 'University of the Witwatersrand', short: 'Wits', newsUrl: 'https://www.wits.ac.za/news/'},
    {id: 'uct', name: 'University of Cape Town', short: 'UCT', newsUrl: 'https://www.news.uct.ac.za/'},
    {id: 'stellenbosch', name: 'Stellenbosch University', short: 'Stellenbosch', newsUrl: 'http://www.sun.ac.za/english/Pages/news.aspx'},
    {id: 'ukzn', name: 'University of KwaZulu-Natal', short: 'UKZN', newsUrl: 'https://ukzn.ac.za/news/'},
    {id: 'up', name: 'University of Pretoria', short: 'UP', newsUrl: 'https://www.up.ac.za/news'},
    {id: 'unisa', name: 'University of South Africa', short: 'UNISA', newsUrl: 'https://www.unisa.ac.za/sites/corporate/default/News-&-Media'},
    {id: 'tut', name: 'Tshwane University of Technology', short: 'TUT', newsUrl: 'https://www.tut.ac.za/news'},
    {id: 'cput', name: 'Cape Peninsula University of Technology', short: 'CPUT', newsUrl: 'https://www.cput.ac.za/newsroom'},
    {id: 'uniwise', name: 'Uniwise', short: 'Uniwise', newsUrl: 'https://www.uniwise.co.za'},
];

const categories = [
    {id: 'applications', name: 'Applications', icon: 'fas fa-file-alt'},
    {id: 'deadlines', name: 'Deadlines', icon: 'fas fa-clock'},
    {id: 'requirements', name: 'Requirements', icon: 'fas fa-list-check'},
    {id: 'funding', name: 'Funding & Scholarships', icon: 'fas fa-dollar-sign'},
    {id: 'news', name: 'General News', icon: 'fas fa-newspaper'},
    {id: 'events', name: 'Events', icon: 'fas fa-calendar'},
];

// Global state
let selectedUniversity = '';
let selectedCategory = '';
let searchQuery = '';
let newsItems = [];
let loading = false;

// Sample news data matching the React Native app
function getNewsData() {
    const currentDate = new Date();
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    return [
        {
            id: Date.now() + 1,
            title: 'UCT Applications Open for 2025 Academic Year',
            university: 'uct',
            category: 'applications',
            date: formatDate(new Date(currentDate - 2 * 24 * 60 * 60 * 1000)),
            content: 'The University of Cape Town has opened applications for undergraduate and postgraduate programmes for the 2025 academic year. Priority deadlines apply for international students.',
            isUrgent: true,
            source: 'UCT News Portal',
            url: 'https://www.news.uct.ac.za/',
        },
        {
            id: Date.now() + 2,
            title: 'NSFAS 2025 Applications Now Open - Apply Early',
            university: 'all',
            category: 'funding',
            date: formatDate(new Date(currentDate - 1 * 24 * 60 * 60 * 1000)),
            content: 'The National Student Financial Aid Scheme (NSFAS) has opened applications for 2025. Students are encouraged to apply early to avoid last-minute technical issues.',
            isUrgent: true,
            source: 'NSFAS Official',
            url: 'https://www.nsfas.org.za/',
        },
        {
            id: Date.now() + 3,
            title: 'Wits University Merit Scholarships Available',
            university: 'wits',
            category: 'funding',
            date: formatDate(new Date(currentDate - 3 * 24 * 60 * 60 * 1000)),
            content: 'The University of the Witwatersrand announces merit-based scholarships for exceptional academic performers. Applications close December 31st, 2024.',
            isUrgent: false,
            source: 'Wits News',
            url: 'https://www.wits.ac.za/news/',
        },
        {
            id: Date.now() + 4,
            title: 'Stellenbosch Engineering Faculty Open Day 2025',
            university: 'stellenbosch',
            category: 'events',
            date: formatDate(new Date(currentDate - 5 * 24 * 60 * 60 * 1000)),
            content: 'Join Stellenbosch University Engineering Faculty for an open day showcasing cutting-edge research and career opportunities in engineering.',
            isUrgent: false,
            source: 'Stellenbosch University',
            url: 'http://www.sun.ac.za/english/Pages/news.aspx',
        },
        {
            id: Date.now() + 5,
            title: 'UP Medicine Applications - New Requirements',
            university: 'up',
            category: 'applications',
            date: formatDate(new Date(currentDate - 4 * 24 * 60 * 60 * 1000)),
            content: 'University of Pretoria Faculty of Health Sciences announces updated admission requirements for medical programmes starting 2025.',
            isUrgent: true,
            source: 'UP News',
            url: 'https://www.up.ac.za/news',
        },
        {
            id: Date.now() + 6,
            title: 'UKZN Research Excellence Awards 2024',
            university: 'ukzn',
            category: 'news',
            date: formatDate(new Date(currentDate - 6 * 24 * 60 * 60 * 1000)),
            content: 'University of KwaZulu-Natal celebrates outstanding research achievements in the annual Research Excellence Awards ceremony.',
            isUrgent: false,
            source: 'UKZN News',
            url: 'https://ukzn.ac.za/news/',
        },
        {
            id: Date.now() + 7,
            title: 'Uniwise: Complete Guide to University Applications',
            university: 'uniwise',
            category: 'applications',
            date: formatDate(new Date(currentDate - 1 * 24 * 60 * 60 * 1000)),
            content: 'Uniwise provides comprehensive guidance on university applications, course selection, and career planning for South African students.',
            isUrgent: false,
            source: 'Uniwise',
            url: 'https://www.uniwise.co.za',
        },
        {
            id: Date.now() + 8,
            title: 'UNISA 2025 Registration Dates Announced',
            university: 'unisa',
            category: 'deadlines',
            date: formatDate(new Date(currentDate - 3 * 24 * 60 * 60 * 1000)),
            content: 'University of South Africa announces registration dates for 2025 academic year. Early registration recommended to secure preferred modules.',
            isUrgent: true,
            source: 'UNISA Official',
            url: 'https://www.unisa.ac.za/sites/corporate/default/News-&-Media',
        },
        {
            id: Date.now() + 9,
            title: 'TUT Industry Partnership Program Launch',
            university: 'tut',
            category: 'events',
            date: formatDate(new Date(currentDate - 7 * 24 * 60 * 60 * 1000)),
            content: 'Tshwane University of Technology launches new industry partnership program to enhance graduate employability and practical skills.',
            isUrgent: false,
            source: 'TUT News',
            url: 'https://www.tut.ac.za/news',
        },
        {
            id: Date.now() + 10,
            title: 'CPUT Digital Innovation Hub Opens',
            university: 'cput',
            category: 'news',
            date: formatDate(new Date(currentDate - 5 * 24 * 60 * 60 * 1000)),
            content: 'Cape Peninsula University of Technology opens state-of-the-art Digital Innovation Hub to support technology entrepreneurship.',
            isUrgent: false,
            source: 'CPUT Newsroom',
            url: 'https://www.cput.ac.za/newsroom',
        },
    ];
}

// DOM manipulation functions
function showLoading() {
    document.getElementById('loading-container').style.display = 'block';
    document.getElementById('news-container').style.display = 'none';
    document.getElementById('empty-state').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

function showEmptyState() {
    document.getElementById('empty-state').style.display = 'block';
    document.getElementById('news-container').style.display = 'none';
}

function hideEmptyState() {
    document.getElementById('empty-state').style.display = 'none';
    document.getElementById('news-container').style.display = 'block';
}

// Filter functions
function filterNews() {
    const filtered = newsItems.filter(item => {
        const matchesUniversity = !selectedUniversity || item.university === selectedUniversity || item.university === 'all';
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesSearch = !searchQuery || 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesUniversity && matchesCategory && matchesSearch;
    });
    
    renderNews(filtered);
}

// Render functions
function renderNewsCard(item) {
    const university = universities.find(uni => uni.id === item.university);
    const category = categories.find(cat => cat.id === item.category);
    
    return `
        <div class="news-card" onclick="openNewsLink('${item.url}')">
            <div class="news-header-content">
                <div class="news-header-left">
                    <h3 class="news-title">${item.title}</h3>
                    ${item.isUrgent ? '<span class="urgent-badge">URGENT</span>' : ''}
                </div>
                <span class="news-date">${item.date}</span>
            </div>
            <p class="news-content">${item.content}</p>
            <div class="news-footer">
                <div class="news-footer-left">
                    <div class="news-category">${category ? category.name : item.category}</div>
                    <div class="news-university">${university ? university.short : 'All Universities'}</div>
                </div>
                ${item.source ? `<span class="news-source">${item.source}</span>` : ''}
            </div>
            <div class="read-more">
                <i class="fas fa-external-link-alt"></i>
                <span>Read Full Article</span>
            </div>
        </div>
    `;
}

function renderNews(filteredNews) {
    const container = document.getElementById('news-container');
    
    if (filteredNews.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    container.innerHTML = filteredNews.map(renderNewsCard).join('');
}

// Event handlers
function setupFilterListeners() {
    // University filters
    document.querySelectorAll('#university-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all university buttons
            document.querySelectorAll('#university-filters .filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Update selected university
            selectedUniversity = e.target.dataset.university;
            filterNews();
        });
    });
    
    // Category filters
    document.querySelectorAll('#category-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all category buttons
            document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Update selected category
            selectedCategory = e.target.dataset.category;
            filterNews();
        });
    });
    
    // Search input
    document.getElementById('search-news').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterNews();
    });
}

// Utility functions
function openNewsLink(url) {
    window.open(url, '_blank');
}

function showComingSoon(feature) {
    alert(`${feature} feature coming soon! Stay tuned for updates.`);
}

async function refreshNews() {
    showLoading();
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    newsItems = getNewsData();
    filterNews();
    hideLoading();
}

// Initialize the page
async function initializePage() {
    showLoading();
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Load news data
    newsItems = getNewsData();
    
    // Setup event listeners
    setupFilterListeners();
    
    // Initial render
    filterNews();
    hideLoading();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
