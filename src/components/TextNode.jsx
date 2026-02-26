import React from 'react';
import { Handle, Position } from 'reactflow';
import { BotMessageSquare, MessageSquare } from 'lucide-react';

/**
 * TextNode Component - Represents a text message node on the canvas
 *
 * @param {Object} props
 * @param {Object} props.data - Node data
 * @param {boolean} props.selected - Whether node is selected
 * @returns {JSX.Element}
 */
export default function TextNode({ data, selected }) {
    return (
        <div
            className={`bg-white rounded-2xl overflow-hidden min-w-[260px] max-w-[320px] transition-all duration-200 ${selected
                    ? 'shadow-xl shadow-indigo-100 ring-2 ring-indigo-400'
                    : 'shadow-md shadow-slate-200 hover:shadow-lg hover:shadow-slate-300'
                }`}
        >
            {/* Header */}
            <div className="bg-teal-600 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1 rounded-md">
                        <BotMessageSquare size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-xs text-white tracking-widest uppercase">Send Message</span>
                </div>
                <span className="text-[9px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full tracking-wider">TEXT</span>
            </div>

            {/* Message Body */}
            <div className="px-4 py-4 bg-slate-50 border-b border-slate-100">
                <div className="bg-white rounded-xl px-3 py-2.5 shadow-sm border border-slate-100 flex items-start gap-2 min-h-[48px]">
                    <MessageSquare size={13} className="text-slate-300 mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] leading-relaxed text-slate-600 break-words w-full">
                        {data.label || (
                            <span className="text-slate-300 italic font-normal">No message yet...</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Target handle — left (incoming, can have multiple) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white hover:!bg-slate-600 hover:!scale-125 transition-all !rounded-full !shadow-sm"
            />

            {/* Source handle — right (outgoing, max one) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white hover:!bg-indigo-700 hover:!scale-125 transition-all !rounded-full !shadow-sm"
            />
        </div>
    );
}
