export const Reducer = (state, action) => {  
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

