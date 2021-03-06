[![CI](https://github.com/eliasjunior/weekly-menu-react/actions/workflows/main.yml/badge.svg)](https://github.com/eliasjunior/weekly-menu-react/actions/workflows/main.yml)

# Weekly Menu UI

<br />
<p align="center">
  <a href="https://github.com/eliasjunior/weekly-menu-react/blob/master/public/favicon.png">
    <img src="public/favicon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Weekly Menu</h3>

  <p align="center">
    It's a web application to help organizing your weekly recipes.
    <br />
    <br />
  </p>
</p>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#technical-overview">Technical overview</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center" >
    <a href="https://github.com/eliasjunior/weekly-menu-react/blob/master/docs/img/dashboard.png">
        <img src="docs/img/dashboard.png" alt="Logo" width="200px" height="350px">
    </a>
     <a href="https://github.com/eliasjunior/weekly-menu-react/blob/master/docs/img/recipes.png">
        <img src="docs/img/recipes.png" alt="Logo" width="200px" height="350px">
    </a>
    <a href="https://github.com/eliasjunior/weekly-menu-react/blob/master/docs/img/shopping-list.png">
        <img src="docs/img/shopping-list.png" alt="Logo" width="200px" height="350px">
    </a>
    <a href="https://github.com/eliasjunior/weekly-menu-react/blob/master/docs/img/pick-list.png">
        <img src="docs/img/pick-list.png" alt="Logo" width="200px" height="350px">
    </a>
</p>

This app is not just a shoppping list app, it generates a list of products based on your weekly menu, you just need a list of recipes.
* select the recipes for the week.
* generates the shopping list from it.

</br>

## Getting Started

### Prerequisites

* Download [NodeJS](https://nodejs.org)  and follow the steps.

* Server app [Weekly-menu](https://github.com/eliasjunior/weekly-menu)

### Installation

<li><a href="https://github.com/eliasjunior/weekly-menu-react" target="_blank">Source Code</a></li>

1. Clone the Weekly-menu-react App
   ```sh
   git clone https://github.com/eliasjunior/weekly-menu-react.git
   ```
2. Install NPM packages, run the command bellow.
   ```sh
   npm install
   ```

## Technical Overview

### Frameworks and Libs

React

* Positive personal experience.
* Instability
* It embraces reusability, testability and Javascript native features instead of adding a api layer.

CSS

* React Material


### Code Structure

Organized by features
 
root
- features
  - components(returns a html/jsx or actions(functions from the component))
  - presenter (layer between view and the access-data)
  - data-access (access external API)
  - helpers


