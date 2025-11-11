import React from 'react';
import { SuggestedRecipe } from '../types';
import { XIcon } from './icons/XIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: SuggestedRecipe[];
  isLoading: boolean;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose, suggestions, isLoading }) => {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative animate-slide-up"
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <SparklesIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sugerencias Mágicas</h2>
        </div>
        
        {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Buscando recetas deliciosas...</p>
            </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-6">
            {suggestions.map((recipe, index) => (
              <div key={index} className="border-t pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{recipe.name}</h3>
                <div className="mb-4">
                    <p className="text-sm font-bold text-gray-600 mb-2">Ingredientes:</p>
                    <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.map((ing, i) => (
                            <span key={i} className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800">
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-600 mb-2">Instrucciones:</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div className="text-center py-8">
                <p className="text-gray-600">No hemos encontrado sugerencias con los ingredientes que tienes.</p>
                <p className="text-sm text-gray-500 mt-2">¡Intenta añadir más ingredientes!</p>
            </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SuggestionModal;
