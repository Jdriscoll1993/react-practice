import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {

  const [counter, setCounter] = useState(0);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
  const [displayingJSON, setDisplayingJSON] = useState(true);
  const [userObjects, setUserObjects] = useState([]);
  const [nextUserPage, setNextUserPage] = useState(1);

  const fetchNextUser = useRef(() => { });
  fetchNextUser.current = () => {
    fetchRandomUserData(nextUserPage).then((data) => {
      setRandomUserDataJSON(JSON.stringify(data, null, 2));
      if (userObjects === undefined) {
        alert('no more users');
        return;
      }
      const userInfo = [
        ...userObjects,
        ...data.results,
      ]
      setUserObjects(userInfo);
      setNextUserPage(data.info.page + 1);
    });
  }

  useEffect(() => {
    fetchNextUser.current();
  }, []);

  const handleIncrementClick = () => {
    setCounter(counter + 1);
  }

  const asnycHandleIncrementClick = () => {
    setTimeout(() => {
      setCounter(current => current + 1);
    }, 2000)
  }

  const fetchRandomUserData = (pageNumber) => {
    return axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then(({ data }) => {
        return (data);
      })
      .catch((error) => console.log(error));
  }

  const showJSON = () => {
    setDisplayingJSON(!displayingJSON);
  }

  return (
    <div>
      <h1>create a counter and button to increment by 1</h1>
      <div>
        <button onClick={handleIncrementClick}>increment</button>
        <button onClick={asnycHandleIncrementClick}>increment async</button>
        <h2>{counter}</h2>
      </div>
      <br /><br /><br /><br /><br /><br />


      <h1>fetch data from 'https://randomuser.me/api'</h1>
      <h1>log the data</h1>
      <h1>display the json on the dom</h1>
      <button onClick={showJSON}>display JSON</button>
      {displayingJSON && <pre>{randomUserDataJSON}</pre>}
      <br /><br /><br /><br /><br /><br />
      <h1>create a 'component' from the fetched results and display first/last name and img on component mount</h1>
      <h1>bonus-create a button that appends the next user. hint: url param required `?page=$pageNumber`</h1>

      <h2>username</h2>
      {userObjects.map((userObj, i) => {
        const { name: { title, first, last }, picture } = userObj;
        return <div key={i}>
          <p >{title + '. ' + first + ' ' + last}</p>
          <img src={picture.large} alt='thumbnail' />
        </div>
      })}
      <button onClick={fetchNextUser.current}>append new user</button>
    </div>
  )
}

export default App;

//'https://randomuser.me/api'