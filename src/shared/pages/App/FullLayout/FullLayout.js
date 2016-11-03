import React, { PropTypes } from 'react'

import Header from 'shared/pages/App/Header/Header'
import Sidebar from 'shared/pages/App/Sidebar/Sidebar'

const FullLayout = props => (
  <div>
    <Header />
    <Sidebar />
    <div>
      {props.children}
    </div>
  </div>
)

FullLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullLayout
