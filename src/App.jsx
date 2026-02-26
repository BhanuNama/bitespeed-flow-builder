import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import TopBar from './components/TopBar';
import StatusBar from './components/StatusBar';
import Toast from './components/Toast';
import { useFlowStore } from './hooks/useFlowStore';

export default function App() {
  const [toast, setToast] = useState(null);
  const { loadFlow, selectedNodeId } = useFlowStore();

  useEffect(() => {
    loadFlow();
  }, [loadFlow]);

  const showToast = (title, message, type) => {
    setToast({ title, message, type });
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
      <TopBar showToast={showToast} />

      <div className="flex flex-1 relative overflow-hidden">
        {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
        <Canvas />
      </div>

      <StatusBar />

      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
