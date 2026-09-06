const signupBtn = document.getElementById("signupBtn");
const errorLabel = document.getElementById("signupError");

signupBtn.onclick = async () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    errorLabel.textContent = "Remplis tous les champs";
    return;
  }

  errorLabel.textContent = "Création du compte...";

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { username: username }
    }
  });

  if (error) {
    errorLabel.textContent = "Erreur : " + error.message;
    return;
  }

  errorLabel.textContent = "Compte créé !";
  setTimeout(() => {
    location.href = "characters.html";
  }, 1000);
};
