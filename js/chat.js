  const BACKEND_URL = "https://gnltalkai-gnltalk-ai-backend.vercel.app";

const params = new URLSearchParams(window.location.search);
const charId = params.get("id");
const character = characters.find(c => c.id === charId);

// Identifiant unique de l'appareil, créé une seule fois et réutilisé
let deviceId = localStorage.getItem("gnltalk_device_id");
if (!deviceId) {
  deviceId = "device_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  localStorage.setItem("gnltalk_device_id", deviceId);
}

let messagesLeft = 20;

if (character) {
  document.getElementById("chatAvatar").textContent = character.emoji;
  document.getElementById("chatName").textContent = character.name;
}

const messagesDiv = document.getElementById("chatMessages");
const input = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messagesLeftLabel = document.getElementById("messagesLeft");

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "bubble-user" : "bubble-character";
  bubble.textContent = text;
  messagesDiv.appendChild(bubble);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Vérifier le compteur au chargement de la page
async function checkMessages() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/check-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId })
    });
    const data = await res.json();
    messagesLeft = data.messagesLeft;
    messagesLeftLabel.textContent = `${messagesLeft} messages restants`;
  } catch (err) {
    messagesLeftLabel.textContent = "Erreur de connexion au serveur";
  }
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  if (messagesLeft <= 0) {
    alert("Tu as utilisé tes 20 messages gratuits. Passe Premium pour continuer !");
    return;
  }

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch(`${BACKEND_URL}/api/use-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId })
    });
    const data = await res.json();

    if (res.status === 403) {
      messagesLeft = 0;
      messagesLeftLabel.textContent = "0 messages restants";
      alert("Tu as utilisé tes 20 messages gratuits. Passe Premium pour continuer !");
      return;
    }

    messagesLeft = data.messagesLeft;
    messagesLeftLabel.textContent = `${messagesLeft} messages restants`;

    setTimeout(() => {
      addMessage(`(Réponse simulée de ${character ? character.name : "..."} — l'IA arrivera en PHASE 11)`, "character");
    }, 600);
  } catch (err) {
    alert("Erreur de connexion au serveur, réessaie.");
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

checkMessages();
