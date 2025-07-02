// Dark mode toggle (only if the button exists)
const toggleButton = document.getElementById('darkModeToggle');
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// Slideshow functionality
let slideIndex = 1;
let slideTimer;

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for images to load
    setTimeout(() => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            console.log('Slideshow initialized with', slides.length, 'slides');
            showSlide(slideIndex);
            startAutoSlide();
        } else {
            console.warn('No slides found for slideshow');
        }
    }, 100);
});

// Change slide function
function changeSlide(n) {
    showSlide(slideIndex += n);
    resetAutoSlide();
}

// Current slide function
function currentSlide(n) {
    showSlide(slideIndex = n);
    resetAutoSlide();
}

// Show slide function
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        console.warn('No slides found');
        return;
    }
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and highlight current dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
        console.log('Showing slide', slideIndex);
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto slide functionality
function startAutoSlide() {
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 4000); // Change slide every 4 seconds
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(slideTimer);
    startAutoSlide();
}

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    // Resume slideshow when mouse leaves
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const slideWrapper = document.querySelector('.slideshow-wrapper');
if (slideWrapper) {
    slideWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}