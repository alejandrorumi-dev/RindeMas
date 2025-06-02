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

    // Verificar si el usuario ya existe
    if (userExists(firstName, lastName, editingIndex)) {
        showFormError(MESSAGES.USER_EXISTS);
        return;
    }

    // Validar límite máximo de usuarios (solo para nuevos usuarios)
    if (!isEditing && users.length >= CONFIG.MAX_USERS) {
        showFormError(MESSAGES.MAX_USERS_REACHED);
        return;
    }

    if (isEditing && editingIndex !== null) {
        // Modo edición
        const currentUser = users[editingIndex];
        const hasChanges = currentUser.name !== firstName || currentUser.lastName !== lastName;

        if (!hasChanges) {
            showFormInfo(MESSAGES.NO_CHANGES);
            return;
        }

        updateUser(editingIndex, { name: firstName, lastName: lastName });
        resetEditingState();
        closeForm();
        showBigMessage(MESSAGES.USER_EDITED);
        renderUsers();
    } else {
        // Modo creación
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
}

/**
 * Resetea el estado de edición
 */
function resetEditingState() {
    isEditing = false;
    editingIndex = null;
}