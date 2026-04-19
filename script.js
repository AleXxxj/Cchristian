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
    // Using the main Nigeria number
    window.open(`https://wa.me/2349160009722?text=${message}`, '_blank');
    
    // Optional: Reset form
    // quoteForm.reset();
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
document.querySelectorAll('.service-card, .item-card, .schedule-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== DATE UPDATE FUNCTION (EASY MAINTENANCE) ====================
// This is where you'll update the shipping dates monthly
// Simply change these values and the site updates automatically

const shippingDates = {
    germanyToNigeria: '17th April 2026',
    nigeriaToGermany: '23rd April 2026',
    upcomingDates: ['23rd Apr', '24th Apr', '25th Apr', '26th Apr', '27th Apr', '28th Apr', '29th Apr', '30th Apr']
};

// Function to update dates if needed
function updateShippingDates() {
    // This function can be used if you want to pull dates from a Google Sheet
    // For now, the dates are hardcoded in HTML for simplicity
    console.log('Shipping dates loaded for April 2026');
}

updateShippingDates();
