## Website Performance Optimization portfolio project
About Project:
==============

The aim of the project is to optimize the onine portfolio for speed.
In particular, optimize the critcital rendering path and render the page as quickly as possible.

Files:
------

package.json - Contains the project metadata like author, git repository and dependencies for the gulpfile.
gulpfile.js - Contains code for html, javascript minification and compression of image files.,
	also creates the optimizes files in 'dist' folder.
index.html - Page to test on Page Speed Insights.

============================================================
####Part 1: Optimize PageSpeed Insights score for index.html
============================================================

http://harikashekhar.github.io/frontend-nanodegree-mobile-portfolio/ Can be used for testing on Page Speed Insights.

Optimizations:
--------------

1. 	Web fonts are implemented using @font-face rule in CSS to improve performance.
	References: https://www.sitepoint.com/community/t/google-css-fonts/177511/2
2.	The css styles from 'style.css' are implemented as Internal styles in 'index.html'.
	Unused css is cleaned up and the web fonts are implemented here using @font-face rule.
	Used class names and id's instead of tag names hierarchy.
	Added 'media="print"' for print.css
3.	Non critical Javascript has been changed to load async and deferred.
4.	index.html - minified internal JS and CSS, removed comments and spaces using gulpfile.
5.	print.css - minified.
6.	Images - compressed using gulpfile.
7.	perfmatters.js - Javascript files uglified to improve performance and reduce load times.


====================================================
####Part 2: Optimize Frames per Second in pizza.html
====================================================

Files:
------

main.js :
---------

1.	movingPizzasGenerator() function calculates the total number of moving pizzas based on the user's screen dimensions.
	The function divides the screen into blocks of 256. The total number of moving pizzas is calculated, which is less than
	static 200 value initally chosen, reducing time and improving performance.
	The moving pizzas are generated on page load and appended to the #movingPizzas1 element.
2.	The image source for the moving Pizzas '.mover' elements is moved to the relative Inline CSS in 'pizza.html', reducing the
	image requests for each creation of '.mover' element.

		Implemented in CSS as :
		.mover {
			content: url(images/movingPizza.png);
		}
3.	A new movingPizza.png is used with smaller dimensions for optimization.
4.	On page load:
		--	movingPizzasGenerator() is called on animation frames - requestAnimationFrame(movingPizzasGeneration)
		--	updatePositions() function is called on animation frames
		--	addContainer() is called on page load, to create and append the pizzas container - Pizza Image and Description(name)
5.	On scroll event, updatePositions() function is called on animation frames
		--	requestAnimationFrames(updatePositions) implemented in raf();
6.	updatePositions():
	------------------

		--	scrollTop calculation inside the loop is fetched on scroll event and referred inside the updatePositions() for 'phase'
			calculations. This avoids 'Jank', 'forced reflow' and hence improves performance.

		--	css style property - 'transform' is used instead of 'left' inside loop, on each '.mover' element.
			items[i].style.transform = "translateX(" + 100 * phase + "px)";
7.	addContainer():
	---------------

		--	called on page load, to create and append the pizzas.
		--	calls 'pizzaElementGenerator' on animation frames in a loop of 98 (2-100), to generate '.randomPizzaContianer' element
			with pizzaImage and Pizza Description(and name) and append it to '.randomPizzas' element.
		--	requestAnimationFrame(pizzaElementGenerator);
		--	called on Page load to avoid forced reflow (Jank) of 'pizza.html'
		--	'.randomPizzas' is fetched out of loop.
			var pizzasDiv = document.getElementById("randomPizzas");
8.	pizzaElementGenerator():
	------------------------

		--	called by addContainer() to generate 98 (2-100) '.randomPizzaContainer' elements with pizza Image, Name and Description.
		--	moved height and width properties of '.randomPizzaContainer' to css.
		--	image source for pizza Image '.pizzaImage' set inside Inline css - pizza.html : 'images/pizza.png' - avoids multiple image requests.
		--	appends the '.randomPizzaContainer' to the '.randomPizzas' inside the function - avoids page forced reflow (jank).
		--	added appropriate classes for xs, sm and md devices - improves alignment.
