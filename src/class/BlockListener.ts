import Web3 from "web3";

import DomainRule from "src/rules/DomainRule";
import ERC20 from "src/ABIs/ERC20";
import Logs from "src/utils/Logs";

class BlockListener {
	private endpoint: string;
	private web3: Web3;
	private chainName: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
		this.web3 = new Web3(
			new Web3.providers.WebsocketProvider(this.endpoint)
		);

		this.chainName = this.endpoint.match(/\/\/(.*?)-rpc/)?.[0] || "unknown";
	}

	public async start() {
		const events = await this.web3.eth.subscribe("newBlockHeaders");

		events.on("data", async (blockHeader) => {
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
			} catch {
				Logs.Error(`Error on ${this.chainName}`);
			}
		});
	}

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

export default BlockListener;
