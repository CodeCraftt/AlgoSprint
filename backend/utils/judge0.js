// /utils/judge0.js
import axios from "axios";

// Function to submit code for execution
export async function submitCodeForExecution(sourceCode, languageId, stdin) {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", wait: "false" }, // Adding base64_encoding to the request
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: languageId,
      source_code: Buffer.from(sourceCode).toString("base64"), // Base64 encode the source code
      stdin: Buffer.from(stdin).toString("base64"), // Base64 encode the stdin input
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.token; // Return the token to fetch the result later
  } catch (error) {
    console.error("Error submitting code for execution:", error.message);
    throw new Error("Error executing code");
  }
}

// Function to retrieve the execution result
export async function getExecutionResult(token) {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true", // Ensuring response data is base64 encoded
      fields: "*", // Fetching all fields
    },
    headers: {
      "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // Decode the base64-encoded response data
    const result = {
      stdout: Buffer.from(response.data.stdout || '', 'base64').toString('utf-8'),
      stderr: Buffer.from(response.data.stderr || '', 'base64').toString('utf-8'),
      compile_output: Buffer.from(response.data.compile_output || '', 'base64').toString('utf-8'),
      status: response.data.status.description,
      time: response.data.time,
      memory: response.data.memory
    };
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error retrieving execution result:", error.message);
    throw new Error("Error retrieving result");
  }
}
