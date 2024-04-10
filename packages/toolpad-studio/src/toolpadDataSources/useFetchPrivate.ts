import * as React from 'react';
import { request } from '@elestyle/studio-core/toolpadDebugExec';
// import { useConnectionContext } from './context';
// import { useProjectApi } from '../projectApi';

export default function useFetchPrivate<PQ, R>(): (privateQuery: PQ) => Promise<R> {
  return React.useCallback((privateQuery: PQ) => {
    return request(privateQuery);
  }, []);
}

// export default function useFetchPrivate<PQ, R>(): (privateQuery: PQ) => Promise<R> {
//   const projectApi = useProjectApi();
//   const { dataSourceId, connectionId } = useConnectionContext();
//   return React.useCallback(
//     async (privateQuery: PQ) => {
//       const aa = await projectApi.methods.dataSourceFetchPrivate(
//         dataSourceId,
//         connectionId,
//         privateQuery,
//       );
//       console.log('=============useFetchPrivate', aa);
//       return aa;
//     },
//     [projectApi, connectionId, dataSourceId],
//   );
// }
