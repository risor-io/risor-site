// Example from https://beta.reactjs.org/learn

import { useState } from 'react';
import styles from './counters.module.css';
import { useSession } from 'next-auth/react';

function MyButton() {
  const { data: session, status } = useSession();
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={handleClick} className={styles.counter}>
        Clicked {count} times {JSON.stringify(session)}
      </button>
    </div>
  );
}

export default function MyApp() {
  return <MyButton />;
}
