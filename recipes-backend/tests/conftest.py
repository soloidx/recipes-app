# pylint: disable=redefined-outer-name,unused-argument,invalid-name
import os
import tempfile

import pytest  # type: ignore

from recipes_backend import app as _app

# from models import db as _db


@pytest.fixture
def app():
    db_file, db_filename = tempfile.mkstemp()

    _app.config["TESTING"] = True
    _app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_filename}"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    yield _app

    os.close(db_file)
    os.unlink(db_filename)


@pytest.fixture
def client(app):
    with app.test_client() as _client:
        with app.app_context():
            yield _client


# @pytest.fixture
# def db(app):
#     _db.init_app(app)
#     _db.create_all()
#     yield _db
#     _db.session.close()  # pylint: disable=no-member
#     _db.drop_all()
