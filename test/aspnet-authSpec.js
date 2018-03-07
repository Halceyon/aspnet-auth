/**
 * ASP.NET OWIN Auth Javascript Client (https://github.com/Halceyon/aspnet-auth)
 *
 * Copyright © 2018 Code HQ (Pty) Ltd. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable: no-console */
import axios from 'axios';
import { expect } from 'chai';
import cookies from 'browser-cookies';
import faker from 'faker';
import fs from 'fs';
import parseJson from 'parse-json';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import AspnetAuth from '../src/AspnetAuth';

sinonStubPromise(sinon);

describe('AspnetAuth', () => {
  let aspnetAuth;

  beforeEach(() => {
    sinon.stub(cookies, 'get').returns(null);
    sinon.stub(cookies, 'set');
    aspnetAuth = new AspnetAuth({
      url: 'http://localhost:45083',
    });
  });
  afterEach(() => {
    cookies.get.restore();
    cookies.set.restore();
    aspnetAuth = null;
  });

  it('should register a new user', (done) => {
    sinon.stub(axios, 'post').resolves({
      status: 200,
    });

    aspnetAuth.register(faker.internet.email(), 'Password@1', 'Password@1').then((result) => {
      expect(result.status).to.eql(200);
      done();
    });

    axios.post.restore();
  });

  it('should login a user', (done) => {
    const loginResponse = parseJson(fs.readFileSync('test/data/login-response.json').toString());
    sinon.stub(axios, 'post').resolves({
      status: 200,
      data: loginResponse,
    });
    aspnetAuth.login('support@codehq.co.za', '61C%3MYnWCankJ@w')
      .then((response) => {
        done();
        expect(response.data.access_token).to.eq('175f0a68e51a420eb27ec707a53cce70');
      })
      .catch((err) => {
        console.log(err);
      });

    axios.post.restore();
  });

  it('should logout and clear the cookie container', () => {
    const result = aspnetAuth.logout();
    expect(cookies.set.calledOnce).to.be.true;
    expect(result).to.be.true;
  });

  it('should request a refresh token', (done) => {

    cookies.get.restore();
    sinon.stub(cookies, 'get').returns('{"refresh_token": "test-token"}');

    const loginResponse = parseJson(fs.readFileSync('test/data/login-response.json').toString());
    sinon.stub(axios, 'post').resolves({
      status: 200,
      data: loginResponse,
    });

    aspnetAuth.fillAuth();
    aspnetAuth.refreshToken()
      .then((response) => {
        done();
        expect(response.data.access_token).to.eq('175f0a68e51a420eb27ec707a53cce70');
      });

    axios.post.restore();
  });

  it('should login an external user', (done) => {
    const loginResponse = parseJson(fs.readFileSync('test/data/login-response.json').toString());
    sinon.stub(axios, 'get').resolves({
      status: 200,
      data: loginResponse,
    });
    aspnetAuth.loginExternal({
      token: '',
    })
    .then((response) => {
      done();
      expect(response.data.access_token).to.eq('175f0a68e51a420eb27ec707a53cce70');
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get.restore();
  });
});
