import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader.jsx"; // Assuming you have a loader component
import defaultCode from "../utils/defaultCode.jsx"; // Import default code from the new file
import "./submit.css";
import styles from "../style.js";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

// Language mapping for Judge0 API
const languageMapping = {
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
};

const Submit = () => {
  const { id } = useParams(); // Problem ID from URL
  const [language, setLanguage] = useState("python"); // Default language
  const [code, setCode] = useState(""); // User code
  const [customInput, setCustomInput] = useState(""); // Custom input from the user
  const [output, setOutput] = useState(""); // Output display
  const [loading, setLoading] = useState(false); // Loader for API calls
  const {user}=useContext(AuthContext);
  const [sampleTestCase, setSampleTestCase] = useState({
    input: "",
    output: "",
  }); // Sample test case

  useEffect(() => {
    // Fetch problem details on page load
    const fetchProblemDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/problems/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSampleTestCase(data.testCases);

        // Load default code from local storage if exists, otherwise use default from the imported file
        const savedCode = localStorage.getItem(`code-${language}`);
        setCode(savedCode || defaultCode[language]); // Use the default code from the local frontend file
        setCustomInput(data.testCases.input); // Set sample input for the custom input box
      } catch (error) {
        toast.error("Failed to fetch problem details.");
      }
    };
    fetchProblemDetails();
  }, [id, language]);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput(""); // Reset output before running code
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/code-execution/run",
        {
          sourceCode: code,
          languageId: languageMapping[language], // Use languageId from mapping
          stdin: customInput || "", // Send custom input if provided
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      setOutput(data.stdout || data.stderr);

    } catch (err) {
      toast.error("Failed to run the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    try {
      console.log("hellow");
      
      const { data } = await axios.post(
        `http://localhost:5000/api/submissions/${id}/submit`,
        {
          stdin: customInput || "",
          userId:user.userId,
          sourceCode: code,
          languageId: languageMapping[language], // Use languageId from mapping
          
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      
      toast.success(data.verdict || "Submission complete");
    } catch (err) {
      console.log(err);
      
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value);
    localStorage.setItem(`code-${language}`, value); // Auto-save code in local storage
  };

  return (
    <>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <div className="problem-solving-page">
              {/* Layout for large and small screens */}
              <div className="content-container">
                {/* Left Side - Input and Output */}
                <div className="left-section font-poppins text-white">
                  {/* Custom Input */}
                  <div className="mt-8">
                    <h3 className="mb-4 font-semibold">Custom Input</h3>
                    <textarea
                      value={customInput}
                      className="w-[100%] resize-none ss:w-[95%] bg-slate-800 px-3 py-2 outline-none rounded-lg overflow-auto h-[25vh]"
                      onChange={(e) => setCustomInput(e.target.value)}
                    />
                  </div>

                  {/* Output Section */}
                  <div className="my-6">
                    <h3 className="font-semibold">Output</h3>
                    <div className="mt-3 w-[100%] ss:w-[95%] bg-slate-800 px-3 py-2 outline-none rounded-lg overflow-auto h-[15vh]">
                      {loading ? <Loader /> : <pre>{output}</pre>}
                    </div>
                  </div>
                </div>

                {/* Right Side - Code Editor */}
                <div className="right-section">
                  <div className="mb-5 text-white font-poppins">
                    <label>
                      <span className="mr-4">Select Language:</span>
                      <select
                        className="bg-slate-800 px-2 py-2 rounded-md"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                      </select>
                    </label>
                  </div>
                  <MonacoEditor
                    height="60vh"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    className="overflow-hidden rounded-lg border-2 border-gray-600"
                  />
                  <div className="top-bar mt-5">
                    {/* Buttons */}
                    <button
                      className="run-button font-semibold"
                      onClick={handleRunCode}
                    >
                      Run Code
                    </button>
                    <button
                      className="submit-button font-semibold"
                      onClick={handleSubmitCode}
                    >
                      Submit Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Submit;
