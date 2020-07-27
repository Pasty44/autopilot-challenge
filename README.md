This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initializing

Run `npm install` to install the necessary dependencies before starting the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode

---

### Dev notes

#### Component split

The general idea was to have the interactivity behaviour and data fetching in the parent (index.js), and have dumb, visual components split out.

#### Styling

I used styled components as I had prior experience with it

No framework was used as it wasn't necessary for a single component, and I would have been overriding it anyway

#### Testing

I added it for the root component and options, the others were a bit too simple to add them in at this point. The index testing could be more comprehensive, as I added at the bottom of that test file in a comment. However, due to time constraints I left it out.

#### To do

There's still plenty of work that could be done. I could make the search dropdown more reusable, so it isn't bound to that specific URL - make it so you just give the endpoint and the data formatting function and have it much more reusable.

There's small UX change I could make, like closing dropdown when blurring the input.

There's also some small bugs, e.g. if it hits the endpoint, then the user types before results come back and it hits the endpoint again, the first API call isn't cancelled, so you get a double updating of the options.

Styling could be tweaked a bit more, and some things like the message shown if there's no results aren't styled at all