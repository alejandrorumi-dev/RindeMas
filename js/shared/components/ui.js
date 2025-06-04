// ============================
// RINDEMÁS - GESTIÓN DE INTERFAZ
// ============================

import { CONFIG } from '../config/constants.js';
import { setEditingMode } from '../../pages/home/formHandler.js';

/**
 * Oculta el formulario con animación opcional
 * @param {boolean} animated - Si debe usar animación
 */
export function closeForm(animated = true) {
    const formSection = document.getElementById("form");
    const usersSection = document.getElementById("users");
    const form = document.getElementById("form__content");
    // Eliminar el input y label de foto si existen
    const photoInput = document.getElementById("form__photo");
    if (photoInput) {
        const label = photoInput.previousElementSibling;
        photoInput.remove();
        if (label && label.tagName === "LABEL") {
            label.remove();
        }
    }

    const submitBtn = document.querySelector(".form__submit");
    const formTitle = document.querySelector(".form__title");
    const formMessage = document.getElementById("formMessage");

    formSection.classList.remove("form--show");

    const resetForm = () => {
        formSection.classList.add("form--hidden");
        usersSection.classList.remove("users--hidden");
        form.reset();
        submitBtn.textContent = "Crear usuario";
        formTitle.textContent = "Crear nuevo usuario";
        formMessage.classList.add("form__message--hidden");
        formMessage.textContent = "";
    };

    if (animated) {
        setTimeout(resetForm, CONFIG.ANIMATION_DELAYS.FORM_CLOSE);
    } else {
        resetForm();
    }
}

/**
 * Muestra mensaje grande de éxito
 * @param {string} text - Texto del mensaje
 */
export function showBigMessage(text) {
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
        }, CONFIG.ANIMATION_DELAYS.MESSAGE_HIDE);
    }, CONFIG.ANIMATION_DELAYS.MESSAGE_SHOW);
}

/**
 * Muestra mensaje pequeño de eliminación
 * @param {string} text - Texto del mensaje
 */
export function showDeleteMessage(text) {
    const countdownEl = document.getElementById("countdownMessage");

    countdownEl.textContent = text;
    countdownEl.classList.remove("hidden");
    countdownEl.classList.add("show");

    setTimeout(() => {
        countdownEl.classList.remove("show");
        countdownEl.classList.add("hide");
        setTimeout(() => {
            countdownEl.classList.add("hidden");
            countdownEl.classList.remove("hide");
            countdownEl.textContent = "";
        }, CONFIG.ANIMATION_DELAYS.DELETE_MESSAGE_HIDE);
    }, CONFIG.ANIMATION_DELAYS.DELETE_MESSAGE);
}

/**
 * Muestra formulario para crear usuario
 */
export function showCreateForm() {
    const form = document.getElementById("form__content");
    const usersSection = document.getElementById("users");
    const formSection = document.getElementById("form");
    const submitBtn = document.querySelector(".form__submit");
    const formTitle = document.querySelector(".form__title");
    const formMessage = document.getElementById("formMessage");

    submitBtn.textContent = "Crear usuario";
    formTitle.textContent = "Crear nuevo usuario";
    formMessage.classList.add("form__message--hidden");
    formMessage.textContent = "";

    form.reset();
    usersSection.classList.add("users--hidden");
    formSection.classList.remove("form--hidden");
    setTimeout(() => formSection.classList.add("form--show"), 10);
}

/**
 * Muestra formulario para editar usuario
 * @param {number} index - Índice del usuario a editar
 * @param {Object} user - Datos del usuario
 */
export function showEditForm(index, user) {
    const formSection = document.getElementById("form");
    const usersSection = document.getElementById("users");
    const submitBtn = document.querySelector(".form__submit");
    const formTitle = document.querySelector(".form__title");

    // Configurar modo edición
    setEditingMode(index);

    document.getElementById("form__name").value = user.name;
    document.getElementById("form__lastName").value = user.lastName;
    submitBtn.textContent = "Guardar cambios";
    formTitle.textContent = "Editar usuario";

    usersSection.classList.add("users--hidden");
    formSection.classList.remove("form--hidden");
    setTimeout(() => formSection.classList.add("form--show"), 10);
}

/**
 * Muestra mensaje de error en el formulario
 * @param {string} message - Mensaje de error
 */
export function showFormError(message) {
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = message;
    formMessage.className = "form__message form__message--error";
    formMessage.classList.remove("form__message--hidden");
}

/**
 * Muestra mensaje de información en el formulario
 * @param {string} message - Mensaje de información
 */
export function showFormInfo(message) {
    const formMessage = document.getElementById("formMessage");
    formMessage.textContent = message;
    formMessage.className = "form__message form__message--info";
    formMessage.classList.remove("form__message--hidden");
}