import React, { useState, useEffect } from "react";

const PriceSuggestionChatbot = ({ darkMode, isEnglish }) => {
  const [messages, setMessages] = useState([
    { text: isEnglish ? "Hello! Describe your product (e.g., jewelry, antiques, etc.), and I'll give you a price suggestion." : "Hallo! Beschreibe mir dein Produkt (z. B. Schmuck, Antiquitäten, etc.), und ich mache dir einen Preisvorschlag.", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]); 
  const [selectedHistory, setSelectedHistory] = useState(null); 
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessage = { text: await fetchPriceSuggestion(inputValue), isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setHistory((prevHistory) => [
      ...prevHistory,
      { question: inputValue, answer: botMessage.text },
    ]);

    setInputValue("");
  };

  const fetchPriceSuggestion = async (description) => {
   
    return new Promise((resolve) => {
      setTimeout(() => {
        const price = Math.floor(Math.random() * 1000) + 100; 
        resolve(
          isEnglish
            ? `Based on your description, I suggest a price of around ${price}€.`
            : `Basierend auf deiner Beschreibung schlage ich einen Preis von ca. ${price}€ vor.`
        );
      }, 1000); 
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const showHistoryDetails = (index) => {
    setSelectedHistory(history[index]);
  };

  return (
    <div style={{ display: "flex", height: "100vh", padding: "20px", backgroundColor: darkMode ? "#121212" : "#f9fafb" }}>
      {/* Chatbot (links) */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column", marginRight: "20px" }}>
        <div style={{ ...styles.chatContainer, backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }}>
          <div style={{ ...styles.chatHeader, backgroundColor: darkMode ? "#E0A800" : "#E0A800", color: darkMode ? "#000000" : "#ffffff" }}>
            {isEnglish ? "AI Price Suggestion Chatbot" : "KI-Preisvorschlags-Chatbot"}
          </div>
          <div style={{ ...styles.chatMessages, backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(message.isUser ? styles.userMessage : styles.botMessage),
                  backgroundColor: message.isUser ? (darkMode ? "#E0A800" : "#E0A800") : (darkMode ? "#333333" : "#e0e0e0"),
                  color: message.isUser ? (darkMode ? "#000000" : "#ffffff") : (darkMode ? "#ffffff" : "#000000"),
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div style={{ ...styles.chatInput, borderTop: darkMode ? "1px solid #444" : "1px solid #ddd" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isEnglish ? "Describe your product..." : "Beschreibe dein Produkt..."}
              style={{ ...styles.inputField, backgroundColor: darkMode ? "#333" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }}
            />
            <button
              onClick={sendMessage}
              style={{ ...styles.sendButton, backgroundColor: darkMode ? "#E0A800" : "#E0A800", color: darkMode ? "#000000" : "#ffffff" }}
            >
              {isEnglish ? "Send" : "Senden"}
            </button>
          </div>
        </div>
      </div>

      {/* Historie (rechts) */}
      <div style={{ flex: 1, backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", color: darkMode ? "#ffffff" : "#000000", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h3>{isEnglish ? "Chat History" : "Chat-Verlauf"}</h3>
        {history.length === 0 ? (
          <p>{isEnglish ? "No history yet." : "Noch keine Historie vorhanden."}</p>
        ) : (
          <div>
            {history.map((item, index) => (
              <div
                key={index}
                style={{ marginBottom: "10px", cursor: "pointer", padding: "10px", borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd" }}
                onClick={() => showHistoryDetails(index)}
              >
                <p style={{ margin: 0 }}><strong>{isEnglish ? "Q" : "F"}:</strong> {item.question}</p>
                <p style={{ margin: 0 }}><strong>{isEnglish ? "A" : "A"}:</strong> {item.answer.substring(0, 50)}...</p>
              </div>
            ))}
          </div>
        )}

        {/* Details der ausgewählten Historie */}
        {selectedHistory && (
          <div style={{ marginTop: "20px" }}>
            <h4>{isEnglish ? "Details" : "Details"}</h4>
            <p><strong>{isEnglish ? "Question" : "Frage"}:</strong> {selectedHistory.question}</p>
            <p><strong>{isEnglish ? "Answer" : "Antwort"}:</strong> {selectedHistory.answer}</p>
            <button onClick={() => setSelectedHistory(null)} style={{ ...styles.sendButton, backgroundColor: darkMode ? "#E0A800" : "#E0A800", color: darkMode ? "#000000" : "#ffffff" }}>
              {isEnglish ? "Close" : "Schließen"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    flex: 1,
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    padding: "15px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  chatMessages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  chatInput: {
    display: "flex",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  sendButton: {
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default PriceSuggestionChatbot;