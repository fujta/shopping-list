'use client';

import { useEffect } from 'react';
import { TableRow } from '@/components/TableRow';

import { createDatabaseTableIfNotExists } from '@/server/shopping';
import { TableControls } from '@/components/TableControls';
import { useShoppingListContext } from '@/storage/providers/ShoppingListProvider';
import { useShoppingList } from '@/hooks/useShoppingList';
import './page.css';

export default function Home() {
    const { shoppingItems, setShoppingItems } = useShoppingListContext();
    const { handleLoadData } = useShoppingList();

    const handleRemoveItem = (uuid: string) => {
        setShoppingItems((currShoppingItems) =>
            currShoppingItems.filter((item) => item.uuid !== uuid)
        );
    };

    useEffect(() => {
        (async () => {
            try {
                await createDatabaseTableIfNotExists();
                await handleLoadData();
            } catch (error) {
                console.error('Error creating database table:', error);
            }
        })();
    }, [handleLoadData]);

    return (
        <main className="main">
            <h1>Nákupní list</h1>

            <TableControls />

            <table className="shoppingTable">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th className="tableActions">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {shoppingItems.map((item, index) => (
                        <TableRow
                            key={index}
                            itemName={item.name}
                            itemUuid={item.uuid}
                            onRemoveItem={handleRemoveItem}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
}
