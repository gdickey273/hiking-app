import React from "react";
import './Footer.css';
import Info from "../Info";

function Footer(props){
  return (
    <footer>
      <Info trailId={props.trailId}/>
    </footer>
  )
};

export default Footer;
