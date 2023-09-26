## Passwordinator

## Introduction

Passwordinator is a keychain application which can be used to hold all of your password infortaion for other sites. It is intended for use as an all-in-one place to both save your current passwords and generate new random ones!

## Development

This project proved itself to be one of my most challenging tasks as a learning developer. I wanted to be able to have an application that I could provide publicly as a complete Full Stack project. This project is what I came up with.

To begin, I started off with the base project of the original Passwordinator React project, which was just frontend project that generated new passwords. I gathered all of my recent familiarities in web dev tech, and decided that a SERN Stack application was my best route for completion. At the time of development, I had been practicing utilizing SQL (specifically MySQL, PostgreSQL, SQLlite, etc.), thus I continued with MySQL as my database of choice. React is one of my primary front end technologies of choice; Node and Express were brief familiarities of mine, so I continued wsith those.

I began with establishing the method of user authentication, as I knew that I wanted to develop an application complete with user login/signup/logout with saved data. I wanted a soid method of user password hashing, thus I utilized bcrypt and JSON Web Tokens, to make certain that the user was who they said they were and were able to make CRUD requests to my database. Once a user was logged in, I provided different ways to save custom pasword entries and randomly generated entries.

On a separate page, I established the complete Saved Passwords page, which fetched your saved password data (if any) and loaded it to the page. Each password was displayed as a dropdown button, which would appear as the website of choice first, then would display a dropdown with the username, date and time created, and the password saved.

I then established some methods of updating each password that was previously saved and deleting each password.

All of these requests were done using Axios on the front end and express routes and the backend.

# Check it out below!

Live Link: https://passwordinator.netlify.app/

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT License

Copyright (c) 2021 Gian P Zamora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Want to help me out?

Any Tips, Questions, Concerns, or Comments, you can reach me at zmr.gian@gmail.com

Thanks for Visiting! :)
