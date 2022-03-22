<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/project">Project</router-link> |
      <router-link to="/employee">Employee</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background: #04AA6D;
}

#nav a {
  font-weight: bold;
  color: #aaa;
  text-decoration: none;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: blue;
}
</style>
