const { assert } = require('chai');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken;
  let dappToken;
  let tokenFarm;

  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    await dappToken.transfer(tokenFarm.address, tokens('1000000'));

    await daiToken.transfer(investor, tokens('100'), { from: owner });
  });

  describe('Mock dai deployment', async () => {
    it('Has a name', async () => {
      const name = await daiToken.name();
      assert.equal(name, 'Mock DAI Token');
    });
  });

  describe('Dapp token deployment', async () => {
    it('Has a name', async () => {
      const name = await dappToken.name();
      assert.equal(name, 'Hardcoregor Token');
    });
  });

  describe('Token Farm deployment', async () => {
    it('Has a name', async () => {
      const name = await tokenFarm.name();
      assert.equal(name, 'Dapp Token Farm');
    });
    it('Contract has tokens', async () => {
      const balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens('1000000'));
    });
  });

  describe('Farming tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
      let result;

      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking');

      await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor });
      await tokenFarm.stakeTokens(tokens('100'), { from: investor });

      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking');

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('100'), 'Token Mock DAI balance correct after staking');

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking');

      result = await tokenFarm.isStaking(investor);
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking');

      await tokenFarm.issueToken({ from: owner });

      result = await dappToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('100'), 'investor Dapp token wallet balance correct after issuance');

      await tokenFarm.issueToken({ from: investor }).should.be.rejected;

      await tokenFarm.unstakeTokens({ from: investor });
      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('100'), 'investor Dai wallet balance correct after unstaking');

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('0'), 'Token Farm balance correct after unstaking');

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokens('0'), 'Investor balance after unstaking correct and = 0');

      result = await tokenFarm.isStaking(investor);
      assert.equal(result.toString(), 'false', 'Investor not in stakers mapping after unstaking');
    });
  });
});
