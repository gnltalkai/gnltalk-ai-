const characters = [
  { id: "luna", name: "Luna", emoji: "❤️", tagline: "Douce et attentionnée" },
  { id: "kevin", name: "Kévin", emoji: "😂", tagline: "Meilleur ami drôle" },
  { id: "sofia", name: "Sofia", emoji: "🧠", tagline: "Sage et réfléchie" },
  { id: "alex", name: "Alex", emoji: "😎", tagline: "Détendu et sociable" },
  { id: "maya", name: "Maya", emoji: "🌸", tagline: "Positive et motivante" },
  { id: "elena", name: "Elena", emoji: "💕", tagline: "Romantique et tendre" },
  { id: "ryan", name: "Ryan", emoji: "🦁", tagline: "Confiant et ambitieux" },
  { id: "jojo", name: "Jojo", emoji: "🤣", tagline: "Humoristique" },
  { id: "nina", name: "Nina", emoji: "🌙", tagline: "Discussions profondes" },
  { id: "lucas", name: "Lucas", emoji: "🎯", tagline: "Discipline et objectifs" },
  { id: "aicha", name: "Aïcha", emoji: "🎨", tagline: "Créative" },
  { id: "noah", name: "Noah", emoji: "🎮", tagline: "Jeux et technologie" },
  { id: "emma", name: "Emma", emoji: "☀️", tagline: "Joyeuse et optimiste" },
  { id: "chris", name: "Chris", emoji: "✨", tagline: "Lifestyle et discussions" },
  { id: "sara", name: "Sara", emoji: "🫂", tagline: "Empathique et à l'écoute" }
];

const grid = document.getElementById("characterGrid");

characters.forEach(c => {
  const card = document.createElement("div");
  card.className = "character-card";
  card.onclick = () => location.href = `character-profile.html?id=${c.id}`;
  card.innerHTML = `
    <div class="character-avatar">${c.emoji}</div>
    <p class="character-name">${c.name}</p>
    <p class="character-tagline">${c.tagline}</p>
  `;
  grid.appendChild(card);
});
