import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [, removeCookie] = useCookies(["jwtToken"]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Clear the "jwtToken" cookie in the browser
      removeCookie("jwtToken");

      // Send a request to the backend to logout
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // Include credentials (cookies) with the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate("/");
        // You can optionally handle the response message from the backend
        // Redirect the user to the login page or perform any other actions after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLogout };
};

export default useLogout;
