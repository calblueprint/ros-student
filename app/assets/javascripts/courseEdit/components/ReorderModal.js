import React, { PropTypes } from 'react'
import _ from 'underscore'

import SimpleModal from '../../shared/components/widgets/SimpleModal'
import { Images } from '../../utils/helpers/image_helpers'

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'

const ItemHandle = SortableHandle(() => {
  return(
    <img
      className='course-edit-component-handle'
      alt='handle'
      src={Images.drag_handle}
    />
  )
})

const Item = SortableElement(({ value }) => {
  return (
    <div className='flex vertical' style={{ zIndex: 1001 }} key={value.id}>
      <ItemHandle />
      <div>{value.title}</div>
    </div>
  )
})

const ItemList = SortableContainer(({ items, type }) => {
  return (
    <div>
      {
        items.map((value, index) => {
          return <Item
            key={`${type}-${index}-${value.id}`}
            index={index}
            value={value}
          />
        })
      }
    </div>
  )
})

class ReorderModal extends React.Component {
  renderItems() {
    if (_.isEmpty(this.props.items)) {
      return 'Nothing to reorder!'
    }

    return (
      <ItemList
        items={this.props.items}
        type={this.props.type}
        onSortEnd={this.props.onReorder}
        lockAxis='y'
        useDragHandle
        useWindowAsScrollContainer
      />
    )
  }

  renderDisabled() {
    return (
      <div>
        This course has already been published - reordering is now disabled so that those already taking the course won't be affected. If you'd like to change the order, clone a new course instead.
      </div>
    )
  }

  render() {
    return (
      <SimpleModal
        isModalOpen={this.props.isModalOpen}
        closeModal={this.props.closeModal}
        title={`Reorder ${this.props.type}`}
      >
        {this.props.disabled ? this.renderDisabled() : this.renderItems()}
      </SimpleModal>
    )
  }
}

ReorderModal.propTypes = {
  disabled: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onReorder: PropTypes.func.isRequired,
}

export default ReorderModal
