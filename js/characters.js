const characters = [
  { id: "will", name: "Will", avatar: "avatars/will.svg", tagline: "Le drôle de la bande" },
  { id: "joelle", name: "Joëlle", avatar: "avatars/joelle.svg", tagline: "Attentionnée et à l'écoute" },
  { id: "steph", name: "Steph", avatar: "avatars/steph.svg", tagline: "Romantique et motivant" },
  { id: "regis", name: "Régis", avatar: "avatars/regis.svg", tagline: "Sage, discipliné et ambitieux" },
  { id: "rom", name: "Rom", avatar: "avatars/rom.svg", tagline: "Créatif et passionné" }
];

const grid = document.getElementById("characterGrid");

if (grid) {
  characters.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.onclick = () => location.href = `character-profile.html?id=${c.id}`;
    card.innerHTML = `
      <img class="character-avatar-img" src="${c.avatar}" alt="${c.name}">
      <p class="character-name">${c.name}</p>
      <p class="character-tagline">${c.tagline}</p>
    `;
    grid.appendChild(card);
  });
}