9.	resizePizzas():
	---------------

		--	changeSliderLabel():
			--------------------

  			--	Called by changePizzaSizes(). It sets the Slider label - '#pizzaSize' and returns
  				new width for the '.randomPizzaContainer' elements.
  			--	new width value for the '.randomPizzaContainer' elements is returned to changePizzaSizes().

  		--	changePizzaSizes():
  			-------------------

  			--	fetches new width value for '.randomPizzaContainer' elements from changeSliderLabel()
  			--	changes the width of all '.randomPizzaContainer' elements to new width fetched.
  			--	For Extra Small devices ( xs - devices),
  				--	'.randomPizzaContainer' elements don't display Pizza Images - '.pizzaImage' - (hidden on xs devices)
  				--	A new pizza Image element is shown reflecting the slider pizza size value - '#pizzaMockSize' - (visible on xs devices only)
  				--	changePizzaSizes() changes the width of this pizza Image to the new width value from changeSliderLabel().
  				--	small: 12.5%, medium: 16.66%, large: 25% for Pizza Image (xs-devices)
10.	Removed the logic for Capitalizing the randomly generated Pizza Name - randomName().
	Implemented in css :

	--	text-transform: capitalize

pizza.html :
------------

1.	Styles from 'styles.css' implemented as Internal CSS.
2.	A new pizza Image will be visible on xs-devices, reflecting size (small, medium and large values from slider).

      <div class="row visible-xs">
        <img id="pizzaMockSize" class="img-responsive pizzaImage">
      </div>

    --	The pizza images '.pizzaImage' from '.randomPizzaContainer' class will not be shown for xs-devices for better look and performance.
3.	Image source for pizza Image '.pizzaImage' set inside Inline css - pizza.html : 'images/pizza.png' - avoids multiple image requests.
4.	Added appropriate classes for xs, sm and md devices on Pizza Image and description elements.
5. 	Internal CSS :
	--------------

	--	Added classes for alignment - '.center'
	--	The image source for the moving Pizzas '.mover' elements is moved to the relative Inline CSS in 'pizza.html', reducing the
		image requests for each creation of '.mover' element.

		Implemented in CSS as :
			.mover {
				content: url(images/movingPizza.png);
			}
6.	Set width and height values for all '.randomPizzaContainer' class elements
7.	default(Medium) size for the pizza image '#pizzaMockSize' for extra small devices
8.	Capitalizes Pizza Name. Removed related code from main.js
	--	text-transform: capitalize
9.	Width set to 50% for '.randomPizzaContianer' on xs-devices.
10.	'.mover'- moving Pizza Image - made a layer
	--	will-change: transform;
      	transform: translateZ(0);

TO get started, check out the repository or download the repository to local machine
====================================================================================

1. 	Open Terminal and run 'gulp' command. This will fetch all the dependencies listed in package.json file and
	create a 'dist' folder with the all project files.
2. 	To run a local server, Navigate to 'dist'and run the following command.

	  ```bash
	  $> cd /path/to/your-project-folder
	  $> python -m SimpleHTTPServer 8080

	  Additionally, to enable GZip compression of files on server, run:
	  $> python /path-to-file/GzipSimpleHTTPServer.py

	  GzipSimpleHTTPServer.py is provided in the source code.
3.	Download and install [ngrok](https://ngrok.com/) to make the local server accessible remotely.
   	Navigate to 'dist' folder and run the ngrok command as below.

	  ``` bash
	  $> cd /path/to/your-project-folder
	  $> ngrok http 8080
	  ```
4. 	Copy the public URL ngrok gives you and run it through PageSpeed Insights!
5. 	Current Page Speed Score:
		Mobile: 95/100
		Desktop: 96/100

========================================================================================================================================================================
Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
2. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

3. Open a browser and visit localhost:8080
4. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok http 8080
  ```

5. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
