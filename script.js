$(document).ready(onReady);

function onReady(){
    
    $("#submit-btn").on('click',submitUser);
    
    autoAdd();
    
    
}//end onReady


//list of employees
let employees = []

function submitUser(){
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
    updateTotal();
    //add data to table
}// end submitUser

function addToTable(employee){
    let col1 = "<tr><td>"+employee.firstName+"</td>"
    let col2 = "<td>"+employee.lastName+"</td>"
    let col3 = "<td>"+employee.id+"</td>"
    let col4 = "<td>"+employee.title+"</td>"
    let formatting_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }
    //   variable.toLocaleString("en-US",formatting_options) ;
    let salaryFormatted = employee.salary.toLocaleString("en-US",formatting_options);
    let col5 = "<td>"+salaryFormatted+"</td>"
    let col6 = "<td><input id='delete"+employee.id+"' type='submit' value='delete'></td></tr>"
    let employeeRow = col1 + col2 + col3 + col4 + col5 + col6;
    console.log("EmployeeRow:",employeeRow)
    $('#resultsTable').append(employeeRow)
    // $('#resultsTable').append("<div class='blue'></div>")
        
}//end addToTable

//calculate Total Monthly
function updateTotal(){                     //TODO:
    //run through employees
    //sum each salary
    //divide by 12 to get monthly
    //update #totalAmount span
}//end updateTotal

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