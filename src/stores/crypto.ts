export const useCryptoStore = defineStore('user', () => {
  const account = ref(null)

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        // eslint-disable-next-line no-console
        console.log('Must connect to MetaMask!')
        return
      }
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

      // eslint-disable-next-line no-console
      console.log('Connected: ', myAccounts[0])
      account.value = myAccounts[0]
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
  return {
    account,
    connectWallet,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
