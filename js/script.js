// ============================
// RINDEMÁS - SCRIPT PRINCIPAL
// Estructurado, comentado y reutilizable para futuros proyectos
// ============================

// Variables globales
let isEditing = false;
let editingIndex = null;
let submitBtn;
let formTitle;
let pendingDeleteIndex = null;

// Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
	// Referencias a elementos clave
	const addUserBtn = document.getElementById("add-user-btn");
	const usersSection = document.getElementById("users");
	const formSection = document.getElementById("form");
	const form = document.getElementById("form__content");
	const formMessage = document.getElementById("formMessage");
	const formBackBtn = document.querySelector(".form__back-btn");
	submitBtn = document.querySelector(".form__submit");
	formTitle = document.querySelector(".form__title");

	// Event listener global para cerrar menús desplegables
	document.addEventListener("click", (e) => {
		// Si el clic no es en un botón de toggle o dentro de un menú, cerrar todos los menús
		if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
			document.querySelectorAll(".dropdown-menu").forEach(menu => {
				menu.style.display = "none";
			});
		}
	});

	// Oculta el formulario con animación (por defecto)
	function closeForm(animated = true) {
		formSection.classList.remove("form--show");
		if (animated) {
			setTimeout(() => {
				formSection.classList.add("form--hidden");
				usersSection.classList.remove("users--hidden");
				form.reset();
				submitBtn.textContent = "Crear usuario";
				formTitle.textContent = "Crear nuevo usuario";
				formMessage.classList.add("form__message--hidden");
				formMessage.textContent = "";
			}, 2000);
		} else {
			formSection.classList.add("form--hidden");
			usersSection.classList.remove("users--hidden");
			form.reset();
			submitBtn.textContent = "Crear usuario";
			formTitle.textContent = "Crear nuevo usuario";
			formMessage.classList.add("form__message--hidden");
			formMessage.textContent = "";
		}
	}

	// Muestra mensaje grande de éxito
	function showBigMessage(text) {
		const message = document.getElementById("message");
		message.textContent = text;
		message.classList.remove("message--hidden");
		message.classList.add("message--show");

		setTimeout(() => {
			message.classList.remove("message--show");
			message.classList.add("message--hide");
			setTimeout(() => {
				message.classList.remove("message--hide");
				message.classList.add("message--hidden");
				message.textContent = "";
			}, 300);
		}, 2000);
	}

	// Botón volver
	formBackBtn.addEventListener("click", () => closeForm(false));

	// Botón Añadir usuario
	addUserBtn.addEventListener("click", () => {
		isEditing = false;
		editingIndex = null;
		submitBtn.textContent = "Crear usuario";
		formTitle.textContent = "Crear nuevo usuario";
		formMessage.classList.add("form__message--hidden");
		formMessage.textContent = "";

		form.reset();
		usersSection.classList.add("users--hidden");
		formSection.classList.remove("form--hidden");
		setTimeout(() => formSection.classList.add("form--show"), 10);
	});

	// Enviar formulario (crear o editar)
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const firstName = document.getElementById("form__name").value.trim();
		const lastName = document.getElementById("form__lastName").value.trim();
		let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

		const fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
		const isDuplicate = storedUsers.some((user, idx) => {
			const name = `${user.name.toLowerCase()} ${user.lastName.toLowerCase()}`;
			return name === fullName && idx !== editingIndex;
		});

		if (isDuplicate) {
			formMessage.textContent = "⚠️ Ese usuario ya existe.";
			formMessage.className = "form__message form__message--error";
			formMessage.classList.remove("form__message--hidden");
			return;
		}

		// Validar límite máximo de usuarios (solo para nuevos usuarios, no para edición)
		if (!isEditing && storedUsers.length >= 6) {
			formMessage.textContent = "⚠️ Máximo 6 usuarios permitidos.";
			formMessage.className = "form__message form__message--error";
			formMessage.classList.remove("form__message--hidden");
			return;
		}

		if (isEditing && editingIndex !== null) {
			const currentUser = storedUsers[editingIndex];
			const hasChanges = currentUser.name !== firstName || currentUser.lastName !== lastName;

			if (!hasChanges) {
				formMessage.textContent = "ℹ️ No se han realizado cambios.";
				formMessage.className = "form__message form__message--info";
				formMessage.classList.remove("form__message--hidden");
				return;
			}

			storedUsers[editingIndex] = { name: firstName, lastName: lastName };
			localStorage.setItem("users", JSON.stringify(storedUsers));
			isEditing = false;
			editingIndex = null;
			closeForm();
			showBigMessage("✅ Usuario editado correctamente");
			renderUsers();
		} else {
			const newUser = { name: firstName, lastName: lastName };
			storedUsers.push(newUser);
			localStorage.setItem("users", JSON.stringify(storedUsers));
			closeForm();
			showBigMessage("✅ Usuario registrado correctamente");
			renderUsers();
		}
		form.reset();
	});

	// Eliminar usuario (confirmación visual)
	const confirmDialog = document.getElementById("confirmDialog");
	const confirmYes = document.getElementById("confirmYes");
	const confirmNo = document.getElementById("confirmNo");

	confirmYes.addEventListener("click", () => {
		const users = JSON.parse(localStorage.getItem("users")) || [];

		if (pendingDeleteIndex !== null) {
			users.splice(pendingDeleteIndex, 1);
			localStorage.setItem("users", JSON.stringify(users));
		}

		// Cierra primero el cuadro de confirmación
		confirmDialog.classList.add("hidden");
		pendingDeleteIndex = null;

		// Luego actualiza la vista (le damos un pequeño retraso para asegurar que el DOM se actualiza)
		setTimeout(() => {
			renderUsers();
		}, 50);
	});

	confirmNo.addEventListener("click", () => {
		confirmDialog.classList.add("hidden");
		pendingDeleteIndex = null;
	});

	renderUsers();
});

