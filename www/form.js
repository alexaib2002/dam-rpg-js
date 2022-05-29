// validate form
function validateForm() {
    var x = document.forms["form.html"]["nickname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }

    var x = document.forms["form.html"]["email"].value;
    if (x == "") {
        alert("Email must be filled out");
        return false;
    }
    var x = document.forms["form.html"]["password"].value;
    if (x == "") {
        alert("Password must be filled out");
        return false;
    }
    

}







