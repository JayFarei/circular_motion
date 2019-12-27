## Circular Motion

This is a small POC using JS to animate a circle on the screen and following the user mouse location using some visual effects.

A live version of this POC can be found [here](https://jayfarei.github.io/circular_motion/)


*Source:* [Chris' tutorial](https://www.youtube.com/watch?v=raXW5J1Te7Y&list=PLaiL-dW1ZK53w_8qaGCsv4fASU1wAO0tX&index=5)

Starting point was the following animation blueprint: https://github.com/christopher4lis/canvas-boilerplate


## Repository structure

* `src` contains the source - with canvas being the JS file that powers the Animation

* `dist` contains the exported version for distribution / I have created a branch for github pages

* The remainder of the repository is node_modules required (that will be installed anyway following yarn) as well as webpack to do live prototyping.

## Pre-requisite

Locate the project folder

Clone the template repo to have a dev server tailored for rapid THREE.js development.

```
git clone https://github.com/christopher4lis/three-boilerplate.git
```
Install dependencies

```
yarn
```

To run locally use:

```
npm start
```
