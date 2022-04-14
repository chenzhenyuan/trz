/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/12/20 13:13:03 +0800
 * @filePath     : /packages/hooks/src/useQueries/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/04/14 15:56:07 +0800
 * @description  : ****
 */


import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';


type SetQueriesAction<Q> = Q | ((prevQueries: Q) => Q);

type DispatchQueries<A> = (queries: A) => void;

type NavigatorAction<S = string> = (search: S) => void;

type InitialQueries<V> = V | (() => V);

export function toSearchString<M>(queriesObj: M): string {
  const target: string[] = Object.entries(queriesObj ?? {}).map(([ k, v ]: any[]) => {
    if ([ null, undefined ].includes(v)) {
      return `${k}=`;
    }

    if ((Array.isArray(v) && v.length) || (typeof v === 'object' && Object.keys(v).length)) {
      return `${k}=${encodeURIComponent(JSON.stringify(v))}`;
    }

    return `${k}=${encodeURIComponent(v as (string | number | boolean))}`;
  });

  return target.join('&');
}

export function toQueriesObject<P>(search: string): any {
  const searchEntries = Array.from((new URLSearchParams(search) as any).entries());

  return Object.fromEntries(searchEntries.map(([ k, v ]: any) => {
    let value: any = decodeURIComponent(v);

    try {
      const parsed = JSON.parse(value);

      if (typeof parsed === 'number') {
        value = value === parsed.toString() ? parsed : value;
      }
      else {
        value = parsed;
      }
    }
    catch (err) {
      //
    }

    return [ k, value ];
  }));
}

export function useQueriesCore<Q>(initialQueries?: InitialQueries<Q>, navi?: NavigatorAction): [Q, DispatchQueries<SetQueriesAction<Q>>] {
  const location = useLocation();

  const currentSearch = location.search.replace(/^\?/, '');
  const [ pathname ] = useState<string>(location.pathname);
  const [ queries, setQueries ] = useState<Q>(currentSearch === '' ?( initialQueries ?? {}) as any : toQueriesObject<Q>(currentSearch));
  // --------
  const dispatch = useCallback((nextQueries: SetQueriesAction<Q>): void => {
    setQueries(nextQueries);
  }, [ queries ]);

  useEffect(() => {
    navi && navi('?' + toSearchString(queries ?? {}));
  }, [ queries ]);

  useLayoutEffect(() => {
    if (pathname !== location.pathname || currentSearch === '') return;

    setQueries((queries) => {
      if (currentSearch === toSearchString(queries ?? {})) return queries;

      return toQueriesObject(currentSearch);
    });
  }, [ currentSearch, pathname, location.pathname ]);

  return [ queries, dispatch ];
}

export function useQueries<Q>(initialQueries?: InitialQueries<Q>): [Q, DispatchQueries<SetQueriesAction<Q>>] {
  const syncQueries = useHistory();
  const [ queries, setQueries ] = useQueriesCore<Q>(initialQueries, (search) => {
    syncQueries.replace(search);
  });

  return [ queries, setQueries ];
}

export default useQueries;
