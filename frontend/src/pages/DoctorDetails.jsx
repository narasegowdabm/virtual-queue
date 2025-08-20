import React, { useEffect, useState } from 'react';
import { Navbar, Booking, Queue, AdminQueueList, Announcement, Loader } from "../import-export/ImportExport";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import '../style-sheet/buttons.css';

function DoctorDetails () {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const [loader, setLoader] = useState(true);

    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null); // To store doctor details
    const [bookingForm, setBookingForm] = useState(false); // To show the booking form
    const [bookings, setBookings] = useState([]); // To store the booking's list for queue
    const [isAvailable, setIsAvailable] = useState(false); // To check availability of doctor
    const [checkAdmin, setCheckAdmin] = useState(false); // To Checking whether logged user is admin
    const [userBooked, setUserBooked] = useState(false);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/doctor/getInfo/${doctorId}`,  { withCredentials: true });
                setDoctor(response.data);
                checkAvailability(response.data.availability);
                setCheckAdmin(response.data.admin);
                setLoader(false);
            } catch (error) {
                setLoader(false);
                console.error('Error fetching doctor details:', error);
            }
        };
        fetchDoctorDetails();
    }, [doctorId, bookingForm]);
    
    useEffect(() => {
        const fetchAllBookings = async () => {
          try {
            const response = await axios.get(`http://localhost:5500/appointment/getQueueList/${doctorId}/${user?.userId}`);
            setBookings(response.data);
            console.log(response.data)
            setUserBooked(true);
          } catch (error) {
            console.log("Getting Error here ");
            console.error('Error fetching queue details:', error);
          }
        };
        fetchAllBookings();
      }, [bookingForm]);

    const checkAvailability = (availability) => {
        const now = new Date();
        const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        for (const timeSlot of availability) {
            if (timeSlot.day === currentDay) {
                if (currentTime >= timeSlot.start && currentTime <= timeSlot.end) {
                    setIsAvailable(true);
                    return;
                }
            }
        }
        setIsAvailable(false);
    };

    const handleBookingClick = async () => {

        try {
            const response = await axios.get('http://localhost:5500/user/authCheck', { withCredentials: true });
            setBookingForm(true);
        }catch(error) {
            if (error.response && error.response.status === 401) {
                toast.error("Login to Book!!");
            } else {
                toast.error("Unknown error .");
            }
        }
    }

    const handleBookingSuccess = () => {
        setBookingForm(false); 
    };

    const handleBookingClose = () => {
        setBookingForm(false);
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(':');
        const period = +hours < 12 ? 'AM' : 'PM';
        const hour = +hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${hour}:${minutes} ${period}`;
    };
    
    if(loader){
        return (
          <Loader />
        );
    }

    return (
        <>
        <Navbar />
        <div className="my-10 rounded-md p-5 flex flex-col sm:flex-row lg:w-3/4 mx-auto bg-secondary">

            <div className='left-box mb-6 mx-4 lg:w-1/2'>
                <div className="bg-white shadow-lg rounded-lg p-4 mb-2 flex flex-col">
                    <div className='flex mb-4'>
                        <img className="w-24 h-24 rounded-full mr-4" src="/team-2.jpg" alt={doctor.fullname} />
                        <div>
                            <h2 className="text-2xl font-extrabold mb-4">Dr. {doctor.fullname}</h2>
                            <p><span className='font-bold'>Qualification :</span> {doctor.qualifications}</p>
                            <p><span className='font-bold'>Specialist :</span> {doctor.specializations}</p>
                        </div>
                    </div>
                    <div>
                        <p><span className='font-bold'>Contact  :</span> {doctor.phone}</p>
                        <p><span className='font-bold'>Hospital  :</span> {doctor.hospitalname}</p>
                        <p><span className='font-bold'>Address :</span> {doctor.address}</p>
                    </div>
                    
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4">
                    <Announcement doctorId={doctorId} checkAdmin={checkAdmin}/>
                </div>

            </div>
        
            <div className="right-box bg-white shadow-md rounded p-4 mx-4 mb-6 lg:w-1/2">
                <span className="flex items-center text-xl font-semibold">
                Working hours
                <img src="/working-hours.svg" alt="icon" className="w-8 h-8 cursor-pointer" />
                </span>
                
                {doctor && doctor.availability &&(
                    <ul>
                        {doctor.availability.map((timeSlot, index) => (
                            <li key={index}>
                                <p>{timeSlot.day}</p>
                                <p>From: {convertTo12HourFormat(timeSlot.start)} To: {convertTo12HourFormat(timeSlot.end)}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {isAvailable ? (
                        <button
                            type="button"
                            className="button2 mt-4 z-0"
                            onClick={handleBookingClick}
                        >
                            Book
                        </button>
                    ) : (
                        <p className='text-center m-4'>Booking is Disabled for Now</p>
                    )}
            </div>

        </div>

        { bookingForm && <Booking doctorId={doctorId} onBookingSuccess={handleBookingSuccess} onClose={handleBookingClose} />}
        {checkAdmin && <AdminQueueList bookings={bookings} setBookings={setBookings}/> }
        { userBooked && <Queue bookings={bookings} setBookings={setBookings}/> }
        
       </>
    );
}

export default DoctorDetails;
