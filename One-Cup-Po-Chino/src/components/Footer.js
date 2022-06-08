import React from "react";
import { Box, Container, Row, Column, FooterLink, Heading} from "./FooterStyles";

import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";


const Footer = () => {
return (
  <Box>
  <h6 style={{ color: "black",
        textAlign: "center",
        marginTop: "80px" }}>
       <p>Copyright &copy; 2022 N.P.Z. All Rights Reserved</p>
  </h6>
  <h5 style={{ color: "black",
        textAlign: "center",
        marginTop: "30px" }}>
       <AiOutlineFacebook /> <AiOutlineInstagram /> <FaTiktok />
  </h5>
  </Box>
);
};
export default Footer;