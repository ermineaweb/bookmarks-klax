import { BookmarkService } from "./index";

class InitService {
  static urls = [
    "https://www.flickr.com/services/oembed/?format=json&url=http%3A//www.flickr.com/photos/bees/2341623661",
    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/105438077",
    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/3251262",
    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/31874211",
    "https://www.flickr.com/services/oembed/?format=json&url=https://www.flickr.com/photos/20063988@N08/50855250653/in/explore-2021-01-20/",
    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/51052272",
    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/59528715",
    "https://vimeo.com/59528715",
    "https://www.flickr.com/services/oembed/?format=json&url=https://www.flickr.com/photos/angelovphotography/50853037753/in/explore-2021-01-20/",
    "https://www.flickr.com/services/oembed/?format=json&url=https://www.flickr.com/photos/thomashawk/50850414146/in/explore-2021-01-20/",
    "https://www.flickr.com/photos/thomashawk/50850414146/in/explore-2021-01-20/",
  ];

  constructor() {}

  static async init() {
    const promises = [];
    for (const url of this.urls) {
      promises.push(BookmarkService.addBookmark(url).catch((err) => err));
    }
    Promise.all(promises).catch((err) => {
      console.log(err);
    });
  }
}

export default InitService;
