import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { FaComment, FaTimes, FaArrowLeft } from 'react-icons/fa';

const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showInitialOptions, setShowInitialOptions] = useState(true);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };
  
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: inputValue,
        isUser: true,
      },
    ]);

    setInputValue("");

    setTimeout(() => {
      if (selectedOption !== "") {
        if (selectedOption.toLowerCase() === "property") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 2,
              content: "Do you want to view the property details?",
              isUser: false,
              showOptions: true,
              showPropertyOptions: true,
            },
          ]);
          setShowOptions(true);
        } else if (selectedOption.toLowerCase() === "about us") {
          window.location.href = "/aboutUs";
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 2,
              content:
                "I'm sorry, I am just a demo chatbot and cannot provide real responses.",
              isUser: false,
              showOptions: true,
            },
          ]);
          setShowOptions(true);
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 2,
            content:
              "I'm sorry, I didn't receive a valid option. Please select an option.",
            isUser: false,
            showOptions: true,
          },
        ]);
        setShowOptions(true);
      }
    }, 1000);
  };

  const handleOptionClick = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: option,
        isUser: true,
      },
    ]);

    setSelectedOption(option);
    setShowOptions(false);
    setInputValue("");

    if (option.toLowerCase() === "new instruction") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: "Please select one of the following options:",
          isUser: false,
          showOptions: true,
          showNewInstructionOptions: true,
        },
      ]);
      setShowOptions(true);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: `Do you want to navigate to ${option.toLowerCase()} page?`,
          isUser: false,
          showOptions: true,
          showConfirmationOptions: true,
        },
      ]);
      setShowOptions(true);
    }
  };

  const handlePropertyOptionClick = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: option,
        isUser: true,
      },
    ]);
  
    setInputValue('');
    setSelectedOption('');
    setShowOptions(false);
    setShowInitialOptions(true);
  
    if (option.toLowerCase() === 'no') {
      setShowOptions(true);
      setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 3));
    } else if (option.toLowerCase() === 'yes') {
      const page = selectedOption.toLowerCase().replace(/\s/g, '-');
      window.location.href = `/${page}`;
    }
  };
  

  const handleNewInstructionOptionClick = (option) => {
    setSelectedOption(option);
    setShowInitialOptions(false);
    

    if (option.toLowerCase() === 'how to purchase') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: (
            <div>
              <p>To purchase a property, follow these steps:</p>
              <ol>
                <li>Visit the property listing page</li>
                <li>Review the property details and photos</li>
                <li>Contact the seller or real estate agent for inquiries</li>
                <li>Schedule a property visit</li>
                <li>Negotiate the price and terms</li>
                <li>Finalize the purchase agreement</li>
                <li>Complete the necessary paperwork</li>
                <li>Make the payment</li>
                <li>Transfer ownership</li>
              </ol>
              <p>If you need further assistance, feel free to ask!</p>
            </div>
          ),
          isUser: false,
          showOptions: true,
        },
      ]);
    } else if (option.toLowerCase() === 'how to buy') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: (
            <div>
              <p>To buy a property, follow these steps:</p>
              <ol>
                <li>Search for properties based on your preferences</li>
                <li>Shortlist the properties that meet your criteria</li>
                <li>Visit the properties and inspect them</li>
                <li>Evaluate the property's market value</li>
                <li>Secure financing (if needed)</li>
                <li>Make an offer to the seller</li>
                <li>Negotiate the price and terms</li>
                <li>Conduct due diligence on the property</li>
                <li>Finalize the purchase agreement</li>
                <li>Complete the necessary paperwork</li>
                <li>Make the payment</li>
                <li>Transfer ownership</li>
              </ol>
              <p>If you have any more questions, feel free to ask!</p>
            </div>
          ),
         isUser: false,
          showOptions: true,
        },
      ]);
    } else if (option.toLowerCase() === 'how to sell') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: (
            <div>
              <p>To sell a property, follow these steps:</p>
              <ol>
                <li>Prepare the property for sale (cleaning, repairs, staging, etc.)</li>
                <li>Determine the property's market value</li>
                <li>List the property for sale (online listings, real estate agents, etc.)</li>
                <li>Market the property to potential buyers</li>
                <li>Showcase the property through open houses or private viewings</li>
                <li>Receive offers from interested buyers</li>
                <li>Negotiate the price and terms</li>
                <li>Accept an offer and sign the purchase agreement</li>
                <li>Complete the necessary paperwork</li>
                <li>Prepare the property for transfer of ownership</li>
                <li>Receive payment from the buyer</li>
                <li>Transfer ownership to the buyer</li>
              </ol>
              <p>If you need more guidance, feel free to ask!</p>
            </div>
          ),
          isUser: false,
          showOptions: true,
        },
      ]);
    } else if (option.toLowerCase() === 'how to add your property') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 2,
          content: (
            <div>
              <p>To add your property for sale, follow these steps:</p>
              <ol>
                <li>Gather all necessary information about your property (photos, description, amenities, etc.)</li>
                <li>Register an account on a property listing platform</li>
                <li>Create a property listing and provide accurate details</li>
                <li>Upload high-quality photos of your property</li>
                <li>Set an attractive price and terms for potential buyers</li>
                <li>Review and publish your property listing</li>
                <li>Respond promptly to inquiries from interested buyers</li>
                <li>Schedule property viewings for interested parties</li>
                <li>Negotiate with potential buyers and finalize the sale</li>
                <li>Complete the necessary paperwork for the property transfer</li>
                <li>Transfer ownership and receive payment</li>
              </ol>
              <p>If you have any questions, feel free to ask!</p>
            </div>
          ),
          isUser: false,
          showOptions: true,
        },
      ]);
    }

    
    if (option.toLowerCase() !== 'back') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 3,
          content: (
            <div className="back-option" onClick={() => handleBackOptionClick()}>
              <FaArrowLeft />
              Back
            </div>
          ),
          isUser: false,
        },
      ]);
    }
  };

  const handleBackOptionClick = () => {
    setSelectedOption('');
    setShowInitialOptions(true);
    setMessages((prevMessages) => {
      const messagesLength = prevMessages.length;
      return prevMessages.slice(0, messagesLength - 2);
    });
  };

    const lastMessageRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      setMessages([
        {
          id: 1,
          content: "Hi, This is Blue 🤖!",
          isUser: false,
        },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: 2,
            content: "How can I assist you today?",
            isUser: false,
            showOptions: true,
          },
        ]);
        setShowOptions(true);
      }, 1000);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`chatbot-container ${isChatOpen ? 'active' : ''}`}>
      <div className="chat-icon" onClick={toggleChat}>
        {isChatOpen ? <FaTimes /> : <FaComment />}
      </div>
      {isChatOpen && (
        <div className="chat-panel">
          <div className="message-panel">
            {messages.map((message, index) => (
              <div
                key={message.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`message ${message.isUser ? 'user' : 'bot'}`}
              >
                <div className="message-icon">
                  {message.isUser ? null : null}
                </div>
                <div className="message-content">
                  {message.content}
                  {index === 1 && showOptions && (
                    <div className="option-panel">
                      {showInitialOptions && (
                        <>
                          <div className="option" onClick={() => handleOptionClick('Property')}>Property</div>
                          <div className="option" onClick={() => handleOptionClick('Raise Query')}>Raise Query</div>
                          <div className="option" onClick={() => handleOptionClick('Contact Us')}>Contact Us</div>
                          <div className="option" onClick={() => handleOptionClick('About Us')}>About Us</div>
                          <div className="option" onClick={() => handleOptionClick('New Instruction')}>Basic Instruction</div>
                        </>
                      )}
                    </div>
                  )}
                  {message.showConfirmationOptions && (
                    <div className="option-panel">
                      <div className="option" onClick={() => handlePropertyOptionClick('Yes')}>Yes</div>
                      <div className="option" onClick={() => handlePropertyOptionClick('No')}>No</div>
                    </div>
                  )}
                  {message.showNewInstructionOptions && (
                    <div className="option-panel">
                      <div className="option" onClick={() => handleNewInstructionOptionClick('How to purchase')}>How to purchase</div>
                      <div className="option" onClick={() => handleNewInstructionOptionClick('How to buy')}>How to buy</div>
                      <div className="option" onClick={() => handleNewInstructionOptionClick('How to sell')}>How to sell</div>
                      <div className="option" onClick={() => handleNewInstructionOptionClick('How to add your property')}>How to add your property</div>
                      <div className="back-option" onClick={() => handleBackOptionClick()}>
                        <FaArrowLeft />
                        Back
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="type-panel">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleInputKeyPress} // Add the onKeyPress event listener here
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;