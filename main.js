import React, {createClass, PropTypes} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHistory, useBasename } from 'history'

let history = useBasename(useRouterHistory(createHistory))({
  basename: process.env.NODE_ENV === 'production' ? '/react-router-basename-test' : ''
})

function App (props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

function ContentContainer () {
  return <p>I contain</p>
}

const ButtonContainer = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  load () {
    this.context.router.push('/content/path')
  },

  render () {
    return <button onClick={this.load}>Click me</button>
  }
})

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={ButtonContainer} />
      <Route path='content/path' component={ContentContainer}/>
    </Route>
  </Router>
), document.getElementsByTagName('main')[0])
