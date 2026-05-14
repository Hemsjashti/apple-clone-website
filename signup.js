// Password strength meter
const pwInput = document.getElementById('signupPassword');
const fill = document.getElementById('strengthFill');
const label = document.getElementById('strengthLabel');

if (pwInput) {
    pwInput.addEventListener('input', () => {
        const val = pwInput.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const levels = [
            { pct: '0%', color: '#ff3b30', text: 'Password strength' },
            { pct: '25%', color: '#ff9500', text: 'Weak' },
            { pct: '50%', color: '#ffcc00', text: 'Fair' },
            { pct: '75%', color: '#34c759', text: 'Good' },
            { pct: '100%', color: '#30d158', text: 'Strong 💪' },
        ];
        const l = levels[score];
        if (fill) { fill.style.width = l.pct; fill.style.background = l.color; }
        if (label) { label.textContent = l.text; label.style.color = l.color; }
    });
}

// Form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('fullName');
        const email = document.getElementById('signupEmail');
        const password = document.getElementById('signupPassword');
        const confirm = document.getElementById('confirmPassword');

        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('signupEmailError');
        const pwErr = document.getElementById('signupPasswordError');
        const confirmErr = document.getElementById('confirmError');

        [name, email, password, confirm].forEach(el => el.style.borderColor = '');
        [nameErr, emailErr, pwErr, confirmErr].forEach(el => el.classList.remove('show'));

        if (!name.value.trim()) {
            nameErr.classList.add('show'); name.style.borderColor = '#ff3b30'; valid = false;
        }
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailErr.classList.add('show'); email.style.borderColor = '#ff3b30'; valid = false;
        }
        if (password.value.length < 8) {
            pwErr.classList.add('show'); password.style.borderColor = '#ff3b30'; valid = false;
        }
        if (confirm.value !== password.value) {
            confirmErr.classList.add('show'); confirm.style.borderColor = '#ff3b30'; valid = false;
        }

        if (!valid) return;

        localStorage.setItem('loggedInUser', email.value);
        localStorage.setItem('loggedInName', name.value.trim());
        localStorage.setItem('isLoggedIn', 'true');

        const btn = signupForm.querySelector('.btn-primary');
        btn.textContent = '✓ Account Created!';
        btn.style.background = '#34c759';
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    });
}
