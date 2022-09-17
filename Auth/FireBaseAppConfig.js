import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwFKPD4xvIbD1huSnbQG44GTXP2h5_kYM",
  authDomain: "fast-billing-775f5.firebaseapp.com",
  projectId: "fast-billing-775f5",
  storageBucket: "fast-billing-775f5.appspot.com",
  messagingSenderId: "181974334394",
  appId: "1:181974334394:web:9c2f7ac6ecad03931d3b83",
  measurementId: "G-Y8DN64C29K",
};

// Initialize Firebase

const App = initializeApp(firebaseConfig);

export default App;
