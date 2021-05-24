import Zabu from "./Zabu"
import ts from "typescript"
import fsevents from "fsevents"
import { bunker } from "@digitak/bunker"
import start from "fartest"
import print from "cute-print"

start(async ({ stage, same }) => {
	stage("CLI arguments received")
	same(process.argv[2], "coco")

	stage("Import typescript library")
	same(ts.SyntaxKind.EndOfFileToken, 1)

	stage("Import fsevents")
	same(!!fsevents.watch, true)

	stage("Import CJS library")
	same(typeof print, "function")

	stage("Import ESM library")
	same(bunker(3), Uint8Array.of(5, 3))

	stage("Import custom typescript file")
	same(new Zabu().yell(), "ZABU")
})
