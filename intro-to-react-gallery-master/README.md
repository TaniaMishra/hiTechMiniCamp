# react-gallery

[Setup](#setup)

[Lab](#lab)

# Setup

- git clone this repository
- create a new branch with the following name `yourname-solution`

## MacOS/Linux
- `npm install`
- `npm start`

## Windows
- `npm install`
- `npm run build-watch` to start the webpack process
- Open another terminal window; from there, `npm run start-server` to start the server process

## Attribution

Creative commons images:
- [https://pixabay.com/en/flowers-orange-orange-petals-3215188/](https://pixabay.com/en/flowers-orange-orange-petals-3215188/)
- [https://pixabay.com/en/red-goblets-bird-nature-3254214/](https://pixabay.com/en/red-goblets-bird-nature-3254214/)
- [https://pixabay.com/en/beach-foam-motion-ocean-sea-2179183/](https://pixabay.com/en/beach-foam-motion-ocean-sea-2179183/)
- [https://pixabay.com/en/tiger-cat-predator-wildcat-3260803/](https://pixabay.com/en/tiger-cat-predator-wildcat-3260803/)
- [https://pixabay.com/en/tangerines-clementines-citrus-fruits-3259942/](https://pixabay.com/en/tangerines-clementines-citrus-fruits-3259942/)

## What We're Building

We'll be building a photo gallery app. We'll also discover a common scenario when we need to use componentDidUpdate to save the day!

We know that after a component "mounts" (renders for the first time), we can use AJAX to make network requests for data in the componentDidMount lifecycle hook. However, componentDidMount only fires once. For all subsequent updates, we can leverage componentDidUpdate to check and see if we need to make additional requests. One of the most common scenarios where this occurs is when we need to fetch new data for a component after a change in a url parameter.

Note - this exercise uses `json-server`, a lightweight server that automatically creates a RESTful API based on a JSON file. This means we'll be able to get our data from our server, even though we haven't written any routes or set aside a database.

# Lab

## Starting Point
Take a moment to familiarize yourself with the starting point code. The code is annotated with comments to help you understand what's going on.

Currently, even though our Next and Prev buttons update the url appropriately, we're stuck looking at flowers all day. Our json-server is serving up our picture from the endpoint /pictures. If you make GET requests to [http://localhost:3000/pictures](http://localhost:3000/pictures) or [http://localhost:3000/pictures/:pictureId](http://localhost:3000/pictures/:pictureId), you should be able to get details about all the pictures, or a single picture. You can also view the contents of the "database" in db.json.

Once you have a good grasp of the starting code, move on to the next step and we'll start grabbing our real pictures.

## Fetch Pictures
First thing's first - let's fetch our pictures from the server! Which React lifecycle hook do we use to fetch initial data?

<details>
<summary>Hint: Solution</summary>
  
```jsx
useEffect(() => {
    
}, []);
```
</details>

Well, go ahead and use it. `axios` is already imported for you. Make a request to fetch the picture at `/pictures/:pictureId`, and then set it on state! Try it out yourself, and check your work against the solution code below.

<details>
<summary>Hint: Solution</summary>
  
```jsx
// The fetch function created outside of useEffect because
// it will be reused to fetch a new picture
async function fetchPicture() {
    const pictureId = match.params.pictureId;
    const { data } = await axios.get(`/pictures/${pictureId}`);
    setPicture(data);
};

useEffect(() => {
    fetchPicture();
}, []);
```
</details>

Let's try it out. If you manually change the url bar (`http://localhost:3000/#/gallery/1`, `http://localhost:3000/#/gallery/2`, etc) and perform a hard refresh, you should see your new picture.

Let's try out those Next/Prev buttons....uh oh. We're missing something! Move on to the next section to find out what's wrong!

## Determining New Pictures
The problem is that `useEffect with an empty array` only executes when the component mounts - that is, when the DOM elements it represents are first added to the real DOM. Our url is changing, but our component is not being removed from the DOM - it doesn't mount a second time just because the url changes.

However, our component does update when the url changes, because its parent __Route__ component re-renders it (and passes it the new routeProps - __match__, __location__ and __history__)! In particular, we're interested in the new value of __match.params__ - because the url changed, it should be the id of the picture we need to fetch!

Fortunately, `useEffect` hook can be used to hook into whenever a component updates. Here's what it looks like:

```jsx
// this useEffect will be fired when value changes
useEffect(() => {

}, [value]);
```

Using this lifecycle method, try to make it so that your component can tell when it updates, and fetches the proper picture in response. Check your work against the solution below.

_Important reminder_: remember that `props.match.params.<paramId>` is a string!

<details>
<summary>Hint: Solution</summary>
  
```jsx
useEffect(() => {
        fetchPicture();
}, [match.params.pictureId]);
```
</details>

## If You Have Time...
Got a moment yet? Try creating a Gallery component that will fetch all of the pictures in the "database", and render them in a list. You could even make it so that clicking one of them takes you to that picture.