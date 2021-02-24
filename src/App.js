import { useState } from 'react';
import qs from 'qs'
import axios from 'axios';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  async function submitHandler(event) {
    event.preventDefault();
    try {
      const data = await axios.post('https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register', qs.stringify({
        name,
        email,
        interests

      }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'testpostapi1.p.rapidapi.com',
            'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
          }
        });
      setMessage(data)
      console.log(data)
      console.log("message", data.message)
    } catch (err) {
      console.log(err);
      setError(err.message);

    }

  }

  return (
    <div>
      {
        loading ? "Loading..." :
          (
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h1>REGISTER</h1>
                <h3>
                  {message ? `user is : ${message.message}  , ` : null}
                </h3>
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
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