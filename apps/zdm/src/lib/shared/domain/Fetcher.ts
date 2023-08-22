export interface Fetcher {
  fetch(input: string, requestInit?: RequestInit | undefined): Promise<Response>;
  setToken(token: string): void;
}
