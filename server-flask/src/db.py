import sqlite3
from flask import g

DATABASE = '/usr/src/app/data/database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def query_db(query, args=(), one=False):
    db = get_db()
    cur = None  # Initialize cur before the try block
    try:
        cur = db.execute(query, args)
        rv = cur.fetchall()
        return (rv[0] if rv else None) if one else rv
    except sqlite3.Error as e:
        raise e
    finally:
        if cur:  # Only close if cur was successfully created
            cur.close()

def execute_db(query, args=()):
    db = get_db()
    try:
        cur = get_db().execute(query, args)
        db.commit()
        return cur.lastrowid
    except sqlite3.Error as e:
        db.rollback()
        raise e
    

def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
