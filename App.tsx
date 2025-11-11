import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Recipe } from './types';
import IngredientManager from './components/IngredientManager';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import { ChefHatIcon } from './components/icons/ChefHatIcon';
import ShoppingList from './components/ShoppingList';
import RecipeDetailModal from './components/RecipeDetailModal';
import { FireIcon } from './components/icons/FireIcon';
import RecipeCard from './components/RecipeCard';
import { SearchIcon } from './components/icons/SearchIcon';

const App: React.FC = () => {
  const [availableIngredients, setAvailableIngredients] = useState<string[]>(() => {
    try {
      const items = window.localStorage.getItem('availableIngredients');
      return items ? JSON.parse(items) : ['Huevos', 'Leche', 'Harina', 'Azúcar'];
    } catch (error) {
      console.error(error);
      return ['Huevos', 'Leche', 'Harina', 'Azúcar'];
    }
  });

  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const items = window.localStorage.getItem('recipes');
      return items ? JSON.parse(items) : [
        { id: '1', name: 'Panqueques', ingredients: ['Huevos', 'Leche', 'Harina', 'Azúcar', 'Mantequilla'], instructions: '1. En un tazón grande, mezcla la harina y el azúcar.\n2. Haz un hueco en el centro y añade los huevos y la leche.\n3. Bate bien hasta obtener una masa suave y sin grumos.\n4. Calienta una sartén a fuego medio y añade un poco de mantequilla.\n5. Vierte un cucharón de masa en la sartén caliente.\n6. Cocina hasta que aparezcan burbujas en la superficie, luego voltea y cocina el otro lado hasta que esté dorado.' },
        { id: '2', name: 'Torta de Chocolate', ingredients: ['Chocolate', 'Harina', 'Azúcar', 'Huevos', 'Leche', 'Aceite'], instructions: 'Instrucciones detalladas para la torta de chocolate aquí.' },
        { id: '3', name: 'Huevos Revueltos', ingredients: ['Huevos', 'Sal', 'Pimienta'], instructions: '1. Rompe los huevos en un tazón.\n2. Añade sal y pimienta al gusto.\n3. Bate enérgicamente con un tenedor hasta que las yemas y las claras estén completamente mezcladas.\n4. Calienta una sartén a fuego bajo-medio con un poco de mantequilla o aceite.\n5. Vierte los huevos batidos en la sartén y cocina, revolviendo suavemente con una espátula, hasta que alcancen la consistencia deseada.' }
      ];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [shoppingList, setShoppingList] = useState<string[]>(() => {
    try {
      const items = window.localStorage.getItem('shoppingList');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('availableIngredients', JSON.stringify(availableIngredients));
    } catch (error) {
      console.error(error);
    }
  }, [availableIngredients]);

  useEffect(() => {
    try {
      window.localStorage.setItem('recipes', JSON.stringify(recipes));
    } catch (error) {
      console.error(error);
    }
  }, [recipes]);

  useEffect(() => {
    try {
      window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    } catch (error) {
      console.error(error);
    }
  }, [shoppingList]);

  const handleAddIngredient = useCallback((ingredient: string) => {
    const trimmedIngredient = ingredient.trim().toLowerCase();
    if (trimmedIngredient && !availableIngredients.map(i => i.toLowerCase()).includes(trimmedIngredient)) {
      setAvailableIngredients(prev => [...prev, ingredient.trim()]);
    }
  }, [availableIngredients]);

  const handleRemoveIngredient = useCallback((ingredientToRemove: string) => {
    setAvailableIngredients(prev => prev.filter(i => i !== ingredientToRemove));
  }, []);

  const handleAddRecipe = useCallback((recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = { ...recipe, id: crypto.randomUUID() };
    setRecipes(prev => [...prev, newRecipe]);
  }, []);
  
  const handleEditRecipe = useCallback((recipe: Recipe) => {
    setEditingRecipe(recipe);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleUpdateRecipe = useCallback((updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setEditingRecipe(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingRecipe(null);
  }, []);

  const handleRemoveRecipe = useCallback((recipeId: string) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
  }, []);

  const handleAddToShoppingList = useCallback((ingredientsToAdd: string[]) => {
    setShoppingList(prevList => {
      const lowerCasePrevList = prevList.map(i => i.toLowerCase());
      const newItems = ingredientsToAdd.filter(
        item => !lowerCasePrevList.includes(item.toLowerCase())
      );
      return [...prevList, ...newItems].sort();
    });
  }, []);

  const handleRemoveFromShoppingList = useCallback((itemToRemove: string) => {
    setShoppingList(prev => prev.filter(i => i !== itemToRemove));
  }, []);

  const handleClearShoppingList = useCallback(() => {
    setShoppingList([]);
  }, []);

  const handleSelectRecipe = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  const { almostReadyRecipes, otherRecipes } = useMemo(() => {
    const categorizedRecipes = filteredRecipes.map(recipe => {
      const availableLower = availableIngredients.map(i => i.toLowerCase());
      const matchedIngredients = recipe.ingredients.filter(ing => availableLower.includes(ing.toLowerCase()));
      const matchPercentage = recipe.ingredients.length > 0
        ? Math.round((matchedIngredients.length / recipe.ingredients.length) * 100)
        : 100;
      return { ...recipe, matchPercentage };
    });

    const almostReady = categorizedRecipes
      .filter(r => r.matchPercentage >= 75)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    const other = categorizedRecipes.filter(r => r.matchPercentage < 75);

    return { almostReadyRecipes: almostReady, otherRecipes: other };
  }, [filteredRecipes, availableIngredients]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 shrink-0">
                <ChefHatIcon className="h-8 w-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900 hidden sm:block">Recipe Matcher</h1>
            </div>
            <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
            </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <IngredientManager 
              ingredients={availableIngredients} 
              onAdd={handleAddIngredient} 
              onRemove={handleRemoveIngredient} 
            />
            <ShoppingList 
              items={shoppingList}
              onRemove={handleRemoveFromShoppingList}
              onClear={handleClearShoppingList}
            />
            <div ref={formRef}>
              <RecipeForm 
                onAddRecipe={handleAddRecipe}
                onUpdateRecipe={handleUpdateRecipe}
                recipeToEdit={editingRecipe}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
          
          {filteredRecipes.length === 0 && searchQuery ? (
             <div className="lg:col-span-2 text-center py-16 bg-white rounded-xl shadow-md h-fit">
                <p className="text-gray-600 text-lg">No hay recetas que coincidan con tu búsqueda.</p>
                <p className="text-gray-500 text-sm mt-1">Intenta con otro nombre.</p>
            </div>
          ) : (
            <div className="lg:col-span-2 space-y-8">
                {almostReadyRecipes.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center space-x-3 mb-4">
                            <FireIcon className="h-6 w-6 text-orange-500"/>
                            <h2 className="text-xl font-bold">Casi Listas para Cocinar</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {almostReadyRecipes.map(recipe => (
                                <RecipeCard 
                                key={recipe.id} 
                                recipe={recipe} 
                                availableIngredients={availableIngredients} 
                                onRemove={handleRemoveRecipe}
                                onAddToShoppingList={handleAddToShoppingList}
                                onSelectRecipe={handleSelectRecipe}
                                onEdit={handleEditRecipe}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <RecipeList 
                recipes={otherRecipes} 
                availableIngredients={availableIngredients}
                onRemoveRecipe={handleRemoveRecipe}
                onAddToShoppingList={handleAddToShoppingList}
                onSelectRecipe={handleSelectRecipe}
                onEditRecipe={handleEditRecipe}
                title={almostReadyRecipes.length > 0 ? "Otras Recetas" : "Mis Recetas"}
                />
            </div>
          )}
        </div>
      </main>
      {selectedRecipe && (
        <RecipeDetailModal 
          recipe={selectedRecipe} 
          onClose={handleCloseModal}
          availableIngredients={availableIngredients}
        />
      )}
    </div>
  );
};

export default App;