import React, { PropTypes } from 'react'

import SimpleModal from '../../shared/components/widgets/SimpleModal'

class PublishCourseModal extends React.Component {
  renderPublishText() {
    if (this.props.hasEmpty()) {
      return (
        <div>
          Please ensure there are no empty sections and/or subsections before publishing the course.
        </div>
      )
    } else {
      return (
        <div>
          Are you sure you want to publish this course? You won't be able to do any adding, deleting, or reordering to the course, and students will be able to view this course in their courses tabs.

          <div className='flex flex-horizontal marginTop-sm'>
            <input
              type='submit'
              className='button button--red'
              value='Cancel'
              onClick={this.props.closeModal}
            />

            <input
              type='submit'
              className='button marginLeft-sm'
              value='Continue'
              onClick={this.props.onTogglePublish}
            />
          </div>
        </div>
      )
   }
  }

  renderUnpublishText() {
    return (
      <div>
        Are you sure you want to unpublish this course? Students will no longer be able to view the course or take any of its material.

        <div className='flex flex-horizontal marginTop-sm'>
          <input
            type='submit'
            className='button button--red'
            value='Cancel'
            onClick={this.props.closeModal}
          />

          <input
            type='submit'
            className='button marginLeft-sm'
            value='Continue'
            onClick={this.props.onTogglePublish}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <SimpleModal
        title={this.props.isPublished ? 'Unpublish Course?' : 'Publish Course?'}
        isModalOpen={this.props.isModalOpen}
        closeModal={this.props.closeModal}
      >
        {this.props.isPublished ? this.renderUnpublishText() : this.renderPublishText()}
      </SimpleModal>
    )
  }
}

PublishCourseModal.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onTogglePublish: PropTypes.func.isRequired,
  hasEmpty: PropTypes.func.isRequired
}


export default PublishCourseModal
