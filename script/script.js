// Ocean Theme JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // console.log('Ocean theme loaded successfully');
    
    // Initialize all functions
    initNavigation();
    initButtons();
    initScrollEffects();
    initFeatureCards();
    initSlides();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default behavior for demo
            e.preventDefault();
            
            // Add active state styling
            navLinks.forEach(l => l.style.color = 'var(--ocean-white)');
            this.style.color = 'var(--ocean-cyan)';
        });
    });
}

// Button interactions
function initButtons() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
            
            // Show alert for demo
            alert('🌊 Welcome to the Ocean! Dive in to explore more.');
        });
    }
}

// Scroll effects
function initScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        let topBtn = document.querySelector('.back-to-top');
        
        // Add shadow to header on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 188, 212, 0.3)';
            topBtn.style.opacity =1;
        } else {
            header.style.boxShadow = 'none';
            topBtn.style.opacity = 0;
        }
        
        lastScroll = currentScroll;
    });
}

// Feature card interactions
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add staggered animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            // console.log(`Hovering over feature ${index + 1}`);
        });
    });
}

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add parallax effect to hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;        
        const header = document.querySelector('header');
        if (scrolled > header.offsetHeight) {
            header.style.opacity = 0;
        } else {
            header.style.opacity = 1;
        }
                

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax effect
initParallax();

function animateSlide(container) {    
    let slides = document.querySelectorAll('.slide');    
    let leftArrow = document.getElementById('left');
    let currentIndex = 0;
    let nextIndex;    
    
    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate next slide index
    nextIndex = (currentIndex + 1) % slides.length;
    leftArrow.disabled = false;
    
    if(currentIndex === slides.length) {
        nextIndex = 0;
        currentIndex = 0;
    }
    if(currentIndex === 1)  {
        leftArrow.disabled = true;
    }
    if(container.classList.contains('left') ) {
        // Calculate previous slide index
        nextIndex = (currentIndex - 1);    
    }    
    
    console.log(nextIndex);
    // Fade out current slide
    const currentSlide = slides[currentIndex];
    currentSlide.classList.add('fade-out');
    currentSlide.classList.remove('active');
    
    // Wait for fade out animation to complete, then fade in next slide
    setTimeout(() => {
        currentSlide.classList.remove('fade-out');
        
        const nextSlide = slides[nextIndex];
        nextSlide.classList.add('fade-in', 'active');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            nextSlide.classList.remove('fade-in');
        }, 700);
        
        // Scroll to the next slide
        nextSlide.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, 700);
}

// Initialize slides with first slide active
function initSlides() {
    const slidesContainer = document.querySelector('.slides-container');
    if (slidesContainer) {
        const slides = slidesContainer.querySelectorAll('.slide');
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
    }
}

// Call initSlides when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
    
// });


// Console welcome message
// console.log('%c🌊 Ocean Theme', 'color: #00bcd4; font-size: 24px; font-weight: bold;');
// console.log('%cWelcome to the ocean-themed website!', 'color: #4a90c2; font-size: 14px;');
