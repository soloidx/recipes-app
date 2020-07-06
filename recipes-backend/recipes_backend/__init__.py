from flask import Flask

__version__ = "0.1.0"

app = Flask(__name__)


from recipes_backend import routes  # noqa: E402,F401
