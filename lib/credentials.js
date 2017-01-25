const DROPSTACK_BASE_URL = process.env.DROPSTACK_BASE_URL || `https://api.dropstack.run`;
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

function login({username, password}) {
  if(!username) return Promise.reject(new Error('Missing username'));
  if(!password) return Promise.reject(new Error('Missing password'));

  return fetch(`${DROPSTACK_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(data => {
    if(data && data.message && data.message === 'Unauthorized') {
      return Promise.reject(new Error('Unauthorized'))
    }
    return data;
  });
}

function signup({username, password}) {
  if(!username) return Promise.reject(new Error('Missing username'));

  return fetch(`${DROPSTACK_BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json());
}

function reset({username, token}) {
  if(!username) return Promise.reject(new Error('Missing username'));

  return fetch(`${DROPSTACK_BASE_URL}/reset`, {
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
    prompt.get(['email'], (err, data) => {
      if(err) return reject(err);
      resolve({username: data.email});
    });
  });
}

function inputPassword(password) {
  if(password) return Promise.resolve({password});

  return new Promise((resolve, reject) => {
    prompt.start({noHandleSIGINT: true});
    prompt.get([{ name: 'password', hidden: true, replace: '*'}], (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
}
