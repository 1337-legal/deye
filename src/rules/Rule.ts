import type BlockListener from "src/class/BlockListener";

export class Rule {
	protected endpoint: string;

	constructor() {
		this.endpoint = "defaultEndpoint";
	}

	validate(context: BlockListener, data: any): void {
		// Implementation goes here
	}
}
