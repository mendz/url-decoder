const decodeURLs = urlsToDecode => {
  const resultDecodedURLs = urlsToDecode
    .filter(url => url.trim().length > 0)
    .map(url => {
      let decodedURL = '';
      try {
        decodedURL = decodeURI(url.trim());
      } catch (error) {
        decodedURL = 'ERROR: Invalid URL!';
      }
      return decodedURL;
    });

  return resultDecodedURLs;
};

const arrayHaveInvalidUrl = urls => urls.some(url => url.includes('ERROR'));

export { decodeURLs, arrayHaveInvalidUrl };