import React, { Component } from "react";
import { fetchArticles } from "./API";
import debounce from "lodash/debounce";

class ClassComponent extends Component {
  state = {
    data: [],
    query: "redux"
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setData();
    }
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  cancelRequest = () => {
    if (this.controller) this.controller.abort();
  };

  getData = debounce(async ({ query, signal }) => {
    try {
      const { hits: data } = await fetchArticles(query, signal);
      this.setState({ data });
    } catch (error) {}
  }, 1000);

  setData = async () => {
    this.cancelRequest();
    this.controller = new AbortController();
    const { signal } = this.controller;
    this.getData({ signal, query: this.state.query });
  };

  handleInputChange = e => this.setState({ query: e.target.value });

  render() {
    return (
      <>
        <h2>Class Component</h2>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <ul>
          {this.state.data.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ClassComponent;
