let btn = document.getElementById("addUser");
// let users = [];
let membres = [];

btn.addEventListener("click", ajouter);


function ajouter(e) {
  e.preventDefault();
//   localStorage.clear();
  // Récupérer le formulaire et créer un FormGroup
  const form = document.querySelector('form');
  const formGroup = new FormData(form);

  // Convertir FormData en objet
  const formValues = Object.fromEntries(formGroup);
  
  const { name: nom, surname: prenom, genre : genre, dateNaissance: date, numPhone: numPhone, adresse: adresse, role: role, email: mail } = formValues;
  
  alert(nom + " " + prenom + " " + genre + " " + date + " " + numPhone + " " + adresse + " " + role + " " + mail);
  let user = { 
      Nom: nom,
      Prenom: prenom,
      DateDeNaissance: date,
      Genre: genre,
      NumPhone: numPhone,
      Statut: 'Actif',
      Role: role,
      VillePays: adresse,
      email: mail
    };
    membres = JSON.parse(localStorage.getItem('membres'));
    if (membres == null) {
      membres = [user];
    }
    else {
        membres.push(user);
    }
    localStorage.setItem('membres', JSON.stringify(membres));

    console.log(membres);
  }
