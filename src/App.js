import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Login from './components/login/login';
import Main from './components/main/main';
import { firestore, auth } from './firebase.utils';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [cardMaker, setCardMaker] = useState([]);
  const [user, setUser] = useState(null);

  const handleCardMaker = (items) => {
    const cardItems = cardMaker.concat(items);
     setCardMaker(
       [...cardItems]
     )
  };

  const userCheck = (result) => {
      firestore
          .collection('users')
          .doc(result.user.uid)
          .set({email: result.user.email})
          .then(() => {
            setUser(result.user.uid);
          })
  }

  const handleCardReset = (id) => {
    const cardItems = cardMaker.filter((items) => items.id !== id);
    setCardMaker([...cardItems]);
  };

  const colorChange = (id, background) => {
    const cardItems = cardMaker.map((items) => {
        if (items.id === id) {
          items.background = background;
        }
        
        return items;
    });

    setCardMaker([...cardItems]);
  }

  const fetchData = useCallback(() => {
    const cardData = [];

    if (user) {
      firestore
      .collection('users')
      .doc(user)
      .collection('card')
      .get()
      .then((docs) => {
         docs.forEach((doc) => {
             const items = {id: doc.id, ...doc.data()}
             cardData.push(items);
         });
         setCardMaker(cardData);
      });
    }
  });

  const makeLogOut = () => {
    auth.signOut().then(() => {
        setCardMaker([]);
        setUser(null);
    });
  }

  useEffect(() => {   //fetchData() useEffect사용 안하고 하는게 더 효율적인데 데이터 불러오는데 안써도 되는건지?
    fetchData();
  }, [user]);

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
              <Login userCheck={userCheck}/>
            </Route> 
          <Route path="/main">
            <Main cardMaker={cardMaker}
            handleCardMaker={handleCardMaker}
            handleCardReset={handleCardReset}
            colorChange={colorChange}
            user={user}
            makeLogOut={makeLogOut}
            />
          </Route>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
