import React, { Component } from "react";
import { fetchArticles } from "./API";
import debounce from "lodash/debounce";
import Loader from './Loader';

class ClassComponent extends Component {
  state = {
    data: [],
    query: "redux",
    loading: false,
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.cancelRequest();
      this.setData();
    }
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  cancelRequest = () => {
    if (this.controller) this.controller.abort();
  };

  setData = async () => {
    this.controller = new AbortController();
    const { signal } = this.controller;
    const getData = debounce(async () => {
      this.setState({ loading: true });
      try {
        const { hits: data } = await fetchArticles(this.state.query, signal);
        this.setState({ data });
        this.setState({ loading: false });
      } catch (error) {}
    }, 1000);
    getData();
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
        {!this.state.loading ? (
          <ul>
            {this.state.data.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default ClassComponent;
