// Image Trail Cursor Effect
const hero = document.querySelector('.hero');

// Array of all trail images
const trailImages = [];
for (let i = 1; i <= 39; i++) {
    trailImages.push(`images/cursor-trail/trail-${i}.jpg`);
}

let currentImageIndex = 0;
let lastTrailTime = 0;
const trailDelay = 100; // milliseconds between each image

hero.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < trailDelay) return;

    lastTrailTime = now;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create trail image element
    const trailImg = document.createElement('img');
    trailImg.className = 'trail-image';
    trailImg.src = trailImages[currentImageIndex];
    trailImg.style.left = x + 'px';
    trailImg.style.top = y + 'px';

    hero.appendChild(trailImg);

    // Cycle through images
    currentImageIndex = (currentImageIndex + 1) % trailImages.length;
});

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
