import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './UI';

export const Table = ({ headers, children }) => (
  <div className="w-full overflow-hidden border border-outline-variant/10 rounded-2xl bg-surface-container-lowest">
    <table className="w-full text-left border-collapse">
      <thead className="bg-surface-container-low/50">
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-6 py-4 text-xs font-bold text-on-surface/50 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant/10">
        {children}
      </tbody>
    </table>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-[480px] bg-surface-container-lowest rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline font-bold text-2xl text-on-surface tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface/50">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {children}
        </div>

        {footer && (
          <div className="mt-10 flex items-center justify-end gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
