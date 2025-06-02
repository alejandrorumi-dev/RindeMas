// ============================
// RINDEMÁS - GESTIÓN DE DATOS
// ============================

/**
 * Obtiene todos los usuarios del almacenamiento local
 * @returns {Array} Array de usuarios
 */
export function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

/**
 * Guarda los usuarios en el almacenamiento local
 * @param {Array} users - Array de usuarios a guardar
 */
export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Añade un nuevo usuario
 * @param {Object} user - Usuario a añadir
 */
export function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

/**
 * Actualiza un usuario existente
 * @param {number} index - Índice del usuario a actualizar
 * @param {Object} user - Datos actualizados del usuario
 */
export function updateUser(index, user) {
    const users = getUsers();
    users[index] = user;
    saveUsers(users);
}

/**
 * Elimina usuarios por índices
 * @param {number[]} indices - Array de índices a eliminar
 */
export function deleteUsers(indices) {
    const users = getUsers();
    // Ordenar índices de mayor a menor para evitar problemas
    const sortedIndices = indices.sort((a, b) => b - a);
    sortedIndices.forEach(idx => {
        users.splice(idx, 1);
    });
    saveUsers(users);
}

/**
 * Verifica si un usuario ya existe
 * @param {string} firstName - Nombre
 * @param {string} lastName - Apellido
 * @param {number} excludeIndex - Índice a excluir de la verificación (para edición)
 * @returns {boolean} True si el usuario existe
 */
export function userExists(firstName, lastName, excludeIndex = null) {
    const users = getUsers();
    const fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
    return users.some((user, idx) => {
        const name = `${user.name.toLowerCase()} ${user.lastName.toLowerCase()}`;
        return name === fullName && idx !== excludeIndex;
    });
}