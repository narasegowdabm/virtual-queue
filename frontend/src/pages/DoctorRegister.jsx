import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { GrBook, GrAchievement } from "react-icons/gr";
import { FaRegAddressBook, FaRegHospital } from "react-icons/fa";
import {Navbar, Loader, LoginPrompt} from "../import-export/ImportExport";
import {toast} from 'react-hot-toast';
import '../style-sheet/checkbox.css';
import '../style-sheet/buttons.css';

function DoctorRegister() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    
    const [formData, setFormData] = useState({
        userId: userId,
        fullname: '',
        hospitalname: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        specializations: '',
        qualifications: '',
        availability: []
    });

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await axios.get('http://localhost:5500/user/authCheck', { withCredentials: true });
            if(response.status === 200){
                setIsAuthenticated(true);
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user.id); 
                setFormData(prevFormData => ({
                    ...prevFormData,
                    userId: userId
                }));
            }
          } catch (error) {
            // u can print any error here to debug
          } finally {
            setLoader(false);
          }
        };
        checkAuth();
    }, []);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const initialAvailability = daysOfWeek.map(day => ({ day, available: false, start: '', end: '' }));

    const [availability, setAvailability] = useState(initialAvailability);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
        setAvailability(updatedAvailability);
    };

    const handleCheckboxChange = (index) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index].available = !updatedAvailability[index].available;
        setAvailability(updatedAvailability);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const selectedAvailability = availability
            .filter(slot => slot.available && slot.start && slot.end)
            .map(slot => ({ day: slot.day, start: slot.start, end: slot.end }));
        
        try {
            const response = await axios.post('http://localhost:5500/doctor/register', {
                ...formData,
                availability: selectedAvailability
            });
            setLoader(false);
            toast.success("Doctor Registered Successfully");
            navigate('/');
        } catch (error) {
            setLoader(false);
            toast.error("Error in Registering Doctor");
            console.error('Error registering doctor:', error);
        }
    };

    if(loader){
        return <Loader />
    }
    if (!isAuthenticated) {
        return <LoginPrompt />;
    }

    return (
      <>
      <Navbar />
        <div className=" mx-5 lg:w-3/5 lg:mx-auto bg-secondary shadow-md rounded p-5 my-10 text-white">
            <h2 className="text-2xl font-bold mb-4">Doctor Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='left-box mr-4'>
                    <div>
                        <label htmlFor="fullname" className=" font-bold mb-2 flex items-center">
                            <AiOutlineUser className="mr-2" /> Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            placeholder="Dr. XYZ"
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150"
                        />
                    </div>
                    <div>
                        <label htmlFor="hospital" className="font-bold mb-2 flex items-center">
                            <FaRegHospital className="mr-2" /> Hospital Name
                        </label>
                        <input 
                            type="text" 
                            id="hospital" 
                            name="hospitalname" 
                            value={formData.hospitalname} 
                            onChange={handleChange} 
                            required 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150" />
                    </div>
                    <div>
                        <label htmlFor="email" className=" font-bold mb-2 flex items-center">
                            <AiOutlineMail className="mr-2" /> Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150" />
                    </div>
                    <div>
                        <label htmlFor="phone" className=" font-bold mb-2 flex items-center">
                            <AiFillPhone className="mr-2" /> Contact No
                        </label>
                        <input 
                            type="text" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required minLength="10" maxLength="10" 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150" />
                    </div>
                    <div>
                        <label htmlFor="address" className=" font-bold mb-2 flex items-center">
                            <FaRegAddressBook className="mr-2" /> Hospital Address
                        </label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150" />
                    </div>
                    <div>
                        <label htmlFor="gender" className=" font-bold mb-2 flex items-center">
                            Gender
                        </label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input type="radio" name="gender" value="Male" onChange={handleChange} className="mr-2 w-5 h-5" /> 
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" onChange={handleChange} className="mr-2 w-5 h-5" />
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                <div className='right-box sm:ml-4'>
                    <div>
                        <label htmlFor="specializations" className="font-bold mb-2 flex items-center">
                            <GrAchievement className="mr-2" /> Specialization
                        </label>
                        <input 
                            type="text" 
                            id="specializations" 
                            name="specializations" 
                            value={formData.specializations} 
                            onChange={handleChange} 
                            required 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150" 
                            placeholder="e.g., Cardiology, Neurology" />
                    </div>
                    <div>
                        <label htmlFor="qualifications" className= "font-bold mb-2 flex items-center">
                            <GrBook className="mr-2" /> Qualifications
                        </label>
                        <textarea 
                            id="qualifications" 
                            name="qualifications" 
                            value={formData.qualifications} 
                            onChange={handleChange} 
                            required 
                            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition ease-in-out duration-150">
                        </textarea>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Available On</h3>
                        {availability.map((slot, index) => (
                            <div key={index} className="flex mb-2">
                                <label className="container w-4 mr-2">
                                    <input checked={slot.available} type="checkbox" onChange={() => handleCheckboxChange(index)}/>
                                    <div className="checkmark"></div>
                                </label>
                                <label className="mr-2">{slot.day}</label>
                                {slot.available && (
                                    <>
                                    <label>From </label><input type="time" value={slot.start} onChange={(e) => handleAvailabilityChange(index, 'start', e.target.value)} className="rounded mx-2 pl-2 text-black" />
                                    <label>To </label><input type="time" value={slot.end} onChange={(e) => handleAvailabilityChange(index, 'end', e.target.value)} className="rounded mx-2 pl-2 text-black" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button type="submit" className="button2">Register</button>
            </form>
        </div>
        </>
    );
}

export default DoctorRegister;




