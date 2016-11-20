import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

function App(props) {
  return (
    <div>
      <Helmet
        title="Universal React GraphQL Starter Kit"
        meta={[
            { name: 'description', content: 'A starter kit to bootstrap a universal web app using react, redux and apollo.' },
        ]}
      />
      { props.children }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
