import RepoInfo from "./RepoInfo";

export const defaultRepoInfo: RepoInfo = {
  id: 0,
  name: "",
  full_name: "",
  owner: {
    login: "",
    avatar_url: "",
  },
  html_url: "",
  description: "",
  url: "",
  created_at: "",
  updated_at: "",
  pushed_at: "",
  stargazers_count: 0,
  watchers_count: 0,
  forks_count: 0,
  forks: 0,
  archived: false,
  language: "",
  isLike: false,
};

export default defaultRepoInfo;
