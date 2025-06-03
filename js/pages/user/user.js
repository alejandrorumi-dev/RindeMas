document.addEventListener("DOMContentLoaded", () => {
	const user = JSON.parse(localStorage.getItem("usuarioActual"));
	const h2 = document.querySelector(".users__info--title");

	if (!user || !h2) return;

	const nombre = `${user.name.toUpperCase()}`;
	const textoInicial = h2.textContent; // "¡BIENVENIDO, USUARIO!"
	const partes = textoInicial.split("USUARIO");

	if (partes.length !== 2) return;

	const [inicio, fin] = partes;
	let borrarIndex = "USUARIO".length;

	// Esperar 1.5 segundos antes de empezar
	setTimeout(() => {
		const borrar = setInterval(() => {
			borrarIndex--;
			h2.textContent = `${inicio}${"USUARIO".slice(0, borrarIndex)}${fin}`;
			if (borrarIndex === 0) {
				clearInterval(borrar);
				let escribirIndex = 0;
				const escribir = setInterval(() => {
					h2.textContent = `${inicio}${nombre.slice(0, escribirIndex)}${fin}`;
					escribirIndex++;
					if (escribirIndex > nombre.length) clearInterval(escribir);
				}, 150);
			}
		}, 150);
	}, 1000);

	renderChangeUserButton();
});

function renderChangeUserButton() {
	const user = JSON.parse(localStorage.getItem("usuarioActual"));
	if (!user) return;

	// Contenedor del botón + dropdown
	const container = document.createElement("div");
	container.className = "change-user-container user_dropdown";

	// Botón avatar
	const avatarBtn = document.createElement("button");
	avatarBtn.className = "change-user-btn dropdown-toggle";
	avatarBtn.title = "Menú de usuario";

	const avatar = document.createElement("div");
	avatar.className = "user_avatar";

	if (user.image) {
		const img = document.createElement("img");
		img.src = user.image;
		img.alt = `${user.name} ${user.lastName}`;
		img.className = "user__photo";
		img.style.width = "80px";
		img.style.height = "80px";
		avatar.appendChild(img);
	} else {
		avatar.innerHTML = `
			<svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
				<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/>
			</svg>
		`;
	}
	avatarBtn.appendChild(avatar);

	// Menú desplegable
	const menu = document.createElement("div");
	menu.className = "dropdown-menu";
	menu.style.display = "none";

	const changeBtn = document.createElement("button");
	changeBtn.textContent = "Cambiar de usuario";
	changeBtn.addEventListener("click", () => {
		localStorage.removeItem("usuarioActual");
		window.location.href = "../../index.html";
	});

	menu.appendChild(changeBtn);

	// Mostrar/ocultar menú al hacer clic en el avatar
	avatarBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		closeAllDropdownMenus();
		menu.style.display = menu.style.display === "none" ? "flex" : "none";
	});

	// Cerrar menú si haces clic fuera
	document.addEventListener("click", () => {
		menu.style.display = "none";
	});

	container.appendChild(avatarBtn);
	container.appendChild(menu);
	document.body.appendChild(container);
}

function closeAllDropdownMenus() {
	document.querySelectorAll(".dropdown-menu").forEach(menu => {
		menu.style.display = "none";
	});
}
