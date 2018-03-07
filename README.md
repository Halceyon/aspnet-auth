# aspnet-auth

[![Greenkeeper badge](https://badges.greenkeeper.io/Halceyon/aspnet-auth.svg)](https://greenkeeper.io/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Halceyon/aspnet-auth/blob/master/LICENSE.txt) [![codecov](https://codecov.io/gh/Halceyon/aspnet-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/Halceyon/aspnet-auth) [![Build Status](https://travis-ci.org/Halceyon/aspnet-auth.svg?branch=master)](https://travis-ci.org/Halceyon/aspnet-auth) [![npm](https://img.shields.io/npm/dm/aspnet-auth.svg)](https://npm-stat.com/charts.html?package=aspnet-auth) [![npm](https://img.shields.io/npm/v/aspnet-auth.svg)](https://www.npmjs.com/package/aspnet-auth) [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/Halceyon/aspnet-auth.svg)](http://isitmaintained.com/project/Halceyon/aspnet-auth "Average time to resolve an issue") [![Percentage of issues still open](http://isitmaintained.com/badge/open/Halceyon/aspnet-auth.svg)](http://isitmaintained.com/project/Halceyon/aspnet-auth "Percentage of issues still open") 

A standalone lightweight javascript library for authenticating with ASP.NET OWIN site.

# Getting Started

## Install

From CDN

```html
<script src="https://cdn.jsdelivr.net/npm/aspnet-auth"></script>
```

From [npm](https://npmjs.org)

```sh
npm install aspnet-auth --save
```


### Initialize

```js
const aspnetAuth = new AspnetAuth({
  url: 'http://your-domain-name',
});
```

## Usage

**register**
```js
aspnetAuth.register('email@email.com', 'SomePassword').then((result) => {
  // returns result.status = 200 on success
  done();
})
  .catch((err) => {
    console.log(err);
  });
```

**login**
```js
aspnetAuth.login('email@email.com', 'SomePassword').then((result) => {
  // returns result.status = 200 on success
  done();
})
  .catch((err) => {
    console.log(err);
  });
```
