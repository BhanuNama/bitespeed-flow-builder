import React, { useEffect, useState } from 'react';
import { useFlowStore } from '../hooks/useFlowStore';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPanel() {
    const { nodes, selectedNodeId, updateNodeData, setSelectedNodeId } = useFlowStore();
    const selectedNode = nodes.find((n) => n.id === selectedNodeId);
    const [textValue, setTextValue] = useState('');

    // Sync state when selection changes
    useEffect(() => {
        if (selectedNode) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTextValue(selectedNode.data.label || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNodeId, selectedNode]);

    if (!selectedNode) {
        return null; // Render nothing if no node is selected
    }

    const handleChange = (e) => {
        const val = e.target.value;
        setTextValue(val);
        updateNodeData(selectedNodeId, { label: val });
    };

    return (
        <div className="w-72 border-r border-slate-200 bg-white flex flex-col pt-0 z-10 shadow-lg relative h-full">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 bg-gradient-to-b from-slate-50 to-white">
                <button
                    onClick={() => setSelectedNodeId(null)}
                    className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition-all duration-200"
                >
                    <ArrowLeft size={18} />
                </button>
                <h2 className="font-bold tracking-wide text-slate-800">Message Node</h2>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1 overflow-y-auto">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Text Content
                    </label>
                    <textarea
                        className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all min-h-[140px] resize-y bg-slate-50 focus:bg-white"
                        value={textValue}
                        onChange={handleChange}
                        placeholder="Enter your message here..."
                    />
                    <p className="text-right text-[11px] text-slate-400 font-medium mt-1">
                        {textValue.length} characters
                    </p>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Node ID</span>
                <span
                    className="text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg tracking-wider overflow-hidden text-ellipsis whitespace-nowrap"
                    title={selectedNode.id}
                >
                    {selectedNode.id.split('_').pop()}
                </span>
            </div>
        </div>
    );
}
