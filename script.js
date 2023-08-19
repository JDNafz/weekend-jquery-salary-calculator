$(document).ready(onReady);

function onReady(){
    $("#submit-btn").on('click',submitUser);
    $("#resultsTable").on('click','.deleteTarget',removeRow);
    autoAdd(); //used to AUTO GENERATE USERS 
}//end onReady

//
let employees = {}
// employee = {'123': employeeObj1}, {'456': employeeObj2}, ...
// access it with employees[123]

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
    
    //add to total list of employees
    employees[idInput]= employee;

    addRow(employee);
    //add data to table

    //clear input fields:
    $('#inFirstName').val(''); 
    $('#inLastName').val('');
    $('#inUserID').val('');
    $('#inTitle').val('');
    $('#inSalary').val('');

}// end submitUser

function addRow(employee){    
    //format the string to append
    let row = `<tr id="${employee.id}"><td> ${employee.firstName}</td><td>${employee.lastName}</td><td>${employee.id}</td><td>${employee.title}</td><td>${formatMoney(employee.salary)}</td><td><input id='delete${employee.id}' class ='deleteTarget' type='submit' value='delete'></td></tr>`
    
    // console.log("EmployeeRow:",row)
    $('#resultsTable').append(row)
    
    updateMonthly(employee,'up');
}//end addToTable

// runningTotal tracks Monthly Cost without needed to access DOM
let runningTotal = 0
function updateMonthly(employee,updown){     
    //calculate monthly cost for this employee                
    let employeeMonthly = employee.salary / 12
    //adding or removing employee
    if (updown==='up'){
        runningTotal += employeeMonthly
    } else {
        runningTotal -= employeeMonthly
    }
    let output = formatMoney(runningTotal);

    //update DOM
    $('#totalAmount').text("Total Monthly Cost: "+output); 
    
    //check if over 20k, apply/remove red-fill
    if (runningTotal> 20000){
        $('#totalAmount').addClass('red-fill');
    } else{
        $('#totalAmount').removeClass('red-fill');
    };

}//end updateTotal

function removeRow(){
    let htmlTarget = $(this).parent().parent()[0]; 
    let employeeId = htmlTarget.id
    $(this).parent().parent().remove()
    let employee = employees[employeeId];
    updateMonthly(employee,'down'); //TODO   FIND how to access employee object from the employee ID number
}//end removeUser

//Format number into currency display
function formatMoney(number){
    let formatting_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }
    
    let salaryFormatted = number.toLocaleString("en-US",formatting_options);
    return salaryFormatted
}// end formatMoney

// START --------------------- CODE to AUTO GENERATE USERS ----------------
let hardCodedEmployeesOBJECT = {
    123 : {     firstName: "JD",
                id: "123",
                lastName: "Nafziger",
                salary: 90000,
                title: "Jr Developer"
            },
    234 :{
            firstName: "Alison",
            id: "234",
            lastName: "Hoffman",
            salary: 200000,
            title: "Senior HR Manager"
            },
    84154 : {
            firstName: "Brisa",
            id: "84154",
            lastName: "Peacock",
            salary: 55000,
            title: "Farmer"
            },
    5678: {
            firstName: "Alyssa",
            id: "5678",
            lastName: "Glandville",
            salary: 72000,
            title: "Dancer"
            }
}//close hardCodedEmployeesOBJECT
function autoAdd(){
    const iterable = Object.keys(hardCodedEmployeesOBJECT);
    // console.log(iterable);
    iterable.forEach((key,obj)=> {
        let employee = hardCodedEmployeesOBJECT[key];
        addRow(employee);
        employees[key] = employee;
        // console.log(employees);
    });
}//end autoAddObjects 
// END ----------------------- CODE to AUTO GENERATE USERS ----------------

//QUESTION: How do people format money?
//                  does that make it easier to use text() as a getter?


//TODO STRETCH: styling
//TODO STRETCH: only accept unique userIDs
//TODO STRETCH: extra functionality?


