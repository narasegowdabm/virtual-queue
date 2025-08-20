import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Announcement = ({doctorId, checkAdmin}) => {
    
    const [announcementText, setAnnouncementText] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try{
                const response = await axios.get(`http://localhost:5500/doctor/announcements/${doctorId}`);
                setAnnouncements(response.data);
            }catch(error){
              console.error('Error fetching announcement:', error);
            }
        }
        fetchAnnouncement();
    },[showAddModal]);
    
    const addAnnouncement = async () => {
        try {
            await axios.post(`http://localhost:5500/doctor/addAnnouncement/${doctorId}`, { announcement: announcementText });
            setAnnouncementText('');
            setShowAddModal(false);
            
        } catch (error) {
            console.error('Error adding announcement:', error);
        }
    };

   return (
    <div>
        <span className="flex items-center font-bold text-center ">
            Announcements
            <img src="/announcement.svg" alt="icon" className="w-8 h-8 m-2" />
        </span>
        {announcements.length === 0 ? (
            <p>No Announcements so far....</p>
        ) : (
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement._id}>{announcement.announcement}</li>
                ))}
            </ul>
        )}
        {checkAdmin && 
            <>
            <img
            src="/add-icon.svg"
            alt="icon"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowAddModal(true)}
            />
            {showAddModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <textarea
                            value={announcementText}
                            onChange={(e) => setAnnouncementText(e.target.value)}
                            placeholder="Enter today's announcement here"
                            className="w-full h-24 resize-none border border-gray-300 rounded mb-2 p-2"
                        />
                        <button onClick={addAnnouncement} className="button2">
                            Add Announcement
                        </button>
                        <button onClick={() => setShowAddModal(false)} className="ml-2 px-4 py-2 rounded text-gray-600 hover:bg-slate-300">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            </>  
            }
                
    </div>
  )
}

export default Announcement;