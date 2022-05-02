<script setup lang="ts">
import { useCryptoStore } from '../stores/crypto'

const store = useCryptoStore()
const { connectWallet } = useCryptoStore()
const { account } = storeToRefs(store)
</script>

<template>
  <section class="w-full h-96 text-left py-10 px-8">
    <div class="w-1/2">
      <h2 class="font-mono text-4xl">
        Welcome to The Tab! Please, take a seat. Someone will handle your inquiries soon.
      </h2>
      <button v-if="!account" @click="connectWallet()">
        Connect Your Wallet
      </button>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
