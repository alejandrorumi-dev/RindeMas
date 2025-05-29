// Variables globales
let isEditing = false;
let editingIndex = null;
let submitBtn;
let formTitle;
let pendingDeleteIndex = null;

document.addEventListener("DOMContentLoaded", () => {
	const addUserBtn = document.getElementById("add-user-btn");
	const usersSection = document.getElementById("users");
	const formSection = document.getElementById("form");
	const form = document.getElementById("form__content");
	const message = document.getElementById("message");

	// Inicializar referencias a elementos después de que el DOM esté listo
	submitBtn = document.querySelector(".form__submit");
	formTitle = document.querySelector(".form__title");

	// Mostrar formulario
	addUserBtn.addEventListener("click", () => {
		isEditing = false;
		editingIndex = null;
		submitBtn.textContent = "Crear usuario";
		formTitle.textContent = "Crear nuevo usuario";

		form.reset();
		usersSection.classList.add("users--hidden");
		formSection.classList.remove("form--hidden");
		setTimeout(() => {
			formSection.classList.add("form--show");
		}, 10);
	});

	// Capturar datos al enviar el formulario
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const firstName = document.getElementById("form__name").value.trim();
		const lastName = document.getElementById("form__lastName").value.trim();
		let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

		if (isEditing && editingIndex !== null) {
			// Modo edición
			storedUsers[editingIndex] = { name: firstName, lastName: lastName };
			localStorage.setItem("users", JSON.stringify(storedUsers));

			isEditing = false;
			editingIndex = null;
			submitBtn.textContent = "Crear usuario";
			formTitle.textContent = "Crear nuevo usuario";

			message.textContent = "Usuario editado correctamente ✅";
		} else {
			// Modo creación
			const newUser = { name: firstName, lastName: lastName };
			storedUsers.push(newUser);
			localStorage.setItem("users", JSON.stringify(storedUsers));

			message.textContent = "Usuario añadido correctamente ✅";
		}

		form.reset();
		formSection.classList.remove("form--show");
		setTimeout(() => {
			formSection.classList.add("form--hidden");
		}, 300); // debe coincidir con la duración de la transición CSS


		// Mostrar mensaje con animación
		message.classList.remove("message--hidden");
		message.classList.add("message--show");

		// Esperar 2s y hacer fade-out
		setTimeout(() => {
			message.classList.remove("message--show");
			message.classList.add("message--hide");

			setTimeout(() => {
				message.classList.remove("message--hide");
				message.classList.add("message--hidden");
				usersSection.classList.remove("users--hidden");

				renderUsers();
			}, 300);
		}, 2000);
	});

	// === Confirmación visual para eliminar usuarios ===
	const confirmDialog = document.getElementById("confirmDialog");
	const confirmYes = document.getElementById("confirmYes");
	const confirmNo = document.getElementById("confirmNo");

	// Confirmar eliminación
	confirmYes.addEventListener("click", () => {
		const users = JSON.parse(localStorage.getItem("users")) || [];
		if (pendingDeleteIndex !== null) {
			users.splice(pendingDeleteIndex, 1);
			localStorage.setItem("users", JSON.stringify(users));
			renderUsers();
		}
		confirmDialog.classList.add("hidden");
		pendingDeleteIndex = null;
	});

	// Cancelar eliminación
	confirmNo.addEventListener("click", () => {
		confirmDialog.classList.add("hidden");
		pendingDeleteIndex = null;
	});

	renderUsers();
});

function getColorFromName(name, lastName) {
	const colors = ["#FFD369", "#FF9F68", "#87CEEB", "#A3E4D7", "#F5B7B1", "#F7DC6F", "#B9FBC0"];
	const full = (name + lastName).toLowerCase();
	let sum = 0;
	for (let i = 0; i < full.length; i++) {
		sum += full.charCodeAt(i);
	}
	const index = sum % colors.length;
	return colors[index];
}

function renderUsers() {
	const container = document.getElementById("users-cards");
	const staticButton = document.getElementById("add-user-btn");
	const usersSection = document.getElementById("users");
	const formSection = document.getElementById("form");

	container.innerHTML = "";

	const users = JSON.parse(localStorage.getItem("users")) || [];

	// Ajustar centrado si solo hay el botón
	if (users.length === 0) {
		container.style.display = "flex";
		container.style.justifyContent = "center";
	} else {
		container.style.display = "grid";
		container.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
		container.style.justifyItems = "center";
	}

	users.forEach((user, index) => {
		const card = document.createElement("div");
		card.classList.add("user_card");

		const color = getColorFromName(user.name, user.lastName);

		card.innerHTML =
			'<div class="users__icon-svg" style="background-color:' + color + '">' +
			'<svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">' +
			'<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/>' +
			'</svg>' +
			'</div>' +
			'<span class="user_name">' + user.name + ' ' + user.lastName + '</span>' +
			'<div class="user_actions">' +
			'<button class="edit-user-btn" title="Editar">' +
			'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">' +
			'<path d="M4 21h4l11-11-4-4L4 17v4z"/>' +
			'</svg>' +
			'</button>' +
			'<button class="delete-user-btn" title="Eliminar">' +
			'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">' +
			'<path d="M3 6h18M9 6v12M15 6v12M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/>' +
			'</svg>' +
			'</button>' +
			'</div>';

		card.querySelector(".edit-user-btn").addEventListener("click", () => {
			isEditing = true;
			editingIndex = index;

			// Rellenar campos del formulario
			document.getElementById("form__name").value = user.name;
			document.getElementById("form__lastName").value = user.lastName;

			// Cambiar título y botón
			submitBtn.textContent = "Guardar cambios";
			formTitle.textContent = "Editar usuario";

			// Mostrar formulario con animación
			usersSection.classList.add("users--hidden");
			formSection.classList.remove("form--hidden");
			setTimeout(() => {
				formSection.classList.add("form--show");
			}, 10);
		});

		card.querySelector(".delete-user-btn").addEventListener("click", () => {
			const confirmDialog = document.getElementById("confirmDialog");
			pendingDeleteIndex = index;
			confirmDialog.classList.remove("hidden");
		});

		container.appendChild(card);
	});

	// Si hay menos de 6 usuarios, mostrar botón de añadir
	if (users.length < 6) {
		container.appendChild(staticButton);
		staticButton.style.display = "flex";
	} else {
		staticButton.style.display = "none";
	}
}