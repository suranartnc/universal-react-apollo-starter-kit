import React, { Component, PropTypes } from 'react'

import Icon from 'shared/components/Icon/Icon'

class SearchBar extends Component {

  render() {
    return (
      <div>
        <input type="text" placeholder="SEARCH..." />
      </div>
    )
  }
}

export default SearchBar
