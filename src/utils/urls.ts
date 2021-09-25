/**
 * Decode the provided URLs.
 *
 * If is an invalid URL the the string will be: 'ERROR: Invalid URL!' and not the URL.
 * @param urlsToDecode An string array of URls to decode.
 * @param isDecode Default is `true`, if false
 * @returns An string array of decoded URls.
 */
function decodeEncodeURLs(urlsToDecode: string[], isDecode = true): string[] {
  const resultDecodedURLs: string[] = urlsToDecode
    .filter((url) => url.trim().length > 0)
    .map((url) => {
      let updatedUrl = url;
      if (!/https?:\/\//g.test(updatedUrl)) {
        updatedUrl = 'https://' + updatedUrl;
      }
      let decodedEncodedURL = '';
      try {
        decodedEncodedURL = isDecode
          ? decodeURI(updatedUrl.trim())
          : encodeURI(updatedUrl.trim());
        new URL(decodedEncodedURL);
      } catch (error) {
        decodedEncodedURL = 'ERROR: Invalid URL!';
      }
      return decodedEncodedURL;
    });

  return resultDecodedURLs;
}

/**
 * Check if one the URLs include the word: 'ERROR' (case sensitive).
 * @param urls An string array of decoded URLs.
 */
const arrayHaveInvalidUrl = (urls: string[]): boolean =>
  urls.some((url) => url.includes('ERROR'));

export { decodeEncodeURLs, arrayHaveInvalidUrl };
