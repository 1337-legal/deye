import BlockListener from "@Services/BlockListener";
import Logs from "@Utils/Logs";

const endpoints = [
	"wss://eth.llamarpc.com",
	"wss://base.llamarpc.com",
	"wss://bsc-rpc.publicnode.com",
	"wss://polygon-bor-rpc.publicnode.com",
	"wss://arbitrum.llamarpc.com",
	"wss://optimism-rpc.publicnode.com",
	"wss://fantom-rpc.publicnode.com",
	"wss://blast-rpc.publicnode.com",
];

for (const endpoint of endpoints) {
	try {
		const listener = new BlockListener(endpoint);
		listener.start();
	} catch (e) {
		Logs.Error(`Error on ${e}`);
	}
}
