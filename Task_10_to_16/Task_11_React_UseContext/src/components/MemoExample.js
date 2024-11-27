import React, { useState, useMemo, useContext } from 'react';
import { Change } from "./Page";

const MemoExample = () => {
  const [count, setCount] = useState(0);
  const {show,setshow} = useContext(Change);


  const doubled = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <fieldset style={{ border: "2px solid #333", padding: "20px", width: "200px", textAlign: "center" }}>
        <p>Count: {count}    </p>
        <p>Doubled: {doubled}  </p>
        <p className="text-red-500" >* when Count increases. Memo triggered ( based on dependency is count )</p>
        <button onClick={() => setCount(count + 1)}    className="bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4">Increment</button><hr/>


        <button onClick={() => { setshow("Register") }} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Back to register</button>

      </fieldset>
    </div>
  );
  
};

export default MemoExample;
