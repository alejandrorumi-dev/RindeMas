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
		// Paso 1: Borrar letra a letra
		const borrar = setInterval(() => {
			borrarIndex--;
			h2.textContent = `${inicio}${"USUARIO".slice(0, borrarIndex)}${fin}`;

			if (borrarIndex === 0) {
				clearInterval(borrar);

				// Paso 2: Escribir nombre letra a letra
				let escribirIndex = 0;
				const escribir = setInterval(() => {
					h2.textContent = `${inicio}${nombre.slice(0, escribirIndex)}${fin}`;
					escribirIndex++;

					if (escribirIndex > nombre.length) {
						clearInterval(escribir);
					}
				}, 150); // velocidad escritura
			}
		}, 150); // velocidad borrado
	}, 1000); // ⏱ espera antes de comenzar
});
