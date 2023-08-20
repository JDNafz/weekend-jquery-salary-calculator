$(document).ready(onReady);

//commented example of how the data is formatted.
let employees = {
/* 
employees = 
first employee
    {    key          :  value                 
        'numberString': {object}  
    }, 
    {   'stringID' : {}
        '456'      : employeeObj
    }, 
        ...
        employees[123] = 
      //single object in employees 'container' object
                        {   firstName: "JD",
                            id: "123",          
                            lastName: "Nafziger",
                            salary: 90000,
                            title: "Jr Developer"
                        }
    //id gets repeated (might be inefficient,but I found it helpful conceptually)
    */
}

function onReady(){
    $("#submit-btn").on('click',submitUser);
    // allows you to hit enter after typing salary to submit.
    $("input").on('keyup', hitEnter);

    //Event Delegation Listener 
    $("#resultsTable").on('click','.deleteTarget',removeRow);

    //used to AUTO GENERATE USERS 
    autoAdd(); 
    $('#inFirstName').focus();
}//end onReady

function hitEnter(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
        $("#submit-btn").trigger("click");
    }
}//end hit enter

function submitUser(){    
    let firstNameInput =  $('#inFirstName').val(); 
    let lastNameInput = $('#inLastName').val();
    let idInput = $('#inUserID').val();
    let titleInput = $('#inTitle').val();
    let inSalary = $('#inSalary').val()
    let salaryInput = Number(inSalary); //separate before making a number to check if string is empty.

    //if id was already entered
    if (idAlreadyUsed(idInput)) { return }

    //if fields are empty
    if (emptyFields(firstNameInput,lastNameInput,idInput,titleInput,inSalary)){  return }
    
    removeInputHighlight();

    //clear input fields:
    $('#inFirstName').val(''); 
    $('#inLastName').val('');
    $('#inUserID').val('');
    $('#inTitle').val('');
    $('#inSalary').val('');
    // create an employee object to store in 'employees'
    let employee = { 
        firstName: firstNameInput,
        lastName: lastNameInput,
        id: idInput,
        title: titleInput,
        salary: salaryInput }
    employees[idInput]= employee; 

    //add data to table
    addRow(employee);

}// end submitUser

function idAlreadyUsed(idInput){
    const iterable = Object.keys(employees);
    for (let id of iterable){
        if (idInput === id){
            alert(`Oops, the id "${id}" has already been used. Please double check the user ID.`)
            $('#inUserID').val('');
            $('#inUserID').addClass('error-highlight');
            $('#inUserID').focus();
            return true;
        } else {
            $('#inUserID').removeClass('error-highlight');
            return false;
        }
    }
}

function emptyFields(firstNameInput,lastNameInput,idInput,titleInput,inSalary){
    if (firstNameInput === "" || lastNameInput === "" || titleInput === "" || idInput === ""|| inSalary=== ""){ 
        // console.log("SOMETHING WAS EMPTY");
        if (inSalary === ""){
            $('#inSalary').addClass('error-highlight');// Highlight Red
            $('#inSalary').focus(); // FOCUS
        } else {
            $('#inSalary').removeClass('error-highlight');
        }
        if (idInput === ""){
            $('#inUserID').addClass('error-highlight');
        } else {
            $('#inUserID').removeClass('error-highlight');
        }
        if (titleInput === ""){
            $('#inTitle').addClass('error-highlight');
        } else {
            $('#inTitle').removeClass('error-highlight');
        }
        if (lastNameInput === "" ) {
            $('#inLastName').addClass('error-highlight');
        } else {
            $('#inLastName').removeClass('error-highlight');
        }
        if (firstNameInput === "") {
            $('#inFirstName').addClass('error-highlight');
        } else {
            $('#inFirstName').removeClass('error-highlight');
        }
        alert("Please fill in all fields to submit.")

            return true;
    }//end if OR OR OR
    return false;
};
function removeInputHighlight(){
     // catch the last empty field to be corrected before submit.
     $('#inFirstName').removeClass('error-highlight');
     $('#inLastName').removeClass('error-highlight');
     $('#inTitle').removeClass('error-highlight');
     $('#inSalary').removeClass('error-highlight');
     $('#idInput').removeClass('error-highlight');
}
 
function addRow(employee){    
    //format the string to append
    let row = `<tr id="${employee.id}"><td> ${employee.firstName} ${employee.lastName}</td><td>${employee.id}</td><td>${employee.title}</td><td>${formatMoney(employee.salary)}</td><td><input id='delete${employee.id}' class ='deleteTarget btn' type='submit' value='delete'></td></tr>`
    
    $('#resultsTable').append(row)
    
    updateMonthly(employee,'add');
    $('#inFirstName').focus();
}//end addToTable

function removeRow(){
    // find the html of the grandparent
    let htmlTarget = $(this).parent().parent()[0]; 
    //take the id string from the html element
    let employeeId = htmlTarget.id
    //remove the tableRow
    $(this).parent().parent().remove()
    //access the employee object using the id String
    let employee = employees[employeeId];
    //calculate removing their income from the Monthly total
    updateMonthly(employee,'remove'); 
}//end removeUser

// runningTotal tracks Monthly Cost without needed to access DOM
let runningTotal = 0
function updateMonthly(employee,addOrRemove){     
    //calculate monthly cost for this employee                
    let employeeMonthly = employee.salary / 12
    //adding or removing employee
    if (addOrRemove==='add'){
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


//Format number into currency display
function formatMoney(number){
    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
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
            salary: 120000,
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
    //note: auto add bypasses unique ID check.
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


/*

DONE: Take in inputs
DONE: store inputs
DONE: calculate monthly costs
DONE: update DOM with monthly costs
DONE: if monthly costs are over 20k, add red background
DONE: delete button remove employee from DOM

TODO: README.md

TODO STRETCH: styling
TODO STRETCH: extra functionality?

TODO STRETCH: customize monthly goal expenditure from 20k to anything.
TODO STRETCH: add example row that is removed when first user is submitted.
TODO STRETCH: make 'Name' field, combine first and last
TODO STRETCH: put ID in first col, for better format


DONE STRETCH: update monthly cost after removal
DONE STRETCH: only accept unique userIDs 
DONE STRETCH: alert with errors if fields are empty.


*/