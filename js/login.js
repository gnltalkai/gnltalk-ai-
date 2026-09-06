const loginBtn = document.getElementById("loginBtn");
const errorLabel = document.getElementById("loginError");

loginBtn.onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorLabel.textContent = "Remplis tous les champs";
    return;
  }

  errorLabel.textContent = "Connexion...";

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    errorLabel.textContent = "Erreur : " + error.message;
    return;
  }

  errorLabel.textContent = "Connecté !";
  setTimeout(() => {
    location.href = "characters.html";
  }, 800);
};
