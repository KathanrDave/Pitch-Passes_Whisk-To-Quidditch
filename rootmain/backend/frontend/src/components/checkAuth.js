import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const [cookies] = useCookies(["jwtToken"]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data using the stored token
        const token = cookies.jwtToken; // Get the JWT token from cookies

        if (token) {
          const response = await fetch("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the JWT token as an Authorization header
            },
            credentials: "include", // Include credentials (cookies) with the request
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            // Handle the case when the user is not authenticated through either JWT or Google
            console.log("User is not authenticated.");
            setDialogOpen(true); // Show the dialog if the user is not authenticated
          }
        } else {
          // Handle the case when the user is not authenticated through either JWT or Google
          console.log("User is not authenticated.");
          setDialogOpen(true); // Show the dialog if the user is not authenticated
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [cookies]);

  // Function to handle dialog close event
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // JSX for the dialog box
  const dialogBox = (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{"Oh! 😢 You are not authenticated"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          First link to <a href="http://localhost:3000/auth/signin">sign in</a>{" "}
          or <a href="http://localhost:3000/auth/signup">create an account</a>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { userData, dialogBox };
};

export default useAuth;
