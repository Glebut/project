<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
  <router-view v-slot="{ Component, route }">
    <div :key="route.name">  
      <component :is="Component"></component>
    </div>
</router-view>
</template>
<script>

</script>
<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Rubik:wght@400;500&display=swap');
  *{
    margin: 0;
    padding: 0;
  }
  :root{
    --white: #ffffff;
    --black: #000000;
    --green: #197E66;
    --light-green: #40C3A4;
    --brown: #6A3E26;
  }


  @media (max-width: 480px) {
  .page {
    font-size: 4px;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .page {
    font-size: 6px;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .page {
    font-size: 8px;
  }
}

</style>
