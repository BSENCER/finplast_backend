(function () {
  'use strict';

  const apiBase = window.FINPLAST_API_URL ||
    (window.location.port === '8000' ? '/api/v1' : 'http://127.0.0.1:8000/api/v1');
  const accessKey = 'finplast_access_token';
  const refreshKey = 'finplast_refresh_token';
  const languageKey = 'finplast_language';

  function getLanguage() {
    return localStorage.getItem(languageKey) || document.documentElement.lang || 'az';
  }

  function setTokens(data) {
    if (data && data.access_token) sessionStorage.setItem(accessKey, data.access_token);
    if (data && data.refresh_token) localStorage.setItem(refreshKey, data.refresh_token);
  }

  async function request(path, options, retry) {
    const config = Object.assign({ headers: {} }, options || {});
    const query = path.includes('?') ? '&' : '?';
    const url = apiBase + path + query + 'lang=' + encodeURIComponent(getLanguage());
    const access = sessionStorage.getItem(accessKey);
    if (access) config.headers.Authorization = 'Bearer ' + access;
    const response = await fetch(url, config);
    if (response.status === 401 && !retry && localStorage.getItem(refreshKey)) {
      const refreshed = await request('/auth/refresh?token=' + encodeURIComponent(localStorage.getItem(refreshKey)), {}, true);
      if (refreshed && refreshed.access_token) {
        setTokens(refreshed);
        return request(path, options, true);
      }
    }
    if (!response.ok) throw new Error((await response.text()) || 'API request failed');
    if (response.status === 204) return null;
    return response.json();
  }

  const client = {
    baseUrl: apiBase,
    getLanguage: getLanguage,
    setLanguage: function (lang) {
      localStorage.setItem(languageKey, lang);
      document.documentElement.lang = lang;
    },
    request: request,
    login: async function (username, password) {
      const response = await request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username, password: password }) });
      setTokens(response);
      return response;
    },
    me: function () { return request('/auth/me'); },
    products: function (params) {
      const query = new URLSearchParams(params || {}).toString();
      return request('/products' + (query ? '?' + query : ''));
    },
    product: function (slug) { return request('/products/' + encodeURIComponent(slug)); },
    navigation: function (location) { return request('/navigation?location=' + encodeURIComponent(location || 'header')); },
    categories: function () { return request('/categories'); },
    settings: function () { return request('/settings'); },
    translations: function () { return request('/translations'); },
    submitLead: function (lead) {
      return request('/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    },
    adminCreateProduct: function (product) {
      return request('/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    },
    adminUpdateProduct: function (id, product) {
      return request('/admin/products/' + encodeURIComponent(id), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    },
    adminDeleteProduct: function (id) {
      return request('/admin/products/' + encodeURIComponent(id), { method: 'DELETE' });
    },
    adminLeads: function () { return request('/admin/leads'); }
    ,adminUpdateLeadStatus: function (id, status) {
      return request('/admin/leads/' + encodeURIComponent(id) + '/status', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: status }) });
    },
    adminDeleteLead: function (id) { return request('/admin/leads/' + encodeURIComponent(id), { method: 'DELETE' }); },
    adminProducts: function () { return request('/admin/products'); },
    adminCategories: function () { return request('/categories'); },
    media: function () { return request('/media'); },
    deleteMedia: function (filename) { return request('/media/' + encodeURIComponent(filename), { method: 'DELETE' }); },
    adminUsers: function () { return request('/admin/users'); },
    logout: function () {
      const access = sessionStorage.getItem(accessKey);
      const result = access ? request('/auth/logout', { method: 'POST' }).catch(function () {}) : Promise.resolve();
      return result.finally(function () {
        sessionStorage.removeItem(accessKey);
        localStorage.removeItem(refreshKey);
      });
    }
  };

  window.FinplastAPI = client;

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([client.products(), client.navigation('header'), client.translations(), client.categories(), client.settings()]).then(function (results) {
      if (Array.isArray(results[0]) && results[0].length) localStorage.setItem('finplast_catalog_items_api', JSON.stringify(results[0]));
      window.dispatchEvent(new CustomEvent('finplast-api-ready', { detail: { products: results[0], navigation: results[1], translations: results[2], categories: results[3], settings: results[4] } }));
    }).catch(function () {
      window.dispatchEvent(new CustomEvent('finplast-api-unavailable'));
    });
  });
}());
