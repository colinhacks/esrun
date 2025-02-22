#!/usr/bin/env node
import esrun from "./index.js"
import { CliOption } from "./types/CliOption.js"

const { argv } = process

const argumentOptions: Record<string, CliOption> = {
	"--watch": "watch",
	"-w": "watch",
	"--inspect": "inspect",
	"-i": "inspect",
	"--preserveConsole": "preserveConsole",
	"--noFileConstants": "noFileConstants",
	"--tsconfig": "tsconfig",
}

const options: Record<CliOption, boolean | string[] | undefined> = {
	watch: false,
	inspect: false,
	preserveConsole: false,
	noFileConstants: false,
	tsconfig: undefined,
}

let argsOffset = 2
let argument: string

if (argv.length < argsOffset) {
	console.log("Missing typescript input file")
	process.exit(0)
}

while ((argument = argv[argsOffset]).startsWith("-")) {
	const [command, parameters] = argument.split(":")

	if (command in argumentOptions) {
		options[argumentOptions[command]] = parameters ? parameters.split(",") : true
		argsOffset++
	} else {
		console.log(`Unknown option ${command}`)
		process.exit(9)
	}
}

esrun(argv[argsOffset], {
	args: argv.slice(argsOffset + 1),
	watch: options.watch,
	tsConfigFile:
		options.tsconfig instanceof Array
			? options.tsconfig.join(",")
			: typeof options.tsconfig == "boolean"
			? undefined
			: options.tsconfig,
	inspect: !!options.inspect,
	preserveConsole: !!options.preserveConsole,
	fileConstants: !options.noFileConstants,
}).catch(error => {
	console.error(error)
	process.exit(1)
})
