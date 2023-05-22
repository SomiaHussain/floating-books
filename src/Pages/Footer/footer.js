import * as React from "react";
import "./footer.css";
import { Box } from "@mui/material";
const FooterSection = () => {
  return (
    <Box className="footer">
      <p>
        &copy; {new Date().getFullYear()} Floating Books. All rights reserved.
      </p>
    </Box>
  );
};

export default FooterSection;
