import * as React from "react";
import { Button, Typography } from "@mui/material";

export default function Admin() {
  return (
    <div>
      <Typography variant="h2">Hello this is admin page</Typography>
      <Button href="/auth/adminsignin">Register a admin / add admin </Button>
    </div>
  );
}
