import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ title, message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-emerald-50' : 'bg-rose-50';
    const textColor = type === 'success' ? 'text-emerald-800' : 'text-rose-800';
    const borderColor = type === 'success' ? 'border-emerald-200' : 'border-rose-200';
    const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
    const iconColor = type === 'success' ? 'text-emerald-500' : 'text-rose-500';

    return (
        <div className={`fixed top-20 right-1/2 translate-x-1/2 z-50 p-4 border rounded-xl shadow-lg min-w-[320px] flex gap-3 transition-all ${bgColor} ${borderColor} translate-y-2 animate-in fade-in duration-300`}>
            <Icon size={20} className={`mt-0.5 flex-shrink-0 ${iconColor}`} />
            <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-bold text-sm tracking-wide ${textColor}`}>{title}</h3>
                    <button onClick={onClose} className={`text-xs ${textColor} opacity-60 hover:opacity-100 hover:bg-black/5 rounded p-0.5 transition-all`}>
                        <X size={14} />
                    </button>
                </div>
                {message && <p className={`text-sm ${textColor} opacity-90 leading-snug`}>{message}</p>}
            </div>
        </div>
    );
}
