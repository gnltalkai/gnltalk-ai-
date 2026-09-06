const sampleHistory = [
  { charId: "luna", lastMessage: "Un peu fatigué mais ça va...", time: "14:20" },
  { charId: "kevin", lastMessage: "Haha t'es sérieux là ?...", time: "Hier" },
  { charId: "maya", lastMessage: "Tu vas y arriver, crois en toi...", time: "Lundi" }
];

const list = document.getElementById("historyList");

sampleHistory.forEach(h => {
  const character = characters.find(c => c.id === h.charId);
  if (!character) return;

  const item = document.createElement("div");
  item.className = "history-item";
  item.onclick = () => location.href = `chat.html?id=${character.id}`;
  item.innerHTML = `
    <div class="history-avatar">${character.emoji}</div>
    <div class="history-info">
      <p class="history-name">${character.name}</p>
      <p class="history-preview">${h.lastMessage}</p>
    </div>
    <p class="history-time">${h.time}</p>
  `;
  list.appendChild(item);
});
