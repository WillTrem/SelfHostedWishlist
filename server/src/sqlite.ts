import { Database } from 'sqlite3';

const dbName = 'selfHostedWishlist.db';

let db = new Database(dbName, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database initialized successfully');
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
				website TEXT NOT NULL,
				price TEXT NOT NULL,
				url TEXT NOT NULL,
				image_url TEXT NOT NULL
			);`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('The "items" table successfully created or was already created');
        }
      },
    );
  }
});

export default db;
