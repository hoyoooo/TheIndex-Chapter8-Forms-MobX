import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import AddAuthorCard from "./AddAuthorCard";

// Store
import authorStore from "./stores/AuthorStore";

class AuthorsList extends Component {
  render() {
    const authorCards = authorStore.filteredAuthors.map(author => (
      <AuthorCard key={author.first_name + author.last_name} author={author} />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar store={authorStore} />
        <AddAuthorCard />
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}

export default observer(AuthorsList);
