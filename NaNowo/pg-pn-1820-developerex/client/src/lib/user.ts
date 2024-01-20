import { atomWithStorage } from 'jotai/utils';


export const userAtom = atomWithStorage<string | undefined>('user', undefined);

