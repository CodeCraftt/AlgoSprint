import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../style.js';
import Loader from './Loader.jsx';
import { RiRobot2Line } from "react-icons/ri";
import { VscRobot } from "react-icons/vsc";
import { BsSend } from "react-icons/bs";

const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Function to format the bot response (convert '\n' and '**' formatting)
  const formatBotResponse = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)|\n/); // Split by bold text (**text**) and new lines (\n)
    return parts.map((part, index) => {
      if (part?.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>; // Render bold text
      } else if (part === '') {
        return <br key={index} />; // Render empty string for multiple line breaks
      } else if (part === '\n' || part === '') {
        return <br key={index} />; // Render line breaks
      } else {
        return <span key={index}>{part}</span>; // Render normal text
      }
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage) return;

    // Add user message to chat history
    const newChatHistory = [...chatHistory, { type: 'user', text: userMessage }];
    setChatHistory(newChatHistory);
    setLoading(true);

    try {
      // Call Google Gemini API
      const apiKey = APIKEY; // Replace with your API key
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: userMessage }]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Add bot response to chat history
      const botMessage = response.data.candidates[0].content.parts[0].text;

    console.log(botMessage);
    

      // Format the bot's message before adding to chat
      setChatHistory([...newChatHistory, { type: 'bot', text: formatBotResponse(botMessage) }]);
    } catch (error) {
      console.error('Error fetching response from Gemini API', error);
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="bg-primary  w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <h1 className="text-gradient text-center text-2xl font-bold font-poppins  ">Algo Sensei <VscRobot className="text-white inline-block ml-2 text-[50px] -translate-y-1" /></h1>

      <div className="bg-primary px-2 font-poppins flex justify-center items-center min-h-[90vh]">
        <div className="bg-slate-900 rounded-lg shadow-lg p-6 max-w-5xl w-full">
          <div className="overflow-y-auto example rounded-lg flex flex-col max-h-[58vh] mb-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`p-3 my-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white self-end  text-end inline-block'
                    : 'bg-slate-300 opacity-60 text-gray-900 self-start'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {loading && <div className="text-center text-gray-500 my-2"><Loader/></div>}

          <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-4">
            <input
              type="text"
              value={userMessage}
              onChange={handleInputChange}
              className="ss:flex-grow w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
            >
              <BsSend className='font-bold text-2xl'/>
            </button>
          </form>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Chat;
