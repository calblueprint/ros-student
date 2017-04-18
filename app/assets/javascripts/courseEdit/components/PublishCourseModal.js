import React, { PropTypes } from 'react'

import SimpleModal from '../../shared/components/widgets/SimpleModal'

class PublishCourseModal extends React.Component {
  renderPublishText() {
    return (
      <div>
        Are you sure you want to publish this course? You won't be able to do any reordering of the components, and students will be able to view this course in their courses tabs.
      </div>
    )
  }

  renderUnpublishText() {
    return (
      <div>
        Are you sure you want to unpublish this course? Students will no longer be able to view the course or take any of it's material.
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
      </SimpleModal>
    )
  }
}

PublishCourseModal.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onTogglePublish: PropTypes.func.isRequired
}


export default PublishCourseModal
