---
id: aa:getting-started
title: Getting Started ∙ Babel Starter Kit
---

# Getting Started

Install using npm and save it as a dependency.

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
aspnetAuth.register('email@email.com', 'SomePassword', 'SomePassword').then((result) => {
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
