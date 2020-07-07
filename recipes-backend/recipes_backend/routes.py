from flask import jsonify, make_response, request

from recipes_backend import app
from recipes_backend import models


@app.route("/")
def index():
    return make_response(jsonify({"app": "recipes"}))


@app.route("/recipes/", methods=["GET"])
def get_recipe_list():
    query = request.args.get("q", "")
    recipes = models.search_recipes(query)
    result = [r.to_dict() for r in recipes]
    return make_response(jsonify(result))


@app.route("/recipes/", methods=["POST"])
def create_recipe():
    params = request.json
    recipe = models.create_recipe(params)
    return make_response(jsonify(recipe.to_full_dict()))


@app.route("/recipes/<recipe_id>/", methods=["GET"])
def get_recipe_detail(recipe_id: str):
    recipe = models.get_recipe(int(recipe_id))
    return make_response(jsonify(recipe.to_full_dict()))


@app.route("/recipes/<recipe_id>/", methods=["POST"])
def update_recipe(recipe_id: str):
    params = request.json
    recipe = models.update_recipe(int(recipe_id), params)
    return make_response(jsonify(recipe.to_full_dict()))


@app.route("/recipes/<recipe_id>/", methods=["DELETE"])
def delete_recipe(recipe_id):
    deleted = models.delete_recipe(recipe_id)
    return make_response(jsonify({"deleted": deleted}))
