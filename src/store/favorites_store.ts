import { makeAutoObservable } from "mobx";

import { SortOption } from "../data/sort_option";
import { RepoInformation } from "../data/repo_information";

interface FavoriteRepoInformation {
  id: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  is_liked: boolean;
  updated_at: string;
}

class FavoritesStore {
  favorites: FavoriteRepoInformation[];

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

  addFavorite(item: RepoInformation) {
    item.is_liked = true;
    this.favorites.push(item as FavoriteRepoInformation);
    this.sort(SortOption.Stars);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(item: RepoInformation) {
    this.favorites = this.favorites.filter(
      (favItem) => favItem.id !== item.id
    );
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  toggleFavorite(item: RepoInformation) {
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
