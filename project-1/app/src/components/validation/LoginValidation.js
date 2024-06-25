function LogValidation(value) {
  alert("Test");
  let error = {};
  let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (value.email === "") {
    error.email = "This field is required";
  } else if (!emailPattern.test(value.email)) {
    error.email = "Invalid email";
  } else {
    error.email = "";
  }

  if (value.password === "") {
    error.password = "Password is required";
  } else if (!passwordPattern.test(value.password)) {
    error.password =
      "Password must be contain 8 char, uppercase and smallercase!";
  } else {
    error.password = "";
  }

  return error;
}

export default LogValidation;
