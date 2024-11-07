export interface RepoInformation {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  forks: number;
  archived: boolean;
  language: string;
}

export type RepoInformationEnriched = RepoInformation & {
  is_liked: boolean;
};
