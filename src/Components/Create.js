import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const title = event.target.title.value;
      const author = event.target.author.value;
      const body = event.target.body.value;

      // Check individual fields for empty value and show toast for each
      if (!title) {
        toast.error("Please enter a title.");
        return;
      }

      if (!author) {
        toast.error("Please enter the author's name.");
        return;
      }

      if (!body) {
        toast.error("Please enter the body content.");
        return;
      }

      const data = { title, author, body }

      const response = await axios.post("posts", {
        data
      });

      console.log(response);
      toast.success("Post added successfully!");
      event.target.reset();
    } catch (error) {
      console.error("Error occurred while adding the post:", error);
      toast.error("Error occurred while adding the post");
    }
  };

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
        <p>
          Create Post...    
        </p>
          <div className="my-5">
            <form name="sentMessage" id="contactForm" onSubmit={submitHandler}>
              <div className="form-floating">
                <input className="form-control" id="title" type="text" placeholder="Enter title..."  />
                <label htmlFor="title">Title</label>
              </div>
              <div className="form-floating">
                <input className="form-control" id="author" type="text" placeholder="Enter author name..."  />
                <label htmlFor="author">Author</label>
              </div>
              <div className="form-floating">
                <textarea className="form-control" id="body" placeholder="Enter body here..." style={{ height: "12rem" }} ></textarea>
                <label htmlFor="body">Body</label>
              </div>
              <br />
              <button className="btn btn-primary text-uppercase" id="submitButton" type="submit">Send</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
