<script setup lang="ts">

</script>

<template>
  <div class="antialiased min-h-screen flex flex-col">
    <SashoNav />
    <main>
       <slot name="main-content"></slot>
    </main>
    <SashoScrollCat />
    <SashoFooter />
  </div>
</template>
