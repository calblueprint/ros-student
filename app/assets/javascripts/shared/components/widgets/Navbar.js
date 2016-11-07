import React from 'react'

class Navbar extends React.Component {
  render() {
    return (
      <nav className='nav'>
        <div className='flex center'>
          <div className='container'>
            {this.props.children}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
