const email = document.querySelector(".email");
const password = document.querySelector(".password");
const login = document.querySelector(".log");
const warning = document.querySelector(".warning");
const logOut = document.querySelector(".logout");
const welcome = document.querySelector(".welcome");
const signup = document.querySelector(".signup");
const uname = document.querySelector(".name");
var emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var mediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
var checkName = "";
var checkEmail = "";
var checkPass = "";
var index;

// check if the local storage is created or not
if (localStorage.getItem("userInformation") == null) {
  var registration = [];
} else {
  var registration = JSON.parse(localStorage.getItem("userInformation"));
}
for (let i = 0; i < registration.length; i++) {
  checkName += registration[i].userName;
  checkEmail += registration[i].userEmail;
  checkPass += registration[i].userPassword;
}
// looping over the array

// checking which window location is open
if (window.location.href.includes("index.html")) {
  //listen to the login button
  login.addEventListener("click", checkInfo);
  function checkInfo() {
    // check whether the values are empty or not

    for (let i = 0; i < registration.length; i++) {
      if (email.value == "" && password.value == "") {
        // if it empty warn the user
        warning.innerText = "All Inputs are Required";
        warning.style.color = "red";
      } // direct the user to home page if the info is correct
      else if (
        registration[i].userEmail == email.value &&
        registration[i].userPassword == password.value
      ) {
        index = i;
        sessionStorage.setItem("index", index);
        window.location.href = "home/home.html";
      }
      //warn the user if the email does not exist
      else if ((i == registration, length)) {
        if (email.value !== registration[i].userEmail) {
          warning.innerText = "This Email Does Not Exist";
          warning.style.color = "red";
        }
      } //warn the use if the password is invalid
      else if (
        email.value === registration[i].userEmail &&
        password.value !== registration[i].userPassword
      ) {
        warning.innerText = "Invalid password";
        warning.style.color = "red";
      }
    }
  }
} // check the location of the home page
else if (window.location.href.includes("home/home.html")) {
  index = sessionStorage.getItem("index");
  welcome.innerHTML = `Welcome ${registration[index].userName} `;
  logOut.addEventListener("click", () => {
    logOut.setAttribute("href", "../index.html");
  });
} else if (location.href.includes("signup/signup.html")) {
  signup.addEventListener("click", userRegistrations);
  function userRegistrations() {
    // making sure the user entered all the required data
      if (email.value === "" || password.value === "" || uname.value === "") {
        warning.innerHTML = "All Input Are Required";
        warning.style.color = "red";
      } // check if the name is already exist
      else if ( checkName.includes(uname.value)) {
        warning.innerHTML = "This name already exist";
        warning.style.color = "red";
      }
      // check  if the email is already exist
      else if (checkEmail.includes(email.value) ) {
        warning.innerHTML = "This email already exist";
        warning.style.color = "red";
      } else if (emailRgx.test(email.value) == false) {
        warning.innerHTML = "Enter A Valid Email Address";
        warning.style.color = "red";
      } else if (mediumRegex.test(password.value) == false) {
        warning.innerHTML =
          "Your passowrd length should not be less than 8 and include uppercase letter, numbers, Special Character ";
        warning.style.color = "red";
        warning.style.fontSize = "16px";
        warning.style.textAlign = "center";
      } else {
        warning.innerHTML = "You Have Created An Account";
        warning.style.color = "green";
        const userInfo = {
          userEmail: email.value,
          userPassword: password.value,
          userName: uname.value,
        };
        // saving user info in registration array
        registration.push(userInfo);
        //setting localstorage
        localStorage.setItem("userInformation", JSON.stringify(registration));
        uname.value = '';
        email.value = '';
        password.value = '';

        
      }
    
  }
}
