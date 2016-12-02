import React from 'react'
import _ from 'underscore'

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import request from '../../shared/requests/request'
import { Images } from '../../utils/image_helpers'

import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

const SortableItem = SortableElement(({ name, index }) =>
  <li className='SortableItem'>{name}</li>
);

const SortableItemList = SortableContainer(({ items, disabled }) => (
  <ul>
    {items.map((name, index) =>
      <SortableItem
        collection="item"
        key={`item-${index}`}
        name={name}
        index={index}
        disabled={disabled}
      />
    )}
  </ul>
))

class SectionContainer extends React.Component {
  render() {
    const { section, index, items, onSortEnd } = this.props

    return (
      <div className='SortableSection'>
      <h5>Section: {section}</h5>
        <SortableItemList
          lockAxis="y"
          items={items}
          onSortEnd={onSortEnd.bind(this, index)}
          lockToContainerEdges
        />
      </div>
    )
  }
}


const SortableSection = SortableElement(({ section, index, items, onSortEnd }) =>
  <SectionContainer
    section={section}
    index={index}
    items={items}
    onSortEnd={onSortEnd}
  />
)
const SortableSectionList = SortableContainer(({ sections, onSectionSortEnd }) => (
  <div>
    {sections.map(({ section, items }, index) => (
      <SortableSection
        collection="section"
        key={`item-${section}`}
        section={section}
        index={index}
        items={items}
        onSortEnd={onSectionSortEnd}
      />
    ))}
  </div>
))

class TestingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [{section: 'A', items: ['A1', 'A2', 'A3']}, {section: 'B', items: ['B1', 'B2']}],
      value1: 'This is value',
      value2: 'This other value',
      url: '',
      image: '',
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
            sections: arrayMove(this.state.sections, oldIndex, newIndex)
        });
  }

  onSectionSortEnd(sectionIndex, {oldIndex, newIndex}) {
    const section = this.state.sections[sectionIndex];

    arrayMove(section.items, oldIndex, newIndex)

    this.setState({
      sections: this.state.sections
    });
  }

  onImage(value) {
    console.log('image')
    const params = {
      component: {
        photo_attributes: {
          image_data: value,
        },
      },
    }
    request.post('/api/admins/subsections/1/components', params, (response) => {
      this.setState({ image: response.component.photo.image_url })
      console.log(response.component.photo.image_url)
    })
  }

  onAudio(audio) {
    console.log('audio')
    const params = {
      component: {
        audio_data: audio,
      }
    }
    request.post('/api/admins/subsections/1/components', params, (response) => {
      this.setState({ url: response.component.audio_url })
      console.log(response.component)
    })
  }

  onBlur1(value) {
    this.setState({ value1: value })
  }

  onBlur2(value) {
    this.setState({ value2: value })
  }

  renderHeader() {
    return <h1>HEADER</h1>
  }

  renderItems() {
    return ['1', '2', '3'].map((value) => {
      return <h3 key={value}>{value}</h3>
    })
  }

  render() {
    return (
      <div>
        <SortableSectionList
          sections={this.state.sections}
          lockAxis="y"
          lockToContainerEdges
          onSortEnd={this.onSortEnd.bind(this)}
          onSectionSortEnd={this.onSectionSortEnd.bind(this)}
        />

        <InlineEditInput value={this.state.value1} onBlur={this.onBlur1.bind(this)} />
        <InlineEditInput value={this.state.value2} onBlur={this.onBlur2.bind(this)} />
        <Dropdown header={this.renderHeader()} items={this.renderItems()} />
        <ImageUploadInput label='image' onChange={this.onImage.bind(this)} />
        <AudioUploadInput label='audio' onChange={this.onAudio.bind(this)} />
        <audio src={this.state.url} controls preload />
        <img src={this.state.image} />
      </div>
    )
  }
}

export default TestingPage
