import { useState, useEffect } from 'react';
import axios from './apis/todoAPI';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';
import useAxiosFunction from './hooks/useAxiosFunction';

function App() {
  const [items, error, loading, axiosFetch] = useAxiosFunction();
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const getData = () => {
    axiosFetch({ axiosInstance: axios, method: 'GET', url: '/todo' });
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleCheck = async (id) => {
    //const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    let updatedItem = items.filter((item) => item.id === id);
    updatedItem[0].checked = !updatedItem[0].checked;
    const response = await axios.put(`/todo/${id}`, updatedItem[0]);
    console.log(JSON.stringify(response));
    getData();
  }

  const handleDelete = async (id) => {
    //const listItems = items.filter((item) => item.id !== id);
    await axiosFetch({ axiosInstance: axios, method: 'DELETE', url: `/todo/${id}` })
    getData();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    try {
      const todo = { checked: false, item: newItem };
      console.log('Submitting: ' + JSON.stringify(todo));
      const response = await axios.post('/todo', todo);
      console.log(JSON.stringify(response));
      setNewItem('')
      getData();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="ToDo List" />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {loading && <p>Loading...</p>}
        {!loading && error && <p className='errMsg'>{error}</p>}
        {!loading && !error &&
          <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete} />
        }
      </main>
      <Footer count={items.length} />
    </div>
  );
}

export default App;
