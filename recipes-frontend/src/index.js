import React from "react";
import ReactDOM from "react-dom";

import ListRecipes from "./pages/list_recipes";
import withRecipeModal from "./components/modal";

class MyApp extends React.Component {
  render() {
    return <ListRecipes />;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<MyApp />, mountNode);
