const { nanoid } =  require('nanoid')
const books = require('./books')

const addBookHandler = (request, h) => {
   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
   } = request.payload

   const id = nanoid(16)
   const insertedAt = new Date().toISOString()
   const updatedAt = insertedAt
   const finished = readPage === pageCount  

   const isNameEmpty = name === undefined 
   if(isNameEmpty) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
      response.code(400)
      return response
   }

   const isReadPageValid = readPage > pageCount

   if(isReadPageValid) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)
      return response
   }

   const newBooks = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
   }
   books.push(newBooks)

   const isSuccess = books.filter((book) => book.id === id).length > 0
   if(isSuccess) {
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil ditambahkan',
         data: {
            bookId: id
         }
      })
      console.log(books)
      response.code(201)
      return response
   }

   const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku'
   })
   response.code(400)
   return response
}

const getAllBooksHandler = (request, h) => {
   const { name,reading, finished, } = request.query   

   if(name !== undefined) {
      const lowerCaseName = name.toLowerCase()
      const allBooks = books.filter(book => book.name.toLowerCase().includes(lowerCaseName)).map(book => (
         {
            id: book.id,
            name: book.name,
            publisher: book.publisher
         }
      ))
      const response = h.response({
         status: 'success',
         data: {
            books: allBooks
         }
      })
      console.log(lowerCaseName)
      response.code(200)
      return response
   }

   if(reading === '1') {
      const allReadingBooks = books.filter(book => book.reading === true).map(book => ({
         id: book.id,
         name: book.name,
         publisher: book.publisher,
         reading: book.reading
      }))
      const response = h.response({
         status: 'success',
         data: {
            books: allReadingBooks
         }
      })
      response.code(200)
      return response
   } 

   if(reading === '0') {
      const allUnreadingBooks = books.filter(book => book.reading === false).map(book => ({
         id: book.id,
         name: book.name,
         publisher: book.publisher,
         reading: book.reading
      }))
      const response = h.response({
         status: 'success',
         data: {
            books: allUnreadingBooks
         }
      })
      response.code(200)
      return response
   }

   if(finished === '1') {
      const allFinishedBooks = books.filter(book => book.finished === true).map(book => ({
         id: book.id,
         name: book.name,
         publisher: book.publisher,
         finished: book.finished
      }))
      const response = h.response({
         status: 'success',
         data: {
            books: allFinishedBooks
         }
      })
      response.code(200)
      return response
   }

   if(finished === '0') {
      const allUnfinishedBooks = books.filter(book => book.finished === false).map(book => ({
         id: book.id,
         name: book.name,
         publisher: book.publisher,
         finished: book.finished
      }))
      const response = h.response({
         status: 'success',
         data: {
            books: allUnfinishedBooks
         }
      })
      response.code(200)
      return response
   }

   const allBooks = books.map(book => (
      {id: book.id,
      name: book.name,
      publisher: book.publisher}
   ))
   const response = h.response({
      status: 'success',
      data: {
         books: allBooks
      }
   })
   console.log(books)
   response.code(200)
   return response
}

const getBookByIdHandler = (request, h) => {
   const { bookId } = request.params

   const book = books.filter((book) => book.id === bookId)[0]

   if(book !== undefined) {
      const response = h.response({
         status: 'success',
         data: {
            book
         }
      })
      console.log(books)
      response.code(200)
      return response
   }

   const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
   })
   response.code(404)
   return response
}

const updateBookHandler = (request, h) => {
   const { bookId } = request.params
   const updatedAt = new Date().toISOString()
   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
   } = request.payload

   

   const isNameEmpty = name === undefined
   console.log(isNameEmpty)
   if(isNameEmpty) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      response.code(400)
      return response
   }

   const isReadPageValid = readPage > pageCount
   console.log(isReadPageValid)
   if(isReadPageValid) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)
      return response
   }

   const findBookId = books.find(book => book.id === bookId)
   console.log(findBookId)
   if(findBookId === undefined){
      const response = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Id tidak ditemukan'
      })
      response.code(404)
      return response
   }

   const index = books.findIndex(book => book.id === bookId)
   console.log(index)

   if(index !== -1) {
      books[index] = {
         ...books[index],
         name,
         year,
         author,
         summary,
         publisher,
         pageCount,
         readPage,
         reading,
         updatedAt
      }
   }
   const response = h.response({
      status: 'success',
      code: 200,
      message: 'Buku berhasil diperbarui'
   })
   console.log(books)
   return response
}

const deleteBookHandler = (request, h) => {
   const { bookId } = request.params

   const findIndex = books.findIndex(book => book.id === bookId)
   console.log(findIndex)
   if(findIndex !== -1) {
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil dihapus'
      })
      books.splice(findIndex, 1)
      console.log(books)
      return response
   }

   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
   })
   console.log(books)
   response.code(404)
   return response
}


module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler,}