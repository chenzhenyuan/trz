/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/12/20 13:13:03 +0800
 * @filePath     : /packages/hooks/src/useQueries/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/04/20 02:07:44 +0800
 * @description  : ****
 */


import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';


export type InitialQueries<V> = V | (() => V);

export type SetQueriesAction<Q> = ((prevQueries: Q) => Q);

export type DispatchQueries<A> = (queries: A) => void;

export type NavigatorAction<S = string> = (search: S) => void;


/* -------------------------------------------------------------------------- */
export function toSearchString<C>(queries: C): string {
  const target: string[] = Object.entries(queries ?? {}).map(([ k, v ]: any[]) => {
    if ([ null, undefined, '' ].includes(v)
        || (Array.isArray(v) && !v.length)
          || (typeof v === 'object' && !Object.keys(v).length) ) {
      return '';
    }

    if (typeof v === 'object') {
      return `${k}=${encodeURIComponent(JSON.stringify(v))}`;
    }

    return `${k}=${encodeURIComponent(v as (string | number | boolean))}`;
  });

  return target.filter((v) => v !== '').join('&');
}


/* -------------------------------------------------------------------------- */
export function toQueriesObject<search = string>(search: string): any {
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


/* -------------------------------------------------------------------------- */
/**
 * @param   {InitialQueries}  initialQueries
 * @param   {NavigatorAction} navigator
 * @return  {*}
 */
export function useQueriesCore<Q>(initialQueries?: InitialQueries<Q>, navigator?: NavigatorAction): [Q, DispatchQueries<Q | SetQueriesAction<Q>>] {
  const routerLocation = useLocation();
  const current = routerLocation.search.replace(/^\?/, '');

  const [ pathname ] = useState<string>(routerLocation.pathname);
  const [ queries, setQueries ] = useState<Q>((): Q => {
    if (current === '') {
      return toQueriesObject(toSearchString(initialQueries));
    }
    return toQueriesObject(current);
  });
  // --------
  const dispatch = useCallback((nextQueries: Q | SetQueriesAction<Q>): void => {
    setQueries((searches: Q): Q => {
      return toQueriesObject(toSearchString(
        typeof nextQueries === 'function'
          ? (nextQueries as SetQueriesAction<Q>)(searches)
          : nextQueries as Q
      ));
    });
  }, [ queries ]);

  useLayoutEffect(() => {
    if (pathname !== routerLocation.pathname) return;

    if (current === '') {
      navigator && navigator(`?${toSearchString(initialQueries)}`);
      return;
    }

    setQueries((queries) => (
      current === toSearchString(queries)
        ? queries
        : toQueriesObject(current)
    ));
  }, [ current, pathname, routerLocation.pathname ]);

  useEffect(() => {
    navigator && navigator(`?${toSearchString(queries)}`);
  }, [ queries ]);

  return [ queries, dispatch ];
}

/* -------------------------------------------------------------------------- */
export function useQueries<Q>(initialQueries?: InitialQueries<Q>): [Q, DispatchQueries<Q | SetQueriesAction<Q>>] {
  const syncQueries = useHistory();
  const [ queries, setQueries ] = useQueriesCore<Q>(initialQueries, (search) => {
    syncQueries.replace(search);
  });
  return [ queries, setQueries ];
}

/* -------------------------------------------------------------------------- */
export default useQueriesCore;
