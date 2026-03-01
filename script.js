// Image Trail Cursor Effect
const hero = document.querySelector('.hero');

// Array of cursor trail images
const trailImages = [
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
    trailImg.src = encodeURI(trailImages[currentImageIndex]);
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

// Accordion items removed - now using 3D gallery

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


// Side navigation scroll behavior and active section highlighting
const sideNav = document.querySelector('.side-nav');
const navLinks = document.querySelectorAll('.side-nav-menu a');
const sections = document.querySelectorAll('section[id]');

const navMenu = document.querySelector('.side-nav-menu');
const navItems = navMenu.querySelectorAll('li');

// Measure menu's natural top offset from nav top (before any transforms)
const menuInitialOffset = navMenu.getBoundingClientRect().top - sideNav.getBoundingClientRect().top;
const topPadding = 20; // px gap to leave from nav top at full scroll

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    // Highlight active section
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Each menu item slides up independently with a cascade stagger
    navItems.forEach((item, index) => {
        const staggerOffset = index * 0.08;
        const itemProgress = Math.max(0, Math.min((scrollProgress - staggerOffset) / (1 - staggerOffset), 1));
        const translateY = -(menuInitialOffset - topPadding) * itemProgress;
        item.style.transform = `translateY(${translateY}px)`;
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink(); // Run on load


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

// Event row hover - show image in nav preview
const eventRows = document.querySelectorAll('.event-row');
const navPreview = document.querySelector('.nav-preview');
const navPreviewImage = document.querySelector('.nav-preview-image');

eventRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        const img = row.getAttribute('data-image');
        if (img) {
            navPreviewImage.style.backgroundImage = `url('${img}')`;
            navPreviewImage.style.backgroundPosition = row.getAttribute('data-position') || 'center';
            navPreview.classList.add('visible');
        }
    });
    row.addEventListener('mouseleave', () => {
        navPreview.classList.remove('visible');
    });
});

// Simple Gallery Card Reveal
const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach((card, index) => {
    setTimeout(() => {
        observer.observe(card);
    }, index * 150);
});

