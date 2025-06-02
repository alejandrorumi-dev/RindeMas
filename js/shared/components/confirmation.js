// ============================
// RINDEMÁS - DIÁLOGOS DE CONFIRMACIÓN
// ============================

import { CONFIG, MESSAGES } from '../config/constants.js';
import { showDeleteMessage } from './ui.js';
import { deleteUsers, getUsers } from '../utils/storage.js';
import { renderUsers } from '../../pages/home/userRenderer.js';

// Variables globales para el manejo de confirmación
let pendingDeleteIndex = null;
let pendingDeleteIndices = [];

/**
 * Configura los event listeners del diálogo de confirmación
 */
export function setupConfirmationDialog() {
    const confirmDialog = document.getElementById("confirmDialog");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    confirmYes.addEventListener("click", () => {
        // Cerrar diálogo de confirmación
        confirmDialog.classList.add("hidden");

        // Determinar qué eliminar
        let indicesToDelete = [];

        if (pendingDeleteIndices.length > 0) {
            // Eliminación múltiple
            indicesToDelete = [...pendingDeleteIndices];
        } else if (pendingDeleteIndex !== null) {
            // Eliminación individual
            indicesToDelete = [pendingDeleteIndex];
        }

        // Ejecutar eliminación con cuenta regresiva
        if (indicesToDelete.length > 0) {
            executeDeleteWithCountdown(indicesToDelete);
        }

        // Limpiar variables
        pendingDeleteIndex = null;
        pendingDeleteIndices = [];
    });

    confirmNo.addEventListener("click", () => {
        confirmDialog.classList.add("hidden");
        pendingDeleteIndex = null;
        pendingDeleteIndices = [];
    });
}

/**
 * Muestra diálogo de confirmación para eliminar usuarios
 * @param {number[]} indices - Índices de usuarios a eliminar
 * @param {boolean} isMultiple - Si es eliminación múltiple
 */
export function showDeleteConfirmation(indices, isMultiple = false) {
    const users = getUsers();
    const userNames = indices.map(idx => `${users[idx].name} ${users[idx].lastName}`);

    // Actualizar texto del diálogo de confirmación
    const confirmText = document.querySelector("#confirmDialog p");
    if (isMultiple) {
        confirmText.textContent = `¿Estás seguro de que quieres eliminar ${indices.length} usuario(s)?`;
    } else {
        confirmText.textContent = `¿Estás seguro de que quieres eliminar a ${userNames[0]}?`;
    }

    // Mostrar diálogo de confirmación
    const confirmDialog = document.getElementById("confirmDialog");
    confirmDialog.classList.remove("hidden");

    // Configurar los índices pendientes
    if (isMultiple) {
        pendingDeleteIndices = [...indices];
        pendingDeleteIndex = null;
    } else {
        pendingDeleteIndex = indices[0];
        pendingDeleteIndices = [];
    }
}

/**
 * Ejecuta la eliminación con cuenta regresiva
 * @param {number[]} indices - Índices de usuarios a eliminar
 */
function executeDeleteWithCountdown(indices) {
    const countdownEl = document.getElementById("countdownMessage");
    let seconds = CONFIG.COUNTDOWN_SECONDS;

    countdownEl.textContent = `🕒 Eliminando ${indices.length} usuario(s) en ${seconds} segundos...`;
    countdownEl.classList.remove("hidden");
    countdownEl.classList.add("show");

    const countdown = setInterval(() => {
        seconds--;
        countdownEl.textContent = `🕒 Eliminando ${indices.length} usuario(s) en ${seconds} segundos...`;

        if (seconds === 0) {
            clearInterval(countdown);

            // Eliminar usuarios
            deleteUsers(indices);

            // Mostrar mensaje de éxito
            const message = indices.length > 1 ? MESSAGES.USERS_DELETED : MESSAGES.USER_DELETED;
            showDeleteMessage(message);
            renderUsers();
        }
    }, 1000);
}