import React, { useState,useEffect,useReducer } from 'react';
import './App.css';
import firebase from './Firebase';
import {Reducer} from './components/Reducer';
import Pagination from './components/Pagination';


const initialState = {  
  user: {},  
  loading: true,  
  error: ''  
}   

const collection = firebase.firestore().collection("users");
function App(){
  const pageLimit = 5;
  const [resultSet, setResultSet] = useState([]);
  const [offset, setOffset] = useState(0);
  const [records, setRecords] = useState([]);
 
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [totalRecords, setTotalRecords] = useState(0);

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
      console.log("data",data);
       dispatch({ type: 'OnSuccess', payload: data })
    }) .catch(error => {  
      dispatch({ type: 'OnFailure' })  
    });
    
    collection.get().then(function(querySnapshot) {      
      console.log(querySnapshot.size); 
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
export default App;
