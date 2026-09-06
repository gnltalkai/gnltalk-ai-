async function loadHistory() {
  const list = document.getElementById("historyList");
  const emptyState = document.getElementById("emptyState");

  if (!window.supabaseClient) return;

  const { data: userData } = await supabaseClient.auth.getUser();
  if (!userData || !userData.user) {
    emptyState.style.display = "flex";
    return;
  }

  const { data: messages } = await supabaseClient
    .from("conversations")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (!messages || messages.length === 0) {
    emptyState.style.display = "flex";
    return;
  }

  const seen = new Set();
  const latestByCharacter = [];

  messages.forEach(m => {
    if (!seen.has(m.character_id)) {
      seen.add(m.character_id);
      latestByCharacter.push(m);
    }
  });

  latestByCharacter.forEach(m => {
    const character = characters.find(c => c.id === m.character_id);
    if (!character) return;

    const item = document.createElement("div");
    item.className = "history-item";
    item.onclick = () => location.href = `chat.html?id=${character.id}`;
    item.innerHTML = `
      <img class="history-avatar-img" src="${character.avatar}" alt="${character.name}">
      <div class="history-info">
        <p class="history-name">${character.name}</p>
        <p class="history-preview">${m.message}</p>
      </div>
    `;
    list.appendChild(item);
  });
}

loadHistory();
