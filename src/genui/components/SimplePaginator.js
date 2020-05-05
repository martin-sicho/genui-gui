import React from 'react';
import { smoothScrollToTop } from '../utils';
import Pagination from "react-js-pagination";

class SimplePaginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      pageItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      activePage: 1,
      pageItems: this.props.items.slice(0, this.props.itemsPerPage)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.forceUpdate || (this.props.items.length !== prevProps.items.length)) {
      this.setState({
        activePage: 1,
        pageItems: this.props.items.slice(0, this.props.itemsPerPage)
      })
    }
  }

  handlePageChange(pageNumber) {
    const end = pageNumber * this.props.itemsPerPage;
    const start = end - this.props.itemsPerPage;
    const pageItems = this.props.items.slice(start, end <= this.props.items.length ? end : this.props.items.length);
    this.setState({
      pageItems: pageItems,
      activePage: pageNumber
    });
    smoothScrollToTop();
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.pageItems)}
        <Pagination
            activePage={this.state.activePage}
            totalItemsCount={this.props.items.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
        />
      </div>
    );
  }
}

export default SimplePaginator;