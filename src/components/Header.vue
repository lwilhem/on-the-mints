<script setup lang="ts">
import { useCryptoStore } from '../stores/crypto'
import { toggleDark } from '../composables'

const cryptoStore = useCryptoStore()
const { connectWallet, disconnectWallet } = useCryptoStore()
const { account } = storeToRefs(cryptoStore)

</script>

<template>
  <header class="flex items-center justify-between">
    <RouterLink to="/" class="flex items-center justify-center">
      <div class="i-mdi:glass-cocktail w-8 h-8" />
      <h1 class="font-sans uppercase text-2xl">
        On The Mints !
      </h1>
    </RouterLink>
    <nav class="flex items-center justify-evenly">
      <button v-if="!account" @click="connectWallet">
        Connect your wallet !
      </button>
      <RouterLink v-show="account" to="/profile" class="flex items-center justify-center">
        <div class="i-heroicons-solid:user" />
        <span>Check Your Profile !</span>
      </RouterLink>
    </nav>
    <div>
      <button class="i-carbon:sun dark:i-carbon:moon" @click="toggleDark()" />
      <button class="i-mdi:logout" @click="disconnectWallet" />
    </div>
  </header>
</template>
