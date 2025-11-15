import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import path from 'path'

export type DatabaseType = Database<sqlite3.Database, sqlite3.Statement>;

type funcType<T extends unknown[]> = (db: DatabaseType, ...args: T) => unknown;

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

export const dbRun = async (db: DatabaseType, stmt: string) => {
    const result = await db.run(stmt);

    return result;
}

export const dbAll = async (db: DatabaseType, stmt: string) => {
    const result = await db.all(stmt);

    return result;
}

export const dbRunWithPrepared = async (db: DatabaseType, stmt: string, data: object) => {
    const prepared = await db.prepare(stmt);

    await prepared.bind(data);
    const result = await prepared.run();
    await prepared.finalize();

    return result;
}
