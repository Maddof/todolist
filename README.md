# todolist

_A ToDo webapp made in vanilla js_

This ToDo app allows you to add projects, add tasks or "ToDo's" to these projects. You can filter out all your tasks by project, date (todays date and next weeks tasks) and priority.

The app starts with a default project and some tasks in it. You can delete these or add your own to the project. As soon as you do, the local storage gets updated.

## What I learned doing this project

A big project summarizing most of the curriculum in the Odin Project so far. Examples of some new topics I learned about:

- ES6 modules
- Webpack
- Manipulating date data with help of date-fns library.
- Keeping things "dry"
- First S of the SOLID programming principles (Single responsibility principle).
- JSON
- LocalStorage
- Lots of other topics as a ToDo app is quite a big app.

## Potential improvements

- Mobile responsiveness, change the left panel to a slide out on mobile
- Decoupling the code and the modules further, some code in the edit task module is manipulating the dom that should be coupled into the ui module.
