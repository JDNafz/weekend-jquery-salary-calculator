$(document).ready(onReady);

function onReady(){
    
    $("#submit-btn").on('click',submitUser);
    
    
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
    
    //list of employees
    let employees = []

    function submitUser(){
        let firstNameInput =  $('#inFirstName').val(); 
        let lastNameInput = $('#inLastName').val();
        let idInput = $('#inUserID').val();
        let titleInput = $('#inTitle').val();
        let salaryInput = Number($('#inSalary').val());

        let employee = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            id: idInput,
            title: titleInput,
            salary: salaryInput
        }
        console.log(employee); //working!

        //total List of employees
        employees.push(employee);
        addToTable(employee);
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
    
    for (let hardEmployee of hardCodedEmployees){
        addToTable(hardEmployee);
    }//end hardcoded loop

}//end onReady