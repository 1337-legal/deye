import type BlockListener from "src/class/BlockListener";
import Logs from "src/utils/Logs";
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
			Logs.Info(
				` ${data.contractAddress} ${data.symbol} ${data.name} ${match[0]} ${context.chainName}`
			);
		}
	}
}
