import { createGlobalState } from 'react-hooks-global-state';
const { setGlobalState, useGlobalState } = createGlobalState({
    isModalOpen:false
})
export { setGlobalState, useGlobalState }