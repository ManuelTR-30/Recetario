
import React, { useMemo } from 'react';
import { Recipe } from '../types';
import ProgressBar from './ProgressBar';
import { TrashIcon } from './icons/TrashIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { PencilIcon } from './icons/PencilIcon';

interface RecipeCardProps {
  recipe: Recipe;
  availableIngredients: string[];
  onRemove: (id: string) => void;
  onAddToShoppingList: (ingredients: string[]) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, availableIngredients, onRemove, onAddToShoppingList, onSelectRecipe, onEdit }) => {
  const availableLower = useMemo(() => availableIngredients.map(i => i.toLowerCase()), [availableIngredients]);

  const { matchPercentage, missingIngredients } = useMemo(() => {
    if (recipe.ingredients.length === 0) {
      return { matchPercentage: 100, missingIngredients: [] };
    }
    
    const matchedIngredients = recipe.ingredients.filter(ing => availableLower.includes(ing.toLowerCase()));
    const missing = recipe.ingredients.filter(ing => !availableLower.includes(ing.toLowerCase()));
    
    const percentage = Math.round((matchedIngredients.length / recipe.ingredients.length) * 100);
    
    return { matchPercentage: percentage, missingIngredients: missing };
  }, [recipe.ingredients, availableLower]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(recipe.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(recipe);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToShoppingList(missingIngredients);
  };

  return (
    <div 
      className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
      onClick={() => onSelectRecipe(recipe)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
        <div className="flex items-center space-x-2 shrink-0">
          <button onClick={handleEdit} className="text-gray-400 hover:text-indigo-500 transition" aria-label={`Editar receta ${recipe.name}`}>
              <PencilIcon className="h-5 w-5" />
          </button>
          <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 transition" aria-label={`Eliminar receta ${recipe.name}`}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <p className="text-sm font-medium text-gray-600 mt-2 mb-1">Ingredientes:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.ingredients.map((ingredient, index) => {
          const hasIngredient = availableLower.includes(ingredient.toLowerCase());
          return (
            <span 
              key={index} 
              className={`text-xs px-2 py-0.5 rounded-full ${hasIngredient ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {ingredient}
            </span>
          );
        })}
      </div>
      
      <div className="mt-auto space-y-4">
        <ProgressBar percentage={matchPercentage} />
        <button 
          onClick={handleAddToList}
          disabled={missingIngredients.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Añadir {missingIngredients.length} Faltantes a la Lista
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
