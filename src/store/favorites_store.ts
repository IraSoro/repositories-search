import { makeAutoObservable } from "mobx";

import sortOptions from "../states/sort_options";
import RepoInfo from "../states/repo_info";
import ShortRepoInfo from "../states/short_repo_info";

class FavoritesStore {
  favorites: ShortRepoInfo[] = [];

  constructor() {
    const savedFavorites = localStorage.getItem("favorites");
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    this.sort(sortOptions[0]);
    makeAutoObservable(this);
  }

  get favoritesCount(): number {
    return this.favorites.length;
  }

  hasFavorite(id: number): boolean {
    return this.favorites.some((favItem) => favItem.id === id);
  }

  addFavorite(item: RepoInfo) {
    item.is_liked = true;
    this.favorites.push(item as ShortRepoInfo);
    this.sort(sortOptions[0]);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(item: RepoInfo) {
    this.favorites = this.favorites.filter((favItem) => favItem.id !== item.id);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  toggleFavorite(item: RepoInfo) {
    if (item.is_liked) {
      this.removeFavorite(item);
    } else {
      this.addFavorite(item);
    }
  }

  sort(option: string) {
    switch (option) {
      case "stars":
        this.favorites.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "forks":
        this.favorites.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case "updated":
        this.favorites.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      default:
        break;
    }
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
