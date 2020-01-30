// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDxxB6enGLoo_EmRz3Ztbef6jRJaP620Mk",
    authDomain: "naitrecruitform.firebaseapp.com",
    databaseURL: "https://naitrecruitform.firebaseio.com",
    projectId: "naitrecruitform",
    storageBucket: "naitrecruitform.appspot.com",
    messagingSenderId: "668171708914",
    appId: "1:668171708914:web:47c0784d3145a082ada36b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// reference message collection
var registrationsRef = firebase.database().ref('registrations');
// retrieving data from Firebase
registrationsRef.on('value', gotData, errorData);
let listOfRegistrations = [];
document.getElementById('registration-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    // Get values
    var firstname = getInputVal('firstname').value;
    var lastname = getInputVal("lastname").value;
    var program = getInputVal("program").value;
    var major = getInputVal("major").value;
    var email = getInputVal("email").value;
    var phone = getInputVal("phone").value;

    // Save Registration
    saveRegistration(firstname, lastname, program, major, email, phone);
    // Show Alert
    document.querySelector('.alert').style.display = "flex";
    // Hide alert after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').style.display = "none";
    }, 3000);
    // Clear form
    document.getElementById('registration-form').reset();

}

/**
 * function to get form values
 */
function getInputVal(id) {
    return document.getElementById(id);
}


// save registrations
function saveRegistration(firstname, lastname, program, major, email, phone) {
    var newRegistrationRef = registrationsRef.push();
    newRegistrationRef.set({
        firstname: firstname,
        lastname: lastname,
        program: program,
        major: major,
        email: email,
        phone: phone
    });

}

const source = document.querySelector("#project-template").innerHTML;
const template = Handlebars.compile(source);
console.log('source');

function gotData(data) {
    // console.log(data.val());
    var registrations = data.val();
    // console.log(registrations);
    var keys = Object.keys(registrations);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var data = registrations[k];
        console.log(data);
        var firstname = data.firstname;
        var lastname = data.lastname;
        var major = data.major;
        var email = data.email;
        console.log(firstname, lastname, major);
        var tr = document.createElement('tr');
        // tr.classList.add("table")
        tr.innerHTML = `
            <tr>
                <td>${i+1}</td>
                <td>${firstname}</td>
                <td>${lastname}</td>
                <td>${major}</td>
                <td>${email}</td>
            </tr>
        `;
        document.querySelector('.candidate').appendChild(tr);
    }

}


function errorData(err) {
    console.log('Error !');
    console.log(err);
}