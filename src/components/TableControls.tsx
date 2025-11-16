import { useShoppingList } from '@/hooks/useShoppingList';
import { testServerFunction } from '@/server/health';
import { useRef } from 'react';
import { Plus, List, Database, Server } from 'lucide-react';
import styles from './TableControls.module.css';

export const TableControls = () => {
    const { handleInsertDemoData, handleAddNewItem } =
        useShoppingList();
    const itemNameInputRef = useRef<HTMLInputElement>(null);

    const onAddNewItem = () => {
        const value = itemNameInputRef.current?.value;
        if (value && itemNameInputRef.current) {
            handleAddNewItem(value);
            itemNameInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.controlsContainer}>
            <input
                type="text"
                ref={itemNameInputRef}
                className={styles.inputField}
                placeholder="Přidat novou položku..."
                onKeyDown={(e) => e.key === 'Enter' && onAddNewItem()}
            />
            <button
                className={`${styles.controlButton} ${styles.primaryButton}`}
                onClick={onAddNewItem}
            >
                <Plus size={16} />
                Přidat
            </button>

            <button
                disabled
                className={styles.controlButton}
                onClick={handleInsertDemoData}
            >
                <Database size={16} />
                Přidat demo data
            </button>

            <button
                disabled
                className={styles.controlButton}
                onClick={() => testServerFunction().then(console.log)}
            >
                <Server size={16} />
                Otestovat server
            </button>
        </div>
    );
};
