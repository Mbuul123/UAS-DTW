// ===================================
// 1. NAVBAR & ACTIVE LINK LOGIC
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-nav)');

    const updateNavbarAndLinks = () => {
        // Logika Navbar Scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Logika Active Link
        let current = '';
        sections.forEach(section => {
            // Menggunakan scrollY global
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20; 
            if (scrollY >= sectionTop) { 
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', updateNavbarAndLinks);
    // Panggil saat load agar active link dan navbar scrolled diinisialisasi
    updateNavbarAndLinks();
});


// ===================================
// 2. TYPING EFFECT 
// ===================================
function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = ["Web Developer", "Front-End Developer", "UI/UX Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        let display = currentText.substring(0, charIndex);

        typingElement.textContent = display;
        
        let delta = 200 - Math.random() * 100; // Kecepatan normal
        if (isDeleting) delta /= 2; // Kecepatan hapus

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
        } else if (!isDeleting && charIndex === currentText.length) {
            delta = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delta = 500;
        }

        setTimeout(type, delta);
    }

    setTimeout(type, 1500); 
}

setupTypingEffect();


// ===================================
// 3. ONE-TIME SCROLL REVEAL EFFECT
// ===================================
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150; 

    for (let i = 0; i < reveals.length; i++) {
        const elementTop = reveals[i].getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } 
    }
}

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);


// ===================================
// 4. CONTACT FORM SUBMISSION & NOTIFICATION LOGIC (FINAL dengan Transisi Halus)
// ===================================

document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Mencegah pengiriman formulir secara default
    event.preventDefault(); 
    
    const notificationOverlay = document.getElementById('notification-overlay');

    // 2. Tampilkan overlay
    if (notificationOverlay) {
        notificationOverlay.classList.add('show');
    }
    
    // 3. Reset formulir
    event.target.reset(); 

    // 4. Sembunyikan notifikasi dan overlay setelah 3 detik
    setTimeout(() => {
        if (notificationOverlay) {
            notificationOverlay.classList.remove('show');
        }
    }, 3000); // Waktu diperpanjang menjadi 3 detik (3000ms)

});