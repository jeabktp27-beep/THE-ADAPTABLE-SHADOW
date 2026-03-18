// ============================================================================
// Firebase Config — คุณต้องใส่ค่าจาก Firebase Console ตรงนี้!
// ============================================================================
// วิธีหา config:
// 1. ไปที่ https://console.firebase.google.com
// 2. สร้าง project ใหม่ (หรือใช้ที่มีอยู่)
// 3. กด Project Settings (⚙️) → Your apps → Web (</>)
// 4. Copy config มาวางตรงนี้
// 5. เปิด Authentication → Sign-in method → Google
// 6. เปิด Firestore Database → Create database → Test mode
// ============================================================================

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// ⚠️ ใส่ค่าของคุณตรงนี้!
const firebaseConfig = {
  apiKey: "AIzaSyArmnHk6JQLOSbXOfadLaJdGqi4vKUjB9s",
  authDomain: "the-adaptable-shadow.firebaseapp.com",
  projectId: "the-adaptable-shadow",
  storageBucket: "the-adaptable-shadow.firebasestorage.app",
  messagingSenderId: "1077681265759",
  appId: "1:1077681265759:web:76a5802c58793799a14fea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ล็อกอินด้วย Google
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// ล็อกเอาท์
export async function logout() {
  await signOut(auth);
}

// บันทึกข้อมูลผู้ใช้ไปยัง Firestore
export async function saveUserData(uid, data) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: Date.now()
  }, { merge: true });
}

// โหลดข้อมูลผู้ใช้จาก Firestore
export async function loadUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// ฟังสถานะ auth
export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
