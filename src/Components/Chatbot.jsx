import React, { useState, useEffect, useRef } from "react";

const PriceSuggestionChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]); // Liste der alten Chats
  const chatRef = useRef(null); // Ref für das Scrollen

  // Automatisch nach unten scrollen, wenn neue Nachrichten hinzugefügt werden
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Nachricht senden
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Benutzernachricht hinzufügen
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);

    try {
      // Anfrage an den Server senden
      const response = await fetch("http://localhost:5004/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Server antwortet nicht.");
      }

      // Antwort vom Server verarbeiten
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.reply || "Keine Antwort erhalten." },
      ]);
    } catch (error) {
      console.error("Fehler bei der API-Anfrage:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "❌ Fehler: Keine Verbindung zum Server." },
      ]);
    }

    // Eingabefeld leeren
    setInput("");
  };

  // Neuen Chat starten
  const startNewChat = () => {
    if (messages.length > 0) {
      setChats((prevChats) => [...prevChats, messages]);
    }
    setMessages([]);
  };

  return (
    <div style={styles.container}>
      {/* Linke Seite: Chatbot */}
      <div style={styles.chatbotContainer}>
        {/* Chat-Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Chatbot mit Ollama</h1>
          <button onClick={startNewChat} style={styles.newChatButton}>
            ➕
          </button>
        </div>

        {/* Chat-Fenster */}
        <div ref={chatRef} style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "rgba(240,175,77,1)" : "#e0e0e0",
                color: msg.role === "user" ? "#fff" : "#000",
              }}
            >
              <strong>{msg.role === "user" ? "Du" : "Bot"}:</strong> {msg.content}
            </div>
          ))}
        </div>

        {/* Eingabefeld und Senden-Button */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Schreibe etwas..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.button}>
            Senden
          </button>
        </div>
      </div>

      {/* Rechte Seite: Alte Chats */}
      <div style={styles.chatHistoryContainer}>
        <h2 style={styles.chatHistoryTitle}>Chat-Verlauf</h2>
        {chats.map((chat, index) => (
          <div key={index} style={styles.chatHistoryItem}>
            <strong>Chat {index + 1}</strong>
            <div style={styles.chatHistoryMessages}>
              {chat.map((msg, msgIndex) => (
                <div
                  key={msgIndex}
                  style={{
                    ...styles.chatHistoryMessage,
                    color: msg.role === "user" ? "rgba(240,175,77,1)" : "#000",
                  }}
                >
                  <strong>{msg.role === "user" ? "Du" : "Bot"}:</strong> {msg.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stile
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  chatbotContainer: {
    flex: 3, // Chatbereich breiter
    maxWidth: "700px", // Breiterer Chatbereich
    padding: "20px",
    borderRight: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  newChatButton: {
    padding: "10px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(240,175,77,1)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  chatWindow: {
    flex: 1,
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: "10px",
    fontSize: "14px",
    lineHeight: "1.5",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgba(240,175,77,1)",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  chatHistoryContainer: {
    flex: 1, // Rechte Seite schmaler
    maxWidth: "300px", // Schmalerer Bereich für den Chat-Verlauf
    padding: "20px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  chatHistoryTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
  },
  chatHistoryItem: {
    marginBottom: "20px",
  },
  chatHistoryMessages: {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  chatHistoryMessage: {
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "5px",
  },
};

export default PriceSuggestionChatbot;