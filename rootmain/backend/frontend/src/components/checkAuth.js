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
    const checkAuth = async () => {
      try {
        const token = cookies.jwtToken;
        if (token) {
          console.log("User authenticated.");
        } else {
          console.log("User is not authenticated.");
          setDialogOpen(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuth();
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

  return { dialogBox };
};

export default useAuth;
