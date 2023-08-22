import type { Fetcher } from "~/lib/shared/domain/Fetcher";

export class FetchInstance implements Fetcher {
  private readonly _apiUrl: string;
  private _token: string = '';

  constructor() {
    this._apiUrl = `${import.meta.env.VITE_ZDM_API}${import.meta.env.VITE_API_VERSION}`;
  }

  setToken(token: string) {
    this._token = token;
  }

  async fetch(route: string, initialRequestInit?: RequestInit | undefined): Promise<Response> {
    const url = new URL(`${this._apiUrl}${route}`);
    const requestInit  = this.createInitialRequest(initialRequestInit);
    return await fetch(url, requestInit);
  }

  private createInitialRequest(requestInit?: RequestInit): RequestInit {
    return {
      ...requestInit,
      headers: {
        ...this._token ? { Authorization: `Bearer ${this._token}` } : {},
        'Content-Type': 'application/json',
        ...requestInit?.headers,
      }
    }
  }
}
