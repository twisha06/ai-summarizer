// auth.js

// 1️⃣ Import Firebase Tools
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2️⃣ Your Firebase Config (FIXED storageBucket)
const firebaseConfig = {
  apiKey: "AIzaSyAtCYT19ydbMRXJnN2TQkx8ZZ_kirNt5o0",
  authDomain: "lumi-ai-480909.firebaseapp.com",
  projectId: "lumi-ai-480909",
  storageBucket: "lumi-ai-480909.appspot.com",   // ✅ FIXED
  messagingSenderId: "821181853502",
  appId: "1:821181853502:web:5c25d791a7d32afb0f466f"
};

// 3️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ⭐ 4️⃣ LOGIN PROTECTION — redirects if not logged in
onAuthStateChanged(auth, user => {
  const path = window.location.pathname;

  // Protect index page
  if (!user && (path === "/" || path.endsWith("index.html"))) {
    window.location.href = "/login.html";
  }

  // Prevent logged-in users from seeing login/signup page
  if (user && (path.endsWith("login.html") || path.endsWith("signup.html"))) {
    window.location.href = "/index.html";
  }
});

// 5️⃣ Logout function
export function logout() {
  signOut(auth).then(() => {
    localStorage.clear();
    window.location.href = "/login.html";
  });
}
