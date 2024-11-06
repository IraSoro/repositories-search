import { makeAutoObservable } from "mobx";
import RepoInfo from "../states/RepoInfo";

class FavoritesStore {
  favorites: RepoInfo[] = [];

  constructor() {
    const savedFavorites = localStorage.getItem("favorites");
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    makeAutoObservable(this);
  }

  get favoritesCount(): number {
    return this.favorites.length;
  }

  addFavorite(item: RepoInfo) {
    item.isLike = true;
    this.favorites.push(item);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(item: RepoInfo) {
    this.favorites = this.favorites.filter((favItem) => favItem.id !== item.id);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  toggleFavorite(item: RepoInfo) {
    if (item.isLike) {
      this.removeFavorite(item);
    } else {
      this.addFavorite(item);
    }
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
