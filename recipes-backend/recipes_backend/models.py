# pylint: disable=inherit-non-class,too-few-public-methods
from __future__ import annotations
from typing import Dict, Optional, List

from flask_sqlalchemy import DefaultMeta  # type: ignore
from sqlalchemy import or_

from recipes_backend import db
from recipes_backend.constants import ENGLISH_STOPWORDS

BaseModel = db.Model  # type: DefaultMeta


class Recipe(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    servings = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    search_field = db.Column(db.String)

    def to_dict(self) -> Dict:
        recipe = {
            "id": self.id,
            "name": self.name,
            "servings": self.servings,
            "rating": self.rating,
        }
        return recipe

    def to_full_dict(self) -> Dict:
        recipe = {
            "id": self.id,
            "name": self.name,
            "servings": self.servings,
            "rating": self.rating,
            "ingredients": [],
        }

        for ingredient in self.ingredients:
            recipe["ingredients"].append(ingredient.to_dict())

        return recipe

    def generate_search_string(self):
        name_words = {
            word
            for word in self.name.split(" ")
            if not word.isdigit() and word not in ENGLISH_STOPWORDS
        }

        for ingredient in self.ingredients:
            ingredient_word = {
                word
                for word in ingredient.name.split(" ")
                if not word.isdigit() and word not in ENGLISH_STOPWORDS
            }

            name_words = name_words.union(ingredient_word)

        self.search_field = ",".join(name_words)


class Ingredient(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    cuantity = db.Column(db.Float)
    unit = db.Column(db.String)

    recipe_id = db.Column(
        db.Integer, db.ForeignKey("recipe.id"), nullable=False
    )
    recipe = db.relationship(
        "Recipe",
        backref=db.backref(
            "ingredients", lazy=True, cascade="all, delete-orphan"
        ),
    )

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "name": self.name,
            "cuantity": self.cuantity,
            "unit": self.unit,
        }


def create_recipe(recipe: Dict) -> Recipe:
    result = Recipe(
        name=recipe["name"],
        servings=recipe["servings"],
        rating=recipe.get("rating", 0),
    )
    for ingredient in recipe["ingredients"]:
        _ingredient = Ingredient(
            name=ingredient["name"],
            cuantity=ingredient["cuantity"],
            unit=ingredient["unit"],
        )
        result.ingredients.append(_ingredient)

    result.generate_search_string()
    db.session.add(result)
    db.session.commit()
    return result


def __update_ingredient(ingredient: Ingredient, params: Dict):
    if ingredient.name != params["name"]:
        ingredient.name = params["name"]

    if ingredient.cuantity != params["cuantity"]:
        ingredient.cuantity = params["cuantity"]

    if ingredient.unit != params["unit"]:
        ingredient.unit = params["unit"]


def update_recipe(recipe_id: int, recipe: Dict) -> Recipe:
    _recipe = Recipe.query.filter_by(id=recipe_id).first()
    _recipe.name = recipe["name"]
    _recipe.rating = recipe["rating"]
    _recipe.servings = recipe["servings"]

    # creating a map of ingredients by id

    _ingredients = {i.id: i for i in _recipe.ingredients}

    for ingredient in recipe["ingredients"]:
        # for new ingredients
        if "id" not in ingredient.keys():
            _ingredient = Ingredient(
                name=ingredient["name"],
                cuantity=ingredient["cuantity"],
                unit=ingredient["unit"],
            )
            _ingredient.recipe = _recipe
            db.session.add(_ingredient)
            continue

        if ingredient["id"] not in _ingredients.keys():
            continue

        # Updating an existing ingredient
        _ingredient = _ingredients[ingredient["id"]]
        __update_ingredient(_ingredient, ingredient)

        # delete the update ingredient from the map so I can delete the rest
        del _ingredients[ingredient["id"]]

    for _ingredient in _ingredients.values():
        db.session.delete(_ingredient)

    _recipe.generate_search_string()
    db.session.commit()
    return _recipe


def search_recipes(query: str = "") -> List[Recipe]:
    search_cond = query.split(" ")
    # generating or condition for strings separated in
    # spaces like, "speguetty garlic"
    search_cond = [
        Recipe.search_field.ilike("%{}%".format(x))
        for x in search_cond
        if x.strip() != ""
    ]

    recipes = Recipe.query
    if search_cond:
        recipes = recipes.filter(or_(*search_cond))
    print(recipes)

    return list(recipes)


def get_recipe(recipe_id: int) -> Recipe:
    return Recipe.query.filter_by(id=recipe_id).first()


def delete_recipe(recipe_id: int) -> bool:
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if recipe is None:
        return False
    db.session.delete(recipe)
    db.session.commit()
    return True
