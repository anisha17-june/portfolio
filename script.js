/**
 * Developer Portfolio Script
 * Handles mobile navigation, smooth scrolling, active link highlighting,
 * dark mode toggle, contact form validation, back-to-top button, and typing animation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Dark Mode Toggle Logic
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.className = 'fa-solid fa-moon';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.className = 'fa-solid fa-sun';
            }
        });
    }

    /* ==========================================
       2. Mobile Navigation Menu Toggle
       ========================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==========================================
       3. Change Header Background & Shadow on Scroll
       ========================================== */
    const header = document.getElementById('header');
    
    const scrollHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    };
    
    window.addEventListener('scroll', scrollHeader);

    /* ==========================================
       4. Back to Top Button Visibility
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    const toggleBackToTop = () => {
        if (window.scrollY >= 400) {
            backToTopBtn.classList.add('show-scroll');
        } else {
            backToTopBtn.classList.remove('show-scroll');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    /* ==========================================
       5. Active Navigation Link Highlighting on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add('active-link');
                } else {
                    sectionsClass.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    /* ==========================================
       6. Contact Form Validation & Submission Logic
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const showError = (input, errorElement, message) => {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    };

    const clearError = (input, errorElement) => {
        input.classList.remove('invalid');
        errorElement.classList.remove('visible');
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const nameError = document.getElementById('name-error');
            if (nameInput.value.trim() === '') {
                showError(nameInput, nameError, 'Full name is required.');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }
            const emailError = document.getElementById('email-error');
            if (emailInput.value.trim() === '') {
                showError(emailInput, emailError, 'Email address is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, emailError, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }
            const subjectError = document.getElementById('subject-error');
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, subjectError, 'Subject is required.');
                isValid = false;
            } else {
                clearError(subjectInput, subjectError);
            }
            const messageError = document.getElementById('message-error');
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters long.');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }
            if (isValid) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been validated successfully.';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fix the errors in the form before submitting.';
            }
        });
    }
    /* ==========================================
       7. Typing & Erasing Text Effect
       ========================================== */
    const typingElement = document.getElementById('typing-text');
    const wordsArray = [
        "Anisha Lohana",
        "a Computer Science Student",
        "a Frontend Developer",
        "a MUET Scholar"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;   
    const eraseSpeed = 50;     
    const delayBetweenWords = 1800; 

    function typeEffect() {
        if (!typingElement) return;

        const currentWord = wordsArray[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? eraseSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            currentSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordsArray.length;
            currentSpeed = 300;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typingElement) {
        typeEffect();
    }

});