document.addEventListener("DOMContentLoaded", () => {
	const addUserBtn = document.getElementById("add-user-btn");
	const usersSection = document.getElementById("users");
	const formSection = document.getElementById("form");
	const form = document.getElementById("form__content");
	const message = document.getElementById("message");

	// Mostrar formulario
	addUserBtn.addEventListener("click", () => {
		usersSection.classList.add("users--hidden");
		formSection.classList.remove("form--hidden");
	});

	// Capturar datos al enviar el formulario
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const firstName = document.getElementById("form__name").value.trim();
		const lastName = document.getElementById("form__lastName").value.trim();

		const newUser = { name: firstName, lastName: lastName };

		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		storedUsers.push(newUser);
		localStorage.setItem("users", JSON.stringify(storedUsers));

		form.reset();
		formSection.classList.add("form--hidden");

		// Mostrar mensaje con animación
		message.classList.remove("message--hidden");
		message.classList.add("message--show");

		// Esperar 2s y hacer fade-out
		setTimeout(() => {
			message.classList.remove("message--show");
			message.classList.add("message--hide");

			// Después del fade-out, ocultar el mensaje completamente
			setTimeout(() => {
				message.classList.remove("message--hide");
				message.classList.add("message--hidden");
				usersSection.classList.remove("users--hidden");

				renderUsers();
			}, 300); // duración de la animación de salida
		}, 2000);
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
			const newName = prompt("Editar nombre del usuario:", `${user.name} ${user.lastName}`);
			if (newName) {
				const [newFirstName, ...rest] = newName.trim().split(" ");
				const newLastName = rest.join(" ") || "";
				users[index].name = newFirstName;
				users[index].lastName = newLastName;
				localStorage.setItem("users", JSON.stringify(users));
				renderUsers();
			}
		});

		card.querySelector(".delete-user-btn").addEventListener("click", () => {
			const confirmDelete = confirm(`¿Eliminar a ${user.name} ${user.lastName}?`);
			if (confirmDelete) {
				users.splice(index, 1);
				localStorage.setItem("users", JSON.stringify(users));
				renderUsers();
			}
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