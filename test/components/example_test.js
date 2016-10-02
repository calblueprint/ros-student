import React from 'react';
import { Link } from 'react-router';
import renderer from 'react-test-renderer';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
