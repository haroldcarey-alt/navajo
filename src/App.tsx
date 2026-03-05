/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ResearchForm } from './components/ResearchForm';
import { ResearchOutput } from './components/ResearchOutput';
import { generateResearchBrief, ResearchResult } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Feather } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (figureName: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateResearchBrief(figureName);
      setResult(data);
    } catch (err) {
      setError("An error occurred while researching. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5A5A40] text-white mb-6 shadow-lg"
        >
          <Feather className="w-8 h-8" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-serif font-semibold text-[#2D2D2A] mb-4 tracking-tight"
        >
          Digital History Research Agent
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto"
        >
          Uncovering the stories of the American Southwest through verified historical research.
        </motion.p>
      </header>

      <main>
        <ResearchForm onSubmit={handleResearch} isLoading={isLoading} />

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block relative">
                <div className="w-16 h-16 border-4 border-[#E5E5E0] border-t-[#5A5A40] rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-[#5A5A40] font-serif text-lg animate-pulse">
                Consulting archives and verifying sources...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-red-50 border border-red-100 rounded-xl p-6 text-center text-red-800 font-sans"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <ResearchOutput 
              key="result"
              content={result.text} 
              groundingMetadata={result.groundingMetadata} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-24 text-center text-gray-400 font-sans text-sm pb-8">
        <p>&copy; {new Date().getFullYear()} Digital History Research Agent. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}
