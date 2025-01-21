import BlockListener from "./class/BlockListener";
import Logs from "./utils/Logs";

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
    } catch {
        Logs.Error(`Error on ${endpoint}`);
    }
}
