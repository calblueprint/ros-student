import React from 'react'
import _ from 'underscore'

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

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
      sections: [{section: 'A', items: ['A1', 'A2', 'A3']}, {section: 'B', items: ['B1', 'B2']}]
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
  render() {
    return (
      <SortableSectionList
        sections={this.state.sections}
        lockAxis="y"
        lockToContainerEdges
        onSortEnd={this.onSortEnd.bind(this)}
        onSectionSortEnd={this.onSectionSortEnd.bind(this)}
      />
    )
  }
}
export default TestingPage
