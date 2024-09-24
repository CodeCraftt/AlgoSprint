// /controllers/codeExecutionController.js
import {submitCodeForExecution,getExecutionResult} from "../utils/judge0.js";

// Run the code and get the result
export const runCode = async (req, res) => {
    try {
        const { sourceCode, languageId, stdin } = req.body;
        const token = await submitCodeForExecution(sourceCode, languageId, stdin);

        // Poll for the result (can be optimized to wait)
        setTimeout(async () => {
            const result = await getExecutionResult(token);
            res.status(200).json(result);
        }, 3000); // Wait 3 seconds before fetching the result
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
