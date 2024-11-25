import { RunResult, Statement } from 'sqlite3';
import db from './sqlite';
import Item from '@extension/Item';
import ErrCallback from './types/ErrCallback';

export function createItem(newItem: Omit<Item, 'id'>, callback?: ErrCallback) {
  const { name, website, price, url, image_url: imageUrl } = newItem;
  const sql = `INSERT INTO items (name, website, price, url, image_url) 
	VALUES (?, ?, ?, ?, ?);`;
  db.run(sql, [name, website, price, url, imageUrl], callback);
}

export function getItems(callback?: ErrCallback): Item[] | undefined {
  const sql = 'SELECT * FROM items;';
  let response = undefined;
  db.all<Item>(sql, (err, items) => {
    callback && callback(err);
    if (items) {
      response = items;
    }
  });

  return response;
}

export function getItem(id: number, callback?: ErrCallback): Item | undefined {
  const sql = 'SELECT * FROM items WHERE id = ?;';
  let response = undefined;
  db.get<Item>(sql, [id], (err, item) => {
    callback && callback(err);
    if (item) {
      response = item;
    }
  });
  return;
}

export function updateItem(updatedItem: Item, callback?: ErrCallback) {
  const { id, name, website, price, url, image_url: imageUrl } = updatedItem;
  const sql = `UPDATE items 
	SET name = ?, website = ?, price = ?, url = ?, image_url = ?
	WHERE id = ?;`;
  db.run(sql, [name, website, price, url, imageUrl, id], callback);
}

export function deleteItem(id: number, callback?: ErrCallback) {
  const sql = 'DELETE FROM items WHERE id = ?;';
  db.run(sql, [id], callback);
}
