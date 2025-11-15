import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import path from 'path'

type funcType<T extends unknown[]> = (db: Database<sqlite3.Database, sqlite3.Statement>, ...args: T) => unknown;

export const databaseConnection = <T extends unknown[]>(func: funcType<T>) => {
    return async (...args: T) => {
        const dbPath = path.join(process.cwd(), 'src','storage', 'database.db');

        try {
            const db = await open({
                filename: dbPath,
                driver: sqlite3.Database
            });

            const res = await func(db, ...args);

            await db.close();
            return res;
        } catch (error) {
            console.error('Error during database operation:', error);
            throw error;
        }
    }
}

