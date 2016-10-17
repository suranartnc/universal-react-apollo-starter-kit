import React, { PropTypes } from 'react'

import HighlightSlider from './HighlightSlider/HighlightSlider'
import NewFeedTabs from './NewFeedTabs/NewFeedTabs'

const HomePageLayout = props => (
  <div>
    <HighlightSlider />
    <NewFeedTabs />
    <div>{props.children}</div>
  </div>
)

HomePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HomePageLayout
