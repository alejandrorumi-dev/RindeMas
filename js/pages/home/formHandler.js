// ============================
// RINDEMÁS - MANEJADOR DEL FORMULARIO
// ============================

import { CONFIG, MESSAGES } from '../../shared/config/constants.js';
import { getUsers, addUser, updateUser, userExists } from '../../shared/utils/storage.js';
import { closeForm, showBigMessage, showFormError, showFormInfo } from '../../shared/components/ui.js';
import { renderUsers } from './userRenderer.js';

// Variables para el estado del formulario
let isEditing = false;
let editingIndex = null;
let editedImage = null;

/**
 * Configura los event listeners del formulario
 */
export function setupFormHandlers() {
    const form = document.getElementById("form__content");
    const formBackBtn = document.querySelector(".form__back-btn");

    // Botón volver
    formBackBtn.addEventListener("click", () => closeForm(false));

    // Enviar formulario (crear o editar)
    form.addEventListener("submit", handleFormSubmit);
}

/**
 * Maneja el envío del formulario
 * @param {Event} e - Evento de envío
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById("form__name").value.trim();
    const lastName = document.getElementById("form__lastName").value.trim();
    const users = getUsers();

    const isEditing = editingIndex !== null;

    // ✅ 1. Verificar si el usuario ya existe (en creación o edición)
    if (userExists(firstName, lastName, editingIndex)) {
        showFormError(MESSAGES.USER_EXISTS);
        return;
    }

    // ✅ 2. Si es modo edición, validar cambios
    if (isEditing) {
        const currentUser = users[editingIndex];

        const hasChanges =
            currentUser.name !== firstName ||
            currentUser.lastName !== lastName ||
            (editedImage && currentUser.image !== editedImage);

        if (!hasChanges) {
            showFormInfo(MESSAGES.NO_CHANGES);
            return;
        }

        const updatedUser = {
            ...currentUser,
            name: firstName,
            lastName: lastName,
            image: editedImage || currentUser.image || null
        };

        updateUser(editingIndex, updatedUser);
        resetEditingState();
        editedImage = null;
        closeForm();
        showBigMessage(MESSAGES.USER_EDITED);
        renderUsers();
    } else {
        // ✅ 3. Validar límite máximo de usuarios
        if (users.length >= CONFIG.MAX_USERS) {
            showFormError(MESSAGES.MAX_USERS_REACHED);
            return;
        }

        // ✅ 4. Crear nuevo usuario
        const newUser = { name: firstName, lastName: lastName };
        addUser(newUser);
        closeForm();
        showBigMessage(MESSAGES.USER_CREATED);
        renderUsers();
    }

    document.getElementById("form__content").reset();
}

/**
 * Configura el formulario para modo edición
 * @param {number} index - Índice del usuario a editar
 */
export function setEditingMode(index) {
    isEditing = true;
    editingIndex = index;
    editedImage = null;

    const users = getUsers();
    const user = users[index];

    const form = document.getElementById("form__content");

    // Cambiar título
    document.querySelector(".form__title").textContent = "Editar usuario";

    // Rellenar campos
    document.getElementById("form__name").value = user.name;
    document.getElementById("form__lastName").value = user.lastName;

    // Evitar duplicar el input si ya existe
    if (!document.getElementById("form__photo")) {
        // LABEL
        const label = document.createElement("label");
        label.setAttribute("for", "form__photo");
        label.className = "form__label";
        label.textContent = "Foto de perfil:";

        // INPUT FILE
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.id = "form__photo";
        input.className = "form__input";

        const submitBtn = form.querySelector(".form__submit");
        form.insertBefore(label, submitBtn);
        form.insertBefore(input, submitBtn);

        // Leer imagen si se selecciona
        input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                editedImage = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
}

/**
 * Resetea el estado de edición
 */
function resetEditingState() {
    isEditing = false;
    editingIndex = null;
    editedImage = null;
}
