import BlockListener from '@Services/BlockListener';
import Logs from '@Utils/Logs';

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

for (const endpoint of endpoints) {
	try {
		const listener = new BlockListener(endpoint);
		listener.start();
	} catch (e) {
		Logs.Error(`Error on ${e}`);
	}
}
