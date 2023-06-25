'use strict';

import { ref, database, auth, onValue } from './auth.js';

const parentel = document.querySelector('.all');

let currentlyLoggedUser;
parentel.innerHTML="";

auth.onAuthStateChanged(user => {

    if (user) {
        currentlyLoggedUser = user;

        const ticketsRef = ref(database, `users/${currentlyLoggedUser.uid}`);

        onValue(ticketsRef, snapshot => {
            const data = snapshot.val();
            // console.log(Object.entries(data));
            console.log(user)


            Object.entries(data).forEach(arr => {
                const [, obj] = arr
                // console.log(obj)
                const html = `
            <div class="ticket">
                <div class="heading">
                ${obj.flight}
                </div>
                <div class="heading">
                ${obj.flightType}
                </div>

                <div class="journey">
                <label for="">${obj.from}</label>
                <img id="formimg" src="/AirCore-master/imgs/exchangeicon.png" alt="">
                <label for="">${obj.to}</label>
                </div>

                <div class="info1">   
                <label id="lab2"> Adults : ${obj.adults}</label>
                <label id="lab3"> Children : ${obj.children}</label>
                </div>

                <div class="info2">
                <label id="lab1"> Date : ${obj.depart}</label>
                <label id="lab1">   ${obj.ticketprice}</label>
                <label id="lab1"> Class: ${obj.seatClass}</label>
                </div>


             </div>  
                `

                parentel.insertAdjacentHTML("beforeend", html)

            })




        });

    } else {
        console.log('User not logged in');
        currentlyLoggedUser = null;
    }

});
