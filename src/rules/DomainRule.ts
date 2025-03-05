import type BlockListener from "@Services/BlockListener";
import { fetchBlacklist } from "@Utils/Fetch";
import Logs from "@Utils/Logs";

import { Rule } from "./Rule";

export default class DomainRule extends Rule {
	private match: RegExp =
		/([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z]{2,6})/i;

	public name: string;

	constructor() {
		super();
		this.name = "DomainRule";
	}

	public async validate(
		context: BlockListener,
		data: {
			contractAddress: string;
			symbol: string;
			name: string;
		}
	) {
		const match = data.name.match(this.match);

		if (match) {
			const reqBlacklist = await fetchBlacklist();
			const domainSuspect = match[0].toLocaleLowerCase();
			if (
				reqBlacklist.blacklist.find(
					(domain: string) => domain === domainSuspect
				)
			) {
				Logs.Info(
					`The domain ${domainSuspect} is already flagged as a phishing site: ${data.contractAddress} ${data.symbol} ${data.name} ${context.chainName}`
				);
			} else {
				Logs.Warning(
					`The domain ${domainSuspect} is potentially a scam web3 site: ${data.contractAddress} ${data.symbol} ${data.name} ${context.chainName}`
				);
			}
		}
	}
}
