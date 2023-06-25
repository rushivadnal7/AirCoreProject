'use strict';

import { auth, ref, push, set, database, signOut } from './auth.js';
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    // slides[slideIndex - 1].style.display = 'block';
    // dots[slideIndex - 1].className += 'active';
}

const flightForm = document.getElementById('flight_form');
const formBtn = document.querySelector('.form_btn');
const logStatusBtn = document.getElementById('log_status');
const logBtn = document.querySelector('.loginbtn');

let currentlyLoggedUser;

auth.onAuthStateChanged(user => {
    if (user) {
        /* // currentUser = user;
        userLogStatus.userInfo = user;
        
        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = false; */
        console.log(user.uid, user.email);

        currentlyLoggedUser = user;

        formBtn.textContent = 'Submit';
        formBtn.disabled = false;
        logStatusBtn.textContent = 'Log out';
    } else {
        console.log('User not logged in');

        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = true;

        currentlyLoggedUser = null;

        formBtn.textContent = 'You need to log in first!';
        formBtn.disabled = true;
        logStatusBtn.textContent = 'Log in';
    }
});
const searchFlightsDropdown = document.getElementById('search_flights');
const flightTypeDropdown = document.getElementById('flight_type');
const fromInput = document.querySelector('.input_from');
const toInput = document.querySelector('.input_to');
const departInput = document.getElementById('depart');
const returnInput = document.getElementById('return');
const adultsDropdown = document.getElementById('adults');
const childrenDropdown = document.getElementById('childs');
const seatClassDropdown = document.getElementById('seatclass');
const infantsDropdown = document.getElementById('infants');
const price = document.querySelector('.price');

flightTypeDropdown.addEventListener("change", e => {
    if (e.target.value === "International") {
        price.textContent = `Price : ₹7000`
        fromInput.innerHTML = `
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
        <option value="Portugal">Portugal</option>
        <option value="England">England</option>
        <option value="Spain">Spain</option>
        <option value="Canada">Canada</option>
        <option value="UAE">UAE</option>
        `
        toInput.innerHTML =    `
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
        <option value="Portugal">Portugal</option>
        <option value="England">England</option>
        <option value="Spain">Spain</option>
        <option value="Canada">Canada</option>
        <option value="UAE">UAE</option>
        `
        
    } else {
        fromInput.innerHTML = `
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Pune">Pune</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Goa">Goa</option>
        <option value="Nashik">Nashik</option>
        <option value="Chennai">Chennai</option>
        <option value="Visakhapatnam">Visakhapatnam</option>
        <option value="Raipur">Raipur</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Trivandham">Trivandham</option>
        `
        toInput.innerHTML = `
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Pune">Pune</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Goa">Goa</option>
        <option value="Nashik">Nashik</option>
        <option value="Chennai">Chennai</option>
        <option value="Visakhapatnam">Visakhapatnam</option>
        <option value="Raipur">Raipur</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Trivandham">Trivandham</option>
        `
        price.textContent = `Price : ₹2000`
    }
})


flightForm.addEventListener('submit', e => {
    e.preventDefault();

    var ticketData = {
        flight: searchFlightsDropdown.value,
        flightType: flightTypeDropdown.value,
        // wayType: document.querySelector('input[name="way"]:checked').value,
        from: fromInput.value,
        to: toInput.value,
        depart: departInput.value,
        // return: returnInput.value,
        adults: adultsDropdown.value,
        children: childrenDropdown.value,
        seatClass: seatClassDropdown.value,
        ticketprice: price.textContent,
        // infants: infantsDropdown.value,
    };
    // if(returnInput){
    //     ticketData.return = returnInput.value;
    // }

    console.log(ticketData);

    const userDataRef = ref(database, `users/${currentlyLoggedUser.uid}`);
    const ticketDataRef = push(userDataRef);
    set(ticketDataRef, ticketData);

    alert('Ticket booked successfully');

    // location.reload()
});

// const  returninput = document.getElementById("return");
// function checkbox1() {
//     document.getElementById("twoway").checked = false;
//     document.getElementById("return").remove();
// }
// function checkbox2() {
//     document.getElementById("oneway").checked = false;
//     // document.getElementsByClassName('.line2').innerHTML += ` <input type="text" placeholder="Return" onfocus="(this.type='date')" onblur="(this.type='text')"
//     // id="return" required>`;
//     document.getElementById("depart").after(returninput);
//     // document.querySelector(".line2").prepend(returninput)
// }

// document.getElementById("oneway").addEventListener("click" , checkbox1)
// document.getElementById("twoway").addEventListener("click" , checkbox2)

logBtn.addEventListener("click", e => {
    if (currentlyLoggedUser) {
        signOut(auth).then(() => {
            alert('Sign-out successful');
        }).catch((error) => {
            alert('Sign-out failed');
        });
    }
    else {
        location.href = "login.html"
        console.log("hello")
    }
})