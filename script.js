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
        desc: 'We enter through an orange glow and are taken up a staircase to where a bar, made from the discarded furniture of a bygone age, rises from the floor of an artist\'s studio. Once seated by our host we are invited to peruse a leather-bound menu of lost times, precious moments and happy memories. With our choice made - be it a chandelier, a greenhouse, a bonfire, a boat, a coolbox, a slice of harbour mud - the treasured memory is brought to the table for us to share: and as we drink we see, we listen, we smell, we hold, we cherish, we imagine, we empathise, we bear witness to - but above all we are humanised, and through our sharing we are made a community.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Kate Phillips', web: 'https://www.kate-phillips.com/', ig: 'https://www.instagram.com/vitamorte2/' },
            { name: 'James Turnbull' },
        ],
        commissioner: { name: 'ArtHouse Jersey', url: 'https://www.arthousejersey.je/' },
        spotify: '',
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
        desc: 'In a wintry landscape a Bard tells of tradition and ritual and a very small bird, before he beckons us through the snow to meet that same bird in all his boastful and playful glory. We are welcomed into the once abandoned place he has made his home, and he chirrups of his pleasures and his sorrows before we take our leave. The hunt is here and we must hide - be still in the dark, don\'t utter a word; we hold our breath for fear the hunter that walks amongst us might find us. No, he has gone and now we are safe. We come out of our hiding place in the woods onto a street of houses, lights at their windows, a welcome behind each door. A wren boy greets us and takes us wassailing through the town. We eat, we drink, we whistle, we joke, we sing, but those last few houses on the street are empty and gradually our joys fade and we are in danger of losing sight of what matters altogether. Like a portent, a chime of wrens fall from the sky, we are all culpable, and we are tasked with bearing them to their grave. Now the Bard returns, distracted, almost unrecognisable in his business suit amongst the filing cabinets; but he has a warning for us - if we truly lose sight of tradition what is left to hold us together.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Kate Phillips', web: 'https://www.kate-phillips.com/', ig: 'https://www.instagram.com/vitamorte2/' },
            { name: 'Johnny Jones', ig: 'https://www.instagram.com/buoys_buoys_buoys/' },
        ],
        commissioner: { name: 'ArtHouse Jersey', url: 'https://www.arthousejersey.je/' },
        spotify: 'https://open.spotify.com/embed/playlist/1EttpQP1oaY2SEROtjoiWq?utm_source=generator&theme=0',
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
        desc: 'In a vaulted sepulcher he can be seen, in a darkened corner he can be heard - the Aurelian - absorbed in his mania, infused in an acid green light, surrounded by his apparatus of discovery; in one corner a tank of ghostly white cocoons lit by a fallen chandelier, in another an old radio speaks in voices, whilst in the other a fridge buzzes like an insect caught in his web. His words flutter frantically with the music as our surroundings glitch and transform and we are sent to capture a moth before being invited to drink with him at his table. Now we have a choice to make - between life or death for the moth caught in our jars - between freedom from restraint or the sanctity of a secret fellowship for us.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Kate Phillips', web: 'https://www.kate-phillips.com/', ig: 'https://www.instagram.com/vitamorte2/' },
            { name: 'Ned Lawlor' },
        ],
        commissioner: { name: 'ArtHouse Jersey', url: 'https://www.arthousejersey.je/' },
        spotify: 'https://open.spotify.com/embed/playlist/7bChenHiQRPQXwJJiNRUde?utm_source=generator&theme=0',
        images: [
            'images/the-aurelian/387863172_18303109897185840_6499761038036922780_n.jpg',
            'images/the-aurelian/407146626_1589360031600825_1595258146500212469_n.jpg',
            'images/the-aurelian/407206720_3852807458280893_4174845709243484146_n.jpg',
            'images/the-aurelian/407213925_267667295990520_1765927227246386176_n.jpg',
            'images/the-aurelian/409958890_1055411779127311_3346965793207531885_n.jpg',
            'images/the-aurelian/cocoon.jpg',
            'images/the-aurelian/frass.jpg',
            'images/the-aurelian/IMG_0305.jpg',
            'images/the-aurelian/small.jpg',
            'images/the-aurelian/smaller.jpg',
        ]
    },
    'a-drink-with-mother': {
        title: 'A Drink with Mother',
        year: '2023',
        desc: 'Deep underground something stirs, it grows, it spreads. It reaches out - for love. On entering the dark subterranean space we are confronted by \'Mother\' - part human, part fungi; a burgeoning entity rising up through the brick floor, desperate to connect, to communicate, to seduce… to implant. As we sip by candlelight glistening, amber, fermentations Mother lulls us with sultry song and softly spoken mutterings that swirl around us in the spore-filled air; and as we suck white-rinded lollipops proffered by her many hands she whispers deep inside our heads - imploring, inveigling, infecting.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Kate Phillips', web: 'https://www.kate-phillips.com/', ig: 'https://www.instagram.com/vitamorte2/' },
            { name: 'Ned Lawlor' },
        ],
        spotify: 'https://open.spotify.com/embed/playlist/7zKtiJNWH7Jlqy5164KpX8?utm_source=generator&theme=0',
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
        desc: 'Through a wardrobe door, down a dimly lit tunnel The Sisters of Vanchelez await to guide us on a journey into times past - times of lost innocence, times of joy and wonder, times of sadness and grief - times of remembering and times of forgetting. Around the table real memories of female resilience in the potato fields, horses on sandy beaches, and steam trains on long-disused tracks through pine forests blend and fuse and become fable. So we raise our glasses, as fireworks explode around us, to the small moments that mean so much and make us who we are.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Kate Phillips', web: 'https://www.kate-phillips.com/', ig: 'https://www.instagram.com/vitamorte2/' },
            { name: 'Ned Lawlor' },
        ],
        commissioner: { name: 'ArtHouse Jersey', url: 'https://www.arthousejersey.je/' },
        spotify: '',
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
        desc: 'Journey into the woods to have your tea leaves read and fortune told. Somewhere between an escape room, an art installation and a cocktail masterclass - you\'ll be tasked with creating cocktails to appease Baba - following her riddles and tasks in a digital forest hut. You\'ll hear birds and smell the damp moss before following your nose to discover Baba\'s hut, thick with incense and mystery. Will you be blessed or hexed by Baba? What will she read in your tea leaves?',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
            { name: 'Ned Lawlor' },
        ],
        spotify: '',
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
        desc: 'A foraged collection of strange taste experiences, immersed in live butterflies and moths. A hybrid digital and real forest, the setting for a collection of tastes from and inspired by the forest.',
        collective: [
            { name: 'Thomas Buckley', web: 'https://www.thomas-buckley.com/', ig: 'https://www.instagram.com/thomasadambuckley/' },
        ],
        spotify: '',
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
const overlayCollective = overlay.querySelector('.overlay-collective');
const overlaySpotify = overlay.querySelector('.overlay-spotify');
const overlayCommissioner = overlay.querySelector('.overlay-commissioner');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    lightboxImg.src = encodeURI(images[index]);
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
}

function navigateLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = encodeURI(lightboxImages[lightboxIndex]);
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

function openOverlay(eventKey) {
    const data = eventData[eventKey];
    if (!data) return;

    overlayYear.textContent = data.year;
    overlayTitle.textContent = data.title;
    overlayDescEl.textContent = data.desc;

    // Collective panel
    const members = (data.collective || []).map(m => {
        const links = [];
        if (m.web) links.push(`<a href="${m.web}" target="_blank">Web</a>`);
        if (m.ig) links.push(`<a href="${m.ig}" target="_blank">IG</a>`);
        const linksHtml = links.length ? `<span class="overlay-collective-links">${links.join('')}</span>` : '';
        return `<div class="overlay-collective-member"><span class="overlay-collective-name">${m.name}</span>${linksHtml}</div>`;
    }).join('');
    overlayCollective.innerHTML = `
        <span class="overlay-collective-label">The Collective</span>
        <div class="overlay-collective-members">${members}</div>
    `;

    // Spotify panel
    if (data.spotify) {
        overlaySpotify.innerHTML = `
            <span class="overlay-spotify-label">Playlist</span>
            <iframe style="border-radius:12px" src="${data.spotify}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        `;
    } else {
        overlaySpotify.innerHTML = '';
    }

    // Commissioner panel
    if (data.commissioner) {
        overlayCommissioner.innerHTML = `
            <span class="overlay-commissioner-label">Commissioned by</span>
            <a class="overlay-commissioner-link" href="${data.commissioner.url}" target="_blank">${data.commissioner.name} &#8599;</a>
        `;
    } else {
        overlayCommissioner.innerHTML = '';
    }

    overlayGallery.innerHTML = '';
    data.images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = encodeURI(src);
        img.alt = data.title;
        img.addEventListener('click', () => openLightbox(data.images, idx));
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
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
        return;
    }
    if (e.key === 'Escape') closeOverlay();
});

// Console message
console.log('🍸 Welcome to the Society of Cocktails');
console.log('🎭 A pop-up immersive art speakeasy experience');
console.log('✨ Exploring strange subjects and stories...');
console.log('💡 Website built with smooth scroll interactions');
