import React, { Component } from "react";
import fetchArticles, { baseURL } from "./API";

class ClassComponent extends Component {
  constructor() {
    super();
    this.inputEl = React.createRef();
    this.state = {
      data: [],
      query: "redux",
      url: `${baseURL}?query=redux`
    };
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      this.setData();
    }
  }

  setData = async () => {
    const { hits: data } = await fetchArticles(this.state.url);
    this.setState({data});
    this.inputEl.current.select();
  }

  handleSubmit = event => {
    this.setState({ url:`${baseURL}?query=${this.state.query}`});
    console.log("submit");
    event.preventDefault();
  }

  handleInputChange = event => this.setState({query: event.target.value});

  render() {
    return (
      <>
        <h2>Class Component</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleInputChange}
            ref={this.inputEl}
          />
          <button type="submit">Search</button>
        </form>
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