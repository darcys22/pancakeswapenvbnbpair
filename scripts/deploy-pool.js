async function main() {
  const Factory = await ethers.getContractFactory('Factory');
  const Router = await ethers.getContractFactory('Router');
  const Pair = await ethers.getContractFactory('Pair');
  const Token1 = await ethers.getContractFactory('Token1');
  const Token2 = await ethers.getContractFactory('Token2');

  try {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    // Pancake swap factory
    // https://bscscan.com/address/0xbcfccbde45ce874adcb698cc183debcf17952812
    const factory = await Factory.attach('0xBCfCcbde45cE874adCB698cC183deBcF17952812');

    // Pancake swap router
    // https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e
    const router = await Router.attach('0x10ED43C718714eb63d5aA57B78B54704E256024E');

    //ENV coin
    const token1 = await Token1.attach('0x1A9b8F4261aC7534d235Fc71fC7e31317e951a4f');

    //BUSD coin
    // https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
    const token2 = await Token2.attach('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');

    //const pairAddress = await factory.createPair(token1.address, token2.address);
    const pairAddress = '0x9573a31c7c408fc1AcE11C1e0cCdcF59f25c6FF4';
    //await token1.approve(router.address, 10000);
    //await token2.approve(router.address, 1);
    console.log("Calling Add Liquidity");
    const transactionOptions = {
               gasLimit: 1000000

           }
    liquidity = await router.addLiquidity(
      token1.address,
      token2.address,
      '10000000000000000000000',
      '1000000000000000000',
      '10000000000000000000000',
      '1000000000000000000',
      owner.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      transactionOptions
    );

    console.log("Token deployed to:", liquidity.address);
    const pair = await Pair.attach(pairAddress);
    const balance = await pair.balanceOf(owner);
    console.log('balance LP: ${balance.toString()}');
  } catch(e) {
    console.log(e);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
