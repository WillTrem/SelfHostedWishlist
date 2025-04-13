import express, { ErrorRequestHandler, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createItem, deleteItem, getItem, getItems, updateItem } from './api';
import Item from '@extension/Item';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

const genericErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).send(`Invalid JSON body: ${err.message}`);
  } else {
    next();
  }
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(genericErrorHandler);
app.use(
  cors({
    // origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('This is a test');
});

app.get('/items', (req, res) => {
  const items = getItems();
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(500).send();
  }
});

app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = getItem(Number(id));
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(400).send(`Invalid item id ${id}`);
  }
});

app.post('/items', (req, res) => {
  const { name, website, price, url, image_url } = req.body;
  if (!name || !website || !price || !url || !image_url) {
    res.status(400).send('Missing required fields');
  } else {
    const response = createItem({ name, website, price, url, image_url });
    if (response.changes === 0) {
      res.status(400).send('Invalid values provided');
    } else {
      res.status(201).send();
    }
  }
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;

  const currentItem = getItem(Number(id));
  if (!currentItem) {
    res.status(400).send(`Invalid item id ${id}`);
    return;
  }

  const { name, website, price, url, image_url } = req.body;

  const updatedItem: Item = {
    id: currentItem.id,
    name: name ?? currentItem.name,
    website: website ?? currentItem.website,
    price: price ?? currentItem.price,
    url: url ?? currentItem.url,
    image_url: image_url ?? currentItem.image_url,
  };

  const response = updateItem(updatedItem);

  if (response.changes === 0) {
    res.status(400).send('Invalid values provided');
  } else {
    res.status(200).send('Item successfully updated');
  }
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;

  const item = getItem(Number(id));

  if (!item) {
    res.status(400).send(`Invalid item id ${id}`);
    return;
  }

  const response = deleteItem(item.id);

  if (response.changes === 0) {
    res.status(500).send(`Internal error while trying to delete item with id ${id}`);
  } else {
    res.status(200).send(`Item successfully removed`);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
