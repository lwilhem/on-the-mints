<script setup lang="ts">
import { useCryptoStore } from '../../stores/crypto'

const cryptoStore = useCryptoStore()

</script>

<template>
  <span>{{ cryptoStore.account }}</span>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
