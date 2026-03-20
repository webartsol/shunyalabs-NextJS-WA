import React from 'react';
import { scripts } from '../lib/languages';

interface ScriptSelectorProps {
  selectedScript: string;
  onScriptChange: (script: string) => void;
  disabled?: boolean;
  languageCode?: string;
}

export const ScriptSelector: React.FC<ScriptSelectorProps> = ({
  selectedScript,
  onScriptChange,
  disabled = false,
  languageCode,
}) => {
  // Filter scripts based on language if needed
  const availableScripts = scripts;

  return (
    <select
      value={selectedScript}
      onChange={(e) => onScriptChange(e.target.value)}
      disabled={disabled}
      className={`
        w-full px-4 py-3 rounded-lg
        bg-black/50 border border-white/20
        text-white placeholder-gray-400
        focus:outline-none focus:border-white/40
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/30'}
        backdrop-blur-md
      `}
    >
      <option value="" className="bg-[#0B0B0F]">Auto-detect</option>
      {availableScripts.map((script) => (
        <option key={script.code} value={script.code} className="bg-[#0B0B0F]">
          {script.name}
        </option>
      ))}
    </select>
  );
};
