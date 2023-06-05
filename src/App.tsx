import React, { useEffect } from "react";
import "./App.css";
import AppAppBar from "./module/header/AppAppBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Container, Typography } from "@mui/material";
import FamilyTree from './module/familyChart/FamilyChart';

function App() {
  const [user, loading] = useAuthState(auth);
  const [authorized, setAuthorized] = React.useState(false);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setAuthorized(data.allowed);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return;
    fetchUserName();
  }, [user, loading]);

  return (
    <div className='App'>
      <AppAppBar />
      {user && authorized ? (
        <FamilyTree />
      ) : user && !authorized ? (
        <>
        <Container maxWidth='md'>
          <img src={"/hero.png"} className='App-unauthorized-logo' alt='logo' />
          <Typography sx={{ textAlign: "center" }} variant='subtitle2' gutterBottom>
            {user.displayName} are Not authorized to view the page.
          </Typography>
          <Typography sx={{ textAlign: "justify" }} variant='caption' gutterBottom>
            The family tree is built by Gandikota Sai Koushik, the younger son
            of Gandikota Ramagopal and Radha, as well as the grandson of
            Gandikota Gopinath and Meenakshi. If you happen to be a part of my
            family, you already know how to get in touch with me !
          </Typography>
          </Container>
        </>
      ) : (
        <>
        <img src={"/hero.png"} className='App-logo' alt='logo' />
        </>
      )}
    </div>
  );
}

export default App;
