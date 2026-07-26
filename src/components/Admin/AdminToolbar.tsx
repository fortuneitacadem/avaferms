import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Edit3, Settings, RotateCcw, LogOut } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminToolbarProps {
  onOpenDashboard: () => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ onOpenDashboard }) => {
  const { isAdminLoggedIn, isEditModeActive, toggleEditMode, logoutAdmin, resetDefaults } = useData();

  if (!isAdminLoggedIn) return null;

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[9999] bg-[#00E5FF] text-black px-4 py-2 flex items-center justify-between shadow-2xl font-tech text-xs font-bold tracking-wider"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-black animate-pulse" />
        <span className="uppercase font-extrabold font-display">
          CMS ADMIN CONTROL ACTIVE (UBT-TEAM PANEL)
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleEditMode}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
            isEditModeActive
              ? 'bg-black text-[#00E5FF] border border-black shadow-md'
              : 'bg-black/20 hover:bg-black/40 text-black'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditModeActive ? 'INLINE EDITING ON' : 'ENABLE INLINE EDIT'}</span>
        </button>

        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white hover:bg-black/80 transition-all font-display text-[11px]"
        >
          <Settings className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>OPEN CMS DASHBOARD</span>
        </button>

        <button
          onClick={() => {
            if (confirm("Reset all CMS settings & news to original factory default?")) {
              resetDefaults();
            }
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all text-[10px]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>

        <button
          onClick={logoutAdmin}
          className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-black transition-colors"
          title="Logout Admin"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
