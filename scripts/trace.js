const fs = require('fs')
const { nodeFileTrace } = require('@vercel/nft')

const toFormattedBytes = (size) => {
  if (size === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const magnitude = parseInt(Math.floor(Math.log(size) / Math.log(1024)))

  if (magnitude == 0) return `${size} B`

  const scaledSize = size / Math.pow(1024, magnitude)

  return `${scaledSize.toFixed(1)} ${units[magnitude]}`
}

const manifest = JSON.parse(
  fs.readFileSync('.next/server/pages-manifest.json', 'utf-8')
)
const files = Object.values(manifest).map((p) => '.next/server/' + p)

const DEBUG = 'trace-debug.log'

;(async () => {
  const { fileList } = await nodeFileTrace(files)

  fs.writeFileSync(DEBUG, '')

  let sortedFiles = fileList
    .map((file) => {
      return [file, fs.statSync(file).size]
    })
    .sort(([, a], [, b]) => {
      if (a > b) return -1
      if (a < b) return 1
      return 0
    })

  fs.appendFileSync(
    DEBUG,
    'Total size:' +
      toFormattedBytes(
        sortedFiles
          .map(([, size]) => size)
          .reduce((curr, prev) => curr + prev, 0)
      ) +
      '\n\n'
  )

  sortedFiles.forEach(([file, size]) => {
    fs.appendFileSync(DEBUG, `${toFormattedBytes(size)} ${file}\n`)
  })
})()
