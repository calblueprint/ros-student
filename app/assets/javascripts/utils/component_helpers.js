import _ from 'underscore'

/*
  Grabs the key from youtube url.
  Input: https://youtu.be/z0newb4cJ6A
  Output: z0newb4cJ6A
*/
function getYoutubeKey(videoUrl) {
  const regex =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = videoUrl.match(regex)
  return (match && match[7].length == 11) ? match[7] : false
}

function formatComponent(component) {
  const formattedComponent = _.extend({}, component)

  switch(formattedComponent.component_type) {
    case 0:
      formattedComponent['image_data'] = component['content_url']
      formattedComponent['content_url'] = ''
  }

  return formattedComponent
}

function isComponentSelfStudy(component) {
  return component &&
    component.component_type == 0 &&
    component.audio_url == null
}

export {
  getYoutubeKey,
  formatComponent,
  isComponentSelfStudy,
}
