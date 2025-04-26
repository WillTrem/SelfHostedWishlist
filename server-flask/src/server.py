from flask import Flask
from flask_smorest import Api
from db import close_connection, get_db
from items import items_bp

server = Flask(__name__)

class APIConfig:
  API_TITLE = "Self Hosted Wishlist API"
  API_VERSION = 'v1'
  OPENAPI_VERSION = '3.0.3'
  OPENAPI_URL_PREFIX = '/'
  OPENAPI_SWAGGER_UI_PATH = '/docs'
  OPENAPI_SWAGGER_UI_URL = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'
  OPENAPI_REDOC_PATH='/redoc'
  OPENAPI_REDOC_URL='https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js'
  
server.config.from_object(APIConfig)

api = Api(server)

api.register_blueprint(items_bp)

def init_db():
	with server.app_context():
		# print('init_db')
		db = get_db()
		with open('schema.sql', 'r') as f:
			# print('schema.sql')
			db.executescript(f.read())
		db.commit()

init_db()

@server.teardown_appcontext
def teardown_db(exception):
	close_connection(exception)
