// ============================
// RINDEMÁS - ARCHIVO PRINCIPAL
// Punto de entrada de la aplicación modular
// ============================

import { setupGlobalEventHandlers, setupBulkActionHandlers } from './eventHandlers.js';
import { setupFormHandlers } from './formHandler.js';
import { setupConfirmationDialog } from '../../shared/components/confirmation.js';
import { renderUsers } from './userRenderer.js';

/**
 * Inicializa la aplicación
 */
function initApp() {
    // Configurar todos los manejadores de eventos
    setupGlobalEventHandlers();
    setupBulkActionHandlers();
    setupFormHandlers();
    setupConfirmationDialog();

    // Renderizar usuarios iniciales
    renderUsers();
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initApp);