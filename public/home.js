// Redirect to dashboard
document.querySelector(".cta").addEventListener("click",()=>{
  window.location.href = "/dashboard.html";
});

        // Simple JS to add interactivity
        document.querySelector('.login-btn').addEventListener('click', function () {
            // Placeholder for login logic
            console.log("Login clicked");
        });
        
// Fetch books for home preview
fetch("/api/books")
.then(res=>res.json())
.then(data=>{
  console.log("Books loaded:", data);
});

let lgn_btn = document.querySelector(".login-btn");
lgn_btn.addEventListener("click",()=>{
  alert('Redirecting to Login Page');
  window.location.href = "login.html";
});