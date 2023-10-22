import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddNewUniversity } from '../redux/Action';

function AddUser() {

    const [newUniversity, setNewUniversity] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newWebsite, setNewWebsite] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const universitiesObj = {newUniversity, newCountry, newWebsite};
        dispatch(AddNewUniversity(universitiesObj));
        navigate('/universities');
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="addUniversityHeader">
            <h2>Add New University</h2>
        </div>
        <div className="addUniversityBody">
        <div>
            <input type="text" value={newUniversity} onChange={e => setNewUniversity(e.target.value)} placeholder='University' required minLength="10"/>
          </div>
          <div >
            <input type="text"  value={newCountry} onChange={e => setNewCountry(e.target.value)}  placeholder='Country' required pattern="[A-Za-z]+"/>
          </div>
          <div >
            <input type="url"  value={newWebsite} onChange={e => setNewWebsite(e.target.value)}  placeholder='Website' required pattern="https?://.+" />
          </div>
        </div>
        <div className="addUniversityFooter">
            <button type='submit'>Add</button>
            <Link to={'/universities'}>Go Back</Link>
        </div>
        </form>
    </div>
  )
}

export default AddUser;