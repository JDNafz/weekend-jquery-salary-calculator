$(document).ready(onReady);

function onReady(){
    
    $("#submit-btn").on('click',submitUser);
    
    
    function submitUser()
        let firstNameInput =  $('#inFirstName').val(); 
        let lastNameInput = $('#inLastName').val();
        let idInput = $('#inUserID').val();
        let titleInput = $('#inTitle').val();
        let salaryInput = $('#inSalary').val();

        let employee = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            id: idInput,
            title: titleInput,
            salary: salaryInput
        }
        console.log(employee);
}//end onReady