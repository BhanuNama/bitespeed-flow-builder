import React from 'react';
import { BotMessageSquare } from 'lucide-react';

export default function NodesPanel() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 border-r border-gray-200 bg-white flex flex-col pt-6 items-center flex-shrink-0 z-10 shadow-sm relative">
            <div className="w-full px-4 mb-4">
                <h3 className="text-gray-500 font-semibold text-xs tracking-wider uppercase">Nodes</h3>
            </div>

            <div
                className="border-2 border-indigo-200 rounded-xl p-4 w-44 flex flex-col items-center justify-center cursor-grab text-indigo-600 bg-white shadow-sm hover:shadow-md hover:border-indigo-400 hover:-translate-y-1 hover:bg-indigo-50/50 transition-all duration-300 group select-none"
                onDragStart={(event) => onDragStart(event, 'textMessage')}
                draggable
            >
                <div className="bg-indigo-100 p-2 rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                    <BotMessageSquare size={26} className="text-indigo-600" />
                </div>
                <span className="font-bold text-sm tracking-wide text-slate-700">Message Node</span>
                <span className="text-[10px] text-slate-400 font-medium mt-1">Drag to add</span>
            </div>
        </div>
    );
}
