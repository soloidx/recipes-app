import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    if (this.props.handleSearch != undefined) {
      this.props.handleSearch(e);
    }
  }

  render() {
    return (
      <input
        className="border-2 m-5 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="filter"
        placeholder="Search for a recipe"
        onChange={this.handleSearch}
      />
    );
  }
}

export default SearchBar;
