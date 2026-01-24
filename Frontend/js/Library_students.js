let records=[];

fetch("/api/issues")
.then(res=>res.json())
.then(data=>{
  records=data;
  render(records);
});

function render(data){
  const t=document.getElementById("studentList");
  t.innerHTML="";
  data.forEach(r=>{
    const status = r.returnDate ? "Returned" : "Issued";
    t.innerHTML+=`
      <tr>
        <td>${r.student}</td>
        <td>${r.book}</td>
        <td>${new Date(r.dueDate).toDateString()}</td>
        <td>₹ ${r.fine||0}</td>
        <td class="${status==='Returned'?'good':'bad'}">${status}</td>
      </tr>
    `;
  });
}

function searchStudents(){
  const q=document.getElementById("search").value.toLowerCase();
  render(records.filter(r=>r.student.toLowerCase().includes(q)));
}
