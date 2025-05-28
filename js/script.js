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
    console.log("Formulario enviado");

    const firstName = document.getElementById("form__name").value.trim();
    const lastName = document.getElementById("form__lastName").value.trim();

    const newUser = { name: firstName, lastName: lastName };
    console.log("Nuevo usuario:", newUser);

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
      }, 300); // duración de la animación de salida
    }, 2000);
  });
});