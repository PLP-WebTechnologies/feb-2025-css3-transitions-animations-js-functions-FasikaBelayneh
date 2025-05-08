// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const clickBtn = document.getElementById('clickBtn');
    const hoverBox = document.getElementById('hoverBox');
    const keyDisplay = document.getElementById('keyDisplay');
    const secretArea = document.getElementById('secretArea');
    const colorChanger = document.getElementById('colorChanger');
    const colors = ['#28a745', '#17a2b8', '#ffc107', '#dc3545'];
    let colorIndex = 0;
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slides img');
    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Load preferences from localStorage
    const initializePreferences = () => {
        const storedColor = localStorage.getItem('selectedColor');
        const partyMode = localStorage.getItem('partyModeEnabled') === 'true';

        if (storedColor) {
            colorChanger.style.backgroundColor = storedColor;
            colorIndex = colors.indexOf(storedColor) || 0;
        }

        if (partyMode) {
            document.body.classList.add('party-time');
            secretArea.textContent = 'Party Mode! 🎉';
        }
    };

    // Event Handling
    clickBtn.addEventListener('click', () => {
        clickBtn.textContent = 'Clicked! 🎉';
        clickBtn.style.backgroundColor = '#17a2b8';
        setTimeout(() => {
            clickBtn.textContent = 'Click Me Again!';
            clickBtn.style.backgroundColor = '#007bff';
        }, 1000);
    });

    hoverBox.addEventListener('mouseenter', () => {
        hoverBox.style.transform = 'scale(1.05)';
        hoverBox.textContent = 'Hovering! 🚀';
    });

    hoverBox.addEventListener('mouseleave', () => {
        hoverBox.style.transform = 'scale(1)';
        hoverBox.textContent = 'Hover Over Me';
    });

    document.addEventListener('keydown', (e) => {
        keyDisplay.textContent = `Pressed: ${e.key} ${e.ctrlKey ? 'Ctrl+' : ''}${e.altKey ? 'Alt+' : ''}${e.shiftKey ? 'Shift+' : ''}`;
        keyDisplay.style.color = '#28a745';
    });

    secretArea.addEventListener('dblclick', () => {
        document.body.classList.toggle('party-time');
        const isPartyMode = document.body.classList.contains('party-time');
        localStorage.setItem('partyModeEnabled', isPartyMode);
        secretArea.textContent = isPartyMode ? 'Party Mode! 🎉' : 'Double-click for magic 🪄';
    });

    // Interactive Elements
    colorChanger.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        const newColor = colors[colorIndex];
        colorChanger.style.backgroundColor = newColor;
        colorChanger.classList.add('bounce');
        localStorage.setItem('selectedColor', newColor);
        setTimeout(() => colorChanger.classList.remove('bounce'), 500);
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    });

    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-pane')[index].classList.add('active');
        });
    });

    // Form Validation
    const showError = (element, message) => {
        element.textContent = message;
        element.previousElementSibling.style.borderColor = '#dc3545';
    };

    const clearError = (element) => {
        element.textContent = '';
        element.previousElementSibling.style.borderColor = '#ddd';
    };

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length < 2) {
            showError(document.getElementById('nameError'), 'Name must be at least 2 characters');
        } else {
            clearError(document.getElementById('nameError'));
        }
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(document.getElementById('emailError'), 'Invalid email format');
        } else {
            clearError(document.getElementById('emailError'));
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 8) {
            showError(document.getElementById('passwordError'), 'Password must be at least 8 characters');
        } else {
            clearError(document.getElementById('passwordError'));
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            showError(document.getElementById('nameError'), 'Name is required');
            isValid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(document.getElementById('emailError'), 'Invalid email');
            isValid = false;
        }
        if (passwordInput.value.length < 8) {
            showError(document.getElementById('passwordError'), 'Password too short');
            isValid = false;
        }

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.classList.add('pulse');
            setTimeout(() => {
                submitBtn.classList.remove('pulse');
                alert('Form submitted successfully! 🎉');
                form.reset();
                document.querySelectorAll('.error').forEach(clearError);
                
                // Track submissions
                const submissions = parseInt(localStorage.getItem('formSubmissions') || 0);
                localStorage.setItem('formSubmissions', submissions + 1);
            }, 500);
        }
    });

    // Initialize preferences
    initializePreferences();
});