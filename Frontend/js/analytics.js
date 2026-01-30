fetch("/api/student-analytics")
.then(res=>res.json())
.then(data=>{
  new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:data.map(d=>d._id),
      datasets:[
        {
          label:"Books Issued",
          data:data.map(d=>d.totalBooks)
        },
        {
          label:"Total Fine (₹)",
          data:data.map(d=>d.totalFine)
        }
      ]
    }
  });
});
