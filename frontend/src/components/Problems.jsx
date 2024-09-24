import styles from "../style.js";
import { Navbar, Footer } from "../components";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'; // For navigation
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Problems = () => {
  const [problems, setProblems] = useState([]);  // All problems
  const [filteredProblems, setFilteredProblems] = useState([]);  // Filtered problems for display
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(AuthContext);  // Get user info from AuthContext
  const [filters, setFilters] = useState({
    company: "",
    difficulty: "",
    attempted: "",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 8;
  const navigate = useNavigate(); // Hook for redirecting

  useEffect(() => {
    // Check if the user is authenticated by looking for the token
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    // Fetch all problems
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems");
        setProblems(response.data);
        setFilteredProblems(response.data); // Initially show all problems
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    // Fetch solved problem status if the user is authenticated
    const fetchSolvedProblems = async () => {
      if (token && user) {
        const id = user.userId;

        let config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        try {
          // Fetch solved problems for this user
          const response = await axios.get(`http://localhost:5000/api/users/solvedproblems/${id}`, config);

          const solvedProblems = response.data;  // Array of solved problems

          // Map the problems to include the 'attempted' status
          const updatedProblems = problems.map((problem) => ({
            ...problem,
            attempted: solvedProblems.some((p) => p.problemId === problem._id),
          }));

          // setProblems(updatedProblems);
          // setFilteredProblems(updatedProblems); // Update the displayed problems
        } catch (error) {
          console.error("Error fetching solved problems:", error);
        }
      }
    };

    fetchProblems().then(fetchSolvedProblems); // Fetch problems first, then solved status
  }, [isAuthenticated, user]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      company: "",
      difficulty: "",
      attempted: "",
      search: "",
    });
  };

  // Apply filters
  useEffect(() => {
    let filtered = problems;

    // Apply company filter
    if (filters.company) {
      filtered = filtered.filter((problem) => problem.company === filters.company);
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter((problem) => problem.difficulty === filters.difficulty);
    }

    // Apply attempted filter
    if (filters.attempted) {
      filtered = filtered.filter(
        (problem) => (problem.attempted ? "Attempted" : "Not Attempted") === filters.attempted
      );
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter((problem) =>
        problem.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProblems(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters, problems]);

  // Pagination logic
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleProblemClick = (id) => {
    navigate(`/problems/${id}`); // Redirect to the problem page
  };
  

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <h1 className="text-gradient text-center text-2xl font-bold font-poppins">Problems List</h1>

      {/* Filters */}
      <div className="flex justify-center mt-4 space-x-4 mx-5 sm:mx-24 flex-wrap gap-y-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by title"
          className="px-3 py-1 bg-gray-800 text-white rounded"
        />
        <select
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          <option value="">All Companies</option>
          <option value="Google">Google</option>
          <option value="Amazon">Amazon</option>
          <option value="Facebook">Facebook</option>
        </select>
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          name="attempted"
          value={filters.attempted}
          onChange={handleFilterChange}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          <option value="">Attempted/Unattempted</option>
          <option value="Attempted">Attempted</option>
          <option value="Not Attempted">Not Attempted</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-6 overflow-x-auto mx-5 sm:mx-24 ">
        <table className="min-w-full table-auto text-white">
          <thead className="text-left border-b border-gray-600">
            <tr>
              <th className="px-4 py-3">Attempted</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentProblems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-800" onClick={() => handleProblemClick(problem._id)}>
                <td className="px-4 py-3">
                  {isAuthenticated
                    ? problem.attempted
                      ? "Attempted"
                      : "Not Attempted"
                    : "Not Attempted"}
                </td>
                <td className="px-4 py-3">{problem.title}</td>
                <td className="px-4 py-3 w-[14vw]">
                {problem.companyNames.map((it)=>{return <span className=" mr-2  px-3 pt-[6px] pb-[9px] rounded-2xl bg-slate-800">{it}</span>})}
                </td>
                  
                <td className="px-4 py-3">{problem.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-6 mb-20 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Problems;
