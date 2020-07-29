var txtUsername = document.getElementById('txtUsername');
var txtEmail = document.getElementById('txtEmail');
var btnRegister = document.getElementById('btnRegister');
var btnLogin = document.getElementById('btnLogin');
var registrationTable = document.getElementById('registrationTable');
var loginTable = document.getElementById('loginTable');
var info = document.getElementById('info');

//Firebase Config
var firebaseRef = firebase.database().ref();
const auth = firebase.auth();


//Email Validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Hide and Display Log In
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("main").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){
		
	
      document.getElementById("user_para").innerHTML = ("Welcome " + txtUsername.value + "!");

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("main").style.display = "block";

  }
});

//Log out
function logout(){
  firebase.auth().signOut();
}

//Login Button Click Event
btnLogin.addEventListener('click', function(d){
	d.preventDefault();
	
	auth.signInWithEmailAndPassword(txtEmail.value, txtPassword.value).catch(function(error){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
	var res = errorMessage.replace(error.message, "This account is not valid.");
	
	
	if(txtUsername.value == '' || txtEmail.value == '' || txtPassword.value == ''){
    info.className = '';
    info.innerHTML = 'Please fill the form!';
    info.style.color = '#e74c3c';
    info.style.display = 'block';
    info.className += 'animated shake';
  }
  else{
	  info.className = '';
	  info.innerHTML = (res);
	  info.style.color = '#e74c3c';
	  info.style.display = 'block';
	  info.className += 'animated shake';
	}
});
});


//Register Button Click Event
btnRegister.addEventListener('click', function(e){
  e.preventDefault();

  auth.createUserWithEmailAndPassword(txtEmail.value, txtPassword.value);

  
  
  if(txtUsername.value == '' || txtEmail.value == '' || txtPassword.value == ''){
    info.className = '';
    info.innerHTML = 'Please fill the form!';
    info.style.color = '#e74c3c';
    info.style.display = 'block';
    info.className += 'animated shake';
  }
  else{
      if(txtUsername.value.length < 3){
        info.className = '';
        info.innerHTML = 'Username must contain at least 3 character!';
        info.style.color = '#e74c3c';
        info.style.display = 'block';
        info.className += 'animated shake';
      }else{
        if(!validateEmail(txtEmail.value)){
          info.className = '';
          info.innerHTML = 'Invalid Email!';
          info.style.color = '#e74c3c';
          info.style.display = 'block';
          info.className += 'animated shake';
        }else{
          if(txtPassword.value.length < 6){
            info.className = '';
            info.innerHTML = 'Password must contain at least 6 character!';
            info.style.color = '#e74c3c';
            info.style.display = 'block';            
            info.className += 'animated shake';
          }
          else{
            info.innerHTML = 'You"ve registered successfully!';
            info.className += 'animated bounce';
            info.style.color = '#2ecc71';
            info.style.display = 'block';
            firebaseRef.child('Users').child('Username').push(txtUsername.value);
            firebaseRef.child('Users').child('Email').push(txtEmail.value);
            firebaseRef.child('Users').child('Password').push(txtPassword.value);         
            txtUsername.value = '';
            txtEmail.value = '';
            txtPassword.value = '';
            txtUsername.focus();
          }
        }
      }
  
  }
  
});