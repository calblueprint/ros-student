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
  const formattedComponent = component
  switch(formatComponent.component_type) {
    case 0:
      formattedComponent['image_data'] = formattedComponent['content_url']
      delete formattedComponent['content_url']
  }

  return formattedComponent
}

export {
  getYoutubeKey,
  formatComponent,
}
