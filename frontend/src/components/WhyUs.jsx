import React from "react";

import { BiSolidFirstAid } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";

function WhyUs() {
  return (
    <div className=" w-full md:py-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center h-full lg:px-6 lg:justify-center px-3 py-3">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center">
          What we do
        </h1>
        <p className="text-xs md:text-lg md:max-w-4xl mt-3 text-center text-black/60 font-bold">
          We understand that your health and well-being are of paramount
          importance. By choosing our platform, you'll benefit from streamlined appointment booking processes, saving you valuable time and effort
          Our user-friendly interface ensures a hassle-free experience, from scheduling appointments to managing virtual queues.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 md:gap-y-10 gap-y-4 mt-12 md:mt-14 lg:mt-20">
          
          {/* Doctors card */}
          <div className="bg-white flex items-center shadow-md my-4 rounded-md md:px-4 hover:shadow-xl hover:border border-theme py-4">
            <div className="flex items-start gap-x-4 py-2 ">
              <div>
                <FaUserDoctor className="size-16 text-white bg-secondary rounded-full px-4 py-4" />
              </div>
              <div className="text">
                <h1 className="mb-2 text-md text-left font-semibold uppercase text-primary">
                   Multi-Hospital & Doctors
                </h1>
                <p className="mt-0 text-sm text-left">
                Our platform supports multiple hospitals and doctors, allowing for seamless
                 management of appointments and queues across different locations and practitioners.
                </p>
              </div>
            </div>
          </div>
          {/* Ambulance card */}
          <div className="bg-white flex items-center shadow-md my-4 rounded-md md:px-4 hover:shadow-xl hover:border border-theme py-4">
            <div className="flex items-start gap-x-4 py-2 ">
              <div>
                <FaUserDoctor className="size-16 text-white bg-secondary rounded-full px-4 py-4" />
              </div>
              <div className="text">
                <h1 className="mb-2 text-md text-left font-semibold uppercase text-primary">
                  Online Appointment Booking
                </h1>
                <p className="mt-0 text-sm text-left ">
                Enable patients to book appointments online, providing them with 
                convenience and reducing administrative workload for your staff.
                </p>
              </div>
            </div>
          </div>
          {/* Aid card  */}
          <div className="bg-white flex items-center shadow-md my-4 rounded-md md:px-4 hover:shadow-xl hover:border border-theme py-4">
            <div className="flex items-start gap-x-4 py-2 ">
              <div className="icon">
                <BiSolidFirstAid className="size-16 text-white bg-secondary rounded-full px-4 py-4" />
              </div>

              <div className="text">
                <h1 className="mb-2 text-md text-left font-semibold uppercase text-primary">
                  Virtual Queue Management
                </h1>
                <p className="mt-0 text-sm text-left">
                Manage patient queues, reduce wait times, and enhance overall patient experience with our innovative real-time virtual QMS.
                </p>
              </div>
            </div>
          </div>
          {/* Ambulance card */}
          <div className="bg-white flex items-center shadow-md my-4 rounded-md md:px-4 hover:shadow-xl hover:border border-theme py-4">
            <div className="flex items-start gap-x-4 py-2 ">
              <div>
                <FaUserDoctor className="size-16 text-white bg-secondary rounded-full px-4 py-4" />
              </div>
              <div className="text">
                <h1 className="mb-2 text-md text-left font-semibold uppercase text-primary">
                  Real-Time Syncronisation
                </h1>
                <p className="mt-0 text-sm text-left ">
                  Keep all stakeholders informed with real-time updates on queue status and 
                  appointment schedules, ensuring smooth and efficient operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
