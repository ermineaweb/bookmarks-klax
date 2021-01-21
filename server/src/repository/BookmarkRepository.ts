import Bookmark from "../models/Bookmark";
import IRepository, { ItemsPaginated } from "./IRepository";

/*
Bookmarks repository :
- CRUD on datas
- implements interface to easily switch database without break anything
 */

class BookmarkRepository implements IRepository<Bookmark> {
  bookmarks: Array<Bookmark>;

  constructor() {
    this.bookmarks = [];
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    return bookmark;
  }

  getBookmark(id: string): Bookmark | null {
    const bookmark = this.bookmarks.find((b) => b.id === id);
    return bookmark || null;
  }

  getBookmarks(nbItem: number, page: number): ItemsPaginated<Bookmark> {
    const nbPages = Math.ceil(this.bookmarks.length / nbItem);
    // just check if client send bad page request
    if (!page || page <= 0 || page > nbPages) page = 1;
    const bookmarks = this.bookmarks.slice((page - 1) * nbItem, nbItem * page);
    return { bookmarks, nbPages };
  }

  updateKeywords(id: string, keywords: Array<string>): boolean {
    const bookmark = this.getBookmark(id);
    if (bookmark) bookmark.keywords = keywords;
    return true;
  }

  deleteBookmark(id: string) {
    this.bookmarks = this.bookmarks.filter((b) => b.id !== id);
    return true;
  }
}

export default new BookmarkRepository();
