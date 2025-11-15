'use client';

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

interface ShoppingItem {
    name: string;
    uuid: string;
}

interface ShoppingListContextType {
    shoppingItems: ShoppingItem[];
    setShoppingItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

export const ShoppingListContext = createContext<
    ShoppingListContextType | undefined
>(undefined);

interface ShoppingListProviderProps {
    children: ReactNode;
}

export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({
    children,
}) => {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

    return (
        <ShoppingListContext.Provider
            value={{ shoppingItems, setShoppingItems }}
        >
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingListContext = () => {
    const context = useContext(ShoppingListContext);
    if (context === undefined) {
        throw new Error(
            'useShoppingList must be used within a ShoppingListProvider'
        );
    }
    return context;
};
