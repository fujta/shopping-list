'use server';

import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { databaseConnection } from '@/utils/server';

export const createDatabaseTableIfNotExists = databaseConnection(
    async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
        return (
            await db.run(
                'CREATE TABLE IF NOT EXISTS shopping_list (id INTEGER PRIMARY KEY, item_name VARCHAR(255), uuid TEXT NOT NULL DEFAULT (lower(hex(randomblob(16)))))'
            )
        ).changes;
    }
);

export const insertDemoData = databaseConnection(
    async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
        return (
            await db.run(
                'INSERT INTO shopping_list (item_name) VALUES ("Chlebik"), ("Maslo")'
            )
        ).changes;
    }
);

export const loadDataFromDb = databaseConnection(
    async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
        return JSON.stringify(
            await db.all('SELECT item_name, uuid FROM shopping_list')
        );
    }
);

export const addNewItem = databaseConnection(
    async (
        db: Database<sqlite3.Database, sqlite3.Statement>,
        itemName: string
    ) => {
        const stmt = await db.prepare(
            'INSERT INTO shopping_list (item_name) VALUES (?)'
        );
        await stmt.bind({ 1: itemName });
        const result = await stmt.run();
        await stmt.finalize();
        return result.changes;
    }
);

export const removeItem = databaseConnection(
    async (db: Database<sqlite3.Database, sqlite3.Statement>, uuid: string) => {
        const stmt = await db.prepare(
            'DELETE FROM shopping_list WHERE uuid = ?'
        );
        await stmt.bind({ 1: uuid });
        const result = await stmt.run();
        await stmt.finalize();

        return result.changes;
    }
);
