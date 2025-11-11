import React from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface RecipeListProps {
  recipes: Recipe[];
  availableIngredients: string[];
  onRemoveRecipe: (id: string) => void;
  onAddToShoppingList: (ingredients: string[]) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onEditRecipe: (recipe: Recipe) => void;
  title: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, availableIngredients, onRemoveRecipe, onAddToShoppingList, onSelectRecipe, onEditRecipe, title }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <ChefHatIcon className="h-6 w-6 text-rose-500"/>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              availableIngredients={availableIngredients} 
              onRemove={onRemoveRecipe}
              onAddToShoppingList={onAddToShoppingList}
              onSelectRecipe={onSelectRecipe}
              onEdit={onEditRecipe}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No hay recetas para mostrar en esta categoría.</p>
      )}
    </div>
  );
};

export default RecipeList;