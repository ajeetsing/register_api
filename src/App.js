import { useState } from 'react';
import { Multiselect } from "multiselect-react-dropdown";
import qs from 'qs'
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchData(query) {
    try {
      const { data: { data: { results } } } = await axios.get(`https://webit-keyword-search.p.rapidapi.com/autosuggest?q=${query}&language=en`,
        {
          headers: {
            'x-rapidapi-host': 'webit-keyword-search.p.rapidapi.com',
            'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
          }
        });
      setData(results)
    } catch (err) {
      setError(err.message);

    }
  }
  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post('https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register',
        qs.stringify({
          name,
          email,
          interests: interests.toString()

        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'testpostapi1.p.rapidapi.com',
            'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
          }
        });
      setLoading(false);
    } catch (err) {
      setError(err.message);

    }

  }

  function onSelect(selectedList, selectedItem) {
    setInterests((pre) => [selectedItem, ...pre])

  }
  function onRemove(selectedList, removedItem) {
    setInterests([...selectedList])
  }

  return (
    <div>
      {
        loading ? "Loading..." :
          error ? { error } :
            (
              <form className="form" onSubmit={submitHandler}>
                <div>
                  <h1>REGISTER</h1>
                </div>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>

                  <Multiselect
                    options={data}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    isObject={false}
                    selectionLimit="3"
                    placeholder="Please type your intrest"
                    closeIcon="cancel"
                    onSearch={(e) => fetchData(e)}

                  />
                </div>
                <div>
                  <label />
                  <button className="primary" type="submit">
                    REGISTER
        </button>
                </div>
                <div>
                </div>
              </form>

            )
      }
    </div>
  );
}

export default App;