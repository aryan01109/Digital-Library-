let books = [];

async function loadBooks(){
  try{
    const res = await fetch("http://localhost:3000/api/books");
    books = await res.json();
    renderBooks(books);
    updateStats();
  }catch(err){
    alert("Backend not running");
  }
}

function renderBooks(data){
  const tbody = document.getElementById("bookList");
  tbody.innerHTML = "";

  data.forEach(book=>{
    tbody.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.status}</td>
        <td>
          ${book.status === "Available"
            ? `<button onclick="issueBook('${book._id}')">Issue</button>`
            : `<button onclick="returnBook('${book._id}')">Return</button>`}
        </td>
      </tr>
    `;
  });
}

function updateStats(){
  document.getElementById("total").innerText = books.length;
  document.getElementById("available").innerText = books.filter(b=>b.status==="Available").length;
  document.getElementById("issued").innerText = books.filter(b=>b.status==="Issued").length;
}

async function addBook(){
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  if(!title || !author){
    alert("Enter book details");
    return;
  }

  await fetch("http://localhost:3000/api/books",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ title, author })
  });

  document.getElementById("title").value="";
  document.getElementById("author").value="";

  loadBooks();
}

async function issueBook(id){
  await fetch(`http://localhost:3000/api/issue/${id}`,{ method:"POST" });
  loadBooks();
}

async function returnBook(id){
  await fetch(`http://localhost:3000/api/return/${id}`,{ method:"POST" });
  loadBooks();
}

function searchBooks(){
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = books.filter(b=>b.title.toLowerCase().includes(q));
  renderBooks(filtered);
}

function logout(){
  window.location.href = "http://localhost:3000/login.html";
}

loadBooks();
