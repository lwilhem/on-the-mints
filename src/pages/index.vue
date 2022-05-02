<script setup lang="ts">

</script>

<template>
  <section class="w-full h-128 text-left py-10 px-8 my-12">
    <h1 class="font-mono uppercase text-6xl">
      The Barkeeper's Tab
    </h1>
    <span class="text-xl font-serif"> Hi there! have a sit, I'll get your order soon</span>
    <div>
      <h2 class="font-mono text-center my-4">
        On The Menu :
      </h2>
      <section class="flex">
        <div class="w-1/2 h-64">
          <span>NFT</span>
        </div>
        <RouterLink to="/domains" class="w-1/2 h-64">
          <span>Domains</span>
        </RouterLink>
      </section>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
