# DEYE 👁️ - Scam Detection Framework for EVM Blockchains

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🔍 Overview

DEYE is a powerful, real-time scam detection framework for EVM-based blockchains that helps protect users from malicious smart contracts. By monitoring blockchain activity and analyzing new contracts as they're deployed, DEYE identifies potential threats before they can cause harm.

## ✨ Features

-   🔄 Real-time monitoring of contract creation across multiple EVM chains
-   🧪 Rule-based analysis system to identify suspicious contracts
-   🚨 Alerts for potential scam contracts based on predefined heuristics
-   🔗 Support for multiple blockchain endpoints (HTTP/WebSocket)
-   📊 Detailed logging and reporting of suspicious activity

## 🛠️ How It Works

DEYE listens for new blocks on the blockchain and examines every newly created contract. It applies a set of predefined rules to detect common scam patterns such as:

-   Domain name spoofing
-   Malicious contract code patterns
-   Suspicious token configurations
-   Honeypot contracts
-   Rug pull indicators

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/1337-legal/deye.git
cd deye

# Install dependencies
npm install
```

### Configuration

Create a `.env` file with your blockchain endpoints:

```
ETHEREUM_ENDPOINT=wss://mainnet.infura.io/ws/v3/YOUR_API_KEY
BSC_ENDPOINT=wss://bsc-ws-node.nariox.org:443
```

### Usage

```bash
# Start the detection framework
npm start
```

## 🧩 Architecture

DEYE consists of several core components:

1. **BlockListener**: Monitors blockchain for new contract deployments
2. **Rule Engine**: Applies detection rules to identify suspicious contracts
3. **Alert System**: Notifies users about potential threats
4. **Reporting Module**: Generates detailed reports on identified scams

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

DEYE is designed as a tool to help identify potentially suspicious smart contracts, but it cannot guarantee identification of all scams. Always conduct your own research before interacting with any smart contract.
