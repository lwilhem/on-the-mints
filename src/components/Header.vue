<script setup lang="ts">
import { useCryptoStore } from '../stores/crypto'

const cryptoStore = useCryptoStore()
const { connectWallet } = useCryptoStore()
const { account } = storeToRefs(cryptoStore)

onMounted(() => {
  connectWallet()
})

</script>

<template>
  <header class="flex items-center justify-between">
    <div class="flex items-center justify-center">
      <div class="i-mdi:glass-cocktail w-8 h-8" />
      <h1 class="font-sans uppercase text-2xl">
        On The Mints !
      </h1>
    </div>
    <nav>
      <button v-if="!account" @click="connectWallet">
        Connect your wallet !
      </button>
    </nav>
  </header>
</template>
