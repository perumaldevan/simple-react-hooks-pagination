# Simple React Hooks Pagination

Simple pagination component for ReactJS.

```javascript
import React, { useState,useEffect } from 'react';
import Pagination from 'reactjs-hooks-pagination';
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
                setOffset={setOffset}
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
| setOffset         |  function that updates the offset state              |
                   
```
