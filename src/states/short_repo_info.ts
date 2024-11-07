interface ShortRepoInfo {
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

export default ShortRepoInfo;
