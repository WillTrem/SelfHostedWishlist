import Database from 'better-sqlite3';

const dbName = 'selfHostedWishlist.db';

const db = new Database(dbName, { verbose: console.log });

const initItemsTableSql = `CREATE TABLE IF NOT EXISTS items (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
				website TEXT NOT NULL,
				price TEXT NOT NULL,
				url TEXT NOT NULL,
				image_url TEXT NOT NULL
			);`;

db.prepare(initItemsTableSql).run();

export default db;
