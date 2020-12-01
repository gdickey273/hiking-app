import React from "react";
import './Footer.css';
import Info from "../Info";

function Footer(props){
  return props.trailId?.length > 0 && (
    <footer>
      <Info trailId={props.trailId}/>
    </footer>
  )
};

export default Footer;
