import React, { useState } from 'react';
import '../style-sheet/buttons.css';

const Feedback = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(feedback);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="btn btn-primary">Give Feedback</button>

      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
            <span className="text-gray-500 text-xl cursor-pointer" onClick={closeModal}>&times;</span>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  placeholder='Your valuable feedback or suggestion'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="button2">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
