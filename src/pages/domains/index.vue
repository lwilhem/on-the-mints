<script setup lang="ts">
import { useCryptoStore } from '../../stores/crypto'

const domainStore = useCryptoStore()
const { record, domain } = storeToRefs(domainStore)
const { mintDomain } = useCryptoStore()

function check(domain: string, record: string) {
  // eslint-disable-next-line no-console
  console.log(domain, record)
  mintDomain()
}
</script>

<template>
  <div>
    <input v-model="domain" type="text" placeholder="domain"><p>{{ domainStore.tld }}</p>
    <input v-model="record" type="text" placeholder="record">
    <input type="submit" value="Mint" @click="check(domain, record)">
  </div>
</template>
