import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // Import the useCookies hook from react-cookie
// import axios from "axios";

export default function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, , removeCookie] = useCookies(["jwtToken"]); // Use the useCookies hook to get and remove the "jwtToken" cookie

  useEffect(() => {
    // Fetch user data using the stored token
    const token = cookies.jwtToken; // Get the JWT token from cookies
    if (token) {
      console.log("here");
      fetch("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token as an Authorization header
        },
        credentials: "include", // Include credentials (cookies) with the request
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle the case when the user is not authenticated through either JWT or Google
      console.log("User is not authenticated.");
    }

    // else {
    //   // If JWT token is not present, check if the user is authenticated via Google
    //   fetch("http://localhost:5000/auth/google", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include", // Include credentials (cookies) with the request
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.success) {
    //         // If the response indicates successful Google authentication, set user data accordingly
    //         setUserData({ username: "Google User" }); // You can customize the user data for Google users
    //       } else {
    //         // Handle the case when the user is not authenticated through either JWT or Google
    //         console.log("User is not authenticated.");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  }, []);

  // Function to handle the logout process
  const handleLogout = () => {
    // Clear the "jwtToken" cookie in the browser
    removeCookie("jwtToken");
    // Send a request to the backend to logout
    fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include", // Include credentials (cookies) with the request
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // You can optionally handle the response message from the backend
        // Redirect the user to the login page or perform any other actions after logout
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          {/* Render other user data */}
          <button onClick={handleLogout}>Logout</button>{" "}
          {/* Add the Logout button */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
