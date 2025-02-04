export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const sanityToken = assertValue(
     "skNjxuBikHqsF8scTiQBm8jJMHKR1kFBk0nZSigPVjmwmhWF2enoHVrvvwFDM4GBRmD30EmhrJdt4AHb9WgMsujfwp6n8FNYmLP65ASd6SgWEsXZCzW8YlW71xEgEzqzb8UfoT4zdLdjaCWmZ2pih63XFQ77J01GOXS4Ywf14skQELCGmfrA",
  'Missing environment variable: SANITY_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
