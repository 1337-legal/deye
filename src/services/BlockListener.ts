import Web3 from 'web3';

import ERC20 from '@ABIs/ERC20';
import DomainRule from '@Rules/DomainRule';
import Logs from '@Utils/Logs';

/**
 * The `BlockListener` class listens for new block headers on a specified blockchain endpoint
 * and processes contract creation transactions.
 */
export default class BlockListener {
	/**
	 * The endpoint URL of the blockchain node.
	 */
	private endpoint: string;

	/**
	 * The Web3 instance used to interact with the blockchain.
	 */
	private web3: Web3;

	/**
	 * The name of the blockchain derived from the endpoint URL.
	 */
	public chainName: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
		if (!this.endpoint) {
			throw new Error("Endpoint is required");
		}

		this.chainName =
			this.endpoint.match(/wss:\/\/(.*)\./)?.[1] || "Unknown";

		this.web3 = new Web3(
			endpoint.startsWith("http")
				? new Web3.providers.HttpProvider(this.endpoint)
				: new Web3.providers.WebsocketProvider(this.endpoint)
		);
	}

	/**
	 * Starts listening for new block headers and processes contract creation transactions.
	 */
	public async start() {
		try {
			const events = await this.web3.eth.subscribe("newBlockHeaders");

			events.on("data", async (blockHeader) => {
				console.log
				try {
					const block = await this.web3.eth.getBlock(
						blockHeader.number,
						true
					);
					const contractCreationTransactions = block.transactions.filter(
						(tx: any) => tx.to === null
					);

					if (contractCreationTransactions.length === 0) {
						return;
					}

					for (const tx of contractCreationTransactions) {
						await this.processTransaction(tx);
					}
				} catch (error) {
					Logs.Error(`Error on ${this.chainName} - ${error}`);
				}
			});
		} catch (error) {
			Logs.Warning(`Error on while subscribing to new block headers on ${this.chainName}, retrying in 5 seconds...`);
			setTimeout(() => {
				this.start();
			}, 5000);
		}
	}

	/**
	 * Processes a transaction to extract contract information and validate it.
	 * @param tx - The transaction object.
	 */
	private async processTransaction(tx: any) {
		try {
			const txReceipt = await this.web3.eth.getTransactionReceipt(
				tx.hash
			);

			const contractAddress = txReceipt.contractAddress;
			if (!contractAddress) {
				return;
			}

			const contract = new this.web3.eth.Contract(ERC20, contractAddress);

			const name: string = await contract.methods.name().call();
			const symbol: string = await contract.methods.symbol().call();

			const domainRule = new DomainRule();

			await domainRule.validate(this, {
				contractAddress,
				symbol,
				name,
			});
		} catch {
			return;
		}
	}
}
