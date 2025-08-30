import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Load user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // Create default profile
            const defaultProfile: UserProfile = {
              name: '',
              phone: '',
              email: user.email || ''
            };
            await setDoc(doc(db, 'users', user.uid), defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    console.log('Starting Google sign in...');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in successful:', result.user.uid);
      
      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Create user profile in Firestore
        const userProfile: UserProfile = {
          name: result.user.displayName || '',
          phone: '',
          email: result.user.email || ''
        };
        
        console.log('Creating Google user profile in Firestore...');
        await setDoc(doc(db, 'users', result.user.uid), userProfile);
        console.log('Google user profile created successfully');
      }
    } catch (error: any) {
      console.error('Error in Google sign in:', error);
      
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup foi bloqueado pelo navegador. Permita popups e tente novamente.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login cancelado pelo usuário.');
      } else if (error.code === 'auth/unauthorized-domain') {
        const currentDomain = window.location.hostname;
        throw new Error(`Domínio não autorizado: ${currentDomain}. Adicione este domínio exato no Firebase Console: Authentication > Settings > Authorized domains.`);
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Google Sign-In não configurado. Configure no Firebase Console.');
      }
      
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log('Starting sign up process for:', email);
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', result.user.uid);
      
      // Create user profile in Firestore
      const userProfile: UserProfile = {
        name: '',
        phone: '',
        email: email
      };
      
      console.log('Creating user profile in Firestore...');
      await setDoc(doc(db, 'users', result.user.uid), userProfile);
      console.log('User profile created successfully');
    } catch (error: any) {
      console.error('Error in signUp function:', error);
      
      // Add specific handling for configuration error
      if (error.code === 'auth/configuration-not-found') {
        const configError = new Error('Firebase Authentication not configured. Please enable Email/Password authentication in Firebase Console.');
        configError.name = 'ConfigurationError';
        throw configError;
      }
      
      throw error; // Re-throw to be caught by the component
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) {
      throw new Error('Usuário não autenticado');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const updatedProfile = { ...userProfile, ...data };
    await updateDoc(doc(db, 'users', user.uid), updatedProfile);
    setUserProfile(updatedProfile as UserProfile);
  };

  const resetPassword = async (email: string) => {
    console.log('Sending password reset email to:', email);
    
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent successfully');
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado com este e-mail.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('E-mail inválido.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Muitas tentativas. Tente novamente mais tarde.');
      }
      
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    logout,
    changePassword,
    updateProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
