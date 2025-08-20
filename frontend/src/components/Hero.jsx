import React from "react";
import ReactTypingEffect from 'react-typing-effect';
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-96 bg-[url('/doctor-here.jpg')] bg-cover bg-no-repeat">
      
        <div className="h-full flex flex-col justify-center px-6 py-3 text-center lg:text-left mb-8 lg:mb-0 sm:ml-10">
         
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black/60 py-2">
            Streamlining{' '}
            <ReactTypingEffect
            text={['Healthcare']}
            speed={200}
            eraseSpeed={200}
            typingDelay={1000}
            eraseDelay={1000}
            />
          
            <br />
            <span className="text-secondary">With</span>
            <br />
            <span className="text-secondary">Real-Time Queue</span>
            </h1>

            <div className="flex flex-col items-center md:flex-row gap-2">
              <NavLink to="/alldoctors">
              <button className="flex items-center rounded-full px-4 py-3 text-sm font-semibold shadow-sm hover:shadow-lg bg-primary hover:bg-secondary text-text mt-4">
                  <img
                    src="/patient-icon.svg"
                    alt="icon"
                    className="w-8 h-8 mr-3"
                  />
                  Book Appointment
                  <IoIosArrowForward className="" />
              </button>
              </NavLink>
              <NavLink to="/register/doctor">
              <button className="flex items-center rounded-full px-4 py-3 text-sm font-semibold shadow-sm hover:shadow-lg bg-primary hover:bg-secondary text-text mt-4">
                  <img
                    src="https://images.apollo247.in/images/ic-doctor.svg"
                    alt="icon"
                    className="w-8 h-8 mr-3"
                  />
                  Register Doctor
                  <IoIosArrowForward className="" />
              </button>
              </NavLink>
            </div>

          </div>
    </div>
  );
}

export default Hero;
