import { v4 as uuid } from "uuid";
import Bookmark from "../models/Bookmark";
import BookmarkRepository from "../repository/BookmarkRepository";
import ImageBookmark from "../models/ImageBookmark";
import axios from "axios";
import VideoBookmark from "../models/VideoBookmark";
import { ItemsPaginated } from "../repository/IRepository";

const ITEM_PER_PAGES = Number(process.env.ITEM_PER_PAGES) || 3;

/*
Bookmarks service :
- contains all the logic when Add, Get, Update, Delete a bookmark
- decoupled from the API (we can swap to graphql, fastify...)
- decoupled from database : we can swap database easily without change the logic
 */

class BookmarkService {
  repository: typeof BookmarkRepository;

  constructor() {
    this.repository = BookmarkRepository;
  }

  async addBookmark(url: string) {
    // 1. if url is not an oembed url, convert into oembed format
    if (!this.isOembedUrl(url)) url = this.convertToOembedUrl(url);

    // 2. get properties with the oembed API
    try {
      const result = await axios.get(url);

      // 3. we have attributes, we can create the new Bookmark.
      const bookmark = this.createBookmark(url, result.data);
      if (!bookmark) return;

      // 4. save the bookmark
      this.repository.addBookmark(bookmark);
      return bookmark;
    } catch (err) {
      // do something with an error manager, log...
      throw new Error("Create bookmark failed");
    }
  }

  private createBookmark(url: string, attributes: any): Bookmark | null {
    // this function have to create a new bookmark. The logic can change,
    // and we can add new bookmarks types in future,
    const id = uuid();
    const { type, title, author_name, width, height, duration } = attributes;
    switch (type) {
      case "video":
        return new VideoBookmark(id, url, new Date(), title, author_name, width, height, duration, []);
      case "photo":
        return new ImageBookmark(id, url, new Date(), title, author_name, width, height, []);
      default:
        return null;
    }
  }

  private convertToOembedUrl(url: string): string {
    // if user send just a url we have to convert into oembed url
    // in future we can add more providers with new regex easily
    switch (true) {
      case url.search(/flickr/) > -1:
        return `https://www.flickr.com/services/oembed/?format=json&url=${url}`;
      case url.search(/vimeo/) > -1:
        return `https://vimeo.com/api/oembed.json?url=${url}`;
      default:
        throw new Error("Url is not a valid oembed url, and no provider found");
    }
  }

  private isOembedUrl(url: string): boolean {
    // check if the url is directly an oembed url or not
    return url.search(/oembed/gm) > -1;
  }

  getBookmark(id: string): Bookmark | null {
    return this.repository.getBookmark(id);
  }

  getBookmarks(page: number): ItemsPaginated<Bookmark> {
    return this.repository.getBookmarks(ITEM_PER_PAGES, page);
  }

  updateKeywords(id: string, keywords: Array<string>) {
    this.repository.updateKeywords(id, keywords);
  }

  deleteBookmark(id: string) {
    return this.repository.deleteBookmark(id);
  }
}

export default new BookmarkService();
