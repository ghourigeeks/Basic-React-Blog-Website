import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      if (!name) {
        toast.error('Name is required');
      }
      if (!email) {
        toast.error('Email is required');
      }
      if (!phone) {
        toast.error('Phone number is required');
      }
      if (!message) {
        toast.error('Message is required');
      }
      return;
    }
    // Reset form fields after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    // Simulate form submission or send data to the server
    // You can add your submission logic here
    toast.success("Form submitted successfully!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="mb-4">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <p>
              Want to get in touch? Fill out the form below to send me a message
              and I will get back to you as soon as possible!
            </p>
            <div className="my-5">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Enter your email..."
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number..."
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Enter your message here..."
                    style={{ height: "12rem" }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                <button className="btn btn-primary text-uppercase" type="submit">
                  Send
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
