import { makeAutoObservable } from "mobx";

import { SortOption } from "../states/sort_options";
import RepoInfo from "../states/repo_info";
import ShortRepoInfo from "../states/short_repo_info";

class FavoritesStore {
  favorites: ShortRepoInfo[] = [];

  constructor() {
    const savedFavorites = localStorage.getItem("favorites");
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    this.sort(SortOption.Stars);
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
    this.sort(SortOption.Stars);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(item: RepoInfo) {
    this.favorites = this.favorites.filter(
      (favItem) => favItem.id !== item.id
    );
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  toggleFavorite(item: RepoInfo) {
    if (item.is_liked) {
      this.removeFavorite(item);
      return;
    }
    this.addFavorite(item);
  }

  sort(option: SortOption) {
    switch (option) {
      case SortOption.Stars:
        this.favorites.sort((a, b) => b.stargazers_count - a.stargazers_count);
        return;
      case SortOption.Forks:
        this.favorites.sort((a, b) => b.forks_count - a.forks_count);
        return;
      case SortOption.LastUpdate:
        this.favorites.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        return;
    }
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
