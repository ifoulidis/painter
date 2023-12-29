// AuthContext.js

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import LoadingIndicator from "./LoadingIndicator";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if the user is already authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          console.log(session.user);
          setUser(session.user);
        }

        // Set up an event listener for changes in authentication status
        const authListener = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false); // Set loading to false once authentication status is resolved
          }
        );

        // Clean up the event listener on component unmount
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking authentication status:", error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    checkAuthStatus();
  }, []);

  const register = async (email, password) => {
    try {
      let { user, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }

      // Bypass email confirmation for development
      if (__DEV__) {
        // Perform any additional steps needed for development
        // For example, you might want to simulate email verification by adding a delay

        // Simulate email verification delay (remove this in production)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mark the user as verified in your database
        // This is a simplified example; you may need to adjust based on your database schema
        await supabase
          .from("users")
          .update({ is_verified: true })
          .eq("id", user.id);

        // Fetch the updated user data
        user = await supabase.auth.user();
      }

      setUser(user);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("signInWithPassword result:", user);
      if (error) {
        throw error;
      }
      setUser(user);
      console.log("user:", user);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    // Return a loading indicator or placeholder while checking authentication status
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
