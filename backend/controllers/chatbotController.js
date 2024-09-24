export const chatWithAI = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await sendMessageToGemini(message); // Assume a function to handle this
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
