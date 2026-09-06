const params = new URLSearchParams(window.location.search);
const charId = params.get("id");

const character = characters.find(c => c.id === charId);

if (character) {
  document.getElementById("profileAvatar").src = character.avatar;
  document.getElementById("profileAvatar").alt = character.name;
  document.getElementById("profileName").textContent = character.name;
  document.getElementById("profileTagline").textContent = character.tagline;
  document.getElementById("startChatBtn").onclick = () => {
    location.href = `chat.html?id=${character.id}`;
  };
} else {
  document.getElementById("profileName").textContent = "Personnage introuvable";
}
