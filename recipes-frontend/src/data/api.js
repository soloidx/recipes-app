const baseURL = "http://127.0.0.1:5000";

class RecipesAPI {
  getRecipies(query) {
    query = query ? query : "";
    return fetch(baseURL + "/recipes/?q=" + query).then(function (response) {
      let recipeList = response.json();
      return recipeList;
    });
  }

  getRecipeDetail(recipe_id) {
    return fetch(baseURL + "/recipes/" + recipe_id + "/").then(function (
      response
    ) {
      let recipe = response.json();
      return recipe;
    });
  }
}

export default RecipesAPI;
