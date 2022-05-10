/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/12/20 13:13:03 +0800
 * @filePath     : /packages/hooks/src/useQueries/index.ts
 * @lastEditors  : Please set LastEditors
 * @updated      : 2022/05/10 10:47:40 +0800
 * @description  : ****
 */


import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router';

export type DefaultQueries = {[key: string]: any};

export type Queries<S = DefaultQueries> = S | DefaultQueries;

export type InitialQueries<V> = Queries<V> | (() => Queries<V>);

export type SetQueriesAction<Q = DefaultQueries> = ((prevQueries: Queries<Q>) => Queries<Q>);

export type DispatchQueries<A = Queries | SetQueriesAction > = (queries?: A) => void;

export type DispatchArgument<Q = DefaultQueries> = Queries<Q> | SetQueriesAction<Q>;

// export type Dispatcher<Q> = DispatchQueries<Queries<Q> | SetQueriesAction<Q>>;

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
 * @param   {Object} initialQueries
 * @param   {NavigatorAction} navigator
 * @return  {*}
 */
export function useQueriesCore<Q>(initialQueries?: Q, navigator?: NavigatorAction): [Queries<Q>, DispatchQueries<DispatchArgument<Q>>] {
  const routerLocation = useLocation();
  const current = routerLocation.search.replace(/^\?/, '');

  const [ pathname ] = useState<string>(routerLocation.pathname);

  const [ queries, setQueries ] = useState<Queries<Q>>(() => {
    if (current === '') {
      return toQueriesObject(toSearchString<Queries<Q>>(initialQueries ?? {}));
    }

    return toQueriesObject(current);
  });

  // --------
  const dispatch = useCallback<DispatchQueries<DispatchArgument<Q>>>((nextQueries?: DispatchArgument<Q>): void => {
    setQueries((searches) => {
      return toQueriesObject(toSearchString(
        typeof nextQueries === 'function'
          ? (nextQueries as SetQueriesAction<Q>)(searches)
          : nextQueries
      ));
    });
  }, [ queries ]);

  useEffect(() => {
    navigator && navigator(`?${toSearchString(queries)}`);
  }, [ queries ]);


  useEffect(() => {
    if (pathname !== routerLocation.pathname) return;

    if (current === '') {
      if (initialQueries) {
        navigator && navigator(`?${toSearchString(initialQueries)}`);
      }
      else {
        setQueries({});
      }
      return;
    }

    setQueries((queries) => {
      return (
        current === toSearchString(queries)
          ? queries
          : toQueriesObject(current)
      );
    });
  }, [ current, pathname, routerLocation.pathname ]);

  return [ queries, dispatch ];
}

/* -------------------------------------------------------------------------- */
export default useQueriesCore;
