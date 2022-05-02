const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("TheTab");
    await domainContract.deployed();
  
    console.log("Drinks served to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    let txn = await domainContract.register("banana",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain banana.TheTab");
  
    txn = await domainContract.setRecord("banana", "Put it on your tab?");
    await txn.wait();
    console.log("Set record for banana.TheTab");
  
    const address = await domainContract.getAddress("banana");
    console.log("Owner of domain banana:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("closing your tab:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();