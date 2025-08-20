import React, {useState} from 'react'
import axios from 'axios'
import {Loader, LoginPrompt} from '../import-export/ImportExport'
import {toast} from 'react-hot-toast';
import '../style-sheet/buttons.css';

function Booking (props) {

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      return <LoginPrompt />;
  }
  
  const [loader, setLoader] = useState(false);

  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    age: '',
    gender: '',
    contact: '',
    bookedBy: user?.userId
  });

  const handleBooking = async () => {
    setLoader(true);

    try {
        
        const response = await axios.get('http://localhost:5500/user/authCheck', { withCredentials: true });

        if(response.status === 200){
            const response = await axios.post('http://localhost:5500/appointment/bookAppointment', {
              doctorId: props.doctorId,
              ...patientDetails,
            });
          
            toast.success("Booked successfully");
        }
        
    } catch (error) {

        toast.error("Session Expired");
        console.error('Session Expired booking appointment:', error);

    } finally {
        setLoader(false);
        props.onBookingSuccess();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  if(loader){
    return (
      <Loader />
    );
  }
  return (
    <>
    <div className="relative bg-white shadow-lg rounded-lg p-4 mx-4 lg:w-3/4 lg:mx-auto border-2 border-secondary">
      <button 
      className="absolute top-1 right-4 text-gray-700 hover:bg-slate-300 text-4xl"
      onClick={props.onClose}>&times;</button>
      <h3 className="text-xl text-center font-semibold mb-4">Book Appointment</h3>
      <div className="grid grid-cols-1 gap-4">
      <input
        type="text"
        name="patientName"
        value={patientDetails.patientName}
        onChange={handleChange}
        placeholder="Patient Name"
        className="p-2 bg-gray-100 border-0 rounded"
      />
      <input
          type="number"
          name="age"
          value={patientDetails.age}
          onChange={handleChange}
          placeholder="Patient Age"
          className="p-2 rounded bg-gray-100 border-0"
      />
      <select
        name="gender"
        value={patientDetails.gender}
        onChange={handleChange}
        className="p-2 bg-gray-100 border-0 rounded"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      </select>
      <input
        type="text"
        name="contact"
        value={patientDetails.contact}
        onChange={handleChange}
        placeholder="Contact Number"
        className="p-2 rounded bg-gray-100 border-0"
      />
      <button onClick={handleBooking} className="button2 ">
          Book Appointment
      </button>
    </div>
  </div>
</>
  );
}

export default Booking;