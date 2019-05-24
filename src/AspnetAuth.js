/**
 * ASP.NET OWIN Auth Javascript Client (https://github.com/Halceyon/aspnet-auth)
 *
 * Copyright © 2018 Code HQ (Pty) Ltd. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const axios = require('axios');
const cookies = require('browser-cookies');
const parseJson = require('parse-json');
const qs = require('qs');
const stringify = require('json-stable-stringify');

class AspnetAuth {
  constructor(options) {
    const defaults = {
      url: '',
      client_id: 'jsApp',
      client_secret: '0000000000000', // TODO: Update your secret
    };
    this.options = Object.assign(defaults, options);

    if (this.options.url.length === 0) {
      throw this.options;
    }

    this.authentication = null;
    this.cookieName = 'apnetAuth';
    this.http = this.setupAxios();

    // try and load from cookies
    this.fillAuth();
  }

  setupAxios() {
    // setup axios
    axios.defaults.baseURL = this.options.url;
    axios.interceptors.response.use(null, error => Promise.reject(error));
    return axios;
  }

  register(username, email, password) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/api/account/register', {
      Username: username,
      Password: password,
      Email: email,
    });
  }

  forgot(email) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/api/account/forgotpassword', {
      email,
    });
  }

  login(username, password) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/token', qs.stringify({
      username,
      password,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
      grant_type: 'password',
    }))
      .then((response) => {
        this.saveAuth(response.data);
        this.fillAuth();
        return response;
      });
  }

  loginExternal(tokenRequest) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.get(`/api/account/ObtainLocalAccessToken?externalAccessToken=${tokenRequest.externalAccessToken}&provider=${tokenRequest.provider}`)
      .then((response) => {
        this.saveAuth(response.data);
        this.fillAuth();
        return response;
      });
  }

  logout() {
    // delete the cookie
    cookies.erase(this.cookieName);

    // clear cached values
    this.authentication = null;
    return true;
  }

  refreshToken() {
    const tokenRequest = {
      grant_type: 'refresh_token',
      refresh_token: this.authentication.refresh_token,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
    };
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/token', qs.stringify(tokenRequest))
      .then((response) => {
        this.saveAuth(response);
        this.fillAuth();
        return response;
      });
  }

  saveAuth(result) {
    let secure = false;
    // save secure cookies for https requests
    if (window.location.protocol === 'https:') {
      secure = true;
    }
    cookies.set(this.cookieName, stringify(result), {
      secure,
    });
  }

  readAuth() {
    return cookies.get(this.cookieName);
  }

  fillAuth() {
    const authStr = this.readAuth();
    if (authStr) {
      this.authentication = parseJson(authStr);
    }
  }
}

export default AspnetAuth;
