import deepEqual from 'deep-equal';
import {forwardRef, memo} from 'react';

export const memoWithRef = component => {
  return memo(forwardRef(component), (prevProps, nextProps) =>
    deepEqual(prevProps, nextProps),
  );
};
