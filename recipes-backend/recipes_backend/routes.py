from flask import jsonify, make_response

from recipes_backend import app


@app.route("/")
def index():
    return make_response(jsonify({"app": "recipes"}))


@app.route("/recipes/", methods=["GET"])
def get_recipe_list():
    return make_response(jsonify({"recipe": "list"}))


@app.route("/recipes/", methods=["POST"])
def create_recipe():
    return make_response(jsonify({"recipe": "create"}))


@app.route("/recipes/<recipe_id>/", methods=["GET"])
def get_recipe_detail(recipe_id):
    return make_response(jsonify({"recipe": f"detail {recipe_id}"}))


@app.route("/recipes/<recipe_id>/", methods=["POST"])
def update_recipe(recipe_id):
    return make_response(jsonify({"recipe": f"update {recipe_id}"}))


@app.route("/recipes/<recipe_id>/", methods=["DELETE"])
def delete_recipe(recipe_id):
    return make_response(jsonify({"recipe": f"delete {recipe_id}"}))
