import * as React from "react";
import "./footer.css";
const FooterSection = () => {
  return (
    <box className="footer">
      <p>
        &copy; {new Date().getFullYear()} Floating Books. All rights reserved.
      </p>
    </box>
  );
};

export default FooterSection;
