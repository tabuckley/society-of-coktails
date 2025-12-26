// 3D moth model is now handled in three-scene.js

// Smooth Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe section titles
document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});

// Observe event cards
document.querySelectorAll('.event-card').forEach(card => {
    observer.observe(card);
});

// Observe gallery items with staggered animation
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    setTimeout(() => {
        observer.observe(item);
    }, index * 100); // Stagger the observation
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect to event cards
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console message
console.log('🍸 Welcome to the Society of Cocktails');
console.log('🎭 A pop-up immersive art speakeasy experience');
console.log('✨ Exploring strange subjects and stories...');
console.log('💡 Website built with smooth scroll interactions');
