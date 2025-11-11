
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface RecipeFormProps {
  onAddRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  recipeToEdit: Recipe | null;
  onCancelEdit: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe, onUpdateRecipe, recipeToEdit, onCancelEdit }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [instructions, setInstructions] = useState('');

  const isEditing = !!recipeToEdit;

  useEffect(() => {
    if (isEditing) {
      setRecipeName(recipeToEdit.name);
      setIngredients(recipeToEdit.ingredients);
      setInstructions(recipeToEdit.instructions || '');
    } else {
      setRecipeName('');
      setIngredients([]);
      setCurrentIngredient('');
      setInstructions('');
    }
  }, [recipeToEdit]);


  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIngredient = currentIngredient.trim().toLowerCase();
    if (trimmedIngredient && !ingredients.map(i => i.toLowerCase()).includes(trimmedIngredient)) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(i => i !== ingredientToRemove));
  };
  
  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipeName.trim() && ingredients.length > 0) {
      if (isEditing) {
        onUpdateRecipe({ ...recipeToEdit, name: recipeName, ingredients, instructions });
      } else {
        onAddRecipe({ name: recipeName, ingredients, instructions });
        setRecipeName('');
        setIngredients([]);
        setCurrentIngredient('');
        setInstructions('');
      }
    }
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
       <div className="flex items-center space-x-3 mb-4">
        <BookOpenIcon className="h-6 w-6 text-emerald-600"/>
        <h2 className="text-xl font-bold">{isEditing ? 'Editar Receta' : 'Añadir Nueva Receta'}</h2>
      </div>

      <form onSubmit={handleRecipeSubmit} className="space-y-4">
        <div>
          <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">Nombre de la Receta</label>
          <input
            id="recipeName"
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Ej: Lasaña"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            required
          />
        </div>
        
        <div>
          <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">Ingredientes de la Receta</label>
          <div className="flex gap-2 mt-1">
            <input
              id="ingredient"
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              placeholder="Añadir ingrediente"
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddIngredient(e); }}
            />
            <button type="button" onClick={handleAddIngredient} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center shrink-0">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              {ingredient}
              <button type="button" onClick={() => handleRemoveIngredient(ingredient)} className="ml-2 text-emerald-500 hover:text-emerald-700">
                <TrashIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instrucciones</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Ej: 1. Mezclar los ingredientes..."
            rows={4}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
          />
        </div>
        
        <div className="space-y-2">
          <button 
            type="submit" 
            disabled={!recipeName || ingredients.length === 0}
            className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            {isEditing ? 'Actualizar Receta' : 'Guardar Receta'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
