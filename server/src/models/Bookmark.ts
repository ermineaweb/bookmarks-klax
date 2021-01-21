abstract class Bookmark {
  id: string;
  url: string;
  title: string;
  author: string;
  date: Date;
  keywords: Array<string>;

  protected constructor(
    id: string,
    url: string,
    date: Date,
    title: string,
    author: string,
    keywords: Array<string> = []
  ) {
    this.id = id;
    this.url = url;
    this.date = date;
    this.title = title;
    this.author = author;
    this.keywords = keywords;
  }
}

export default Bookmark;
