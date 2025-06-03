// ============================
// RINDEMÁS - RENDERIZADO DE USUARIOS
// ============================

import { CONFIG } from '../../shared/config/constants.js';
import { getColorFromName, closeAllDropdownMenus, updateBulkActionsVisibility } from '../../shared/utils/helpers.js';
import { getUsers } from '../../shared/utils/storage.js';
import { showEditForm } from '../../shared/components/ui.js';
import { showDeleteConfirmation } from '../../shared/components/confirmation.js';

/**
 * Renderiza la lista de usuarios
 */
export function renderUsers() {
    const container = document.getElementById("users-cards");
    const staticButton = document.getElementById("add-user-btn");

    // Limpiar tarjetas excepto el botón "Añadir Usuario"
    const userCards = container.querySelectorAll('.user_card');
    userCards.forEach(card => {
        if (card !== staticButton) card.remove();
    });

    const users = getUsers();

    // Configurar layout
    container.style.display = users.length === 0 ? "flex" : "grid";
    container.style.justifyContent = users.length === 0 ? "center" : "";

    // Añadir el botón "Añadir Usuario" si no está
    if (!container.contains(staticButton)) {
        container.appendChild(staticButton);
    }

    // Mostrar u ocultar el botón "Añadir Usuario"
    if (users.length < CONFIG.MAX_USERS) {
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
        const card = createUserCard(user, index);
        container.insertBefore(card, staticButton);
    });
}

/**
 * Crea una tarjeta de usuario
 * @param {Object} user - Datos del usuario
 * @param {number} index - Índice del usuario
 * @returns {HTMLElement} Elemento de tarjeta de usuario
 */
function createUserCard(user, index) {
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

    setupUserCardEvents(card, user, index);
    return card;
}

/**
 * Configura los eventos de una tarjeta de usuario
 * @param {HTMLElement} card - Elemento de tarjeta
 * @param {Object} user - Datos del usuario
 * @param {number} index - Índice del usuario
 */
function setupUserCardEvents(card, user, index) {
    const toggleBtn = card.querySelector(".dropdown-toggle");
    const menu = card.querySelector(".dropdown-menu");
    const checkbox = card.querySelector(".select-user-checkbox");

    // Mostrar/ocultar menú desplegable
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdownMenus();
        menu.style.display = menu.style.display === "none" ? "flex" : "none";
    });

    // Evitar que el clic dentro del menú lo cierre
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Editar usuario
    card.querySelector(".edit-user-btn").addEventListener("click", () => {
        menu.style.display = "none";
        showEditForm(index, user);
    });

    // Eliminar usuario individual
    card.querySelector(".delete-user-btn").addEventListener("click", () => {
        menu.style.display = "none";
        showDeleteConfirmation([index], false);
    });

    // Seleccionar usuario
    card.querySelector(".toggle-select-btn").addEventListener("click", () => {
        menu.style.display = "none";

        // Mostrar todos los checkboxes
        document.querySelectorAll(".select-user-checkbox").forEach(cb => {
            cb.style.display = "block";
        });

        // Marcar el checkbox del usuario actual
        checkbox.checked = true;
        updateBulkActionsVisibility();
    });

    // Event listener para cambios en checkbox
    checkbox.addEventListener("change", updateBulkActionsVisibility);

    // Ir a la página del usuario al hacer clic en la tarjeta (fuera del menú)
    card.addEventListener("click", (e) => {
        const clickedElement = e.target;
        const esMenu = clickedElement.closest(".user_dropdown");
        const esCheckbox = clickedElement.closest(".select-user-checkbox");

        if (!esMenu && !esCheckbox) {
            navigateToUser(user);
        }
    });
}

/**
 * Navega al usuario con pantalla de carga suave
 * @param {Object} user - Datos del usuario
 */
function navigateToUser(user) {
    // Crear overlay de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';

    const userName = `${user.name} ${user.lastName}`;
    const userColor = getColorFromName(user.name, user.lastName);

    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-user-icon" style="background-color: ${userColor}">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
            </div>
            <h2 class="loading-title">Cargando, ${userName}...</h2>
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
        </div>
    `;

    // Añadir al body
    document.body.appendChild(loadingOverlay);

    // Activar animación después de un frame
    requestAnimationFrame(() => {
        loadingOverlay.classList.add('active');
    });

    // Guardar datos del usuario
    localStorage.setItem("usuarioActual", JSON.stringify(user));

    // Navegar después de 2.5 segundos SIN fade-out previo
    setTimeout(() => {
        // Navegar directamente manteniendo el overlay visible
        window.location.href = "./pages/user.html";
    }, 2500);
}