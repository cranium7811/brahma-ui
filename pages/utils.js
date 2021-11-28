import Web3 from "web3";
import Web3Modal from "web3modal";
import { peripheryContractAbi, peripheryContractAddress, usdcContract, usdcContractAbi } from '../config';

export async function loadWeb3() {
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
  });
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const balance = await web3.eth.getBalance('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
  const accounts = await web3.eth.getAccounts();
  const contractAddress = new web3.eth.Contract(peripheryContractAbi, peripheryContractAddress, provider);
  return [web3, provider, balance, accounts, contractAddress];
}

export async function approveUSDC() {
  const web3 = await loadWeb3();
  const usdcContractInstance = new web3[0].eth.Contract(usdcContractAbi, usdcContract, web3[1]);
  const approve_tx = await usdcContractInstance.methods.approve(peripheryContractAddress, web3[2]).send({from: web3[3][0]});
  console.log(approve_tx)
}

export async function vaultDeposit(amount) {
  const web3 = await loadWeb3();
  const tx = await web3[4].methods.vaultDeposit(amount, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 1, "0x140713bbd82113e104c3a45661134f9764807922").send({from: web3[3][0]});
}

export async function vaultWithdraw(amount) {
  const web3 = await loadWeb3();
  const tx = await web3[4].methods.vaultWithdraw(amount, '0x140713bbd82113e104c3a45661134f9764807922', true).send({from: web3[3][0]});
}