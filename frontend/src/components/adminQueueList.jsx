import React, {useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {toast} from 'react-hot-toast';

const socket = io.connect("http://localhost:5500");

const AdminQueueList = ({ bookings, setBookings }) => {

useEffect(() => {
    socket.on('appointmentUpdated', (updatedAppointment) => {
        setBookings(prevBookings =>
        prevBookings.map(booking =>
            booking._id === updatedAppointment._id ? updatedAppointment : booking
        )
        );
    });

    return () => {
        socket.off('appointmentUpdated');
    };
}, [setBookings]);

const handleMarkCompleted = async (patientId) => {
   try{
     const response = await axios.put(`http://localhost:5500/appointment/update/patient/status/${patientId}`);
     // this is not actually patientId, it is booking Id
     toast.success("Token marked completed");
   }catch(error){
      console.log(error);
   }
}

return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-md mx-4 lg:w-3/4 lg:mx-auto">
        <h3 className="text-xl text-center font-semibold mb-4">Today's Patient Details</h3>
        <div className='overflow-x-auto'>
        <table className=" min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Patient Name</th>
                    <th className="py-2 px-4 border-b">Contact</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{booking.patientName}</td>
                        <td className="py-2 px-4 border-b">{booking.contact}</td>
                        <td className="py-2 px-4 border-b">{booking.status}</td>
                        <td className="py-2 px-4 border-b text-center">
                            <button
                                className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                                onClick={() => handleMarkCompleted(booking._id)}
                                disabled = {booking.status}
                            >
                            {booking.status === 'Completed' ? '----' : 'Mark Completed'}   
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            
        </table>
        </div>
    </div>
);
}

export default AdminQueueList;
