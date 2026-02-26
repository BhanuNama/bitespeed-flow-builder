import React from 'react';
import { useFlowStore } from '../hooks/useFlowStore';
import { Layers, GitBranch, CircleDot } from 'lucide-react';

export default function StatusBar() {
    const { nodes, edges } = useFlowStore();

    return (
        <div className="h-9 bg-white border-t border-slate-200 flex items-center justify-between px-5 z-20 relative text-xs shadow-[0_-1px_4px_rgba(0,0,0,0.04)]">
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 text-slate-500">
                <CircleDot size={12} className="text-teal-500" />
                <span className="font-semibold text-slate-600">Ready</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <Layers size={12} className="text-slate-400" />
                    <span>Nodes:</span>
                    <span className={`font-bold ml-0.5 ${nodes.length > 0 ? 'text-teal-600' : 'text-slate-400'}`}>
                        {nodes.length}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 border-l border-slate-200 pl-5">
                    <GitBranch size={12} className="text-slate-400" />
                    <span>Connections:</span>
                    <span className={`font-bold ml-0.5 ${edges.length > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {edges.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
