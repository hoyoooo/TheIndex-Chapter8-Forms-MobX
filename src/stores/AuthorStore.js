import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorStore {
  constructor() {
    this.authors = [];
    this.loading = true;
    this.query = "";
  }

  fetchAuthors() {
    return instance
      .get("/api/authors/")
      .then(res => res.data)
      .then(authors => {
        this.authors = authors;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query)
    );
  }

  addAuthor(newAuthor) {
    console.log(newAuthor)
    console.log(this.authors)
    axios
      .post("https://the-index-api.herokuapp.com/api/authors/", newAuthor)
      .then(res => res.data)
      .then(newAuthor => {
        this.authors.push(newAuthor);
        console.log(this.authors);
      })
      .catch(err => console.log(err));
  }

  getAuthorById(id) {
    return this.authors.find(author => +author.id === +id);
  }
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  query: observable,
  addAuthor: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
