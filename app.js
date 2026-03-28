// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', function () {
    const current = body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SIDEBAR NAVIGATION =====
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const navLinks = document.querySelectorAll('.nav-link');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        closeSidebar();
    });
});

// Close sidebar with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');

function updateActiveNavLink() {
    var scrollPos = window.scrollY + 150;

    sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== ANSWER REVEAL =====
var quoteAnswer = document.querySelector('.quote-answer');
var answerHidden = document.getElementById('answerHidden');

if (quoteAnswer && answerHidden) {
    quoteAnswer.addEventListener('click', function () {
        answerHidden.classList.toggle('show');
        var answerText = document.getElementById('answerText');
        if (answerHidden.classList.contains('show')) {
            answerText.textContent = 'Cevabı gizle';
        } else {
            answerText.textContent = 'Cevabı görmek için tıklayın';
        }
    });
}

// ===== HERO PARTICLES =====
function createParticles() {
    var particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    var count = window.innerWidth < 768 ? 20 : 40;

    for (var i = 0; i < count; i++) {
        var particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    var animatedElements = document.querySelectorAll(
        '.info-card, .principle-card, .timeline-item, .reason-item, .effect-card, .treaty-card, .totaliter-card, .issue-card, .party-card, .highlight-card, .quote-highlight'
    );

    animatedElements.forEach(function (el) {
        el.classList.add('animate-on-scroll');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });
}

initScrollAnimations();

// ===== PWA SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js')
            .then(function (registration) {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(function (error) {
                console.log('Service Worker registration failed:', error);
            });
    });
}
