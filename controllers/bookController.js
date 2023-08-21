const db = require("../models");

Books = db.Books;

const bookController = {
  showAllBook: async (req, res) => {
    try {
      const showBook = await Books.findAll();
      res.json({
        status: "success",
        statusCode: 200,
        message: "Success get all book",
        data: showBook,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error show all data",
      });
    }
  },
  detailBookByPk: async (req, res) => {
    try {
      const findBooksByPk = await db.Books.findByPk(req.params.id);

      if (findBooksByPk) {
        return res.json({
          status: "success",
          statusCode: 200,
          message: "Show Book Data",
          data: findBooksByPk,
        });
      } else {
        res.json({
          status: "Error",
          statusCode: 400,
          message: "Book not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error Show Data by Id",
      });
    }
  },
  addNewBook: async (req, res) => {
    try {
      const newBook = await Books.create({
        ...req.body,
      });

      res.json({
        status: "success",
        statusCode: 200,
        message: "Book has been added",
        data: newBook,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error adding book collection",
      });
    }
  },
  updateBook: async (req, res) => {
    try {
      const findBook = await Books.findByPk(req.params.id);
      if (!findBook) {
        return res.json({
          status: "Error",
          statusCode: 400,
          message: "Book not found",
        });
      }

      const newUpdate = await Books.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.json({
        status: "success",
        message: "Updated this book",
        data: newUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error updating book",
      });
    }
  },
  deleteBookById: async (req, res) => {
    try {
      const findBook = await Books.findByPk(req.params.id);

      if (findBook) {
        await findBook.destroy();
        res.json({
          status: "success",
          statusCode: 200,
          message: "Success delete book by id",
        });
      } else {
        res.json({
          status: "Error",
          statusCode: 400,
          message: "Book not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error deleting book",
      });
    }
  },
};

module.exports = bookController;
