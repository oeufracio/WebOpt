# Website Optimization

## Installation
The first part of the project is to achieve a `PageSpeed` score of at least 90\100. To get the score of `PageSpeed` you need: 


1. Open `dist/index.html` in localhost, for example ` python -m SimpleHTTPServer 8000`
2. To expose your localhost to internet you can use `ngrok`, for example `.\ngrok http 8000`
3. Use the link provided by `ngrok` to get the `PageSpeed` score of `dist/index.html`.

For the second part of the project, which involves `dist/views/pizza.html` and `dist/views/js/main.js`, you can open `dist/views/pizza.html` in your localhost.

**NOTE**: I also host this project in AWS-S3, so you can use the next link in `PageSpeed`:

http://odineufracio.com.s3-website-us-east-1.amazonaws.com/

## Build tools
Gulp is used to automatically perform optimizations. There are two extra files:

- `gulpfile.js`, which contains the `default` and `build` tasks. The `default` task that can be used during development, and the `build` task that helps to generate the production code in `dist`.

- `package.json`. 

## Optimizations in `app/index.html`

The next points were implemented to achieve a score of at least 90/100:

1. The style.css is inline in the html file.
2. print.css is deferred by using `media=print`.
3. JavaScript is at the bottom of the <body> section.
4. Where appropriate, `async` is used to load JavaScript files.
5. Google font is loaded asynchronously as described in this [blog](https://www.lockedowndesign.com/load-google-fonts-asynchronously-for-page-speed/).
6. The html file is minified.

The score achieved in PageSpeed is 94/100 for mobile and 95/100 for desktop.


## Optimizations in `app/views/js/main.js`

The changes needed to get 60 fps are:

1. The `updatePosition` function is simpler and avoids forced synchronous layout.
2. The `updateScroll` function is implemented to control requestAnimationFrame.
3. The number of pizzas (before 200) is determined with the screen height to avoid creating unnecessary pizzas.

The changes needed to resize pizzas under 5 ms are:

1. The function `changePizzaSizes` absorbed the work of the `determineDx` function.
2. `document.querySelectorAll` is computed just one time.
3. To avoid forced synchronous layout, the size of the pizzas is changed by percentage.

## License
Copyright (c) 2017 Odin Eufracio

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