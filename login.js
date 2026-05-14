const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Email validation
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.classList.add('show');
            email.style.borderColor = '#ff3b30';
            valid = false;
        } else {
            emailError.classList.remove('show');
            email.style.borderColor = '';
        }

        // Password validation
        if (password.value.length < 6) {
            passwordError.classList.add('show');
            password.style.borderColor = '#ff3b30';
            valid = false;
        } else {
            passwordError.classList.remove('show');
            password.style.borderColor = '';
        }

        if (!valid) return;

        localStorage.setItem('loggedInUser', email.value);
        localStorage.setItem('isLoggedIn', 'true');

        // Success animation
        const btn = loginForm.querySelector('.btn-primary');
        btn.textContent = '✓ Signed In';
        btn.style.background = '#34c759';
        setTimeout(() => { window.location.href = 'index.html'; }, 900);
    });
}
