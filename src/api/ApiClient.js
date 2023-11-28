import queryString from 'query-string';

import { callAlert } from '../store/actions/alerts';
import store from '../store';

const REQUEST_TIMEOUT = 30000;

export default class ApiClient {
  constructor({
    apiUrl = '',
    prefix = '',
    onError = () => {
      return;
    },
    onNetworkError = () => {
      return;
    }
  } = {}) {
    if (!apiUrl) throw new Error('[apiUrl] required');

    this.apiUrl = apiUrl;
    this.prefix = prefix;
    this.onError = onError;
    this.onNetworkError = onNetworkError;
  }

  async get(url, params = {}, onError = null) {
    return this.request(
      {
        url,
        params,
        method: 'GET'
      },
      onError
    );
  }

  async post(url, payload = {}, onError = null) {
    return this.request(
      {
        url,
        method: 'POST',
        body: payload
      },
      onError
    );
  }

  async put(url, payload = {}, onError = null) {
    return this.request(
      {
        url,
        method: 'PUT',
        body: payload
      },
      onError
    );
  }

  async patch(url, payload = {}, onError = null) {
    return this.request(
      {
        url,
        method: 'PATCH',
        body: payload
      },
      onError
    );
  }

  async delete(url, payload = {}, onError = null) {
    return this.request(
      {
        url,
        method: 'DELETE',
        body: payload
      },
      onError
    );
  }

  setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setApiPrefix(prefix) {
    this.prefix = prefix;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  async fetch(url, options, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fetch(url, options);
      } catch (error) {
        if (
          error &&
          error.name === 'TypeError' &&
          error.message === 'Network request failed'
        ) {
          if (i >= attempts - 1) {
            throw error;
          } else {
            await this.delay(5000);
          }
        } else {
          throw error;
        }
      }
    }
  }

  async request({ url, method, params = {}, body }, onError) {
    const query = Object.keys(params).length
      ? `?${queryString.stringify(params, { arrayFormat: 'comma' })}`
      : '';
    const requestUrl = `${this.apiUrl}/${this.prefix}/${url}${query}`;

    const controller = new AbortController();
    const { signal } = controller;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
      },
      withCredentials: true,
      crossDomain: false,
      signal,
      body: method !== 'GET' ? JSON.stringify({ ...body }) : undefined
    };

    try {
      const timeout = setTimeout(() => {
        controller.abort();
        // store.dispatch(callAlert());
      }, REQUEST_TIMEOUT);

      const res = await this.fetch(requestUrl, options);

      clearTimeout(timeout);

      let json = {};

      try {
        json = await res.json();
      } catch (error) {
        console.log('Wrong response error: ', error);

        const e = {
          code: 'INVALID_RESPONSE',
          httpStatus: res.status
        };

        throw e;
      }

      if (json.status === 0) {
        throw json.error;
      }

      return json;
    } catch (error) {
      if (onError) {
        onError(error);
        this.handleServerError(error);
      } else if (error.status) {
        this.handleServerError(error);
      }

      throw error;
    }
  }

  async delay(ms = 100) {
    return new Promise((res) => setTimeout(res, ms));
  }

  handleServerError(error) {
    console.log('Server error: ', error);
    this.onError(error);
  }
}
