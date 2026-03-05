import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { BookOpen, Map, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface ResearchOutputProps {
  content: string;
  groundingMetadata?: any;
}

export function ResearchOutput({ content, groundingMetadata }: ResearchOutputProps) {
  // Helper to extract sections if needed, but for now we render the full markdown
  // We can add specific styling for the sections based on the markdown structure

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-8 md:p-12 overflow-hidden relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#5A5A40] opacity-10"></div>
        
        <div className="markdown-body text-[#2D2D2A]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {groundingMetadata && groundingMetadata.groundingChunks && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2 text-[#5A5A40]">
              <BookOpen className="w-5 h-5" />
              Verified Sources
            </h3>
            <div className="grid gap-3">
              {groundingMetadata.groundingChunks.map((chunk: any, index: number) => (
                chunk.web?.uri && (
                  <a
                    key={index}
                    href={chunk.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-[#F5F5F0] hover:bg-[#EBEBE0] transition-colors group"
                  >
                    <div className="font-sans text-sm font-medium text-[#2D2D2A] truncate group-hover:text-[#5A5A40]">
                      {chunk.web.title || chunk.web.uri}
                    </div>
                    <div className="font-sans text-xs text-gray-500 truncate mt-1">
                      {chunk.web.uri}
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
