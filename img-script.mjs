import {readdir, writeFile} from 'node:fs/promises'
import {join, sep} from 'node:path'
import crypto from 'node:crypto'

const walk = async (dirPath) => Promise.all(
  await readdir(dirPath, { withFileTypes: true }).then((entries) => entries.map((entry) => {
    const childPath = join(dirPath, entry.name)
    return entry.isDirectory() ? walk(childPath) : childPath
  })),
)

const id = () => crypto.randomBytes(16).toString("hex");

let allFiles = await walk('./src/assets/images')
let imagePaths = allFiles.flat(Number.POSITIVE_INFINITY)
imagePaths = imagePaths.map(p => p.replace(`src${sep}assets${sep}images${sep}`, ''))
let result = ``;
let exports = {};

imagePaths.forEach(path => {
  let importid = 'f'+ id().replace('-', '')
  let fallbackid = 'f' + id().replace('-', '')
  let p = path.replaceAll(sep, "/")
  result = result + '\r\n' + `import ${importid} from '../assets/images/${p}?w=300;768;1024;1330;1920&webp&srcset'`;
  result = result + '\r\n' + `import ${fallbackid} from '../assets/images/${p}?w=1024'`;
  exports[p] = {
    srcset: importid,
    fallback: fallbackid,
  }
})

let exportStr = `export default {\r\n`
Object.keys(exports).forEach(path => {
  exportStr = `${exportStr}\r\n"${path}": {\r\nsrcset: ${exports[path].srcset},\r\nfallback: ${exports[path].fallback},\r\n},`
})
exportStr = `${exportStr}
} as Record<string, {
  srcset: any,
  fallback: any,
}>`

result = result + '\r\n' + exportStr;

await writeFile('./src/components/images.ts', result)
