const { method } = require("lodash")

const routes = [
   {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
         return h.response('created').code(201);
      }
   },
   {
      method: '*',
      path: '/',
      handler: (request, h) => {
         return 'Halaman tidak dapat diakses dengan method tersebut'
      }
   },
   {
      method: 'GET',
      path: '/about',
      handler: (request, h) => {
         return 'About page'
      }
   },
   {
      method: '*',
      path: '/about',
      handler: (request, h) => {
         return 'Halaman tidak dapat diakses dengan method tersebut'
      }
   },
   { 
      method: '*',
      path: '/{any*}',
      handler: (request, h) => {
         return 'Halaman tidak ditemukan'
      }
   },
   {
      // Path parameter
      method: 'GET',
      path: '/users/{username?}',
      handler: (request, h) => {
         const { username = 'Stranger' } = request.params
         return `Hello ${username}`
      }
   },
   {
      // Query parameter
      method: 'GET',
      path: '/hello/{name?}',
      handler: (request, h) => {
         const { name } = request.params
         const { location, abc } = request.query
         return `Hello ${name}, from ${location} --- ${abc}`
      }
   },
   {
      method: 'GET',
      path: '/login',
      handler: (request, h) => {
         const { username, pass } = request.payload
         return `Hello ${username} pass ${pass}`
      }
   }
]

module.exports = routes;