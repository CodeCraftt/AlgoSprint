export const getFeedback = async (req, res) => {
    try {
        const feedback = await getFeedbackFromGemini(req.body.submittedCode); // Assume a function to get feedback
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
