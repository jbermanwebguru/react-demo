import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://players-api.developer.alchemy.codes/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Bearer ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  login: (email, password) =>
    requests.post('/login', { email, password }),
  register: (first_name, last_name, email, password, confirm_password) =>
    requests.post('/user', { first_name, last_name, email, password, confirm_password })
};

const Players = {
  all: () => requests.get('/players'),
  create: (first_name, last_name, rating, handedness) =>
    requests.post('/players', { first_name, last_name, rating, handedness })
};

export default {
  Players,
  Auth,
  setToken: _token => { token = _token; }
};
