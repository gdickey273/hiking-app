import React, {useState} from "react";
import './LoginModal.css';

function LoginModal() {

  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState)
  }

  return(
    <div className="LoginModal">
      <div className={`modalBackground modalShowing-${modalState}`}>modal</div>
        <div className="modalInner">
          <div className="modalForm">
          </div>
        </div>
      <button onClick={() => toggleModalState()}>Open modal</button>
    </div>
  )
}


export default LoginModal;