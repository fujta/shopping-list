import React from 'react';
import { Trash2 } from 'lucide-react';
import { useShoppingList } from '@/hooks/useShoppingList';

type TableRowProps = {
    itemName: string;
    itemUuid: string;
    onRemoveItem: (uuid: string) => void;
};

export const TableRow = (props: TableRowProps) => {
    const { handleRemoveItem } = useShoppingList();

    return (
        <tr>
            <td>{props.itemName}</td>
            <td style={{ textAlign: 'right' }}>
                <button
                    className="removeButton"
                    onClick={() => handleRemoveItem(props.itemUuid)}
                >
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};
