## [Ref365 Production Site](https://theref365.herokuapp.com/)
### Project Description:
This project was developed as the final project of Turing. The learning goals of this project included working in a new tech stack, working with students in the opposite program (mixing backend & frontend), and managing a professional workflow.

Our app is a tool for referee's to track their game schedule, mileage traveled, and data about their income. 

### Screenshots:
![landing page](https://imgur.com/r7NggxJ.png)
![add event page](https://imgur.com/U0RAFhk.png)
![all events page](https://imgur.com/O2iPKnk.png)
![dashboard 1](https://imgur.com/1Fr0Us4.png)
![chart 1](https://imgur.com/klPawYN.png)
![dashboard 2](https://imgur.com/gV9FTHd.png)



### Ref365 Front End Development Environment [Set-Up](https://gist.github.com/nwgambee/2216c410ba3d79d21b8d3ae8fcbf83b0)

- [To make a Svelte playground with a template, use this repo and follow the instructions in the readme](https://github.com/sveltejs/template)
1. Clone down the Ref365_fe [repo](https://github.com/Ref365/Ref365_fe) with `git clone git@github.com:Ref365/Ref365_fe.git`
1. From the root directory of the project, run `npm install` and then run `npm install --save svelte-routing`
1. Make sure the `scripts` property of your package.json file looks like this (this step shouldn't be needed after I make my first PR): 
```javascript
"scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "start": "sirv public --single",
    "start:dev": "sirv public --dev --single"
  }
  ```
  1. Run `npm run dev` to boot up the local server 
  1. You should see: 
  ```
  Your application is ready~! 🚀

  - Local:      http://localhost:5000

────────────────── LOGS ──────────────────
```
  1. Navigate to `http://localhost:5000/` in your browser, you should see `HELLO WORLD` in big orange text with a link to the Svelte tutorial below it
