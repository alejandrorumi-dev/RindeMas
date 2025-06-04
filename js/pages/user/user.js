// Importar la función getColorFromName desde helpers.js
import { getColorFromName } from "../../shared/utils/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
	const user = JSON.parse(localStorage.getItem("usuarioActual"));
	const h2 = document.querySelector(".users__info--title");

	if (!user || !h2) return;

	const nombre = `${user.name.toUpperCase()}`;
	const textoInicial = h2.textContent;
	const partes = textoInicial.split("USUARIO");

	if (partes.length !== 2) return;

	const [inicio, fin] = partes;
	let borrarIndex = "USUARIO".length;

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

// La función getColorFromName se importa desde helpers.js

function renderChangeUserButton() {
	const user = JSON.parse(localStorage.getItem("usuarioActual"));
	const users = JSON.parse(localStorage.getItem("users")) || [];
	if (!user) return;

	const container = document.createElement("div");
	container.className = "change-user-container user_dropdown";

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

	const menu = document.createElement("div");
	menu.className = "dropdown-menu";
	menu.style.display = "none";

	// Cambiar de usuario con ícono
	const changeBtn = document.createElement("button");
	changeBtn.innerHTML = "👤 Cambiar de usuario";
	changeBtn.addEventListener("click", () => {
		menu.style.display = "none";
		showUserSwitcher(users, user);
	});

	// Separador visual
	const separator = document.createElement("hr");
	separator.style.margin = "0.5rem 0";
	separator.style.border = "none";
	separator.style.borderTop = "1px solid rgba(0, 0, 0, 0.1)";

	// Ir a inicio con ícono
	const goHomeBtn = document.createElement("button");
	goHomeBtn.innerHTML = "🏠 Ir a inicio";
	goHomeBtn.addEventListener("click", () => {
		const user = JSON.parse(localStorage.getItem("usuarioActual"));
		if (!user) return;

		const fullName = `${user.name} ${user.lastName}`;
		const color = getColorFromName(user.name, user.lastName);
		showLoadingOverlay(fullName, color, "regresando");

		setTimeout(() => {
			// Asegurar la navegación correcta al index.html
			window.location.href = "../index.html";
		}, 2500);
	});

	menu.appendChild(changeBtn);
	menu.appendChild(separator);
	menu.appendChild(goHomeBtn);


	avatarBtn.addEventListener("click", (e) => {
		e.stopPropagation();

		// Si el menú ya está visible, simplemente lo cerramos
		if (menu.style.display === "flex") {
			menu.style.display = "none";
		} else {
			// Cerramos cualquier otro abierto y mostramos este
			closeAllDropdownMenus();
			menu.style.display = "flex";
		}
	});

	document.addEventListener("click", (e) => {
		const isClickInsideMenu = e.target.closest(".dropdown-menu");
		const isClickOnToggle = e.target.closest(".dropdown-toggle");

		if (!isClickInsideMenu && !isClickOnToggle) {
			menu.style.display = "none";
		}
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

function showLoadingOverlay(name, color, action = "cargando") {
	const overlay = document.createElement("div");
	overlay.className = "loading-overlay";
	
	// Definir el mensaje según la acción
	let message;
	if (action === "regresando") {
		message = `Regresando a inicio...`;
	} else {
		message = `Cargando, ${name}...`;
	}
	
	overlay.innerHTML = `
		<div class="loading-content">
			<div class="loading-user-icon" style="background-color: ${color}">
				<svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
					<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4
					7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4
					c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2
					c0-3.2-6.4-4.8-9.6-4.8z"/>
				</svg>
			</div>
			<h2 class="loading-title">${message}</h2>
			<div class="loading-spinner"><div class="spinner"></div></div>
		</div>
	`;
	document.body.appendChild(overlay);
	requestAnimationFrame(() => overlay.classList.add("active"));
}

function showUserSwitcher(users, currentUser) {
	const overlay = document.createElement("div");
	overlay.className = "user-switcher-overlay";
	overlay.innerHTML = `
		<div class="user-switcher">
			<h2>Selecciona un usuario</h2>
			<div class="user-switcher__list">
				${users.map(user => {
		const isCurrent = user.name === currentUser.name && user.lastName === currentUser.lastName;
		const label = isCurrent ? `<span class='user-status'>🟢 Conectado</span>` : "";
		const image = user.image
			? `<img src="${user.image}" alt="${user.name}" class="user__photo">`
			: `<div class="users__icon-svg"><svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>`;
		return `
						<div class="user-card-switch ${isCurrent ? 'current' : ''}" data-name="${user.name}" data-lastname="${user.lastName}">
							${image}
							<span class="user-name">${user.name} ${user.lastName}</span>
							${label}
						</div>
					`;
	}).join('') || "<p>No hay más usuarios para cambiar</p>"}
			</div>
			<button class="close-switcher">Cerrar</button>
		</div>
	`;
	document.body.appendChild(overlay);

	document.querySelector(".close-switcher").addEventListener("click", () => {
		overlay.remove();
	});

	overlay.querySelectorAll(".user-card-switch").forEach(card => {
		if (card.classList.contains("current")) return;
		card.addEventListener("click", () => {
			const name = card.dataset.name;
			const lastName = card.dataset.lastname;
			const selected = users.find(u => u.name === name && u.lastName === lastName);
			if (selected) {
				localStorage.setItem("usuarioActual", JSON.stringify(selected));
				showLoadingOverlay(`${selected.name} ${selected.lastName}`, getColorFromName(selected.name, selected.lastName));
				setTimeout(() => window.location.reload(), 2500);

			}
		});
	});
}