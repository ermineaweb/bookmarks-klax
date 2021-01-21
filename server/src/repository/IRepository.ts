interface IRepository<T> {
  addBookmark(item: T): T;
  getBookmark(id: string): T | null;
  getBookmarks(nbItem: number, page: number): ItemsPaginated<T>;
  updateKeywords(id: string, keywords: Array<string>): boolean;
  deleteBookmark(id: string): boolean;
}

export type ItemsPaginated<T> = {
  bookmarks: Array<T>;
  nbPages: number;
};

export default IRepository;
