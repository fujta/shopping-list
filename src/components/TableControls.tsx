import { useShoppingList } from '@/hooks/useShoppingList';
import { testServerFunction } from '@/server/health';
import { useRef } from 'react';
import { Plus, List, Database, Server } from 'lucide-react';
import styles from './TableControls.module.css';

export const TableControls = () => {
    const { handleInsertDemoData, handleLoadData, handleAddNewItem } =
        useShoppingList();
    const itemNameInputRef = useRef<HTMLInputElement>(null);

    const onAddNewItem = () => {
        const value = itemNameInputRef.current?.value;
        if (value) {
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
                placeholder="Add new item..."
                onKeyDown={(e) => e.key === 'Enter' && onAddNewItem()}
            />
            <button
                className={`${styles.controlButton} ${styles.primaryButton}`}
                onClick={onAddNewItem}
            >
                <Plus size={16} />
                Add
            </button>

            <button className={styles.controlButton} onClick={handleLoadData}>
                <List size={16} />
                Load All
            </button>

            <button
                className={styles.controlButton}
                onClick={handleInsertDemoData}
            >
                <Database size={16} />
                Demo Data
            </button>

            <button
                className={styles.controlButton}
                onClick={() => testServerFunction().then(console.log)}
            >
                <Server size={16} />
                Test Server
            </button>
        </div>
    );
};
