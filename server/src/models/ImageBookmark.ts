import Bookmark from "./Bookmark";

class ImageBookmark extends Bookmark {
  width: number;
  height: number;

  constructor(
    id: string,
    url: string,
    date: Date,
    title: string,
    author: string,
    width: number,
    height: number,
    keywords: Array<string>
  ) {
    super(id, url, date, title, author, keywords);
    this.width = width;
    this.height = height;
  }
}

export default ImageBookmark;
