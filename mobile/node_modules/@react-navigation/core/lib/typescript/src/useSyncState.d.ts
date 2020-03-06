export default function useSyncState<T>(initialState?: (() => T) | T): readonly [T, () => T, (state: T) => void];
