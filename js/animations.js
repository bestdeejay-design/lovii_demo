// Animation functions using GSAP

function initializeAnimations() {
    // GSAP animations
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });
    
    // Add animation initialization class to buttons for GSAP to use as starting point
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('animate-init');
    });
    
    gsap.from('.btn', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });
    
    // Animate decorative elements
    gsap.from('.decoration', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.2,
        delay: 0.5
    });

    // Animate cards when they come into view
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.6,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scale: 1
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        gsap.set(card, { y: 30, opacity: 0, scale: 0.95 });
        observer.observe(card);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.8,
                    y: 0,
                    opacity: 1,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        // Add a subtle bounce effect after the main animation
                        gsap.to(entry.target, {
                            duration: 0.3,
                            yoyo: true,
                            repeat: 1,
                            y: -5,
                            ease: 'power1.inOut'
                        });
                    }
                });
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(title => {
        gsap.set(title, { y: 20, opacity: 0 });
        titleObserver.observe(title);
    });
}

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.config({ force3D: false });
}