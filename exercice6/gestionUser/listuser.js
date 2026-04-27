function afficher() {
    const membres = JSON.parse(localStorage.getItem("membres")) || [];
    const thead = document.getElementById("thead0");
    const tbody = document.getElementById("tbody0");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    const headerRow = document.createElement("tr");
    const headers = [
        "Email",
        "Voir",
        "Ajouter tâches",
        "Modifier",
        "Supprimer"
    ];

    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    if (membres.length === 0) {
        const emptyRow = document.createElement("tr");
        const emptyCell = document.createElement("td");
        emptyCell.colSpan = headers.length;
        emptyCell.textContent = "Aucun utilisateur enregistré.";
        emptyCell.style.textAlign = "center";
        emptyRow.appendChild(emptyCell);
        tbody.appendChild(emptyRow);
        return;
    }

    membres.forEach((user, index) => {
        if ((user.Statut || "").toLowerCase() !== "actif") {
            return;
        }

        const tr = document.createElement("tr");

        const emailTd = document.createElement("td");
        emailTd.textContent = user.email || "";
        tr.appendChild(emailTd);

        const actionButtons = [
            { text: "Voir", href: `afficherUser.html?index=${index}`, className: "view" },
            { text: "Ajouter tâches", href: `ajouterTache.html?index=${index}`, className: "task" },
            { text: "Modifier", href: `update.html?index=${index}`, className: "edit" },
            { text: "Supprimer", href: `add.html?index=${index}`, className: "delete" }
        ];

        actionButtons.forEach(action => {
            const td = document.createElement("td");
            const link = document.createElement("a");
            link.href = action.href;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `action-button ${action.className}`;
            btn.textContent = action.text;
            link.appendChild(btn);
            td.appendChild(link);
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}
