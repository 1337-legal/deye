import Web3 from "web3";
import ERC20 from "./ABIs/ERC20";

class BlockchainMonitor {
	private endpoint: string;
	private web3: Web3;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
		this.web3 = new Web3(
			new Web3.providers.WebsocketProvider(this.endpoint)
		);
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
			} catch (e) {
				console.log(e);
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
			const symbol = await contract.methods.symbol().call();

			const match = name.match(
				/([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z]{2,6})/i
			);

			if (match) {
				console.log(
					contractAddress,
					symbol,
					name,
					match[0],
					this.endpoint
				);
			}
		} catch {
			return;
		}
	}
}

const endpoints = [
	"wss://ethereum-rpc.publicnode.com",
	"wss://base-rpc.publicnode.com",
	"wss://bsc-rpc.publicnode.com",
	"wss://polygon-bor-rpc.publicnode.com",
	"wss://arbitrum-one-rpc.publicnode.com",
	"wss://optimism-rpc.publicnode.com",
	"wss://fantom-rpc.publicnode.com",
	"wss://blast-rpc.publicnode.com",
];

const web3 = new Web3(
	new Web3.providers.WebsocketProvider("wss://ethereum-rpc.publicnode.com")
);

for (const endpoint of endpoints) {
	const worker = new BlockchainMonitor(endpoint);
	worker.start();
}
