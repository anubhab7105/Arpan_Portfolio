// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    // Nav scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = Math.max(0, target.offsetTop - 60);
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // Contact form demo handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Portfolio click (generic)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // avoid triggering when clicking the button (if you want button action separate later)
            const overlay = this.querySelector('.portfolio-overlay');
            const title = overlay ? overlay.querySelector('h3').textContent : 'Project';
            alert(`Viewing project: ${title}`);
        });
    });

    // Robust IntersectionObserver reveal + immediate-check on load
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    };
    const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(revealCallback, observerOptions) : null;

    // Add fade-in class to key elements
    const targetSelectors = ['section', '.service-card', '.portfolio-item', '.about-image', '.about-text'];
    const nodes = [];
    targetSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(n => nodes.push(n));
    });

    nodes.forEach(el => {
        // avoid duplicates
        if (!el.classList.contains('fade-in')) el.classList.add('fade-in');
    });

    const fadeElems = document.querySelectorAll('.fade-in');
    fadeElems.forEach(el => {
        if (observer) observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < (window.innerHeight || document.documentElement.clientHeight) * 0.9) {
            el.classList.add('visible');
        }
    });

    if (!observer) {
        fadeElems.forEach(el => el.classList.add('visible'));
    }

    // Simple hero subtitle typewriter (non-blocking)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent.trim();
        heroSubtitle.textContent = '';
        let i = 0;
        (function typeWriter(){
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        })();
    }
});
