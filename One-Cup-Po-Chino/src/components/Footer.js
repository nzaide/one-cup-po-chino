import React from "react";
import { Box, Container, Row, Column, FooterLink, Heading} from "./FooterStyles";

import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { RiYoutubeLine } from "react-icons/ri";

const Footer = () => {
return (
  <Box>
  <h6 style={{ color: "gray",
        textAlign: "center",
        marginTop: "0px" }}>
       <p>Copyright &copy; 2022 N.P.Z. All Rights Reserved</p>
  </h6>
  <h5 style={{ color: "gray",
        textAlign: "center",
        marginTop: "0px" }}>
       <AiOutlineFacebook /> <AiOutlineInstagram /> <FaTiktok />  <FiTwitter /> <RiYoutubeLine /> 
  </h5>

  </Box>
);
};
export default Footer;