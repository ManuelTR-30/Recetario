export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions?: string;
}

// Fix: Add the missing SuggestedRecipe interface.
export interface SuggestedRecipe {
  name: string;
  ingredients: string[];
  instructions: string;
}
