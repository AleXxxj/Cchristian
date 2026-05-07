// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== FORM HANDLING (WHATSAPP INTEGRATION) ====================
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const item = document.getElementById('item').value;
    const weight = document.getElementById('weight').value || 'Not specified';
    const destination = document.getElementById('destination').value;
    
    // Format destination for display
    const destinationText = {
        'germany': 'Germany',
        'other-eu': 'Other EU (via DHL)',
        'nigeria': 'Nigeria'
    }[destination] || destination;
    
    // Create WhatsApp message
    const message = `*MO Logistics - Quote Request*%0A%0A` +
                   `*Name:* ${name}%0A` +
                   `*WhatsApp:* ${whatsapp}%0A` +
                   `*Item(s):* ${item}%0A` +
                   `*Weight:* ${weight} kg%0A` +
                   `*Destination:* ${destinationText}%0A%0A` +
                   `Please provide a shipping quote. Thank you!`;
    
    // Open WhatsApp with message
    window.open(`https://wa.me/2349160009722?text=${message}`, '_blank');
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== STICKY HEADER ON SCROLL ====================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.service-card, .item-card, .schedule-card, .step, .proof-card, .team-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== TYPEWRITER EFFECT ====================
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.innerHTML;

function typeWriter() {
    heroTitle.style.opacity = '1';
    
    // Store the HTML structure but type out the text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalText;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    heroTitle.textContent = '';
    
    let i = 0;
    const speed = 50;
    
    function type() {
        if (i < textContent.length) {
            heroTitle.textContent += textContent.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Restore HTML with spans for highlights
            heroTitle.innerHTML = originalText;
            heroTitle.style.borderRight = 'none';
        }
    }
    
    type();
}

// Run typewriter on page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 800);
});

// ==================== COUNTER ANIMATION ====================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const targetText = counter.getAttribute('data-target');
                const target = parseInt(targetText);
                const suffix = targetText === '100' ? '%' : (targetText === '2' ? '' : '+');
                const duration = 2000;
                const startTime = Date.now();
                
                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    
                    if (suffix === '%') {
                        counter.textContent = current + suffix + ' Trusted';
                    } else if (suffix === '') {
                        counter.textContent = current;
                    } else {
                        counter.textContent = current.toLocaleString() + suffix;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Final value
                        if (suffix === '%') {
                            counter.textContent = target + suffix + ' Trusted';
                        } else if (suffix === '') {
                            counter.textContent = target;
                        } else {
                            counter.textContent = target.toLocaleString() + suffix;
                        }
                    }
                }
                
                updateCounter();
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        hero.style.backgroundPositionY = -(scrolled * 0.4) + 'px';
    }
});

// ==================== CURSOR GLOW EFFECT ====================
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ==================== PARTICLES INITIALIZATION ====================
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.15,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.4
                    }
                },
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });
}

// ==================== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE ====================
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

console.log('🚀 MO Logistics website loaded successfully!');
console.log('🌍 Visit: www.mologisticsinternational.com');
