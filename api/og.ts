import absoluteUrl from 'next-absolute-url'
import chromium from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { route },
    headers: { OG_KEY },
  } = req
  if (process.env.NODE_ENV === 'production' && OG_KEY !== process.env.OG_KEY) {
    res.statusCode = 401
    res.end()
    return
  }
  const { origin } = absoluteUrl(req, 'localhost:3000')
  console.log('Origin:', origin)
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(`${origin}/og/${route}`)
  await page.setViewport({ width: 1200, height: 627 })
  const imageBuffer = await page.screenshot({
    type: 'png',
  })

  await browser.close()
  res.setHeader('Content-Type', 'image/png')
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  )
  res.send(imageBuffer)
}