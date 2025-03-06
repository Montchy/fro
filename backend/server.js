const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
//const ollama = require("ollama");

const app = express();
const port = 5004;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  /*const r = await ollama.chat({
    model: 'llama3.1',
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  })
  console.log(r.message.content)*/


  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Nachricht darf nicht leer sein." });
  }

  console.log(`📩 Eingehende Nachricht: "${message}"`);

  const process = spawn("ollama", ["run", "mistral", "--host", "127.0.0.1:5004", message]);

  let response = "";

  process.stdout.on("data", (data) => {
    response += data.toString();
  });

  process.stderr.on("data", (data) => {
    console.error("❌ Fehler von Ollama:", data.toString());
  });

  process.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Fehler bei der Verarbeitung mit Ollama." });
    }

    console.log(`✅ Antwort von Ollama: "${response.trim()}"`);
    res.json({ reply: response.trim() });
  });
});

process.stdout.on("data", (data) => {
  response += data.toString();
  console.log("🔹 Antwort von Ollama:", response); 
});

app.listen(port, () => {
  console.log(`⚡ Backend läuft auf http://localhost:${port}`);
});
