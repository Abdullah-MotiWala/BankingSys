if (!localStorage.getItem("loginStatus")) {
    function radioCheck(id) {
        if (id == "tab-1") {
            sessionStorage.setItem(id, true);
            sessionStorage.removeItem("tab-2");
        }
        else if (id == "tab-2") {
            sessionStorage.setItem(id, true);
            sessionStorage.removeItem("tab-1");
        }
    }
    if (sessionStorage.getItem("tab-1")) {
        document.getElementsByTagName("input")[0].setAttribute("checked", "checked");
        document.getElementsByTagName("input")[1].removeAttribute("checked");
    }
    else {
        document.getElementsByTagName("input")[1].setAttribute("checked", "checked");
        document.getElementsByTagName("input")[0].removeAttribute("checked");
    }
    function Data(firstName, lastName, email, password, gender, balance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.balance = balance;
    }
    function signup() {
        var fName = document.getElementById("firstName");
        var lName = document.getElementById("lastName");
        var inputEmail = document.getElementById("inputEmail");
        var inputPass = document.getElementById("inputPass");
        var firstName = fName.getElementsByTagName("input")[0].value;
        var lastName = lName.getElementsByTagName("input")[0].value;
        var email = inputEmail.getElementsByTagName("input")[0].value;
        var password = inputPass.getElementsByTagName("input")[0].value;
        var inputGender = document.getElementById("inputGender");
        var gender;
        if (inputGender.getElementsByTagName("input")[0].checked) {
            gender = inputGender.getElementsByTagName("input")[0].value;
        }
        else {
            gender = inputGender.getElementsByTagName("input")[1].value;
        }
        var newUser = new Data(firstName, lastName, email, password, gender, 0);
        if (localStorage.getItem(email) == null) {
            localStorage.setItem(email, JSON.stringify(newUser));
            alert("Your account has been created");
            location.reload();
        }
        else {
            alert("email already exits!");
            location.reload();
        }
    }

    function logIn() {
        if (!localStorage.getItem("loginStatus")) {
            var logEmail = document.getElementById("logEmail");
            var logPass = document.getElementById("logPass");
            var email = logEmail.getElementsByTagName("input")[0].value;
            var password = logPass.getElementsByTagName("input")[0].value;
            var details = JSON.parse(localStorage.getItem(email));
            if (localStorage.getItem(email) && password == details.password) {
                var userObject = localStorage.getItem(email)
                localStorage.setItem("currentLoginDetails", userObject);
                localStorage.setItem("loginStatus", true);
                window.open("login.html", '_self');
            }
            else {
                var error = document.getElementById("error-msg");
                error.innerHTML = "Invalid email or password";
            }
        }
        else{
            location.reload();
        }
    }
}

else {
    window.open("login.html", '_self')
}