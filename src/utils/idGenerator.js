/**
 * Generates a unique ID for nodes and edges
 * @returns {string} A unique identifier
 */
export const generateUniqueId = () => {
    return `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
