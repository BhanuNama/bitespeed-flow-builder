import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

export const useFlowStore = create((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        // Source Handle (single outgoing edge max)
        // We filter out any previous edge connected to the same source handle
        const edges = get().edges;
        const filteredEdges = edges.filter(
            (e) => e.source !== connection.source || e.sourceHandle !== connection.sourceHandle
        );

        set({
            edges: addEdge(connection, filteredEdges),
        });
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node],
        });
    },
    updateNodeData: (nodeId, data) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
            ),
        });
    },
    setSelectedNodeId: (nodeId) => {
        set({ selectedNodeId: nodeId });
    },

    saveFlow: () => {
        const { nodes, edges } = get();
        try {
            localStorage.setItem('chatbot-flow', JSON.stringify({ nodes, edges }));
            return true;
        } catch (e) {
            console.error('Save failed', e);
            return false;
        }
    },
    loadFlow: () => {
        try {
            const data = localStorage.getItem('chatbot-flow');
            if (data) {
                const { nodes, edges } = JSON.parse(data);
                set({ nodes: nodes || [], edges: edges || [], selectedNodeId: null });
                return true;
            }
        } catch (e) {
            console.error('Load failed', e);
        }
        return false;
    }
}));
