import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      contentType: 'application/json',
      success: (results) => this.setState({repos : results}),
      error: (err) => console.log('err', err)
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username: term }),
      success: () => {
        $.ajax({
          url: '/repos',
          type: 'GET',
          contentType: 'application/json',
          success: (results) => this.setState({repos : results}),
          error: (err) => console.log('err', err)
        });
      },
      error: (err) => console.log('err', err)
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));