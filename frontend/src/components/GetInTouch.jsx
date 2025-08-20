import React, { useState } from "react";
import axios from 'axios';
import {Feedback} from '../import-export/ImportExport'
import '../style-sheet/buttons.css';

function GetInTouch() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full px-2">
      <div className=" max-w-7xl mx-auto flex flex-col items-center px-2 md:px-4">

        <h1 className="my-4 text-3xl md:text-4xl font-bold tracking-tight text-primary text-center">
          Get In Touch With Us
        </h1>

        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                title="map"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=16.155041,76.519920(My%20Business)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
              ></iframe>
              <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                  <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                  <a href="mailto:example@email.com" className="text-indigo-500 leading-relaxed">example@email.com</a>
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                  <p className="leading-relaxed">123-456-7890</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white flex flex-col p-6 mt-5 rounded-md">
              <h2 className="text-secondary font-semibold text-xl mb-1 ">Feedback</h2>
              <form onSubmit={handleSubmit}>
                <div className=" mb-4">
                  <label htmlFor="firstName" className="leading-7 text-sm text-gray-600">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" "
                  />
                </div>
                
                <div className=" mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" "
                  />
                </div>
                <div className=" mb-4">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=""
                  />
                </div>
                <div className="border rounded-md border-dashed border-secondary mb-4">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white rounded "
                  ></textarea>
                </div>
                <button type="submit" className="button2">Submit</button>
              </form>
              <Feedback />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default GetInTouch;
