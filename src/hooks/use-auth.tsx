"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userRole: string | null;
  signUp: (data: any) => Promise<any>;
  login: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: any) => {
    const { email, password, name, role } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: name,
      email: user.email,
      role: role,
    });
    setUser(user);
    setUserRole(role);
    return userCredential;
  };

  const login = async (data: any) => {
    const { email, password } = data;
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    await firebaseSignOut(auth);
    router.push('/login');
  };
  
  const updateUserProfile = async (data: any) => {
    if (user) {
      await updateProfile(user, { displayName: data.name });
      await setDoc(doc(db, "users", user.uid), { displayName: data.name }, { merge: true });
      setUser({ ...user, displayName: data.name });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, userRole, signUp, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
