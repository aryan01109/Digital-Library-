// --- STATE VARIABLES ---
let currentRole = 'student';

// --- 1. PASSWORD VISIBILITY TOGGLE ---
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    // Toggle Type
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// --- 2. VIEW TOGGLE (Login vs Register) ---
function toggleView(viewName) {
    const registerView = document.getElementById('register-view');
    const loginView = document.getElementById('login-view');

    if (viewName === 'login') {
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
    } else {
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
    }
}

// --- 3. ROLE SWITCHER (Student vs Librarian) ---
function switchRole(role) {
    currentRole = role;

    // A. Visual Button Update
    document.getElementById('tab-student').classList.toggle('active', role === 'student');
    document.getElementById('tab-librarian').classList.toggle('active', role === 'librarian');

    // B. LOGIC FIX: If switching to Librarian, FORCE Login View
    // (Because Librarians don't have a registration form)
    if (role === 'librarian') {
        toggleView('login');
        document.getElementById('register-link-box').style.display = "none";
    } else {
        document.getElementById('register-link-box').style.display = "block";
    }

    // C. Update Labels & Placeholders
    const title = document.getElementById('login-title');
    const label = document.getElementById('id-label');
    const input = document.getElementById('login-id');

    if (role === 'student') {
        title.innerText = "Student Login";
        label.innerText = "Enrollment Number";
        input.placeholder = "Ex: 210280116000";
    } else {
        title.innerText = "Librarian Login";
        label.innerText = "Username / Email";
        input.placeholder = "Ex: admin@library.com";
    }
}

// --- 4. HANDLE LOGIN SUBMIT ---
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;

    if (currentRole === 'student') {
        // --- STUDENT LOGIN ---
        const storedPass = localStorage.getItem('student_' + id);

        if (storedPass && storedPass === password) {
            alert("Login Successful!");
            window.location.href = 'student_dashboard.html';
        } else if (password === "12345") {
            alert("Demo Login Successful!");
            window.location.href = 'student_dashboard.html';
        } else {
            alert("Invalid Password or User not found.");
        }
    } else {
        // --- LIBRARIAN LOGIN ---
        if (id === "admin" && password === "admin123") {
            alert("Welcome Librarian!");
            window.location.href = 'library_dashboard.html';
        } else {
            alert("Invalid Librarian Credentials. Try 'admin' / 'admin123'");
        }
    }
});

// --- 5. HANDLE REGISTER SUBMIT ---
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const enrollment = document.getElementById('reg-enrollment').value;
    const password = document.getElementById('reg-password').value;

    if (enrollment && password) {
        // Save user to LocalStorage
        localStorage.setItem('student_' + enrollment, password);
        alert("Registration Successful! Please login.");

        // Switch to login view and pre-fill ID
        toggleView('login');
        document.getElementById('login-id').value = enrollment;
    }
});