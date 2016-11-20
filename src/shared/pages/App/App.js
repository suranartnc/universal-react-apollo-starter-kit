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
        link={[
            { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css' },
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
