async function register(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/register",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;

  if(data.message === "Registered Successfully"){
    setTimeout(()=>{
      window.location.href = "login.html";
    },1000);
  }
}
