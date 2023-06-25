'use strict';

// import { createUserWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
import { auth, createUserWithEmailAndPassword } from './auth.js';

// const auth = getAuth();

const formLogin = document.getElementById('login_form');
const userEmailInput = document.getElementById('user_email');
const userPasswordInput = document.getElementById('user_password');

formLogin.addEventListener('submit', e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, userEmailInput.value, userPasswordInput.value)
        .then(userCredentials => {
            // currentUser = userCredentials.user;
            // console.log(currentUser);

            alert('Registered successfully');
            window.location.href = 'login.html';
        })
        .catch(e => {
            const errorCode = e.code;
            const errorMessage = e.message;

            console.log(errorMessage);
            alert(errorMessage);
        });
});
