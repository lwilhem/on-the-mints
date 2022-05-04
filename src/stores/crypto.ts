import { ethers } from 'ethers'
import contractAbi from '../../hardhat/artifacts/contracts/Domains.sol/Domains.json'

export const useCryptoStore = defineStore('user', () => {
  const account = ref(null)

  const tld = '.thetab'
  const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const domain = ref('')
  const record = ref('')

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Get MetaMask -> https://metamask.io/')
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

  function setRecord() {
    return record.value = ''
  }

  function setDomain() {
    return domain.value = ''
  }

  async function mintDomain() {
    if (!domain.value)
      throw new Error('Invalid Domain')

    if (domain.value.length < 3)
      // eslint-disable-next-line no-alert
      alert('Domain must be at least 3 characters long')

    const price = domain.value.length === 3 ? '0.1' : domain.value.length === 4 ? '0.03' : '0.01'
    // eslint-disable-next-line no-console
    console.log('Minting domain', domain.value, 'with price', price)

    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer)

        // eslint-disable-next-line no-console
        console.log('Going to pop wallet now to pay gas...')
        let tx = await contract.register(domain, { value: ethers.utils.parseEther(price) })
        const receipt = await tx.wait()
        if (receipt.status === 1) {
          // eslint-disable-next-line no-console
          console.log(`Domain minted! https://mumbai.polygonscan.com/tx/${tx.hash}`)
          tx = await contract.setRecord(domain, record)
          await tx.wait()

          // eslint-disable-next-line no-console
          console.log(`Record set! https://mumbai.polygonscan.com/tx/${tx.hash}`)

          setRecord()
          setDomain()
        }
        else {
          // eslint-disable-next-line no-alert
          alert('Transaction failed! Please try again')
        }
      }
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
    }
  }

  return {
    disconnectWallet,
    account,
    connectWallet,

    tld,
    CONTRACT_ADDRESS,
    domain,
    record,
    mintDomain,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