// Event Overlay
const eventData = {
    'memory-bar-3': {
        title: 'Memory Bar III',
        year: '2025',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/memory-bar-3/25-11-20_0005_ArtHouse x Society of Cocktails_XT508673_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0013_ArtHouse x Society of Cocktails_XT508705_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0023_ArtHouse x Society of Cocktails_XT508737_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0030_ArtHouse x Society of Cocktails_XT508771_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0043_ArtHouse x Society of Cocktails_XT508828_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0100_ArtHouse x Society of Cocktails_XT509153_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0132_ArtHouse x Society of Cocktails_XT509335_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0142_ArtHouse x Society of Cocktails_XT509415_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0182_ArtHouse x Society of Cocktails_XT509798_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0200_ArtHouse x Society of Cocktails_XT509940_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0226_ArtHouse x Society of Cocktails_XT500131_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0247_ArtHouse x Society of Cocktails_XT500216_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0277_ArtHouse x Society of Cocktails_XT500523_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0298_ArtHouse x Society of Cocktails_XT500732_© Max Burnett.jpg',
            'images/memory-bar-3/25-11-20_0336_ArtHouse x Society of Cocktails_XT501050_© Max Burnett.jpg',
        ]
    },
    'hunting-of-the-wren': {
        title: 'The Hunting of the Wren',
        year: '2024',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0015_XT503797.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0021_XT503873.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0076_XT504221.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0099_XT504361.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0110_XT504426.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0112_XT504435.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0139_XT504668.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0149_XT504763.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0156_XT504826.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0172_XT504912.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0182_XT504975.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0184_XT504984.jpg',
            'images/the-hunting-of-the-wren/24-12-12_Society of Cocktails_0201_XT505148.jpg',
        ]
    },
    'the-aurelian': {
        title: 'The Aurelian',
        year: '2023',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/the-aurelian/387863172_18303109897185840_6499761038036922780_n.jpg',
            'images/the-aurelian/407146626_1589360031600825_1595258146500212469_n.jpg',
            'images/the-aurelian/cocoon.jpg',
            'images/the-aurelian/frass.jpg',
            'images/the-aurelian/IMG_0305.jpg',
        ]
    },
    'a-drink-with-mother': {
        title: 'A Drink with Mother',
        year: '2023',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/a-drink-with-mother/IMG_9324.jpg',
            'images/a-drink-with-mother/IMG_9338.jpg',
            'images/a-drink-with-mother/IMG_9348.jpg',
            'images/a-drink-with-mother/IMG_9365.jpg',
            'images/a-drink-with-mother/IMG_9401.jpg',
            'images/a-drink-with-mother/IMG_9415.jpg',
            'images/a-drink-with-mother/IMG_9445.jpg',
            'images/a-drink-with-mother/IMG_9456.jpg',
            'images/a-drink-with-mother/IMG_9485.jpg',
            'images/a-drink-with-mother/IMG_9495.jpg',
            'images/a-drink-with-mother/IMG_9506.jpg',
            'images/a-drink-with-mother/IMG_9510.jpg',
            'images/a-drink-with-mother/IMG_9517.jpg',
            'images/a-drink-with-mother/IMG_9529.jpg',
            'images/a-drink-with-mother/IMG_9537.jpg',
            'images/a-drink-with-mother/IMG_9561.jpg',
        ]
    },
    'memory-bar-2': {
        title: 'Memory Bar II',
        year: '2022',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/memory-bar-2/22-11-23_Memory Bar_0007_XT309238.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0045_XT309420.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0052_XT309463.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0063_XT309571.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0076_XT309651.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0077_XT309659.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0095_XT309762.jpg',
            'images/memory-bar-2/22-11-23_Memory Bar_0113_XT309886.jpg',
        ]
    },
    'tea-with-baba': {
        title: 'Tea with Baba',
        year: '2021',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/tea-with-baba/70212514_719952788442231_3603289699474472960_n.jpg',
            'images/tea-with-baba/IMG_0530.jpg',
            'images/tea-with-baba/IMG_0543.jpg',
            'images/tea-with-baba/IMG_1453.jpg',
            'images/tea-with-baba/IMG_1501.jpg',
            'images/tea-with-baba/IMG_1517.jpg',
            'images/tea-with-baba/IMG_1545.jpg',
            'images/tea-with-baba/IMG_1549.jpg',
            'images/tea-with-baba/monkey.jpg',
            'images/tea-with-baba/Tea with BABA.jpg',
        ]
    },
    'cocktails-in-the-forest': {
        title: 'Cocktails in the Forest',
        year: '2020',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
            'images/cocktails-in-the-forest/Pondwatersmall.jpg',
            'images/cocktails-in-the-forest/mothtoaflame.jpg',
            'images/cocktails-in-the-forest/IMG_4712.jpg',
            'images/cocktails-in-the-forest/IMG_4721.jpg',
            'images/cocktails-in-the-forest/IMG_4729.jpg',
            'images/cocktails-in-the-forest/IMG_4793.jpg',
            'images/cocktails-in-the-forest/IMG_4802.jpg',
            'images/cocktails-in-the-forest/IMG_4832.jpg',
            'images/cocktails-in-the-forest/Stinging nettle collins.jpg',
        ]
    },
};

const overlay = document.getElementById('eventOverlay');
const overlayClose = document.getElementById('overlayClose');
const overlayYear = overlay.querySelector('.overlay-year');
const overlayTitle = overlay.querySelector('.overlay-title');
const overlayDescEl = overlay.querySelector('.overlay-desc');
const overlayGallery = overlay.querySelector('.overlay-gallery');

function openOverlay(eventKey) {
    const data = eventData[eventKey];
    if (!data) return;

    overlayYear.textContent = data.year;
    overlayTitle.textContent = data.title;
    overlayDescEl.textContent = data.desc;

    overlayGallery.innerHTML = '';
    data.images.forEach(src => {
        const img = document.createElement('img');
        img.src = encodeURI(src);
        img.alt = data.title;
        overlayGallery.appendChild(img);
    });

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.event-row[data-event]').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => openOverlay(row.getAttribute('data-event')));
});

overlayClose.addEventListener('click', closeOverlay);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
});

// Console message
console.log('🍸 Welcome to the Society of Cocktails');
console.log('🎭 A pop-up immersive art speakeasy experience');
console.log('✨ Exploring strange subjects and stories...');
console.log('💡 Website built with smooth scroll interactions');
