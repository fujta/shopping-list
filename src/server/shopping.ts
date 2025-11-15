'use server';

import { databaseConnection, DatabaseType, dbRunWithPrepared, dbAll, dbRun } from '@/server/infrastructure/db';

export const createDatabaseTableIfNotExists = databaseConnection(
    async (db: DatabaseType) => {
        return (
            await dbRun(
                db,
                'CREATE TABLE IF NOT EXISTS shopping_list (id INTEGER PRIMARY KEY, item_name VARCHAR(255), uuid TEXT NOT NULL DEFAULT (lower(hex(randomblob(16)))))'
            )
        ).changes;
    }
);

export const insertDemoData = databaseConnection(
    async (db: DatabaseType) => {
        return (
            await dbRun(
                db,
                'INSERT INTO shopping_list (item_name) VALUES ("Chlebik"), ("Maslo")'
            )
        ).changes;
    }
);

export const loadDataFromDb = databaseConnection(
    async (db: DatabaseType) => {
        return JSON.stringify(
            await dbAll(db, 'SELECT item_name, uuid FROM shopping_list')
        );
    }
);

export const addNewItem = databaseConnection(
    async (
        db: DatabaseType,
        itemName: string
    ) => {
        const result = await dbRunWithPrepared(db, 'INSERT INTO shopping_list (item_name) VALUES (?)', { 1: itemName });

        return result.changes;
    }
);

export const removeItem = databaseConnection(
    async (db: DatabaseType, uuid: string) => {
        const result = await dbRunWithPrepared(db, 'DELETE FROM shopping_list WHERE uuid = ?', { 1: uuid });

        return result.changes;
    }
);
