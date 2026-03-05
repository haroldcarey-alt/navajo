import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (figureName: string) => void;
  isLoading: boolean;
}

export function ResearchForm({ onSubmit, isLoading }: ResearchFormProps) {
  const [figureName, setFigureName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (figureName.trim()) {
      onSubmit(figureName);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={figureName}
            onChange={(e) => setFigureName(e.target.value)}
            placeholder="Enter a historical figure (e.g., Manuelito, Barboncito)..."
            className="w-full px-6 py-4 text-lg bg-white border-2 border-[#E5E5E0] rounded-full shadow-sm focus:outline-none focus:border-[#5A5A40] focus:ring-1 focus:ring-[#5A5A40] transition-all font-serif placeholder:font-sans placeholder:text-gray-400 text-[#2D2D2A]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !figureName.trim()}
            className="absolute right-2 p-3 bg-[#5A5A40] text-white rounded-full hover:bg-[#4A4A30] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Start Research"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500 font-sans">
          Specializing in American Southwest & Navajo Genealogy
        </p>
      </form>
    </div>
  );
}
