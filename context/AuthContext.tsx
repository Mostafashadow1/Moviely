import { Box } from "@mui/material";
import { Loading } from "components";
import { auth } from "components/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// types
type userDate = {
  uid: string | number;
  email: string;
};
type Auth = {
  user: null | userDate;
  signup: (email: string, password: string) => {};
  login: (email: string, password: string) => {};
  logout: () => Promise<void>;
};
const AuthContext = createContext<Auth>({
  user: null,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | userDate>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Set an authentication state observer and get user data
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user?.uid!,
          email: user?.email!,
        });
      } else {
        setUser(null);
      }
    });
    setIsLoading(false);
    return () => unSubscribe();
  }, []);
  // Sign up new users
  const signup = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  // Sign in existing users
  const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {isLoading ? (
        <Box marginTop="200px">
          <Loading />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
