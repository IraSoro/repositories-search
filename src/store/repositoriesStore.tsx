import { makeAutoObservable, runInAction } from "mobx";
import RepoInfo from "../states/RepoInfo";

class RepositoriesStore {
  repositories: RepoInfo[] = [];
  totalCount = 0;

  selectedValue = "none";
  inputValue = "";
  repPage = 12;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGetRepositories() {
    const headersList = {
      Accept: "application/vnd.github+json",
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
        const updatedItems = (data.items as RepoInfo[]).map((item) => ({
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
  }

  resetValues() {
    this.page = 1;
    this.fetchGetRepositories();
  }

  updateInput(newValue: string) {
    repositoriesStore.inputValue = newValue;
    this.resetValues();
  }

  updateSelect = (newValue: string) => {
    repositoriesStore.selectedValue = newValue;
    this.resetValues();
  };
}

const repositoriesStore = new RepositoriesStore();
export default repositoriesStore;
