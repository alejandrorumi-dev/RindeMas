// ============================
// RINDEMÁS - MANEJADORES DE EVENTOS GLOBALES
// ============================

import { closeAllDropdownMenus, getSelectedUserIndices, updateBulkActionsVisibility } from '../../shared/utils/helpers.js';
import { showCreateForm } from '../../shared/components/ui.js';
import { showDeleteConfirmation } from '../../shared/components/confirmation.js';

/**
 * Configura los event listeners globales
 */
export function setupGlobalEventHandlers() {
    // Event listener global para cerrar menús desplegables
    document.addEventListener("click", (e) => {
        // Si el clic no es en un botón de toggle o dentro de un menú, cerrar todos los menús
        if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
            closeAllDropdownMenus();
        }
    });

    // Botón Añadir usuario
    const addUserBtn = document.getElementById("add-user-btn");
    addUserBtn.addEventListener("click", showCreateForm);
}

/**
 * Configura los event listeners para acciones masivas
 */
export function setupBulkActionHandlers() {
    // Eliminar usuarios seleccionados
    document.getElementById("delete-selected-btn").addEventListener("click", () => {
        const selected = getSelectedUserIndices();
        if (selected.length === 0) return;
        showDeleteConfirmation(selected, true);
    });

    // Seleccionar todos los usuarios
    document.getElementById("select-all-btn").addEventListener("click", () => {
        document.querySelectorAll(".select-user-checkbox").forEach(cb => {
            cb.style.display = "block";
            cb.checked = true;
        });
        updateBulkActionsVisibility();
    });
}