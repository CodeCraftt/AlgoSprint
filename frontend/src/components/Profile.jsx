import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader';
import toast from 'react-hot-toast';
import {people03} from '../assets';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // const user = JSON.parse(localStorage.getItem('user')); // Assuming user ID is stored in localStorage
  const {user} = useContext(AuthContext);
  // Fetch user profile information
  const fetchUserProfile = async () => {

    try {

        const { data } = await axios.get(
          `http://localhost:5000/api/users/profile/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      setUserProfile(data);
    } catch (error) {
      toast.error('Failed to fetch user profile.');
    }
  };

  // Fetch user submissions
  const fetchUserSubmissions = async () => {
    try {
      
      const { data } = await axios.get(
        `http://localhost:5000/api/submissions/user/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSubmissions(data);
      console.log(data);
      
    } catch (error) {
      toast.error('Failed to fetch user submissions.');
    }
  };

  useEffect(() => {
    // Fetch profile and submissions data on component mount
    Promise.all([fetchUserProfile(), fetchUserSubmissions()])
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />; // Show a loader while data is loading

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Profile Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} py-10`}>
        <div className={`${styles.boxWidth}`}>
          {userProfile && (
            <div className="text-white flex flex-col lg:flex-row items-center lg:items-start gap-10">
              {/* Profile Info */}
              
              <div className='w-full lg:w-1/3 flex flex-col gap-y-3'>

              <div className=" bg-slate-800  rounded-lg p-6 text-center ">
                <img
                  src={userProfile.profilePic || people03}
                  alt="Profile Pic"
                  className="w-32 h-32 rounded-full mx-auto  border-4 border-double border-primary "
                />
                <h2 className="mt-4 text-3xl font-semibold">{userProfile.username}</h2>
                <p className="text-gray-400">{userProfile.email}</p>

                <div className="mt-6">
                  <p className="font-semibold">Points: {userProfile.points}</p>
                  <p>Problems Solved: 
                    {userProfile.solvedProblems.length}
                  </p>
                </div>
              </div>

              <div className=" bg-slate-800  rounded-lg p-6 text-center ">
                <div className="mt-4">
                  <p>Current Streak: {userProfile.streak.current} days</p>
                  <p>Best Streak: {userProfile.streak.best} days</p>
                </div>
              </div>
              </div>

              {/* Submission History */}
              <div className="w-full lg:w-2/3 bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Submission History</h3>
                {submissions.length > 0 ? (
                  <div className='w-[full] overflow-x-auto '>
                    <table className=" w-full text-left text-sm text-gray-400">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="py-2">Problem Title</th>
                        <th className="py-2">Attempts</th>
                        <th className="py-2">Score</th>
                        <th className="py-2">Verdict</th>
                        <th className="py-2">Submitted On</th>
                      </tr>
                    </thead>

                   
                    
                    <tbody>
                      {submissions.map((submission) => (
                        <tr key={submission._id} className="border-b border-gray-700">
                          <Link to={`/problems/${submission.problemId._id}`}> <td className="py-2">{submission.problemId.title}</td> </Link>
                          <td className="py-2">{submission.attempts}</td>
                          <td className="py-2">{submission.score}%</td>
                          <td className="py-2">
                            {submission.isCorrect ? (
                              <span className="text-green-400">Correct</span>
                            ) : (
                              <span className="text-red-400">Partially Correct</span>
                            )}
                          </td>
                          <td className="py-2">{new Date(submission.submittedOn).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                ) : (
                  <p className="text-center">No submissions yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
