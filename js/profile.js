async function loadProfile() {
  if (!window.supabaseClient) return;

  const { data } = await supabaseClient.auth.getUser();
  if (data && data.user) {
    const username = data.user.user_metadata && data.user.user_metadata.username
      ? data.user.user_metadata.username
      : data.user.email;

    document.getElementById("profileUsername").textContent = username;
    document.getElementById("profileEmail").textContent = data.user.email;
    document.getElementById("profileInitial").textContent = username.charAt(0).toUpperCase();
  }
}

document.getElementById("editUsernameBtn").onclick = async () => {
  const newUsername = prompt("Nouveau nom d'utilisateur :");
  if (!newUsername) return;

  const { error } = await supabaseClient.auth.updateUser({
    data: { username: newUsername }
  });

  if (error) {
    alert("Erreur : " + error.message);
  } else {
    alert("Nom d'utilisateur mis à jour !");
    loadProfile();
  }
};

document.getElementById("editPasswordBtn").onclick = async () => {
  const newPassword = prompt("Nouveau mot de passe (6 caractères minimum) :");
  if (!newPassword) return;

  const { error } = await supabaseClient.auth.updateUser({
    password: newPassword
  });

  if (error) {
    alert("Erreur : " + error.message);
  } else {
    alert("Mot de passe mis à jour !");
  }
};

document.getElementById("logoutBtn").onclick = async () => {
  await supabaseClient.auth.signOut();
  location.href = "index.html";
};

loadProfile();
