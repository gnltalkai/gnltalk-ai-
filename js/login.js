alert("Script chargé");

const loginBtn = document.getElementById("loginBtn");
alert("Bouton trouvé : " + (loginBtn ? "oui" : "NON - problème ici"));

const errorLabel = document.getElementById("loginError");

loginBtn.onclick = async () => {
  alert("Bouton cliqué !");

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
