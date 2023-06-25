'use strict';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import {
    getDatabase,
    ref,
    set,
    onValue,
    child,
    push,
    update,
    onChildAdded,
    onChildChanged,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: 'AIzaSyB4KHkaA4eK7wE_PJ5N9DSspoJ3VVifUVs',
    authDomain: 'dummy-authentication-e0a24.firebaseapp.com',
    projectId: 'dummy-authentication-e0a24',
    storageBucket: 'dummy-authentication-e0a24.appspot.com',
    messagingSenderId: '605836150514',
    appId: '1:605836150514:web:2245148e048a204c25f26b',
    measurementId: 'G-3SNKVX5R9C',
    databaseURL: 'https://dummy-authentication-e0a24-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

let userLogStatus = {};

// const formBtn = document.querySelector('.form_btn');

/* auth.onAuthStateChanged(user => {
    if (user) {
        // currentUser = user;
        userLogStatus.userInfo = user;
        console.log(user.uid, user.email);

        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = false;
    } else {
        console.log('User not logged in');

        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = true;
    }
}); */

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    ref,
    push,
    set,
    database,
    onValue,
    signOut
};
