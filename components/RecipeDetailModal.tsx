
import React, { useMemo } from 'react';
import { Recipe } from '../types';
import { XIcon } from './icons/XIcon';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
  availableIngredients: string[];
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose, availableIngredients }) => {
  const availableLower = useMemo(() => availableIngredients.map(i => i.toLowerCase()), [availableIngredients]);

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
            <div className="bg-indigo-100 p-3 rounded-full">
                <ChefHatIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Ingredientes</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => {
                const hasIngredient = availableLower.includes(ingredient.toLowerCase());
                return (
                  <span 
                    key={index} 
                    className={`text-sm px-3 py-1 rounded-full ${hasIngredient ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {ingredient}
                  </span>
                );
              })}
            </div>
          </div>
          
          {recipe.instructions && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Instrucciones</h3>
              <div className="text-gray-700 whitespace-pre-wrap font-sans">
                {recipe.instructions}
              </div>
            </div>
          )}
        </div>
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

export default RecipeDetailModal;
