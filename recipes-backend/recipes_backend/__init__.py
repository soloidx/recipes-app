from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate  # type: ignore
from flask_sqlalchemy import SQLAlchemy  # type: ignore

from recipes_backend.config import Config

__version__ = "0.1.0"

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

from recipes_backend import routes  # noqa: E402,F401
