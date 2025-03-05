import type BlockListener from "src/services/BlockListener";

export class Rule {
	protected endpoint: string;

	constructor() {
		this.endpoint = "defaultEndpoint";
	}

	validate(context: BlockListener, data: any): void {
		// Implementation goes here
	}
}
