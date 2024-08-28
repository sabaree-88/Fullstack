function Validate(value) {
  let error = {};

  if (value.title === "") {
    error.title = "Enter book title!";
  } else {
    error.title = "";
  }

  if (value.author === "") {
    error.author = "Enter author name!";
  } else {
    error.author = "";
  }

  if (value.description === "") {
    error.description = "Enter description!";
  } else {
    error.description = "";
  }
  if (value.year === "") {
    error.year = "Enter book publised year!";
  } else {
    error.year = "";
  }
  if (value.price === "") {
    error.price = "Enter book price!";
  } else {
    error.price = "";
  }
  if (value.category === "") {
    error.category = "Enter book category!";
  } else {
    error.category = "";
  }
  if (!value.image) {
    error.image = "Upload an image!";
  } else {
    const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedFileTypes.includes(value.image.type)) {
      error.image = "Allowed image types are jpg, jpeg, png!";
    }
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (value.image.size > maxSizeInBytes) {
      error.image = `Image size should not exceed ${maxSizeInMB}MB!`;
    }
  }
  return error;
}

export default Validate;
