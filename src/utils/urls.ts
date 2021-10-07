function decodeEncodeURLs(urlsToDecode: string[], isDecode = true): string[] {
  const resultDecodedURLs: string[] = urlsToDecode
    .filter((url) => url.trim().length > 0)
    .map((url) => {
      return isDecode ? decodeURI(url.trim()) : encodeURI(url.trim());
    });

  return resultDecodedURLs;
}

/**
 * Encode the provided URLs.
 * @param urlsToEncode An string array of URls to encode.
 * @returns An string array of encoded URls.
 */
export function encodeUrls(urlsToEncode: string[]): string[] {
  return decodeEncodeURLs(urlsToEncode, false);
}

/**
 * Decode the provided URLs.
 * @param urlsToDecode An string array of URls to decode.
 * @returns An string array of decoded URls.
 */
export function decodeUrls(urlsToDecode: string[]): string[] {
  return decodeEncodeURLs(urlsToDecode);
}

/**
 * Check if one the URLs include the word: 'ERROR' (case sensitive).
 * @param urls An string array of decoded URLs.
 */
export const arrayHaveInvalidUrl = (urls: string[]): boolean =>
  urls?.some((url) => url.includes('ERROR'));
