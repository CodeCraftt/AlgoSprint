import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar, Footer } from "../components";
import styles from "../style.js";
import Button from "./Button.jsx";

const ProblemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedHint, setExpandedHint] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/problems/${id}`
        );
        if (!response.ok) {
          throw new Error("Problem not found");
        }
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const toggleHint = (index) => {
    setExpandedHint(expandedHint === index ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  return (
    <div className="bg-primary flex flex-col min-h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter} flex-grow`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <h1
        className={` text-gradient text-center text-3xl font-bold font-poppins mb-4  ${styles.paddingX}`}
      >
        {problem.title}
      </h1>

      <div
        className={`text-white p-4 font-poppins rounded-lg mt-8 shadow-lg ${styles.paddingX}`}
      >
        <h3 className="font-semibold mb-6">
          Difficulty:{" "}
          <span
            className={`${
              difficultyColors[problem.difficulty]
            } text-white hover:opacity-80 py-1 px-2 rounded-full font-thin ml-2`}
          >
            {problem.difficulty}
          </span>
        </h3>

        <div className="flex justify-between flex-wrap">
          <div className="flex gap-5">
            <h4>Upvotes: {problem.upvotes}</h4>
            <h4>Downvotes: {problem.downvotes}</h4>
          </div>
          <h4 className="mt-4">
            Created On: {new Date(problem.createdOn).toLocaleDateString()}
          </h4>
        </div>

        <h1 className="text-xl mt-8 font-bold mb-5 ">Description </h1>
        <p className="mb-16">{problem.description}</p>

        <Link to={`/problems/${id}/submit`}>
          <button
            type="button"
            className={`py-2 px-4 mb-10 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
          >
            Attempt
          </button>
        </Link>

        {problem.testCases && problem.testCases.length > 0 && (
          <div className="mb-16">
            <h4>Test Cases:</h4>
            {problem.testCases.map((testCase, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded my-2 shadow-lg"
              >
                <p className="text-green-400">Input: {testCase.input}</p>
                <p className="text-red-400">Output: {testCase.output}</p>
              </div>
            ))}
          </div>
        )}

        {/* {problem.solution && <h4 className="mt-4">Solution: {problem.solution}</h4>}
         */}
        <h4 className="mb-6">
          Tags:{" "}
          <span className="ml-3">
            {problem.tags.map((tag, index) => (
              <span
                key={index}
                className={`mr-2 bg-blue-500  hover:opacity-80 text-white px-2 py-1 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </span>
        </h4>
        <h4 className="mt-2">
          Company Names:
          <span className="ml-3">
            {problem.companyNames.length > 0 ? (
              problem.companyNames.map((c, index) => (
                <span
                  key={index}
                  className={`mr-2 bg-gray-700 font-bold hover:opacity-80 text-white px-2 py-1 rounded-full`}
                >
                  {c}
                </span>
              ))
            ) : (
              <span>No information</span>
            )}
          </span>
        </h4>

        <h4 className="mt-4">Hints:</h4>
        {problem.hints.map((hint, index) => (
          <div key={index}>
            <button
              className="flex justify-between items-center bg-gray-700 text-white w-full p-2 rounded my-1"
              onClick={() => toggleHint(index)}
            >
              <span>Hint {index + 1}</span>
              <span>{expandedHint === index ? "▲" : "▼"}</span>
            </button>
            {expandedHint === index && (
              <div className="bg-gray-800 p-2 rounded mb-2">{hint}</div>
            )}
          </div>
        ))}
      </div>

      <div
        className={`bg-primary mt-20 ${styles.paddingX} ${styles.flexCenter}`}
      >
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
