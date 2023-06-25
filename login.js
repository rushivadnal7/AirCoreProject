'use strict';

import { auth, signInWithEmailAndPassword } from './auth.js';

const loginForm = document.getElementById('login_form');
const emailLogin = document.getElementById('login_email');
const passwordLogin = document.getElementById('login_password');

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
        .then(userCredentials => {
            // currentUser = userCredentials.user;

            alert('Logged in successfully');
            window.location.href = 'index.html';
            
            // document.querySelector('.btn_logout').style.display = 'block';
        })
        .catch(e => {
            const errorCode = e.code;
            const errorMessage = e.message;

            console.log(errorMessage);
            alert(errorMessage);
        });
});
