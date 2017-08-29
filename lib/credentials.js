const fetch = require('node-fetch');
const prompt = require('prompt');
prompt.message = '';
prompt.delimiter = ':';

module.exports = config => {
  return {
    login: login,
    signup: signup,
    reset: reset,
    inputEmail: inputEmail,
    inputPassword: inputPassword,
  }
}

function login({username, password, url}) {
  if(!username) return Promise.reject(new Error('Parameter username missing'));
  if(!password) return Promise.reject(new Error('Parameter password missing'));
  if(!url) return Promise.reject(new Error('Parameter url missing'));

  const basicAuth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

  return fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'Authorization': basicAuth },
  })
  .then(response => {
    if(response.status >=400) return Promise.reject(new Error(response.statusText));
    return response.json();
  });
}

function signup({username, password, url}) {
  if(!username) return Promise.reject(new Error('Parameter username missing'));
  if(!url) return Promise.reject(new Error('Parameter url missing'));

  return fetch(`${url}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => {
    if(response.status >=400) return Promise.reject(new Error(response.statusText));
    return response.json();
  });
}

function reset({username, token, url}) {
  if(!username) return Promise.reject(new Error('Parameter username missing'));
  if(!token) return Promise.reject(new Error('Parameter token missing'));
  if(!url) return Promise.reject(new Error('Parameter url missing'));

  return fetch(`${url}/auth/reset`, {
    method: 'POST',
    body: JSON.stringify({username}),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if(data && data.message && data.message === 'Unauthorized') {
      return Promise.reject(new Error('Unauthorized'))
    }
    return data;
  });
}

function inputEmail(username) {
  if(username) return Promise.resolve({username});

  return new Promise((resolve, reject) => {
    prompt.start({noHandleSIGINT: true});
    prompt.get([{
      name: 'email',
      required: true,
      empty: false,
      format: 'email',
      warning: 'Must be a valid email address',
    }], (err, data) => {
      if(err) return reject(err);
      resolve({username: data.email});
    });
  });
}

function inputPassword(password) {
  if(password) return Promise.resolve({password});

  return new Promise((resolve, reject) => {
    prompt.start({noHandleSIGINT: true});
    prompt.get([{
      name: 'password',
      hidden: true,
      replace: '*',
      empty: false,
      required: true,
      conform: value => value.length >= 4,
      warning: 'Must be a minimum lenght of 4'
    }], (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
}
