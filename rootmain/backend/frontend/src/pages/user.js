import * as React from "react";
import checkAuth from "../components/checkAuth";
import logout from "../components/dologout";

export default function User() {
  const { userData, dialogBox } = checkAuth();
  const { handleLogout } = logout();
  return (
    <div>
      {dialogBox}
      {userData ? (
        <div>
          <h1>Welcome, {userData.email}!</h1>
          {/* Render other user data */}
          <button onClick={handleLogout}>Logout</button>{" "}
          {/* Add the Logout button */}
        </div>
      ) : (
        <p></p>
      )}

      {/* Dialog for non-authenticated users
      <Dialog open={dialogOpen} onClose={() => {}}>
        <DialogTitle>{"Oh! 😢 You are not authenticated"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            First link to{" "}
            <a href="http://localhost:3000/auth/signin">sign in</a> or{" "}
            <a href="http://localhost:3000/auth/signup">create an account</a>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
