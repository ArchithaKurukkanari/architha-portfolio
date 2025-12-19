// ========== MAIN INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio site initialized');
    
    // ========== HELPER FUNCTION ==========
    const $ = id => document.getElementById(id);
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ========== HEADER SCROLL EFFECT ==========
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // ========== SKILLS ANIMATION ==========
    function animateSkillBars() {
        const levelBars = document.querySelectorAll('.level-bar[data-level]');
        
        levelBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = level + '%';
            }, index * 100);
        });
    }
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(skillsSection);
    }
    
    // ========== PROJECT CARDS HOVER ==========
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // ========== FOOTER YEAR ==========
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ========== HERO TYPING EFFECT ==========
    const heroText = document.querySelector('.hero h1 span');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // ========== ORDS API INTEGRATION ==========
    // CORRECT URL - Based on your ORDS configuration
    const ORDS_API = 'https://oracleapex.com/ords/architha_k/portfolio_enq/insert_details_port';
    console.log('ORDS API Endpoint:', ORDS_API);
    
    // Create toast styles
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: toastSlideIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .toast.success {
                background: #10b981;
                border-left: 4px solid #0da271;
            }
            .toast.error {
                background: #ef4444;
                border-left: 4px solid #dc2626;
            }
            @keyframes toastSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toastFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #00eaff;
                color: #0f0f0f;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                z-index: 999;
                transition: all 0.3s;
                box-shadow: 0 5px 15px rgba(0, 234, 255, 0.3);
                opacity: 0;
                visibility: hidden;
            }
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            .back-to-top:hover {
                background: #00c4d6;
                transform: translateY(-5px);
            }
            .error-message {
                color: #ef4444;
                font-size: 13px;
                margin-top: 5px;
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Toast function
    function showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Collect form data
    function collectFormData() {
        return {
            full_name: ($('full_name') ? $('full_name').value.trim() : ''),
            email: ($('email') ? $('email').value.trim() : ''),
            subject: ($('subject') ? $('subject').value.trim() : ''),
            message: ($('message') ? $('message').value.trim() : '')
        };
    }
    
    // Validate form
    function validateForm(data) {
        const errors = [];
        
        if (!data.full_name) {
            errors.push('Full Name is required');
            const errorEl = document.getElementById('full_nameError');
            if (errorEl) {
                errorEl.textContent = 'Full Name is required';
                errorEl.style.display = 'block';
            }
        }
        
        if (!data.email) {
            errors.push('Email Address is required');
            const errorEl = document.getElementById('emailError');
            if (errorEl) {
                errorEl.textContent = 'Email Address is required';
                errorEl.style.display = 'block';
            }
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('Please enter a valid email address');
            const errorEl = document.getElementById('emailError');
            if (errorEl) {
                errorEl.textContent = 'Please enter a valid email address';
                errorEl.style.display = 'block';
            }
        }
        
        if (!data.subject) {
            errors.push('Subject is required');
            const errorEl = document.getElementById('subjectError');
            if (errorEl) {
                errorEl.textContent = 'Subject is required';
                errorEl.style.display = 'block';
            }
        }
        
        if (!data.message) {
            errors.push('Message is required');
            const errorEl = document.getElementById('messageError');
            if (errorEl) {
                errorEl.textContent = 'Message is required';
                errorEl.style.display = 'block';
            }
        }
        
        return errors;
    }
    
    // Clear error messages
    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Create error message elements if needed
    function setupErrorMessages() {
        const ids = ['full_name', 'email', 'subject', 'message'];
        ids.forEach(id => {
            const input = $(id);
            if (input && !document.getElementById(`${id}Error`)) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.id = `${id}Error`;
                input.parentNode.appendChild(errorDiv);
            }
        });
    }
    
    // Handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Form submission started');
        
        clearErrorMessages();
        
        const formData = collectFormData();
        console.log('Form data:', formData);
        
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showToast(errors[0], 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = $('createBtn');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }
        
        try {
            console.log('Sending to ORDS API:', ORDS_API);
            
            const response = await fetch(ORDS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', response.status);
            
            if (response.ok) {
                // Success
                showToast(`Thank you, ${formData.full_name}! Your message has been sent successfully.`, 'success');
                
                // Reset form
                const contactForm = $('contactForm');
                if (contactForm) {
                    contactForm.reset();
                }
                
                console.log('✅ Message sent successfully');
                
            } else {
                // Server error
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                
                let errorMsg = 'Failed to send message. Please try again.';
                
                if (errorText.includes('ORA-') || errorText.includes('error')) {
                    errorMsg = 'Database error. Please check your ORDS handler configuration.';
                } else if (response.status === 404) {
                    errorMsg = 'API endpoint not found. Check the URL.';
                } else if (response.status === 500) {
                    errorMsg = 'Server error. Check your ORDS handler for syntax errors.';
                }
                
                showToast(errorMsg, 'error');
            }
            
        } catch (error) {
            console.error('Network error:', error);
            
            // CORS error
            if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
                showToast('CORS error. Please configure ORDS to allow requests from ' + window.location.origin, 'error');
                
                // Show helpful message for fixing CORS
                console.log('To fix CORS, run this SQL in your database:');
                console.log(`
BEGIN
  ords.set_module_origins_allowed(
    p_module_name => 'portfolio_enq',
    p_origins_allowed => '${window.location.origin}'
  );
  COMMIT;
END;
/`);
            } else {
                showToast('Network error. Please try again or email me directly.', 'error');
            }
            
        } finally {
            // Reset button
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    }
    
    // Initialize contact form
    function initializeContactForm() {
        const contactForm = $('contactForm');
        
        if (contactForm) {
            setupErrorMessages();
            contactForm.addEventListener('submit', handleFormSubmit);
            
            // Clear errors when user starts typing
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    const errorEl = document.getElementById(input.id + 'Error');
                    if (errorEl) {
                        errorEl.style.display = 'none';
                    }
                });
            });
            
            console.log('✅ Contact form initialized');
        }
    }
    
    initializeContactForm();
    
    // ========== DEBUG FUNCTION ==========
    window.testORDSApi = async function() {
        console.log('=== Testing ORDS API ===');
        
        const testData = {
            full_name: "Test User",
            email: "test@example.com",
            subject: "Test API",
            message: "Testing ORDS integration"
        };
        
        try {
            const response = await fetch(ORDS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testData)
            });
            
            console.log('Status:', response.status);
            const text = await response.text();
            console.log('Response:', text);
            
            if (response.ok) {
                console.log('✅ Test successful!');
                showToast('API test successful!', 'success');
            } else {
                console.log('❌ Test failed');
                showToast('API test failed. Status: ' + response.status, 'error');
            }
            
        } catch (error) {
            console.error('Test error:', error);
            showToast('Test error: ' + error.message, 'error');
        }
    };
    
    console.log('✅ Portfolio JavaScript loaded successfully');
    console.log('To test API, type: testORDSApi() in console');
});
