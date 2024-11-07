import { makeAutoObservable, runInAction } from "mobx";
import { RepoInformation } from "../data/repo_information";
import { SortOption } from "../data/sort_option";

class RepositoriesStore {
  repositories: RepoInformation[] = [];
  totalCount = 0;

  selectedValue = SortOption.Stars;
  inputValue = "";
  repPage = 12;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGetRepositories() {
    const headersList = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN as string}`,
    };

    const url = `https://api.github.com/search/repositories?q=${this.inputValue}&per_page=${this.repPage}&page=${this.page}&sort=${this.selectedValue}`;

    fetch(url, {
      method: "GET",
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const updatedItems = (data.items as RepoInformation[]).map((item) => ({
          ...item,
          isLike: false,
        }));

        runInAction(() => {
          this.totalCount = data.total_count;
          this.repositories =
            this.page === 1
              ? updatedItems
              : [...this.repositories, ...updatedItems];
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  addPage() {
    this.page = this.page + 1;
    this.fetchGetRepositories();
  }

  resetValues() {
    this.page = 1;
    this.totalCount = 0;
    this.repositories = [];
    this.selectedValue = SortOption.Stars;
    this.inputValue = "";
  }

  updateInput(newValue: string) {
    if (newValue === "") {
      this.resetValues();
      return;
    }
    this.inputValue = newValue;
    this.page = 1;
    this.fetchGetRepositories();
  }

  updateSelect = (newValue: SortOption) => {
    this.selectedValue = newValue;
    this.page = 1;
    this.fetchGetRepositories();
  };

  findRepositoryById(id: number): RepoInformation | undefined {
    return this.repositories.find((repo) => repo.id === id);
  }
}

const repositoriesStore = new RepositoriesStore();
export default repositoriesStore;
