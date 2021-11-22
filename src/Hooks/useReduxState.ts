import { useSelector } from 'react-redux';

import { ReduxState } from '@mobile/models/reducers';

export const useReduxState = () => {
  return useSelector((state: ReduxState) => state);
};