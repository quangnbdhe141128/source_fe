
// $(function () {
//     var isRememberMe = storage.getRememberMe();
//     document.getElementById("rememberMe").checked = isRememberMe;
// });
// function showAlertSuccess() {
//     $("#alert-success").fadeTo(5000, 200).slideUp(2000, function () {
//         $("#alert-success").slideUp(5000);
//     });
// }
function showAlertError() {
    $("#alert-warning").fadeTo(5000, 100).slideUp(2000, function () {
        $("#alert-warning").slideUp(5000);
    });
}
function login() {
    // Get username & password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // validate
    if (!username) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }


    // validate username 6 -> 30 characters
    if (username.length < 6 || username.length > 20 || password.length < 6 || password.length > 8) {
        // show error message
        // showNameErrorMessage("Login fail!");
        showAlertError()
        return;
    }

    // Call API
    $.ajax({
        url: 'http://localhost:8080/api/v1/auth/login',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data, textStatus, xhr) {


            // save remember me
            var isRememberMe = document.getElementById("rememberMe").checked;
            storage.saveRememberMe(isRememberMe);
            // save data to storage
            // https://www.w3schools.com/html/html5_webstorage.asp
            storage.setItem("ID", data.id);
            storage.setItem("FULL_NAME", data.fullName);
            storage.setItem("USERNAME", username);
            storage.setItem("PASSWORD", password);
            storage.setItem("ROLE", data.role);
            // redirect to home page
            // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
            window.location.replace("/");
           
        },
        error(jqXHR, textStatus, errorThrown) {
            
            if (jqXHR.status == 401) {
                // showNameErrorMessage("Login fail!");
                showAlertError()
            } else {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
         
    });
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "block";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}