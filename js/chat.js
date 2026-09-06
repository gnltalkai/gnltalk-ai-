const params = new URLSearchParams(window.location.search);
const charId = params.get("id");
const character = characters.find(c => c.id === charId);

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

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  if (messagesLeft <= 0) {
    alert("Tu as utilisé tes 20 messages gratuits. Passe Premium pour continuer !");
    return;
  }

  addMessage(text, "user");
  input.value = "";
  messagesLeft--;
  messagesLeftLabel.textContent = `${messagesLeft} messages restants`;

  setTimeout(() => {
    addMessage(`(Réponse simulée de ${character ? character.name : "..."} — l'IA arrivera en PHASE 11)`, "character");
  }, 600);
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
