import React, {useState, useEffect } from 'react'
import { FetchUniversityList, RemoveUniversity } from '../redux/Action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import loadingIcon from '../images/loadingIcon.png'

function UniversityListing(props) {

  const [apiData, setApiData] = useState([]);

  //To Handle pagination
  const universitiesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDisplayedPage, setLastDisplayedPage] = useState(15);

  //To handle search-filter
  const [searchQuery, setSearchQuery] = useState('');

  //To handle background color on every refresh
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color
  const maxRecentColors = 5; // Maximum number of recent colors to store


  //Fetching the provided (University) API data
  useEffect(() => {
    axios.get('http://universities.hipolabs.com/search?country=United+States')
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from the API: ', error);
      });
  }, []);

  //Combining provided university list and custom university list
  const combinedData = props.universities.universitiesList.concat(apiData);

   // Calculate the start and end indexes for the current page
   const startIndex = (currentPage - 1) * universitiesPerPage;
   const endIndex = startIndex + universitiesPerPage;
   const totalPages = Math.ceil(combinedData.length / universitiesPerPage);

   // Number of pages to display initially (in one page)
   const displayedPages = 15; 
 
   const handlePageChange = (newPage) => {
     setCurrentPage(newPage);
     if (newPage > lastDisplayedPage) {
       setLastDisplayedPage(newPage);
     }
   };

   const startingPage = Math.max(currentPage - displayedPages + 1, 1);


  // Filtering universities based on search query
  const filteredUniversities = combinedData.filter((universityData) => {
  const universityName = (universityData && (universityData.university || universityData.name)) || ''; // Check if universityData is defined
  return universityName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get the universities to display on the current page
  const universitiesToDisplay = filteredUniversities.slice(startIndex, endIndex);

  
  //Handle background colors on every refresh
  useEffect(() => {
    //here we are getting the list of colors we used recently
    const recentColors = JSON.parse(localStorage.getItem('recentColors')) || [];

    // Total available colors we have to display
    const availableColors = ['#B7FBFF', '#FFF6BE', '#FFE0A3', '#FFA1AC', '#F688BB', '#E8F9E9', '#BAF1A1', '#9DE3D0', '#F98B60', 'FFF6F4'];

    // Function to generate a random color that is not in recentColors
    const getRandomColor = () => {
      let randomColor;
      do {
        randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      } while (recentColors.includes(randomColor));
      return randomColor;
    };
    // Getting a new background color
    const newColor = getRandomColor();
      // Setting the background color
      setBackgroundColor(newColor);
      // Update the list of recently used colors (shift older colors if it exceeds maxRecentColors)
      recentColors.push(newColor);
      if (recentColors.length > maxRecentColors) {
        // Remove the oldest color used
        recentColors.shift(); 
      }
      // Store the updated list in localStorage
      localStorage.setItem('recentColors', JSON.stringify(recentColors));
    }, []);
  

  useEffect(() => {
    props.loadUniversities();
  }, [])

  //To handle individual university delete functionality
  const deleteUniversity = (code) => {
    if(window.confirm('Confirm to delete')) {
      props.removeUniversities(code);
      props.loadUniversities();
      alert("University Deleted Successfully! Reload Now")
    }
  }

  return (
    props.universities.loading?<div><img src={loadingIcon} alt="loading..." /></div>: 
    props.universities.errorMessage?<div><h2>{props.universities.errorMessage}</h2></div>:
    <div style={{ backgroundColor }}>
    <div className="card">
     <div className="card-header">
        <h1>Universities List</h1>
        <div>
        <Link to={'/users/add'} className='addUniversity'>Add University</Link>
        </div>

        <div className="search-box">
        <input
          type="text"
          placeholder="Search Your University"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
     </div>

     <div className="card-body">
     <table className="university-table">
        <thead>
          <tr>
            <th>University Name</th>
            <th>Country Name</th>
            <th>Website Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {universitiesToDisplay.map((universityData, index) => (
              <tr key={index}>
                <td>{universityData.university || universityData.name}</td>
                <td>{universityData.country || universityData.country}</td>
                <td>{universityData.website || universityData.web_pages}</td>
                <td className='actions'>
                <Link to={'/users/edit/'+ universityData.id} className='edit-button'>Edit</Link>
                <button onClick={() => {deleteUniversity(universityData.id)}} className='delete-button'>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
     </table>
     </div>
     <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: displayedPages }, (_, i) => {
          const page = startingPage + i;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          );
        })}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>

    </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    universities: state.universities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUniversities: () => dispatch(FetchUniversityList()),
    removeUniversities: (code) => dispatch(RemoveUniversity(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UniversityListing);

