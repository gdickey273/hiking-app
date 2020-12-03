import React from "react";
import './Comments.css';

function Comments(){
  return (
    <div className="comments-container">
      <div className="comments-user-container">
        <i className="fas fa-user"></i>
        <textarea className="comments-user-input">
        </textarea>
      </div>
        <div className="comments-all">
          <div className="user-comments-container">
            <i className="fas fa-user"></i>
            <p className="user-comment">This is an example comment</p>
          </div>

          <div className="user-comments-container">
            <i className="fas fa-user"></i>
            <p className="user-comment">This is an example comment</p>
          </div>

          <div className="user-comments-container">
            <i className="fas fa-user"></i>
            <p className="user-comment">This is an example comment</p>
          </div>
      </div>
    </div>
  )
};

export default Comments;
