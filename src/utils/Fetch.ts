export async function fetchBlacklist(): Promise<any> {
    const response = await fetch(
        "https://github.com/MetaMask/eth-phishing-detect/raw/refs/heads/main/src/config.json"
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch blacklist: ${response.statusText}`);
    }
    return response.json();
}
