let books=[];

fetch("/api/books")
.then(res=>res.json())
.then(data=>{
  books=data;
  renderBooks(books);
});

function renderBooks(data){
  const t=document.getElementById("bookList");
  t.innerHTML="";
  data.forEach(b=>{
    t.innerHTML+=`
      <tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td class="${b.status==='Available'?'available':'issued'}">${b.status}</td>
        <td>
          ${b.status==='Available'
            ? `<button onclick="issue('${b._id}')">Issue</button>`
            : `<button onclick="ret('${b._id}')">Return</button>`}
        </td>
      </tr>`;
  });
}

function searchBooks(){
  const q=document.getElementById("search").value.toLowerCase();
  renderBooks(books.filter(b=>b.title.toLowerCase().includes(q)));
}

async function issue(id){
  await fetch(`/api/issue/${id}`,{method:"POST"});
  location.reload();
}

async function ret(id){
  await fetch(`/api/return/${id}`,{method:"POST"});
  location.reload();
}
