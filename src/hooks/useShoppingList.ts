import {
    insertDemoData,
    loadDataFromDb,
    addNewItem,
    removeItem,
} from '@/server/shopping';
import { useShoppingListContext } from '@/storage/providers/ShoppingListProvider';

export const useShoppingList = () => {
    const { setShoppingItems } = useShoppingListContext();

    const handleRemoveItem = async (uuid: string) => {
        if (uuid) {
            await removeItem(uuid);
            await handleLoadData();
        }
    };

    const handleInsertDemoData = async () => {
        await insertDemoData();
        console.log('Successfully loaded!');
    };

    const handleLoadData = async () => {
        const data = (await loadDataFromDb()) as string;

        const parsedData = JSON.parse(data).map(
            (item: { item_name: string; uuid: string }) => ({
                name: item.item_name,
                uuid: item.uuid,
            })
        );

        setShoppingItems(parsedData);

        console.log(data);
    };

    const handleAddNewItem = async (value: string) => {
        if (value) {
            await addNewItem(value);
            await handleLoadData();
        }
    };

    return {
        handleAddNewItem,
        handleInsertDemoData,
        handleLoadData,
        handleRemoveItem,
    };
};
