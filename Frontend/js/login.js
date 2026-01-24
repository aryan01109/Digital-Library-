// =========================
// BACKEND API BASE URL
// =========================
const API_BASE = "http://localhost:5000";

/* =========================
   TOGGLE LOGIN / REGISTER
========================= */
function toggleView(viewName) {
  const registerView = document.getElementById("register-view");
  const loginView = document.getElementById("login-view");

  if (viewName === "login") {
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
  } else {
    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");
  }
}

// =========================
//    REGISTER
// ========================= 
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const enrollment = document.getElementById("reg-enrollment").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!name || !enrollment || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          enrollment,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      toggleView("login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Server error during registration");
    }
  });

/* =========================
   LOGIN
========================= */
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const enrollment = document
      .getElementById("login-enrollment")
      .value
      .trim();

    const password = document
      .getElementById("login-password")
      .value
      .trim();

    if (!enrollment || !password) {
      alert("All fields are required");
      return;
    }

    console.log("SENDING TO BACKEND:", enrollment, password);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          enrollment,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid enrollment or password");
        return;
      }

      // =========================
      // SAVE LOGGED-IN USER
      // =========================
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      alert("Login successful!");
      window.location.href = "home.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  });
