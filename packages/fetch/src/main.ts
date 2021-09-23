import core from './core';




core("https://api.github.com").then((res) => {
  console.log('example', res);
})
