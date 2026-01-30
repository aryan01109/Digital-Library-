fetch("/api/issues")
.then(res=>res.json())
.then(data=>{
  const t = document.getElementById("issueList");

  data.forEach(i=>{
    const fine = i.fine > 0 ? "₹"+i.fine : "₹0";

    t.innerHTML += `
      <tr>
        <td>${i.student}</td>
        <td>${i.book}</td>
        <td>${new Date(i.issueDate).toDateString()}</td>
        <td>${new Date(i.dueDate).toDateString()}</td>
        <td>${i.returnDate ? new Date(i.returnDate).toDateString() : "<span class='bad'>Not Returned</span>"}</td>
        <td class="${i.fine>0?'bad':'good'}">${fine}</td>
      </tr>
    `;
  });
});
