// code to hide the table before clicking floor name
const tablecontainer = document.getElementById("tables");
const table1 = document.getElementById("tabledata");
const table2 = document.getElementById("tabledata2");
const table3 = document.getElementById("tabledata3");
const floor1Btn = document.getElementById("floor-1-btn");
const floor2Btn = document.getElementById("floor-2-btn");
const gardenlevelBtn = document.getElementById("garden-level");
floor1Img = document.getElementById('floor-1-img');
floor2Img = document.getElementById('floor-2-img');
floor1Icon = document.getElementById('floor-1-icon');
floor2Icon = document.getElementById('floor-2-icon');
const modal = document.getElementById('image-modal');
// Initially hide table
table1.style.display = "none"; 
table2.style.display = "none";
table3.style.display = "none";
savingData.style.display = "none";
floor1Img.style.display = "none";
floor2Img.style.display = "none";

floor1Btn.addEventListener("click", () => {
  table1.style.display = "block";
   table2.style.display = "none";
 savingData.style.display = "block";
 table3.style.display = "none";
   
});


floor2Btn.addEventListener("click", () => {
    table1.style.display = "none"
  table2.style.display = "block";
  table3.style.display = "none";
  floor1Img.style.display = "none";
  savingData.style.display = "block";
  
});

gardenlevelBtn.addEventListener("click", () => {
    table1.style.display = "none"
  table2.style.display = "none";
  table3.style.display = "block";
  savingData.style.display = "block";
  
});
// code to show image and hideimage when clicked on Map Icon

floor1Icon.addEventListener('click', () => {
    modal.style.display = 'block';
  floor1Img.style.display = 'block';
  floor2Img.style.display = 'none';
});
floor2Icon.addEventListener('click', () => {
  floor1Img.style.display = 'none';
  modal.style.display = 'block';
  floor2Img.style.display = 'block';
});

// To close the image when the user clicks anywhere else on the screen
window.addEventListener("click", (event) => {
  if (event.target === modal || event.target === floor1Img || event.target === tables || event.target === floor2Img) {
      modal.style.display = "none";
    floor1Img.style.display = "none";
    floor2Img.style.display = "none";
  }
 
});

// SAVING THE DATA

const submitBtn = document.getElementById('submit-btn');  

 let data = [];

// Submit form
submitBtn.addEventListener('click', (e) => {

  e.preventDefault();
  let employeeName = document.getElementById('employeeName').value;
if(!employeeName) {
    alert("Please enter your name");
    return;
  }

  /// function for each table
  getdata(table3);
  getdata(table1);
  getdata(table2);
  
  
function getdata(table){
     // Get data 

  const tbody = table.getElementsByTagName("tbody")[0];
  
  
  for(let i = 0; i < tbody.rows.length; i++) {

    // Get values
    let room = tbody.rows[i].cells[0].textContent;  
    
    // Get div and input
    const div = tbody.rows[i].cells[1].querySelector('div'); 
    const input = div.querySelector('input');
    let count = input.value;
    
 // checking the input if it is NULL
 
if(count === '') {
  count = null; 
}

    // Add to data
    data.push({
      room,
      count, 
      employeeName
    });
    
}

}
// Checking if all the Inputs are NULL
let allNull = true;
for (let i = 0; i < data.length; i++) {
  if (data[i].count !== null) {
    allNull = false;
    break; 
  }
}

if (allNull) {
  alert("Please enter at least one count value");
  return;
}
 
 if(data.length > 0) {
    // send a POST request to the server-side script with the data as the request body
    fetch("newprocessForm.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
               
          let now = new Date();
    localStorage.setItem("lastSubmissionTime", now.toString());
    
    window.location.href = "https://yourlink.html";
                
            } else {
                // show an error message
                alert("Error saving data: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
} 
})

// Function to handle after submission process



function updateTimerLabel(time) {
 let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  document.getElementById("timer").innerHTML = `Next data entry in ${minutes}:${seconds}`;
}