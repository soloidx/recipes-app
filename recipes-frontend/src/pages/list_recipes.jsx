import React from "react";

import RecipesAPI from "../data/api";
import SearchBar from "../components/search_bar";
import RecipeTitile from "../components/recipe_title";
import withRecipeModal from "../components/modal";

class ListRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { recipes: [] };
    this.updateRecipies = this.updateRecipies.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.api = new RecipesAPI();
  }

  componentDidMount() {
    this.updateRecipies();
  }

  updateRecipies(query) {
    this.api.getRecipies(query).then((recipeList) => {
      this.setState({ recipes: recipeList });
    });
  }

  handleSearch(e) {
    let query = e.target.value;
    this.updateRecipies(query);
  }

  handleDetail(recipe) {
    let { modal } = this.props;
    this.api.getRecipeDetail(recipe.id).then((recipeDetail) => {
      this.props.modal.showRecipeModal(recipeDetail, false);
    });
  }

  render() {
    return (
      <div className="md:w-auto flex justify-center md:flex-wrap">
        <div className="w-full md:w-3/4 flex flex-col pt-3 md:pt-8">
          <p className="text-center text-3xl">Recipes list</p>
          <div className="flex flex-col pt-4 bg-white">
            <SearchBar handleSearch={this.handleSearch} />
            <div className="md:flex flex-col rounded-lg p-6">
              {this.state.recipes.map((recipe) => (
                <RecipeTitile
                  recipe={recipe}
                  key={recipe.id}
                  handleDetail={this.handleDetail}
                />
              ))}
            </div>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Add a new recipe
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRecipeModal(ListRecipes);
