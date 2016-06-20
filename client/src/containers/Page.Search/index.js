import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchRepo } from '../../actions'

import ReposList from '../../components/reposList';

import styles from './styles.css';

class PageSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  onInputChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.searchRepo(this.state.query);
    // NOTE: why should we clear search input? I want to know what I am looking at
    // this.setState({ query: '' });
  }

  renderResults() {
    if (this.props.repos.length > 0) {
      return (
        <div className={styles.results}>
          <ReposList repos={this.props.repos} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="jumbotron">
        <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
          <input
            placeholder="Github Search"
            className="form-control"
            value={this.state.query}
            onChange={this.onInputChange.bind(this)}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>

        {this.renderResults()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchRepo }, dispatch)
};

function mapStateToProps({ repos }) {
  return { repos };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch)
