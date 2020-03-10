# Simple React Hooks Pagination

Simple pagination component for ReactJS.

```javascript
import React, { useState,useEffect,useReducer } from 'react';
import Pagination from 'reactjs-hooks-pagination';
import firebase from './Firebase';
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
  const [totalRecords, setTotalRecords] = useState(0);
  
 
  const collection = firebase.firestore().collection("users");
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
                setOffset={setOffset}
                onChangePage={onPageChanged}
      />
            </div>
      </div>
    );
  }
}
export default App;
```

## Props

| Parameters        | Description                        
|------------------ |------------------------------------|
| totalRecords      |  Total count of items .                 |
| pageLimit         |  Count of items per  page                  |
| pageRangeDisplayed    |  Range of pages in pagination, exclude navigation blocks (prev, next, first, last pages.                |
| setOffset         |  function that updates the offset state              |
                   
```
