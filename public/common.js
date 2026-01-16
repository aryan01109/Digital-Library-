function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });
}

// Run this when the page loads
window.onload = loadHeader;

document.querySelector(".login-btn").addEventListener("click",()=>{
  alert('Redirecting to Login Page');
  window.location.href = "login.html";
});