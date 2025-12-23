import fs from 'node:fs'
import React from "react"
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)
const {render} = await import('./dist/server/entry-server.mjs')

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8')
fs.cpSync("./dist/client/assets", "./dist/assets", {recursive: true})
// determine routes to pre-render from src/pages
let routesToPrerender = [
  '/',
  '/rules',
  '/scenarios',
  '/scenarios/demo',
  '/scenarios/balanced',
  '/scenarios/1600',
  '/scenarios/1643',
  '/scenarios/1709',
  '/scenarios/1745',
  '/scenarios/1812',
  '/scenarios/1815',
  '/all-scenario-cards',
  '/armies',
  '/armies/french',
  '/armies/empire',
  '/armies/spanish',
  '/armies/dutch',
  '/armies/protestant',
  '/armies/swedish',
  '/armies/english-parl',
  '/armies/english-royal',
  '/armies/polish',
  '/armies/ottoman',
  '/armies/russian',
  '/armies/cossack',
  '/armies/french-18',
  '/armies/empire-18',
  '/armies/brit-18',
  '/armies/prussia-18',
  '/armies/russia-18',
  '/armies/sweden-18',
  '/armies/ottoman-18',
  '/armies/french-19',
  '/armies/empire-19',
  '/armies/brit-19',
  '/armies/prussia-19',
  '/armies/russia-19',
  '/armies/ottoman-19',
  '/download',
];

let langsPrefixes = ["", "/en", "/ru"]

routesToPrerender = langsPrefixes.flatMap(prefix => routesToPrerender.map(r => prefix + r));

let firebaseConf = {
  hosting: {
    public: "dist",
    ignore: [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    rewrites: []
  }
}

firebaseConf.hosting.rewrites = [...routesToPrerender.map(r => ({
  source: r,
  destination: `${r === "/" ? "index" : r}.html`
})),
  ...[
    "clouds-of-smoke.pdf",
    "clouds-of-smoke-armies.pdf",
    "clouds-of-smoke-reference.pdf",
    "clouds-of-smoke-scenario.pdf",
    "clouds-of-smoke-scenario-cards.pdf",
    "robots.txt",
    "облака-дыма.pdf",
    "облака-дыма-армии.pdf",
    "облака-дыма-карты-сценариев.pdf",
    "облака-дыма-памятка.pdf",
    "облака-дыма-сценарий.pdf",
  ].map(fileName => ({
    "source": `/${fileName}`,
    "destination": `/public/${fileName}`
  })),
  {
    source: "**",
    destination: "/client/index.html"
  }
]

fs.writeFileSync("./firebase.json", JSON.stringify(firebaseConf, null, 2));


function ensurePath(filePath) {
  let fragments = filePath.split("/")
  if (fragments.length <= 1) {
    return
  }
  let dirPath = path.join(...fragments.slice(0, fragments.length - 1))
  fs.mkdirSync(dirPath, {recursive: true});
}

ensurePath("./dist/public");
fs.cpSync("./public", "./dist/public", { overwrite: true, recursive: true });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = await render(url)

    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    ensurePath(filePath)
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', url)
  }
})()


