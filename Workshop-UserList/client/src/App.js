import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import './App.css';
import { UserList } from "./components/UserList";
import * as userServices from './services/userService';
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userServices.getAll()
      .then(users => {
        setUsers(users);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const onUserCreateSubmit = async (e) => {
    //stop automatic form submit
    e.preventDefault();

    //Taka data from DOM tree
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    //Send AJAX request to server
    const createdUser = await userServices.create(data);


    //If successfull add new user to the state
    setUsers(state => [...state, createdUser]);
  }

  const onUserDelete = async(userId)=>{
    //Delete from server
    await userServices.remove(userId);
    //Delete from state
    setUsers(state=>state.filter(x => x._id !== userId));
  }

  const onUserUpdateSubmit = async(e, userId)=>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const updatedUser = await userServices.update(userId, data);

    setUsers(state=>state.map(x=>x._id===userId ? updatedUser : x));
  }

  return (
    <>
      <Header />

      <main className='main'>
        <section className="card users-container">
          <Search />

          <UserList
            users={users}
            onUserCreateSubmit={onUserCreateSubmit}
            onUserDelete={onUserDelete}
            onUserUpdateSubmit={onUserUpdateSubmit}
          />

        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
