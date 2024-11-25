import db from './sqlite';
import Item from '@extension/Item';

export function createItem(newItem: Omit<Item, 'id'>) {
  const { name, website, price, url, image_url: imageUrl } = newItem;
  const sql = `INSERT INTO items (name, website, price, url, image_url) 
	VALUES (?, ?, ?, ?, ?);`;
  const response = db.prepare(sql).run(name, website, price, url, imageUrl);

  return response;
}

export function getItems(): Item[] | undefined {
  const sql = 'SELECT * FROM items;';
  const response = db.prepare<unknown[], Item>(sql).all();

  return response;
}

export function getItem(id: number): Item | undefined {
  const sql = 'SELECT * FROM items WHERE id = ?;';

  return db.prepare<[Number], Item>(sql).get(id);
}

export function updateItem(updatedItem: Item) {
  const { id, name, website, price, url, image_url: imageUrl } = updatedItem;
  const sql = `UPDATE items 
	SET name = ?, website = ?, price = ?, url = ?, image_url = ?
	WHERE id = ?;`;

  return db
    .prepare<[String, String, String, String, String, Number]>(sql)
    .run(name, website, price, url, imageUrl, id);
}

export function deleteItem(id: number) {
  const sql = 'DELETE FROM items WHERE id = ?;';

  return db.prepare<[Number]>(sql).run(id);
}
