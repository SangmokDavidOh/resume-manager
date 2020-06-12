<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
[contenteditable="true"]:empty:before{
  content: attr(placeholder);
  pointer-events: none;
  color: #555;
  display: inline-block; /* For Firefox */
}
html {
  font-size: 62.5%;
}
body {
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media print {
  .no-print, .no-print * {
    display: none !important;
  }
}
</style>
