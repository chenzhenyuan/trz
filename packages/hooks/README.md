# `@trz/hooks`

> A magical utils 😂

## Usage

```tsx
import { useHistory } from 'react-router';
import { useQueriesCore, InitialQueries, DispatchQueries, SetQueriesAction } from "@trz/hooks";

export function useQueries<Q>(initialQueries?: InitialQueries<Q>): [Q, DispatchQueries<Q | SetQueriesAction<Q>>] {
  const history = useHistory();
  
  const [ queries, setQueries ] = useQueriesCore<Q>(initialQueries, (search): void => {
    history.replace(search);
  });
  
  return [ queries, setQueries ];
}

/* -------------------------------------------------------------------------- */
// App.tsx
function TestComponent(): ReactElement {
  const [ queries, setQueries ] = useQueries({ pageSize: 10, pageNo: 1 });
  
  useLayoutEffect(() => {
    console.log(queries.pageSize, queries.pageNo);
  }, [ queries ]);
  
  
  return (
    <Some.Component>
      <Link to={`/index?pageNo=${queries.pageNo - 1}&pageSize=${queries.pageSize}`}>Prev</Link>
      <Link to={`/index?pageNo=${queries.pageNo + 1}&pageSize=${queries.pageSize}`}>Next</Link>
      
      <Button
        onClick={() => {
          setQueries({ pageNo: 2 }); // => /index?pageNo=2
          
          setQueries((queries) => ({ ...queries, pageNo: 2})); // => /index?pageNo=2&pageSize=10
        }}>
        Click me
      </Button>
    </<Some.Component>>
  );
}
```

