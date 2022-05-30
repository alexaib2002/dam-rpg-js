
$(document).ready(function () {
    // Change image according to gender
    $("input[name='Gender']").change(function () {
        var val = $("input[name='Gender']:checked").val();
        var pic = document.getElementById('warrior');
        if (val == "Female") {
            pic.src = "../src/sprites/woman-warrior.png";
        } else {
            pic.src = "../src/sprites/warrior.png";
        }
    });

    // Check if form is not empty
    $("#submit").click(function () {
        var x = document.forms["mainForm"]["nName"].value;
        if (x == "") {
            alert("Name must be filled out");
            return false;
        }

        var a = document.forms["mainForm"]["email"].value;
        if (a == "") {
            alert("Email must be filled out");
            return false;
        }

        var i = document.forms["mainForm"]["password"].value;
        if (i == "") {
            alert("Password must be filled out");
            return false;
        }

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

        else {
            alert("The player have been registered");
        }
    });

});








