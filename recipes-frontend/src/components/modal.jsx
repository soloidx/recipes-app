import React from "react";

const objectOrFunction = (component, props) => {
  if (typeof component === "function") {
    return component(props);
  }
  return component;
};

const withRecipeModal = (WrappedComponent) => {
  return class extends React.Component {
    state = { open: false, recipe: {}, shouldEdit: false };

    modal = {
      showRecipeModal: (recipe, shouldEdit) => {
        this.setState({ open: true, recipe: recipe, shouldEdit: shouldEdit });
      },
      hideModal: () => {
        this.setState({ open: false });
      },
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent modal={this.modal} />
          <Modal
            modal={this.modal}
            open={this.state.open}
            recipe={this.state.recipe}
            shouldEdit={this.state.shouldEdit}
          />
        </React.Fragment>
      );
    }
  };
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleChangeServings = this.handleChangeServings.bind(this);
    this.state = { currentServings: 0 };
  }

  handleClose() {
    this.setState({ currentServings: 0 });
    this.props.modal.hideModal();
  }

  handleChangeServings(e) {
    let value = e.target.value;
    this.setState({ currentServings: value });
  }

  renderIngredient(recipe, ingredient) {
    let cuantity = ingredient.cuantity;

    if (this.state.currentServings > 0) {
      cuantity = (this.state.currentServings / recipe.servings) * cuantity;
    }

    return (
      <li key={ingredient.id}>
        {cuantity} {ingredient.unit} of {ingredient.name}
      </li>
    );
  }

  render() {
    let opacityClass = this.props.open ? "opacity-1" : "opacity-0";
    let pointerEvents = this.props.open ? "" : " pointer-events-none";
    let { recipe } = this.props;
    let ingredients =
      recipe.ingredients !== undefined ? recipe.ingredients : [];

    let servings = recipe.servings ? recipe.servings : 0;
    if (this.state.currentServings > 0) {
      servings = this.state.currentServings;
    }

    return (
      <div
        className={
          opacityClass +
          pointerEvents +
          " modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
        }
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div className="modal-container bg-white w-11/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <a
            className="modal-close absolute top-0 right-0 flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            onClick={this.handleClose}
          >
            <svg
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </a>
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">{recipe.name}</p>
              <a
                className="modal-close cursor-pointer z-50"
                onClick={this.handleClose}
              >
                <svg
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </a>
            </div>
            {/* body */}
            <span>
              Servings:{" "}
              <input
                type="number"
                min="1"
                max="10"
                value={servings}
                onChange={this.handleChangeServings}
                className="bg-gray-200 border-2 border-gray-200 rounded w-auto px-4 text-gray-700 focus-outline-none focus:bg-white focus-border-blue-600"
              />{" "}
            </span>
            <br />
            <h2 className="mt-5 inline-block">Ingredients:</h2>
            <ul className="list-disc p-5">
              {ingredients.map((ingredient) =>
                this.renderIngredient(recipe, ingredient)
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRecipeModal;
