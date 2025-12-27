// Image Trail Cursor Effect
const hero = document.querySelector('.hero');

// Array of all trail images - includes cursor trail and project images
const trailImages = [
    // Cursor trail images
    'images/cursor-trail/trail-01.jpg',
    'images/cursor-trail/trail-02.jpg',
    'images/cursor-trail/trail-03.jpg',
    'images/cursor-trail/trail-04.jpg',
    'images/cursor-trail/trail-05.jpg',
    'images/cursor-trail/trail-06.jpg',
    'images/cursor-trail/trail-07.jpg',
    'images/cursor-trail/trail-08.jpg',
    'images/cursor-trail/trail-09.jpg',
    'images/cursor-trail/trail-010.jpg',
    'images/cursor-trail/trail-011.jpg',
    'images/cursor-trail/trail-012.jpg',
    'images/cursor-trail/trail-013.jpg',
    'images/cursor-trail/trail-014.jpg',
    'images/cursor-trail/trail-015.jpg',
    'images/cursor-trail/trail-016.jpg',
    'images/cursor-trail/trail-17.jpg',
    'images/cursor-trail/trail-18.jpg',
    'images/cursor-trail/trail-19.jpg',
    'images/cursor-trail/trail-20.jpg',
    'images/cursor-trail/trail-21.jpg',
    'images/cursor-trail/trail-22.jpg',
    'images/cursor-trail/trail-23.jpg',
    'images/cursor-trail/trail-24.jpg',
    'images/cursor-trail/trail-25.jpg',
    'images/cursor-trail/trail-26.jpg',
    'images/cursor-trail/trail-27.jpg',
    'images/cursor-trail/trail-28.jpg',
    'images/cursor-trail/trail-29.jpg',
    'images/cursor-trail/trail-30.jpg',
    'images/cursor-trail/trail-31.jpg',
    'images/cursor-trail/trail-32.jpg',
    'images/cursor-trail/trail-33.jpg',
    'images/cursor-trail/trail-34.jpg',
    'images/cursor-trail/trail-35.jpg',
    'images/cursor-trail/trail-36.jpg',
    'images/cursor-trail/trail-37.jpg',
    'images/cursor-trail/trail-38.jpg',
    'images/cursor-trail/trail-39.jpg',
    // The Aurelian
    'images/the-aurelian/small.jpg',
    'images/the-aurelian/smaller.jpg',
    // Memory Bar
    'images/memory-bar-2/small.jpg',
    'images/memory-bar-2/smaller22-11-23_Memory Bar_0007_XT309238.jpg',
    // Tea with Baba
    'images/tea-with-baba/monkey.jpg',
    // A Drink with Mother
    'images/a-drink-with-mother/IMG_9324.jpg',
    'images/a-drink-with-mother/IMG_9415.jpg',
    'images/a-drink-with-mother/IMG_9495.jpg',
    // Cocktails in the Forest
    'images/cocktails-in-the-forest/Pondwatersmall.jpg',
    'images/cocktails-in-the-forest/mothtoaflame.jpg',
    // Cocktails on the Beach
    'images/cocktails-on-the-beach/drink1.jpg',
    'images/cocktails-on-the-beach/drink2.jpg'
];

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

    // Random size variation (between 250px and 450px)
    const randomSize = Math.floor(Math.random() * 200) + 250;
    trailImg.style.maxWidth = randomSize + 'px';
    trailImg.style.maxHeight = randomSize + 'px';

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

// Observe accordion items
document.querySelectorAll('.accordion-item').forEach(item => {
    observer.observe(item);
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


// Progressive blur effect on hover
const hoverWords = document.querySelectorAll('.about-content-full span');
const maxBlur = 10;
const maxOpacity = 0;
const blurDuration = 2000; // 2 seconds to fully blur

hoverWords.forEach(word => {
    let hoverStartTime = null;
    let animationFrame = null;
    let currentBlur = 0;
    let currentOpacity = 1;
    let accumulatedTime = 0; // Track total elapsed time across multiple hovers
    let lastTimestamp = null;

    const updateBlur = (timestamp) => {
        if (!hoverStartTime) hoverStartTime = timestamp;
        lastTimestamp = timestamp;
        const elapsed = timestamp - hoverStartTime + accumulatedTime;
        const progress = Math.min(elapsed / blurDuration, 1);

        currentBlur = progress * maxBlur;
        currentOpacity = 1 - progress;

        word.style.filter = `blur(${currentBlur}px)`;
        word.style.opacity = currentOpacity;

        if (progress < 1) {
            animationFrame = requestAnimationFrame(updateBlur);
        }
    };

    word.addEventListener('mouseenter', () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        hoverStartTime = null;
        animationFrame = requestAnimationFrame(updateBlur);
    });

    word.addEventListener('mouseleave', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            // Save the accumulated time so we can continue from here
            if (hoverStartTime && lastTimestamp) {
                accumulatedTime += lastTimestamp - hoverStartTime;
            }
        }
    });
});

// Console message
console.log('🍸 Welcome to the Society of Cocktails');
console.log('🎭 A pop-up immersive art speakeasy experience');
console.log('✨ Exploring strange subjects and stories...');
console.log('💡 Website built with smooth scroll interactions');
