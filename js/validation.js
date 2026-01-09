// Form validation functions

function initializeFormValidation() {
    // Find and validate the contact form in the contacts section
    const contactForm = document.querySelector('#contacts form');
    
    if (contactForm) {
        // Prevent default form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageTextarea = contactForm.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput && !nameInput.value.trim()) {
                isValid = false;
                console.log('Name is required');
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    console.log('Valid email is required');
                }
            }
            
            if (messageTextarea && !messageTextarea.value.trim()) {
                isValid = false;
                console.log('Message is required');
            }
            
            if (isValid) {
                console.log('Form validation passed - form would be submitted');
                // In a real implementation, you would submit the form data here
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            } else {
                console.log('Form validation failed');
                alert('Пожалуйста, заполните все обязательные поля корректно.');
            }
        });
    }
    
    console.log('Form validation initialized');
}