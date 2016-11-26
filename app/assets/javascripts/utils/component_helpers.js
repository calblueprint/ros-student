function getYoutubeKey(videoUrl) {
  const regex =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = videoUrl.match(regex);
  return (match && match[7].length == 11) ? match[7] : false;
}

export {
  getYoutubeKey,
}
