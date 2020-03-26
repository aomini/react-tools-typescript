import React from "react";
import Contact from "./Contact";

const ContactPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Contact us</h1>
      <p>If you enter your details we'll get back to you as soon as we can.</p>
      <Contact />
    </div>
  );
};

export default ContactPage;
