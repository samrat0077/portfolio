// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll handler for header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Mobile menu handler
    const toggleMobileMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    // Theme toggle handler
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Save theme preference
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Active link handler
    const setActiveLink = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
                mobileNavLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Intersection Observer for sections
    const observer = new IntersectionObserver(setActiveLink, {
        threshold: 0.5
    });

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Initial scroll check
    handleScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent successfully.</p>
                `;
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                console.error('Error sending message:', error);
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Oops! Something went wrong. Please try again.</p>
                `;
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });

        // Add floating label animation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Set initial state for pre-filled inputs
            if (input.value) {
                input.classList.add('has-value');
            }

            input.addEventListener('focus', () => {
                input.classList.add('has-value');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.classList.remove('has-value');
                }
            });
        });
    }

    // Add hover animations for contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Typing animation
    const texts = ["A passionate developer creating innovative solutions", "Full Stack Developer", "UI/UX Enthusiast"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.querySelector(".typing-text").textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait before starting next text
        } else {
            setTimeout(type, 100); // Type speed
        }
    }

    // Initialize typing animation
    setTimeout(type, 1000);

    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Optional: Add subtle animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate skill levels when they come into view
    const skillsSection = document.querySelector('.skills-section');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-level').forEach(level => {
                    level.style.width = level.parentElement.dataset.skill ? level.style.width : '0%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.classList.remove('fade-in', 'fade-out');
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 500);
                }
            });
        });
    });

    // Add hover effect for project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Update footer copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            const originalButtonHtml = button.innerHTML;

            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            input.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Successfully subscribed!';
                newsletterForm.appendChild(successMessage);

                // Reset form
                input.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'newsletter-error';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
                newsletterForm.appendChild(errorMessage);

                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            } finally {
                // Reset button and input state
                button.innerHTML = originalButtonHtml;
                button.disabled = false;
                input.disabled = false;
            }
        });
    }
});
