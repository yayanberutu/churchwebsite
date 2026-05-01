import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  isLoading, 
  ...props 
}) => {
  const variants = {
    primary: "bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95",
    secondary: "bg-surface-container-highest text-on-primary-fixed-variant hover:bg-surface-container-highest/80 active:scale-95",
    ghost: "text-primary hover:bg-primary/5",
    danger: "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
  };

  return (
    <button 
      className={cn(
        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};

export const Card = ({ children, className }) => (
  <div className={cn("surface-card rounded-2xl p-6", className)}>
    {children}
  </div>
);

export const Input = ({ label, error, className, ...props }) => (
  <div className={cn("flex flex-col gap-1.5 w-full", className)}>
    {label && <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">{label}</label>}
    <input 
      className={cn(
        "w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20",
        error && "ring-2 ring-secondary/50"
      )}
      {...props}
    />
    {error && <span className="text-[11px] text-secondary font-medium ml-1">{error}</span>}
  </div>
);

export const Textarea = ({ label, error, className, ...props }) => (
  <div className={cn("flex flex-col gap-1.5 w-full", className)}>
    {label && <label className="text-xs font-bold text-on-surface/50 uppercase tracking-wider ml-1">{label}</label>}
    <textarea 
      className={cn(
        "w-full bg-surface-container-highest rounded-xl px-4 py-3 text-sm font-medium border-0 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]",
        error && "ring-2 ring-secondary/50"
      )}
      {...props}
    />
    {error && <span className="text-[11px] text-secondary font-medium ml-1">{error}</span>}
  </div>
);
