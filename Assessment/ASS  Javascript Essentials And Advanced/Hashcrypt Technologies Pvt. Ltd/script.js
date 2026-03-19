document.getElementById("complaintForm").addEventListener("submit", function(e){

    e.preventDefault()
    
    let name = document.getElementById("name").value.trim()
    let email = document.getElementById("email").value.trim()
    let phone = document.getElementById("phone").value.trim()
    let vehicle = document.getElementById("vehicle").value.trim()
    let complaint = document.getElementById("complaint").value.trim()
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let phonePattern = /^[0-9]{10}$/
    
    let valid = true
    
    document.querySelectorAll(".error").forEach(e => e.innerText="")
    
    if(name==""){
    document.getElementById("nameError").innerText="Name required"
    valid=false
    }
    
    if(!emailPattern.test(email)){
    document.getElementById("emailError").innerText="Invalid email"
    valid=false
    }
    
    if(!phonePattern.test(phone)){
    document.getElementById("phoneError").innerText="Phone must be 10 digits"
    valid=false
    }
    
    if(vehicle==""){
    document.getElementById("vehicleError").innerText="Vehicle required"
    valid=false
    }
    
    if(complaint==""){
    document.getElementById("complaintError").innerText="Complaint required"
    valid=false
    }
    
    if(valid){
    
    let data = {
    name:name,
    phone:phone,
    email:email,
    vehicle:vehicle,
    complaint:complaint
    }
    
    let submissions = JSON.parse(localStorage.getItem("complaints")) || []
    
    submissions.push(data)
    
    localStorage.setItem("complaints", JSON.stringify(submissions))
    
    document.getElementById("successMessage").innerText="Data saved successfully!"
    
    document.getElementById("complaintForm").reset()
    
    loadTable()
    
    }
    
    })
    
    function loadTable(){
    
    let submissions = JSON.parse(localStorage.getItem("complaints")) || []
    
    let tableBody = document.getElementById("tableBody")
    let noData = document.getElementById("noData")
    
    tableBody.innerHTML=""
    
    if(submissions.length==0){
    
    noData.innerText="No data available"
    return
    
    }
    
    noData.innerText=""
    
    submissions.forEach(data => {
    
    let row = `<tr>
    <td>${data.name}</td>
    <td>${data.phone}</td>
    <td>${data.email}</td>
    <td>${data.vehicle}</td>
    <td>${data.complaint}</td>
    </tr>`
    
    tableBody.innerHTML += row
    
    })
    
    }
    
    loadTable()