import { db } from "./Firebase.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// -------------------------------------add event listner click on login button and call login function --------------------------------------
const bindEvent = () => {
    const loginbtn = document.getElementById("login");
    loginbtn.addEventListener("click", login);
}

// --------------------------------------------when window (tab--dom) load then bind event call -----------------------------------------------

window.addEventListener("load", bindEvent);


const storeuserInfo = (userInfo) => {
    if (localStorage) {
        localStorage.userInfo = JSON.stringify({ email: userInfo.email, name: userInfo.displayName, photo: userInfo.photoURL, accesstoken: userInfo.accessToken });
        location.href = "Dashboard.html"

    } else {
        console.log("browser is outdated please update the nrowser");
    }
}

// --------------------------------------loginwith google function -------------------------------------
const login = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        console.log("login successfully with goodle", result);
        storeuserInfo(result.user);
    } catch (error) {
        console.log("login failed ", error);
    }

}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------