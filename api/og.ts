import { siteURL } from '../lib/utils/url'
import { NextApiRequest, NextApiResponse } from 'next'
import { launchChromium } from 'playwright-aws-lambda'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { route },
  } = req
  const browser = await launchChromium({ headless: true })
  const context = await browser.newContext({
    viewport: {
      width: 1200,
      height: 627,
    },
  })
  const page = await context.newPage()
  await page.goto(siteURL(`og/${route}`))
  await page.setViewportSize({ width: 1200, height: 627 })
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
