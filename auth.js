import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtCYT19ydbMRXJnN2TQkx8ZZ_kirNt5o0",
  authDomain: "lumi-ai-480909.firebaseapp.com",
  projectId: "lumi-ai-480909",
  storageBucket: "lumi-ai-480909.firebasestorage.app",
  messagingSenderId: "821181853502",
  appId: "1:821181853502:web:5c25d791a7d32afb0f466f",
  measurementId: "G-HYZEDP7686"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ⭐ FIXED REDIRECT
onAuthStateChanged(auth, user => {
  const path = window.location.pathname;

  const protectedPages = ["/", "/index.html"];

  if (!user && protectedPages.includes(path)) {
    window.location.href = "/login.html";
  }
});

// Logout
export function logout(){
  signOut(auth).then(()=>{
    localStorage.clear();
    window.location.href = "/login.html";
  });
}
