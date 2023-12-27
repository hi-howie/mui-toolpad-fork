import * as superjson from 'superjson';
import request from '@elepay/dashboard-core/request';
import type { MethodsOf, RpcResponse, MethodResolvers } from './server/rpc';

export function createRpcClientDashboard<D extends MethodResolvers>(
  endpoint: string | URL,
): MethodsOf<D> {
  return new Proxy({} as MethodsOf<D>, {
    get(target, prop) {
      return async (...params: any[]) => {
        // const body: RpcRequest = {
        //   name: prop as string,
        //   params,
        // };
        const jsonString = superjson.stringify({ date: new Date(0) });
        return superjson.parse(jsonString);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const response = (await res.json()) as RpcResponse;
          if (response.error) {
            const toolpadError = new Error(response.error.message, {
              cause: response.error,
            });
            if (response.error.code) {
              toolpadError.code = response.error.code;
            }
            throw toolpadError;
          }
          return superjson.parse(response.result);
        }

        throw new Error(`HTTP ${res.status}`);
      };
    },
  });
}
