        // --- TOGGLE LOGIC ---
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

        // --- REGISTER SUBMIT ---
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const enrollment = document.getElementById('reg-enrollment').value;
            const password = document.getElementById('reg-password').value;

            if(name && enrollment && password) {
                // Save New User
                const user = { name: name, enrollment: enrollment, role: "Student" };
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Also save credentials to simulate a "Database" for login later
                // (In a real app, this goes to a server)
                localStorage.setItem('user_' + enrollment, password);

                alert("Registration Successful! Welcome, " + name + ".");
                window.location.href = 'home.html';
            }
        });

        // --- LOGIN SUBMIT ---
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const enrollment = document.getElementById('login-enrollment').value;
            const password = document.getElementById('login-password').value;

            // Simple Check (Simulating backend check)
            // 1. Check if we registered this user in localStorage just now
            const storedPassword = localStorage.getItem('user_' + enrollment);

            if(enrollment && password) {
                // If password matches stored one OR simply allow for demo purposes if no registration found
                if (storedPassword && storedPassword === password) {
                     const user = { name: "Student", enrollment: enrollment, role: "Student" };
                     localStorage.setItem('currentUser', JSON.stringify(user));
                     alert("Login Successful!");
                     window.location.href = 'home.html';
                } 
                // Fallback for demo: Allow if it looks like a valid input even if not "registered" in this session
                else if (!storedPassword) {
                     const user = { name: "Demo Student", enrollment: enrollment, role: "Student" };
                     localStorage.setItem('currentUser', JSON.stringify(user));
                     alert("Login Successful! (Demo Mode)");
                     window.location.href = 'home.html';
                }
                else {
                    alert("Invalid Password. Please try again.");
                }
            }
        });