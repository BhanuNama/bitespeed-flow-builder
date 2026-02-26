import React, { useRef, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useReactFlow,
    ReactFlowProvider,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../hooks/useFlowStore';
import TextNode from './TextNode';
import { generateUniqueId } from '../utils/idGenerator';
import { MousePointerSquareDashed } from 'lucide-react';

const nodeTypes = {
    textMessage: TextNode,
};

// Default edge style — teal animated edges for a premium look
const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#0d9488', strokeWidth: 2 },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#0d9488',
    },
};

function FlowCanvas() {
    const reactFlowWrapper = useRef(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNodeId } = useFlowStore();
    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: generateUniqueId(),
                type,
                position,
                data: { label: '' },
            };

            addNode(newNode);
            setSelectedNodeId(newNode.id);
        },
        [addNode, screenToFlowPosition, setSelectedNodeId]
    );

    const onNodeClick = (_, node) => setSelectedNodeId(node.id);
    const onPaneClick = () => setSelectedNodeId(null);

    return (
        <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
            >
                <Background variant="dots" gap={20} size={1.2} color="#cbd5e1" />
                <Controls className="!shadow-md !border !border-slate-200 !rounded-xl overflow-hidden" />
                <MiniMap
                    nodeStrokeColor="#0d9488"
                    nodeColor="#ccfbf1"
                    maskColor="rgba(248, 250, 252, 0.7)"
                    className="!rounded-xl !border !border-slate-200 !shadow-md"
                />
            </ReactFlow>

            {/* Empty canvas hint — shown when no nodes are on the canvas */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                        <div className="bg-slate-100 p-5 rounded-2xl">
                            <MousePointerSquareDashed size={36} className="text-slate-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-slate-500 font-bold text-base">Canvas is empty</p>
                            <p className="text-slate-400 text-sm mt-1">Drag a node from the left panel to get started</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Canvas() {
    return (
        <ReactFlowProvider>
            <FlowCanvas />
        </ReactFlowProvider>
    );
}
