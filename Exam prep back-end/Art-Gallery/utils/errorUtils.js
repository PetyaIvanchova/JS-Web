//function getFisrtMongooseError(error){
  //  const firstError = Object.keys(error.errors)[0].message;
//
  //  return firstError;
//}

//exports.getErrorMessage = (error) => {
  //  switch(error.name){
      //  case 'Error':
    //        return error.message;
        //case 'ValidationError':
          //  return getFisrtMongooseError(error);
        //default: 
          //  return error.message; 
    //}
//}

exports.getErrorMessage = (error) => {
    let errorMessage = error.message;

    if(error.errors){
        errorMessage = Object.values(error.errors)[0].message;
    }

    return errorMessage;
}