// ============================
// FUNCIONES DE APOYO
// ============================

function getColorFromName(name, lastName) {
	const colors = ["#FFD369", "#FF9F68", "#87CEEB", "#A3E4D7", "#F5B7B1", "#F7DC6F", "#B9FBC0"];
	const full = (name + lastName).toLowerCase();
	let sum = 0;
	for (let i = 0; i < full.length; i++) sum += full.charCodeAt(i);
	return colors[sum % colors.length];
}

function renderUsers() {
	const container = document.getElementById("users-cards");
	const staticButton = document.getElementById("add-user-btn");

	// Limpiar tarjetas excepto el botón "Añadir Usuario"
	const userCards = container.querySelectorAll('.user_card');
	userCards.forEach(card => {
		if (card !== staticButton) card.remove();
	});

	const users = JSON.parse(localStorage.getItem("users")) || [];

	// Configurar layout
	container.style.display = users.length === 0 ? "flex" : "grid";
	container.style.justifyContent = users.length === 0 ? "center" : "";

	// Añadir el botón "Añadir Usuario" si no está
	if (!container.contains(staticButton)) {
		container.appendChild(staticButton);
	}

	// Mostrar u ocultar el botón "Añadir Usuario"
	if (users.length < 6) {
		staticButton.style.display = "flex";
		requestAnimationFrame(() => staticButton.classList.add("visible"));
	} else {
		staticButton.classList.remove("visible");
		setTimeout(() => staticButton.style.display = "none", 300);
	}

	// Ocultar barra de acciones múltiples al inicio
	const bulkActions = document.getElementById("bulk-actions");
	bulkActions.classList.add("hidden");
	document.getElementById("delete-selected-btn").classList.add("hidden");

	// Renderizar usuarios
	users.forEach((user, index) => {
		const card = document.createElement("div");
		card.classList.add("user_card");
		const color = getColorFromName(user.name, user.lastName);

		card.innerHTML = `
			<input type="checkbox" class="select-user-checkbox" style="display: none;" data-index="${index}">
			<div class="users__icon-svg" style="background-color:${color}">
				<svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
					<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/>
				</svg>
			</div>
			<span class="user_name">${user.name} ${user.lastName}</span>
			<div class="user_dropdown">
				<button class="dropdown-toggle" title="Acciones">⋮</button>
				<div class="dropdown-menu" style="display: none;">
					<button class="edit-user-btn">Editar</button>
					<button class="delete-user-btn">Eliminar</button>
					<button class="toggle-select-btn">Seleccionar</button>
				</div>
			</div>
		`;

		const toggleBtn = card.querySelector(".dropdown-toggle");
		const menu = card.querySelector(".dropdown-menu");

		// Mostrar/ocultar menú desplegable
		toggleBtn.addEventListener("click", (e) => {
			e.stopPropagation();

			// Cerrar todos los otros menús primero
			document.querySelectorAll(".dropdown-menu").forEach(m => {
				if (m !== menu) {
					m.style.display = "none";
				}
			});

			// Toggle del menú actual
			menu.style.display = menu.style.display === "none" ? "flex" : "none";
		});

		// Evitar que el clic dentro del menú lo cierre
		menu.addEventListener("click", (e) => {
			e.stopPropagation();
		});

		// Editar
		card.querySelector(".edit-user-btn").addEventListener("click", () => {
			menu.style.display = "none";

			isEditing = true;
			editingIndex = index;
			document.getElementById("form__name").value = user.name;
			document.getElementById("form__lastName").value = user.lastName;
			submitBtn.textContent = "Guardar cambios";
			formTitle.textContent = "Editar usuario";
			document.getElementById("users").classList.add("users--hidden");
			document.getElementById("form").classList.remove("form--hidden");
			setTimeout(() => document.getElementById("form").classList.add("form--show"), 10);
		});

		// Eliminar
		card.querySelector(".delete-user-btn").addEventListener("click", () => {
			menu.style.display = "none";

			pendingDeleteIndex = index;
			document.getElementById("confirmDialog").classList.remove("hidden");
		});

		// Seleccionar (mostrar checkbox)
		card.querySelector(".toggle-select-btn").addEventListener("click", () => {
			menu.style.display = "none";

			// Mostrar todos los checkboxes, no solo el del usuario actual
			document.querySelectorAll(".select-user-checkbox").forEach(checkbox => {
				checkbox.style.display = "block";
			});

			// Marcar el checkbox del usuario actual
			const checkbox = card.querySelector(".select-user-checkbox");
			checkbox.checked = true;

			updateBulkActionsVisibility();
		});

		container.insertBefore(card, staticButton);
	});

	// Eliminar seleccionados
	document.getElementById("delete-selected-btn").addEventListener("click", () => {
		const selected = Array.from(document.querySelectorAll(".select-user-checkbox:checked"))
			.map(cb => parseInt(cb.dataset.index));
		if (selected.length === 0) return;

		const updatedUsers = users.filter((_, idx) => !selected.includes(idx));
		localStorage.setItem("users", JSON.stringify(updatedUsers));
		renderUsers();
	});

	// Seleccionar todos
	document.getElementById("select-all-btn").addEventListener("click", () => {
		document.querySelectorAll(".select-user-checkbox").forEach(cb => {
			cb.style.display = "block";
			cb.checked = true;
		});
		updateBulkActionsVisibility();
	});

	// Checkboxes individuales
	document.querySelectorAll(".select-user-checkbox").forEach(cb => {
		cb.addEventListener("change", updateBulkActionsVisibility);
	});

	// Función auxiliar para mostrar/ocultar barra de acciones múltiples
	function updateBulkActionsVisibility() {
		const anySelected = Array.from(document.querySelectorAll(".select-user-checkbox"))
			.some(cb => cb.checked);
		document.getElementById("bulk-actions").classList.toggle("hidden", !anySelected);
		document.getElementById("delete-selected-btn").classList.toggle("hidden", !anySelected);
	}
}