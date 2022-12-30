## Passwordinator

![](https://github.com/seddboi/passwordinator/blob/main/client/gif/Password%20Generator.gif)

## Introduction

This is a simple random password generator, built in React. This project simply takes an password length input and your choice os possible random characters from capitals, lowercase, numbers and special characters. It then spits it out in front of you, with the ability to copy the password to your clipboard for use elsewhere.

## How I accomplished the project

I essentially started with the basics of breaking apart the components as easy as possible. I started with a main homepage that would render everything. Then I had a main title component, a form component, and a popup component.

I started with the main title component, which literally just contained the main title and a sub-heading. This took no input from the user and was simply just plug and play.

The form component is where most of the code was held. It was composed of a text input component, and several input box components that acted as state manipulators. It accepted a length(non-negative) for a password and whichever options the user selects for possible characters in their generated password. A separate, custom hook which ran separate from this form component, was called each time the submit button was allowed past the "failsafe" methods implemented for no options selected or negative password lengths.

The popup component was a feature provided by Material UI for React. It essentially allowed a plug and play feature for a popup that allowed me to display the generated password on submit of the user values. It requires a few extra "props", yet it was nothing out of the ordinary to set up.

## The Breakdown of the custom hook, usePasswordRandomizer

This hook was actually very simple to set up. For starters, it contains every possible character that will be used in the randomization: capital letters, lowercase letters, numbers, and special characters. It then concatenates each array of selected characters into one larger array. Once the user options are selected, it then takes the length that was entered, and selects randomized characters, the same amout of times as the length provided by the user.

This hook is called within the Form component, and its password value is passed as a "prop" to the Popup component.

## How to Install?

Its actually not necessary. Just visit the link and you're set!

Live Link: https://seddboi.github.io/passwordinator/

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
