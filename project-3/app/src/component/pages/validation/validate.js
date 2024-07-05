function Validate(value) {
    let error = {};
  
    if (value.title === "") {
      error.title = "Enter book title!";
    } else {
      error.title = "";
    }
  
    if (value.author === "") {
      error.author = "Enter author name!";
    }else {
      error.author = "";
    }
  
    if (value.year === "") {
      error.year = "Enter book publised year!";
    } else {
      error.year = "";
    }
  
    return error;
  }
  
  export default Validate;
  