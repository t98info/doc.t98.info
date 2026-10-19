import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const legacyRoutes = [
  ['20021601', '021601'],
  ['end-homrin-bot', '5661384']
]

for (const [sourceSlug, oldSlug] of legacyRoutes) {
  const source = join('out', sourceSlug, 'index.html')
  const destinationDirectory = join('out', oldSlug)
  await mkdir(destinationDirectory, { recursive: true })
  await copyFile(source, join(destinationDirectory, 'index.html'))
}
