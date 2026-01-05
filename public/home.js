// Redirect to dashboard
document.querySelector(".cta").addEventListener("click",()=>{
  window.location.href = "/dashboard.html";
});

// Fetch books for home preview
fetch("/api/books")
.then(res=>res.json())
.then(data=>{
  console.log("Books loaded:", data);
});
