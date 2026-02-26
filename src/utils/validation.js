/**
 * Validates if the chatbot flow is complete
 * @param {Array} nodes - Array of node objects
 * @param {Array} edges - Array of edge objects
 * @returns {Object} Validation result with {isValid, error}
 */
export const validateFlow = (nodes, edges) => {
    if (nodes.length <= 1) {
        return { isValid: true, error: null };
    }

    // Nodes with empty target handles have no incoming edges
    const nodesWithEmptyTarget = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodesWithEmptyTarget.length > 1) {
        return {
            isValid: false,
            error: 'Cannot save flow. More than one node has an empty target handle.',
        };
    }

    return { isValid: true, error: null };
};
