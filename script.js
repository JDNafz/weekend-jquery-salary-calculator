$(document).ready(onReady);

function onReady(){
    
    $("#submit-btn").on('click',submitUser);
    $("#resultsTable").on('click','.deleteTarget',removeUser);
    autoAdd();
    
}//end onReady


//list of employees
let employees = []

function submitUser(event){
    
    let firstNameInput =  $('#inFirstName').val(); 
    let lastNameInput = $('#inLastName').val();
    let idInput = $('#inUserID').val();
    let titleInput = $('#inTitle').val();
    let salaryInput = Number($('#inSalary').val());
    
    // layout of the employee object:
    let employee = { 
        firstName: firstNameInput,
        lastName: lastNameInput,
        id: idInput,
        title: titleInput,
        salary: salaryInput
    }
    // console.log(employee); //working!
    
    //total List of employees
    employees.push(employee);
    addToTable(employee);
    //add data to table
}// end submitUser

function addToTable(employee){    
    let row = `<tr id="${employee.id}"><td> ${employee.firstName}</td><td>"${employee.lastName}"</td><td>${employee.id}"</td><td>${employee.title}</td><td>${formatMoney(employee.salary)}</td><td><input id='delete${employee.id}' class ='deleteTarget' type='submit' value='delete'></td></tr>`
    
    // console.log("EmployeeRow:",row)
    $('#resultsTable').append(row)
    
    updateMonthlySalary(employee);

}//end addToTable

//calculate Total Monthly
let runningTotal = 0
function updateMonthlySalary(employee){                     

    let employeeMonthly = employee.salary / 12
    runningTotal += employeeMonthly
    let output = formatMoney(runningTotal);
    $('#totalAmount').text(output); 
    
    
    //update #totalAmount span
}//end updateTotal






function removeUser(e){
    let htmlTarget = $(this).parent().parent()[0]; 
    let employeeId = htmlTarget.id
    $(this).parent().parent().remove()
    let employee = employees.
    updateMonthlySalary(employee); //TODO   FIND how to access employee object from the employee ID number
}//end removeUser
// removeUser();


//hard coded:
let hardCodedEmployees = [{
    firstName: "JD",
    id: "123",
    lastName: "Nafziger",
    salary: 90000,
    title: "Jr Developer"
    },{
    firstName: "Alison",
    id: "234",
    lastName: "Hoffman",
    salary: 200000,
    title: "Senior HR Manager"
    },{
    firstName: "Brisa",
    id: "84154",
    lastName: "Peacock",
    salary: 55000,
    title: "Farmer"
    },{
    firstName: "Alyssa",
    id: "5678",
    lastName: "Glandville",
    salary: 72000,
    title: "Dancer"
    }
]
//auto add employees 
function autoAdd(){
    for (let hardEmployee of hardCodedEmployees){
        addToTable(hardEmployee);
    }
}//end autoAdd();


//used to format int into formatted money.
function formatMoney(number){
    let formatting_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }

    let salaryFormatted = number.toLocaleString("en-US",formatting_options);
    return salaryFormatted
}// end formatMoney









//TODO: Delete btn functionality
//Base: remove from DOM -- THATS IT
// Create a delete button that removes an employee from the DOM. For Base mode, it does not need to remove that Employee's salary from the reported total.
// HINT: You will need to figure out which employee was removed, in order to subtract their salary from the total. Consider using .text() as a getter, or look into jQuery's .data() function. This is tricky!

//TODO: change names to THIS: first name, last name, ID number, job title, annual salary.
//TODO: clear input fields
//TODO: if the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.

//TODO STRETCH: styling
//TODO STRETCH: extra functionality?
//TODO STRETCH: 


