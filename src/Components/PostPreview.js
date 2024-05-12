import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/AuthContext"; // Import useAuth hook

export default function PostPreview(props) {
  const { user } = useAuth(); // Get the user from AuthContext

  return (
    <>
      <div className="post-preview">
        <Link href="post.html">
          {user && ( // Check if user is logged in
            <button type="button" onClick={props.delete} className="btn btn-danger">
              Delete
            </button>
          )}
          <h2 className="post-title">{props.title}</h2>
          <h3 className="post-subtitle">{props.body}</h3>
        </Link>
      </div>
      <hr className="my-4" />
    </>
  );
}
