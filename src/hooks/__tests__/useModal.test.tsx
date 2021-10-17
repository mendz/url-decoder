import { renderHook, act } from '@testing-library/react-hooks';
import useModal from '../useModal';

let testComp: JSX.Element;

beforeAll(() => {
  testComp = <p>test</p>;
});

test('should load component when show modal', () => {
  const { result } = renderHook(() => useModal());

  act(() => {
    result.current.showModal(testComp);
  });

  expect(result.current.isModalShow).toBe(true);
  expect(result.current.component).toBe(testComp);
});

test('should remove component when hide modal', () => {
  const { result } = renderHook(() => useModal());

  act(() => {
    result.current.showModal(testComp);
  });

  act(() => {
    result.current.hideModal();
  });

  expect(result.current.isModalShow).toBe(true);
  expect(result.current.component).toBe(null);
});
