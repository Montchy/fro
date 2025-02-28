import React, { useState, useEffect } from "react";

const PriceSuggestionChatbot = ({ darkMode, isEnglish }) => {
  // Zustand für Nachrichten und Historie
  const [messages, setMessages] = useState([
    { text: isEnglish ? "Hello! Describe your product (e.g., jewelry, antiques, etc.), and I'll give you a price suggestion." : "Hallo! Beschreibe mir dein Produkt (z. B. Schmuck, Antiquitäten, etc.), und ich mache dir einen Preisvorschlag.", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]); // Historie der Fragen und Antworten

  // Beim Laden der Komponente gespeicherte Historie laden
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Historie speichern, wenn sie sich ändert
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  // Nachricht senden
  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    // Benutzernachricht hinzufügen
    const userMessage = { text: inputValue, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // KI-Antwort generieren
    const botMessage = { text: getPriceSuggestion(inputValue), isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Frage und Antwort zur Historie hinzufügen
    setHistory((prevHistory) => [
      ...prevHistory,
      { question: inputValue, answer: botMessage.text },
    ]);

    // Eingabefeld leeren
    setInputValue("");
  };

  // Preisvorschlag generieren
  const getPriceSuggestion = (description) => {
    const keywords = [
      { keyword: "ring", basePrice: 500 },
      { keyword: "kette", basePrice: 300 },
      { keyword: "armband", basePrice: 200 },
      { keyword: "uhr", basePrice: 1000 },
      { keyword: "antik", basePrice: 1500 },
      { keyword: "sammlerstück", basePrice: 2000 },
    ];

    let price = 0;
    let matchedKeyword = null;

    // Überprüfen, ob ein Schlüsselwort in der Beschreibung enthalten ist
    for (const item of keywords) {
      if (description.toLowerCase().includes(item.keyword)) {
        matchedKeyword = item.keyword;
        price = item.basePrice;
        break;
      }
    }

    if (matchedKeyword) {
      const variation = Math.random() * 0.5 + 0.75;
      price = Math.round(price * variation);
      return isEnglish
        ? `Based on your description ("${matchedKeyword}"), I suggest a price of around ${price}€.`
        : `Basierend auf deiner Beschreibung ("${matchedKeyword}") schlage ich einen Preis von ca. ${price}€ vor.`;
    } else {
      return isEnglish
        ? "I couldn't find a matching product in your description. Please provide more details."
        : "Ich konnte kein passendes Produkt in deiner Beschreibung finden. Bitte gib mehr Details an.";
    }
  };

  // Enter-Taste zum Senden der Nachricht
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
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
          history.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p><strong>{isEnglish ? "Question" : "Frage"}:</strong> {item.question}</p>
              <p><strong>{isEnglish ? "Answer" : "Antwort"}:</strong> {item.answer}</p>
            </div>
          ))
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