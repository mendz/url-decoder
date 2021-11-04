import { renderHook, act } from '@testing-library/react-hooks';
import { TrimValue } from '../../contexts/SettingsContext';
import useUrls from '../useUrls';

const urlsToDecode = [
  'https://www.google.com/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94',
];
const urlsToDecodeTrimDomain = ['/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94'];

const urlsToEncode = ['https://www.google.com/search?q=בדיקה'];

const urlsToEncodeTrimDomain = ['/search?q=בדיקה'];

const urlTrimPath = ['www.google.com'];

test('should set importUrls when updating urls', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.NO_TRIM);
  });

  expect(result.current.importUrls).toStrictEqual(urlsToDecode);
});

test('should decode the url without trim', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.NO_TRIM);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(urlsToEncode);
});

test('should decode the url with trim domain', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.TRIM_DOMAIN);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(
    urlsToEncodeTrimDomain
  );
});

test('should decode the url with trim path', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.TRIM_PATH);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(urlTrimPath);
});

test('should decode the with trim option and keep original value', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.TRIM_DOMAIN);
  });

  expect(result.current.urls.originalExportUrls).toStrictEqual(urlsToEncode);
});

test('should encode the url without trim', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToEncode, TrimValue.NO_TRIM, false);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(urlsToDecode);
});

test('should encode the url with trim domain', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToEncode, TrimValue.TRIM_DOMAIN, false);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(
    urlsToDecodeTrimDomain
  );
});

test('should encode the url with trim path', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToEncode, TrimValue.TRIM_PATH, false);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(urlTrimPath);
});

test('should encode the with trim option and keep original value', () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToEncode, TrimValue.TRIM_DOMAIN, false);
  });

  expect(result.current.urls.originalExportUrls).toStrictEqual(urlsToDecode);
});

test('should not fail if not valid url', () => {
  const { result } = renderHook(() => useUrls());
  const notValidUrl = ['AnimQui'];

  act(() => {
    result.current.updateUrls(notValidUrl, TrimValue.TRIM_DOMAIN);
  });

  expect(result.current.urls.displayExportUrls).toStrictEqual(notValidUrl);
});

test('should swap urls with not trim', async () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.NO_TRIM);
  });
  act(() => {
    result.current.swapUrls(TrimValue.NO_TRIM);
  });

  expect(result.current.importUrls).toStrictEqual(urlsToEncode);
  expect(result.current.urls.displayExportUrls).toStrictEqual(urlsToDecode);
});

test('should clear urls', async () => {
  const { result } = renderHook(() => useUrls());

  act(() => {
    result.current.updateUrls(urlsToDecode, TrimValue.NO_TRIM);
  });

  expect(result.current.importUrls).toStrictEqual(urlsToDecode);
  expect(result.current.urls.displayExportUrls).toStrictEqual(urlsToEncode);

  act(() => {
    result.current.clearStorageUrls();
  });

  expect(result.current.importUrls).toStrictEqual([]);
  expect(result.current.urls.displayExportUrls).toStrictEqual([]);
});
