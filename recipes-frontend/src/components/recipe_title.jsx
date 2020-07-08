import React from "react";

class RecipeTitle extends React.Component {
  constructor(props) {
    super(props);

    this.handleDetail = this.handleDetail.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDetail(e) {
    e.preventDefault();
    if (this.props.handleDetail !== undefined) {
      this.props.handleDetail(this.props.recipe);
    }
  }

  handleEdit(e) {
    e.preventDefault();
    if (this.props.handleEdit !== undefined) {
      this.props.handleEdit(this.props.recipe);
    }
  }

  handleDelete(e) {
    e.preventDefault();
    if (this.props.handleDelete !== undefined) {
      this.props.handleDelete(this.props.recipe);
    }
  }

  render() {
    let { recipe } = this.props;
    return (
      <div className="flex flex-row" key={recipe.id}>
        <div className="flex-1">
          <a
            className="inline-block align-baseline text-lg text-blue-500 hover-text-blue-800"
            href="#"
            onClick={this.handleDetail}
          >
            {recipe.name}
          </a>
        </div>
        <div className="flex-2">
          <button
            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            onClick={this.handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default RecipeTitle;
