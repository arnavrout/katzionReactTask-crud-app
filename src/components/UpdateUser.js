import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UpdateUniversity, FetchUniversityObj } from '../redux/Action';


function UpdateUser() {
    const [id, idChange] = useState(0);
    const [newUniversity, setNewUniversity] = useState('')
    const [newCountry, setNewCountry] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {code} = useParams();

    //using useSelector to access our state
    const universitiesObj = useSelector((state) => state.universities.universitiesObj)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const universitiesObj = {newUniversity, newCountry, newWebsite};
        dispatch(UpdateUniversity(universitiesObj, id));
        navigate('/universities');
    }

    useEffect(() => {
        dispatch(FetchUniversityObj(code))
    }, [code, dispatch])


    //To get the data we want to edit of an university
    useEffect(() => {
        if(universitiesObj) {
            idChange(universitiesObj.id)
            setNewUniversity(universitiesObj.newUniversity);
            setNewCountry(universitiesObj.newCountry);
            setNewWebsite(universitiesObj.newWebsite)
        }
    }, [universitiesObj])

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="addUniversityHeader">
            <h2>Edit University Data</h2>
        </div>
        <div className="addUniversityBody">
        <div>
            <input type="text" value={newUniversity || ''} onChange={e => setNewUniversity(e.target.value)} placeholder='University' required minLength="10"/>
          </div>
          <div >
            <input type="text"  value={newCountry || ''} onChange={e => setNewCountry(e.target.value)}  placeholder='Country' required pattern="[A-Za-z]+"/>
          </div>
          <div >
            <input type="url"  value={newWebsite || ''} onChange={e => setNewWebsite(e.target.value)}  placeholder='Website' required pattern="https?://.+" />
          </div>
        </div>
        <div className="addUniversityFooter">
            <button type='submit'>Update</button>
            <Link to={'/universities'}>Go Back</Link>
        </div>
        </form>
    </div>
  )
}

export default UpdateUser