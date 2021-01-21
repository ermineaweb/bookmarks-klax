import Bookmark from "./Bookmark";

class VideoBookmark extends Bookmark {
  width: number;
  height: number;
  duration: number;

  constructor(
    id: string,
    url: string,
    date: Date,
    title: string,
    author: string,
    width: number,
    height: number,
    duration: number,
    keywords: Array<string>
  ) {
    super(id, url, date, title, author, keywords);
    this.width = width;
    this.height = height;
    this.duration = duration;
  }
}

export default VideoBookmark;
