$(document).ready(onReady);

function onReady(){
    $("#submit-btn").on('click',submitUser);
    // allows you to hit enter after typing salary to submit.
    $("#inSalary").on('keyup', hitEnter);


    $("#resultsTable").on('click','.deleteTarget',removeRow);
    autoAdd(); //used to AUTO GENERATE USERS 
}//end onReady



let employees = {}
// employee = {'123': {}  }, {'456': employeeObj2}, ...
// access it with employees[123]

function hitEnter(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
        $("#submit-btn").trigger("click");
    }
}

function submitUser(){
    
    let firstNameInput =  $('#inFirstName').val(); 
    let lastNameInput = $('#inLastName').val();
    let idInput = $('#inUserID').val();
    let titleInput = $('#inTitle').val();
    let inSalary = $('#inSalary').val()
    let salaryInput = Number(inSalary); //separate before making a number to check if string is empty.

    //if id was already entered
    const iterable = Object.keys(employees);
    for (let id of iterable){
        if (idInput === id){
            alert(`Oops, the id "${id}" has already been used. Please double check the user ID.`)
            $('#inUserID').val('');
            $('#inUserID').addClass('error-highlight');
            return;
        } else {
            $('#inUserID').removeClass('error-highlight');
        }
    }

    //if fields are empty
    if (firstNameInput === "" || lastNameInput === "" || titleInput === "" || idInput === ""){
        if (firstNameInput === "" || inSalary === "") {
            $('#inFirstName').addClass('error-highlight');
            } else {
                $('#inFirstName').removeClass('error-highlight');
            }
        if (lastNameInput === "" ) {
            $('#inLastName').addClass('error-highlight');
            } else {
                $('#inLastName').removeClass('error-highlight');
            }
        if (titleInput === ""){
                $('#inTitle').addClass('error-highlight');
            } else {
                $('#inTitle').removeClass('error-highlight');
            }
        if (idInput === ""){
                $('#inUserID').addClass('error-highlight');
            } else {
                $('#inUserID').removeClass('error-highlight');
            }
        if (inSalary === ""){
                $('#inSalary').addClass('error-highlight');
            } else {
                $('#inSalary').removeClass('error-highlight');
            }
        alert("Please fill in all fields to submit.")
        return;
    }//end if empties

    // catch if the last one corrected before submit.
    $('#inFirstName').removeClass('error-highlight');
    $('#inLastName').removeClass('error-highlight');
    $('#inTitle').removeClass('error-highlight');
    $('#inSalary').removeClass('error-highlight');
    $('#idInput').removeClass('error-highlight');


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
    console.log($(this).parent().parent()[0]);
    let htmlTarget = $(this).parent().parent()[0]; 
    let employeeId = htmlTarget.id
    $(this).parent().parent().remove()
    let employee = employees[employeeId];
    updateMonthly(employee,'down'); //TODO   FIND how to access employee object from the employee ID number
}//end removeUser

//Format number into currency display
function formatMoney(number){
    let formatting_options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
    
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


