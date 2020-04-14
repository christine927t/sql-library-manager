'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model { }
    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: '"Title" cannot be empty',
                },
                notEmpty: {
                    msg: '"Title" cannot be empty',
                },
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: '"Title" cannot be empty',
                },
                notEmpty: {
                    msg: '"Author" cannot be empty',
                 },
            },
        },
        genre: Sequelize.STRING,
        year: {
            type: Sequelize.INTEGER,
            validate: {
                // notEmpty: {
                //     msg: "Please enter a valid year (YYYY)"
                // },
                isNumeric: {
                    msg: "Please enter a numeric year (YYYY)"
                },
            },
        },
    }, { sequelize });

    return Book;
};