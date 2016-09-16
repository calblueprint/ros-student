const RouteHandler = ReactRouter.RouteHandler
const IndexRoute = ReactRouter.IndexRoute
const Link = ReactRouter.Link

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <RouteHandler {...this.props}/>
    )
  }
}
