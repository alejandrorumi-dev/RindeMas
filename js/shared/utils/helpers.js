// ============================
// RINDEMÁS - UTILIDADES
// ============================

import { COLORS } from '../config/constants.js';

/**
 * Genera un color basado en el nombre y apellido
 * @param {string} name - Nombre del usuario
 * @param {string} lastName - Apellido del usuario
 * @returns {string} Color hexadecimal
 */
export function getColorFromName(name, lastName) {
    const full = (name + lastName).toLowerCase();
    let sum = 0;
    for (let i = 0; i < full.length; i++) {
        sum += full.charCodeAt(i);
    }
    return COLORS[sum % COLORS.length];
}

/**
 * Cierra todos los menús desplegables abiertos
 */
export function closeAllDropdownMenus() {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none";
    });
}

/**
 * Actualiza la visibilidad de las acciones múltiples
 */
export function updateBulkActionsVisibility() {
    const anySelected = Array.from(document.querySelectorAll(".select-user-checkbox"))
        .some(cb => cb.checked);
    document.getElementById("bulk-actions").classList.toggle("hidden", !anySelected);
    document.getElementById("delete-selected-btn").classList.toggle("hidden", !anySelected);
}

/**
 * Obtiene los índices de usuarios seleccionados
 * @returns {number[]} Array de índices seleccionados
 */
export function getSelectedUserIndices() {
    return Array.from(document.querySelectorAll(".select-user-checkbox:checked"))
        .map(cb => parseInt(cb.dataset.index));
}