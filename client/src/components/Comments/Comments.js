import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import { FormBtn } from "../Form";
import './Comments.css';

function Comments(props) {
  const [trail, setTrail] = useState({})
  const [user, setUser] = useState({})
  const [formObject, setFormObject] = useState({})
  const formEl = useRef(null);

  const id = props.trailId;

  useEffect(() => {
    API.getTrail(id)
      .then(res =>
        // console.log(res.data)
        setTrail(res.data)
      )
      .catch(err => console.log(err));

    AUTH.getUser()
      .then(res =>
        // console.log(res.data.user._id)
        setUser(res.data.user)
      )
      .catch(err => console.log(err));
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (value !== "" || value !== " ") {
      setFormObject({
        ...formObject,
        [name]: value
      })
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject === {}) {
      return false;
    }

    if (formObject.comments) {
      let commentsArr = trail.comments;
      commentsArr.push({
        comment: formObject.comments,
        userName: `${user.firstName} ${user.lastName}`,
        userID: user._id
      });

      API.updateTrail(id, { ...trail, comments: commentsArr })
        .then(res => {
          // console.log(res.data)
          formEl.current.reset();
          setTrail(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="comments-container">
      {props.loggedIn &&
        <div className="comments-user-container">
          <i className="fas fa-user"></i>
          <form ref={formEl}><textarea
            onChange={handleInputChange}
            name="comments"
            className="comments-user-input"
            >
          </textarea>
          <button
            className="comments-user-input-submit"
            onClick={handleFormSubmit}
          >
          Submit
        </button>
        </form>
        </div>
      }
      <div className="comments-all">
        {trail.comments && trail.comments.map((comment, i) => (
          <div key={i} className="user-comments-container">
            <i className="fas fa-user"></i>
            <p className="user-comment">{comment.comment} - {comment.userName}</p>
          </div>
        ))}
        {/* 
        <div className="user-comments-container">
          <i className="fas fa-user"></i>
          <p className="user-comment">This is an example comment</p>
        </div>

        <div className="user-comments-container">
          <i className="fas fa-user"></i>
          <p className="user-comment">This is an example comment</p>
        </div> */}
      </div>
    </div>
  )
};

export default Comments;
