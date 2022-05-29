// validacion hecha con copilot, placeholder
function validateForm() {
    
    var x = document.forms["form"]["nickname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
    
    var x = document.forms["form"]["email"].value;
    if (x == "") {
        alert("Email must be filled out");
        return false;
    }
    
    var x = document.forms["form"]["password"].value;
    if (x == "") {
        alert("Password must be filled out");
        return false;
    }

    // check for only 1 checkbox checked and no more than 1
    var checkboxes = document.getElementsByName('playertype');
    var checked = false;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            if (checked) {
                alert("You can only select player type");
                return false;
            }
            checked = true;
        }
    }
    if (!checked) {
        alert("You must select at least one player type");
        return false;
    }



}







