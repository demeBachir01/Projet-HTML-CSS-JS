function afficher() {
    const membres = JSON.parse(localStorage.getItem("membres")) || [];
    const enteteTableau = document.getElementById("enteteTableau");
    const corpsTableau = document.getElementById("corpsTableau");

    enteteTableau.innerHTML = "";
    corpsTableau.innerHTML = "";

    const ligneEntete = document.createElement("tr");
    const entetes = [
        "Email",
        "Voir",
        "Ajouter tâches",
        "Modifier",
        "Supprimer"
    ];

    entetes.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        ligneEntete.appendChild(th);
    });
    enteteTableau.appendChild(ligneEntete);

    if (membres.length === 0) {
        const emptyRow = document.createElement("tr");
        const emptyCell = document.createElement("td");
        emptyCell.colSpan = entetes.length;
        emptyCell.textContent = "Aucun utilisateur enregistré.";
        emptyCell.style.textAlign = "center";
        emptyRow.appendChild(emptyCell);
        corpsTableau.appendChild(emptyRow);
        return;
    }

    membres.forEach((utilisateur, indexUtilisateur) => {
        if ((utilisateur.Statut || "").toLowerCase() !== "actif") {
            return;
        }

        const tr = document.createElement("tr");

        const emailTd = document.createElement("td");
        emailTd.textContent = utilisateur.email || "";
        tr.appendChild(emailTd);

        const boutonsAction = [
            { text: "Voir", href: `afficherUser.html?index=${indexUtilisateur}`, className: "voir" },
            { text: "Ajouter tâches", href: `../gestionTache/addTache.html?index=${indexUtilisateur}`, className: "tache" },
            { text: "Modifier", href: `update.html?index=${indexUtilisateur}`, className: "modifier" },
            { text: "Supprimer", href: null, className: "supprimer" }
        ];

        boutonsAction.forEach(action => {
            const td = document.createElement("td");
            const bouton = document.createElement("button");
            bouton.type = "button";
            bouton.className = `action-button ${action.className}`;
            bouton.textContent = action.text;

            if (action.className === "supprimer") {
                bouton.addEventListener("click", () => {
                    if (!confirm("Voulez-vous vraiment marquer cet utilisateur comme inactif ?")) {
                        return;
                    }
                    const membres = JSON.parse(localStorage.getItem("membres")) || [];
                    if (membres[indexUtilisateur]) {
                        membres[indexUtilisateur].Statut = "Inactif";
                        localStorage.setItem("membres", JSON.stringify(membres));
                        afficher();
                    }
                });
                td.appendChild(bouton);
            } else {
                const link = document.createElement("a");
                link.href = action.href;
                link.appendChild(bouton);
                td.appendChild(link);
            }

            tr.appendChild(td);
        });

        corpsTableau.appendChild(tr);
    });
}
