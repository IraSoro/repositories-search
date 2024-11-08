import { makeAutoObservable, runInAction } from "mobx";
import {
  RepoInformationEnriched,
  RepositoriesResponse,
} from "../data/repo_information";
import { SortOption } from "../data/sort_option";

class RepositoriesStore {
  repositories: RepoInformationEnriched[] = [];
  totalCount = 0;

  selectedValue = SortOption.Stars;
  inputValue = "";
  repPage = 12;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async #fetchGetRepositories() {
    const options = [
      `q=${this.inputValue}`,
      `per_page=${this.repPage}`,
      `page=${this.page}`,
      `sort=${this.selectedValue}`,
    ];

    const resp = await fetch(
      `https://api.github.com/search/repositories?${options.join("&")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (resp.status !== 200) {
      throw new Error(
        `Github returned non-200 status code[${
          resp.status
        }]: ${await resp.json()}`
      );
    }

    const repositoriesResponse = (await resp.json()) as RepositoriesResponse;
    const repositories = repositoriesResponse.items.map((item) => ({
      ...item,
      is_liked: false,
    }));

    runInAction(() => {
      this.totalCount = repositoriesResponse.total_count;
      this.repositories =
        this.page === 1
          ? repositories
          : [...this.repositories, ...repositories];
    });
  }

  #resetValues() {
    this.page = 1;
    this.totalCount = 0;
    this.repositories = [];
    this.selectedValue = SortOption.Stars;
    this.inputValue = "";
  }

  addPage() {
    this.page = this.page + 1;
    this.#fetchGetRepositories();
  }

  updateInput(newValue: string) {
    if (newValue === "") {
      this.#resetValues();
      return;
    }
    this.inputValue = newValue;
    this.page = 1;
    this.#fetchGetRepositories();
  }

  updateSelect = (newValue: SortOption) => {
    this.selectedValue = newValue;
    this.page = 1;
    this.#fetchGetRepositories();
  };
}

const repositoriesStore = new RepositoriesStore();
export default repositoriesStore;
