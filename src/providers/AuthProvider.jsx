import { auth } from "@/firebase/firebase.config";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/hooks/useAxiosCommon";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState({ open: false, id: null });
  const axiosCommon = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const sendPassMail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("No logged-in user found");
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      let message = "Failed to update password";

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        message = "Incorrect current password";
      } else if (error.code === "auth/weak-password") {
        message = "New password is too weak";
      } else if (error.code === "auth/requires-recent-login") {
        message = "Please log in again to change your password";
      }

      return { success: false, message };
    }
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const {
    data: db_user,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user?.email}`);
      return data;
    },
    enabled: authReady && !!user?.email,
  });

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);

  //     // localStorage
  //     // if (currentUser) {
  //     //   const userInfo = { email: currentUser.email };
  //     //   axiosCommon.post("/jwt", userInfo).then((res) => {
  //     //     if (res.data.token) {
  //     //       localStorage.setItem("access-token", res.data.token);
  //     //       setLoading(false);
  //     //     }
  //     //   });
  //     // } else {
  //     //   localStorage.removeItem("access-token");
  //     //   setLoading(false);
  //     // }

  //     //cookies
  //     if (currentUser) {
  //       const userInfo = { email: currentUser.email };
  //       await axiosCommon.post("/jwt", userInfo);
  //     } else {
  //       await axiosCommon.post("/logout");
  //     }

  //     setLoading(false);
  //   });

  //   return () => unSubscribe();
  // }, [axiosCommon]);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setAuthReady(false);

      if (currentUser) {
        const userInfo = { email: currentUser.email };

        await axiosCommon.post("/jwt", userInfo);

        setUser(currentUser);
      } else {
        await axiosCommon.post("/logout");
        setUser(null);
      }

      setAuthReady(true);
      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosCommon]);

  const authInfo = {
    loading,
    authReady,
    isLoading,
    isFetched,
    setLoading,
    user,
    db_user,
    createUser,
    sendPassMail,
    signIn,
    updateUserProfile,
    changePassword,
    logOut,
    open,
    setOpen,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
