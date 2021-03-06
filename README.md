# Simple React Hooks Pagination

Simple pagination component for ReactJS.
## Installation

npm i reactjs-hooks-pagination

with yarn:

yarn add reactjs-hooks-pagination

```javascript

## Example 1


import React, { useState,useEffect,useReducer } from 'react';
import Pagination from 'reactjs-hooks-pagination';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const pageLimit = 5;
const initialState = {  
  user: {},  
  loading: true,  
  error: ''  
}  
 
const Reducer = (state, action) => {  
  switch (action.type) {  
      case 'OnSuccess':  
          return {  
              loading: false,  
              user: action.payload,  
              error: ''  
          }  
      case 'OnFailure':  
          return {  
              loading: false,  
              user: {},  
              error: 'Something went wrong'  
          }  
 
      default:  
          return state  
  }  
}
 
function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(50);
  const [currentPage,setCurrentPage] = useState(1);

  useEffect( () => {
    axios.get('http://5e709ac5667af70016317119.mockapi.io/users?page='+currentPage+'&limit='+pageLimit)  
    .then(response => {  
        dispatch({ type: 'OnSuccess', payload: response.data })  
    })  
    .catch(error => {  
        dispatch({ type: 'OnFailure' })  
    })  

  }, [currentPage]);
   const {loading,user,error}  =state;
 
 return (
      <div className="container mb-5">
      <table className="table table-striped">
      <thead className="table-success">
        <tr>
          <th>#ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
        </tr>
        </thead>
        <tbody> 
        {loading ? ( <div>Loading ...</div>) :(
        
        error=='' && user.map(data => (
          <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{data.email}</td>
          </tr>
          )))}
    </tbody>       
</table>
<div className="d-flex flex-row py-4 justify-content-end">
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
            </div>
      </div>
    );
  }

export default App;





## Example 2

import React, { useState,useEffect,useReducer } from 'react';
import Pagination from 'reactjs-hooks-pagination';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const pageLimit = 5;
 
function App() {
  const [loading, setLoading] = useState(true)  
  const [error, setError] = useState('')  
  const [user, setUser] = useState({})  
  const [totalRecords, setTotalRecords] = useState(50);
  const [currentPage,setCurrentPage] = useState(1);

  useEffect( () => {
    axios.get('http://5e709ac5667af70016317119.mockapi.io/users?page='+currentPage+'&limit='+pageLimit)  
    .then(response => {  
        setLoading(false)  
        setUser(response.data)  
        setError('')
    })  
    .catch(error => {  
      setLoading(false)  
      setUser({})  
      setError('Something went wrong')
    })  

  }, [currentPage]);

 
 return (
      <div className="container mb-5">
      <table className="table table-striped">
      <thead className="table-success">
        <tr>
          <th>#ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
        </tr>
        </thead>
        <tbody> 
        {loading ? ( <div>Loading ...</div>) :(
         user.length>0 && user.map(data => (
          <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td>{data.email}</td>
          </tr>
          )))}
    </tbody>       
</table>
<div className="d-flex flex-row py-4 justify-content-end">
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
            </div>
      </div>
    );
  }

export default App;


## Example 3

import React, { useState,useEffect } from 'react';
import Pagination from 'simple-react-hooks-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
const pageLimit = 5;

const Reducer = (state, action) => {  
  switch (action.type) {  
      case 'OnSuccess':  
          return {  
              loading: false,  
              user: action.payload,  
              error: ''  
          }  
      case 'OnFailure':  
          return {  
              loading: false,  
              user: {},  
              error: 'Something went wrong'  
          }  

      default:  
          return state  
  }  
}

function App() {
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  import firebase from './Firebase';
  
  const onPageChanged = page => {
    const offset = (page - 1) * pageLimit;
    setOffset(offset);
  }

  useEffect( () => {
     collection
    .orderBy('id')
    .startAfter(offset)
    .limit(5)
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
       dispatch({ type: 'OnSuccess', payload: data })
    }) .catch(error => {  
      dispatch({ type: 'OnFailure' })  
    });
    collection.get().then(function(querySnapshot) {      
      setTotalRecords(querySnapshot.size);
  });
  }, [offset]);
   const {loading,user,error}  =state;

  return (
    <div>
       <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={onPageChanged}
      />
    </div>
  );
}
export default App;
```

## Props

| Parameters        | Description                        
|------------------ |------------------------------------|
| totalRecords      |  Total count of items .                 |
| pageLimit         |  Count of items per  page                  |
| pageRangeDisplayed    |  Range of pages in pagination, exclude navigation blocks (prev, next, first, last pages.                |

                   
```
