if (localStorage.getItem("loginStatus")) {
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
    var greet = document.getElementsByClassName("greet");
    var balMsg = document.getElementsByClassName("balMsg");
    var currentUser = JSON.parse(localStorage.getItem("currentLoginDetails"));
    for (var i = 0; i < 2; i++) {
        greet[i].innerHTML = "Hello, " + currentUser.firstName + " " + currentUser.lastName;
        balMsg[i].innerHTML = "Your balance is " + currentUser.balance;
    }
    var inputAmount;
    var recieverEmail;
    var number = document.getElementsByClassName('number');
    for (var i = 0; i < 2; i++) {
        number[i].onkeydown = function (e) {
            if (!((e.keyCode > 95 && e.keyCode < 106)
                || (e.keyCode > 47 && e.keyCode < 58)
                || e.keyCode == 8)) {
                return false;
            }
        }
    }
    function deposit() {
        if (localStorage.getItem("loginStatus")) {
            inputAmount = document.getElementById("inputAmount").value;
            currentUser.balance = +inputAmount + currentUser.balance;
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
            localStorage.setItem("currentLoginDetails", JSON.stringify(currentUser));
            // document.getElementsByTagName("input")[0].removeAttribute("checked");
            // document.getElementsByTagName("input")[1].setAttribute("checked","checked"); 
            location.reload();
        }
        else {
            location.reload();
        }
    }
    function withdraw() {
        if (localStorage.getItem("loginStatus")) {
            inputAmount = document.getElementById("inputAmount").value;
            if (inputAmount > currentUser.balance) {
                alert("amount is greater than your balance");
            }
            else {
                currentUser.balance = currentUser.balance - +(inputAmount);
                localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
                localStorage.setItem("currentLoginDetails", JSON.stringify(currentUser));
                location.reload();
            }
        }
        else {
            location.reload();
        }
    }
    function LogOut() {
        localStorage.setItem("loginStatus", false);
        localStorage.removeItem("currentLoginDetails");
        localStorage.removeItem("loginStatus");
        sessionStorage.clear();
        window.open("index.html", '_self');
    }
    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    function deleteAccount(){
        var delPass = document.getElementById("del-pass").value;
        if(delPass == currentUser.password){
            localStorage.removeItem(currentUser.email);
            localStorage.removeItem("currentLoginDetails");
            LogOut();
        }
        else{
            document.getElementById("del-error").innerHTML = "Wrong Password";
        }
    }
    function transfer() {
        inputAmount = document.getElementById("inputAmount1").value;
        recieverEmail = document.getElementById("recieverEmail").value;
        if (localStorage.getItem(recieverEmail) && recieverEmail != currentUser.email) {
            var recieverDetail = JSON.parse(localStorage.getItem(recieverEmail));
            recieverDetail.balance = +(inputAmount) + recieverDetail.balance;
            localStorage.setItem(recieverDetail.email, JSON.stringify(recieverDetail));
            alert("amount has been transferred");
            location.reload();
        }
        else {
            document.getElementById("error-email").innerHTML = "Wrong Email";
        }
    }
}
else {
    window.open("index.html", '_self');
}