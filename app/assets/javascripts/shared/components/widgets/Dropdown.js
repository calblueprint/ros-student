import React, { PropTypes } from 'react'

import '../../../../stylesheets/components/_dropdown.scss'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.state = {
      expanded: false,
      height: 0,
    }
  }

  componentDidMount() {
    let { clientHeight, clientWidth } = this.refs.dropdown
    this.setState({ height: clientHeight })
  }

  toggleDropdown() {
    this.setState({ expanded: !this.state.expanded })
  }

  getDropdownHeight() {
    return _.reduce(this.props.items, (result, component) => {
      return result + component
    }, 0)
  }

  getDropdownStyle() {
    if (this.state.expanded) {
      return { maxHeight: `${this.state.height}px` }
    }
  }

  render() {
    const dropdownStyle = this.getDropdownStyle()
    return(
      <div>
        <div onClick={this.toggleDropdown}>{this.props.header}</div>
        <div ref='dropdown' className='dropdown' style={dropdownStyle}>
          {this.props.items}
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  header: PropTypes.element.isRequired,
  items: PropTypes.array.isRequired,
}

Dropdown.defaultProps = {
  items: [],
}

export default Dropdown
