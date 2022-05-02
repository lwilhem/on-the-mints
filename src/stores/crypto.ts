export const useCryptoStore = defineStore('user', () => {
  const account = ref(null)

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        // eslint-disable-next-line no-console
        console.log('Make sure you have MetaMask!')
        return
      }
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

      if (myAccounts.length !== 0) {
        account.value = myAccounts[0]
        // eslint-disable-next-line no-console
        console.log('Found an authorized account:', account)
      }
      else {
        // eslint-disable-next-line no-console
        console.log('No authorized account found')
      }
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  async function disconnectWallet() {
    return account.value = null
  }

  return {
    disconnectWallet,
    account,
    connectWallet,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
