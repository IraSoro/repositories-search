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

  hasFavorite(id: number): boolean {
    return this.favorites.some((favItem) => favItem.id === id);
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

  findRepositoryById(id: number): RepoInfo | undefined {
    return this.favorites.find((repo) => repo.id === id);
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
