import * as React from "react";

export default function User() {
  fetch("http://localhost:5000/auth/user/completeprofile");

  return <div>Hello complete your profile</div>;
}
