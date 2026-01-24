// common.js
// Safe to load on ALL pages

document.addEventListener("DOMContentLoaded", () => {

  // ===== NAV TOGGLE (optional menu button) =====
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== HEADER LOAD (if you use fetch to inject navbar) =====
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (headerPlaceholder) {
    fetch("../html/header.html")
      .then(res => {
        if (!res.ok) throw new Error("Header not found");
        return res.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
      })
      .catch(err => console.error("Header load failed:", err));
  }

});
