from flask.views import MethodView
from marshmallow import Schema, fields
from flask_smorest import Blueprint, abort
from enum import Enum
from db import query_db, execute_db
import sqlite3

items_bp = Blueprint('items', 'items', description='ITEMS API')

# TYPES
class MutableItem(Schema):
    name = fields.String()
    website  = fields.String()
    price = fields.String()
    url = fields.String()
    image_url = fields.String()    

class Item(MutableItem):
    id = fields.Integer()

class ListItems(Schema):
    items = fields.List(fields.Nested(Item))
    
class SortByEnum(Enum):
    name = "name"
    price = "price"
    website = "website"
    id = "id"
    
class SortDirectionEnum(Enum):
    asc = "asc"
    desc = "desc"
    
class ListItemsParameters(Schema):
    order_by = fields.Enum(SortByEnum, load_default=SortByEnum.id)
    order = fields.Enum(SortDirectionEnum, load_default=SortDirectionEnum.asc)

# ROUTES
@items_bp.route('/items')
class ItemsCollection(MethodView):
    @items_bp.arguments(ListItemsParameters, location='query')
    @items_bp.response(status_code=200, schema=ListItems)
    def get(self, parameters):
        # Since values come from enums, they're safe to use in the query
        order_by = parameters['order_by'].value
        order_dir = parameters['order'].value
        
        items = query_db(f"SELECT * FROM items ORDER BY {order_by} {order_dir}")
        return {"items": items}
    
    @items_bp.arguments(MutableItem)
    @items_bp.response(status_code=201, schema=Item)
    def post(self, item):
        new_item_id = execute_db('INSERT INTO items (name, website, price, url, image_url) VALUES (?,?,?,?,?);',
                            [item['name'], item['website'], item['price'], item['url'], item['image_url']])
        new_item = query_db('SELECT * FROM items WHERE id = ?', [new_item_id], one=True)
        if new_item is None:
            abort(404, 'New item not found')
        else:
            return new_item

@items_bp.route('/items/<int:id>')
class ItemsSingleton(MethodView):
    
    @items_bp.response(status_code=200, schema=Item)
    def get(self, id):
        # Define getting single item
        item = query_db('SELECT * FROM ITEMS WHERE id = ? ', [id], one=True)
        
        if item is not None:
            return item
        else: 
            abort(404, f"Item with id {id} not found.")
    
    @items_bp.arguments(MutableItem)
    @items_bp.response(status_code=200, schema=Item)
    def put(self, item_mod, id):
        # Define modifying single item
        execute_db('UPDATE items SET name = ?, website = ?, price = ?, url = ?, image_url = ? WHERE id = ?;',
                                [item_mod['name'], item_mod['website'], item_mod['price'], item_mod['url'], item_mod['image_url'], id])
        new_item = query_db('SELECT * FROM items WHERE id = ?', [id], one=True)
        if new_item is None:
            abort(404, 'New item not found')
        else:
            return new_item
    
    @items_bp.response(status_code=204)
    def delete(self, id):
        # Define deleting single item
        execute_db('DELETE FROM items WHERE id = ?', [id])
        return

@items_bp.errorhandler(sqlite3.Error)
def handle_sqlite_error(error):
    abort(400, f"Database error: {str(error)}")