
import React, { useState } from 'react';
import { FridgeIcon } from './icons/FridgeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface IngredientManagerProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
}

const IngredientManager: React.FC<IngredientManagerProps> = ({ ingredients, onAdd, onRemove }) => {
  const [newIngredient, setNewIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      onAdd(newIngredient);
      setNewIngredient('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <FridgeIcon className="h-6 w-6 text-indigo-600"/>
        <h2 className="text-xl font-bold">Ingredientes Disponibles</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Ej: Tomates"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center shrink-0">
          <PlusIcon className="h-5 w-5" />
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <span key={index} className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {ingredient}
              <button onClick={() => onRemove(ingredient)} className="ml-2 text-indigo-500 hover:text-indigo-700">
                <TrashIcon className="h-3 w-3"/>
              </button>
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Aún no has añadido ingredientes.</p>
        )}
      </div>
    </div>
  );
};

export default IngredientManager;
