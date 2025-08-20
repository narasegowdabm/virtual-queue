import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Navbar } from "../import-export/ImportExport";
import axios from "axios";
import '../style-sheet/buttons.css';

function AllDoctors() {
    const [searchQuery, setSearchQuery] = useState("");
    const [specializationQuery, setSpecializationQuery] = useState("All");
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    
    const specialization = [
        { name: 'All' },
        { name: 'Cardiology' },
        { name: 'Pediatrics' },
        { name: 'Neurology' },
        { name: 'Dermatology' },
        { name: 'Orthopedics'}
    ];

    useEffect(() => {
        const getFilteredDoctors = async () => {
            try {
                let url = `http://localhost:5500/doctor/search?`;
                if (searchQuery !== "") {
                    url += `query=${searchQuery}&`;
                }
                if (specializationQuery !== "All") {
                    url += `specializations=${specializationQuery}`;
                }

                const response = await axios.get(url);
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        getFilteredDoctors();
    }, [searchQuery, specializationQuery]);
    
    return (
        <div>
            <Navbar />
            <div className=" ">
                {/* search bar */}

                <div className="w-3/4 mx-auto my-8">
                    
                    <div class="flex w-full justify-center">
                        <select value={specializationQuery}
                        onChange={(e) => setSpecializationQuery(e.target.value)} className='bg-slate-100 rounded-tl-lg rounded-bl-lg cursor-pointer'>
                            <option value="All" className="p-2">All</option>
                            <option value="Cardiology" className="p-2">Cardiology</option>
                            <option value="Pediatrics" className="p-2">Pediatrics</option>
                            <option value="Neurology" className="p-2">Neurology</option>
                            <option value="Dermatology" className="p-2">Dermatology</option>
                            <option value="Orthopedics" className="p-2">Orthopedics</option>
                        </select>
                        <input type="text"  onChange={(e) => setSearchQuery(e.target.value)}  value={searchQuery} className="bg-white pl-2 text-base font-semibold w-3/4" placeholder="search doctors" />
                        <button type="submit" className="bg-secondary p-2 rounded-tr-lg rounded-br-lg text-white font-semibold">Search</button>
                    </div>
                
                </div>
                {/* Doctors list */}
                <div className="mx-4 lg:w-3/4 lg:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <div key={doctor._id} className="border rounded-md shadow-lg shadow-secondary p-2 m-3 bg-white ">
                        <img className="rounded-tl-lg rounded-tr-lg" src="/Image.png" alt={doctor.fullname} />

                        <div className="flex flex-col p-4">
                            <h3 className="text-xl font-semibold">Dr. {doctor.fullname}</h3>
                            <span className="flex items-center">
                                <img src="/healthcare-occupation.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.qualifications}
                            </span>
                            <span className="flex items-center">
                                <img src="/healthcare-specialisation.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.specializations}
                            </span>
                            <span className="flex items-center">
                                <img src="/hospital-building.svg" alt="icon" className="w-8 h-8 m-2" />
                                {doctor.hospitalname}
                            </span>
                        </div>
                        <div className="flex justify-end p-4">
                            <button onClick={() => navigate(`/doctors/${doctor._id}`)} className="button2">Proceed</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
           
        </div>
    );
}

export default AllDoctors;
