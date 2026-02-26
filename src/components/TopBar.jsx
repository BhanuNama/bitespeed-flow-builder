import React, { useState } from 'react';
import { useFlowStore } from '../hooks/useFlowStore';
import { validateFlow } from '../utils/validation';
import { Workflow, Save } from 'lucide-react';

export default function TopBar({ showToast }) {
    const { nodes, edges, saveFlow } = useFlowStore();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        const { isValid, error } = validateFlow(nodes, edges);

        setTimeout(() => {
            setIsSaving(false);
            if (isValid) {
                const saved = saveFlow();
                if (saved) {
                    showToast('Flow Saved', 'Your chatbot flow was saved successfully.', 'success');
                } else {
                    showToast('Save Failed', 'Could not write to storage. Please try again.', 'error');
                }
            } else {
                showToast('Cannot Save Flow', error, 'error');
            }
        }, 400);
    };

    return (
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 relative shadow-sm">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
                <div className="bg-teal-600 p-1.5 rounded-lg">
                    <Workflow size={18} className="text-white" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="font-extrabold text-slate-800 text-base tracking-tight">BiteSpeed</span>
                    <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Flow Builder</span>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${isSaving
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow-md'
                    }`}
            >
                <Save size={15} className={isSaving ? 'animate-spin' : ''} />
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
}
