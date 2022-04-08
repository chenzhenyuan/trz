import { useLayoutEffect } from 'react'
import { render } from 'react-dom';
import { HashRouter as Router, Link } from 'react-router-dom';

// import "./type";
// import "./uri";
// import './requests'

import { useQueries } from '../packages/hooks/release/useQueries'


function Test() {
  const [queries, setQueries] = useQueries({a: 213});

  useLayoutEffect(() => {
    console.log(queries);
  }, [queries]);


  return (
    <>
      <div>
        <Link to={`./aaa?sss=${Date.now()}`}>?sss=Date.now()</Link>
        <span>{JSON.stringify(queries)}</span>
      </div>
      <div><Link to={`./sssss?sss=111&vvv=${Date.now()}`}>./sssss?sss=111&vvv=Date.now()</Link></div>
    </>
  );
}


render(
  <Router>
    <Test />
  </Router>,
  // document.getElementById('rootContainer')
  document.body
)
