fetch("/api/monthly-analytics")
.then(r=>r.json())
.then(d=>{
  new Chart(document.getElementById("chart"),{
    type:"line",
    data:{
      labels:d.map(x=>"Month "+x._id),
      datasets:[
        { label:"Books Issued", data:d.map(x=>x.totalBooks) },
        { label:"Fine Collected (₹)", data:d.map(x=>x.totalFine) }
      ]
    }
  });
});
