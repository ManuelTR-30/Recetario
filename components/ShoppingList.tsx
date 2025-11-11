
import React from 'react';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ShoppingListProps {
  items: string[];
  onRemove: (item: string) => void;
  onClear: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onRemove, onClear }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ShoppingCartIcon className="h-6 w-6 text-sky-600"/>
          <h2 className="text-xl font-bold">Lista de la Compra</h2>
        </div>
        {items.length > 0 && (
          <button 
            onClick={onClear}
            className="text-sm text-sky-600 hover:text-sky-800 font-medium transition"
          >
            Limpiar todo
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <span className="text-gray-800">{item}</span>
              <button onClick={() => onRemove(item)} className="text-gray-400 hover:text-red-600">
                <TrashIcon className="h-4 w-4"/>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">Tu lista de la compra está vacía.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
