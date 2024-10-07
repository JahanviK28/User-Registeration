const successMessage = {
  MONGODB_CONNECTION_SUCCESS: "Mongodb connected successfully",
  USER_REGISTRATION_SUCCESSFUL: "User was registrated successfully",
  USER_LIST_FETCHED_SUCCESSFULLY: "List of users fetched successfully",
  USER_DELETED_SUCCESSFULLY: "User was deleted successfully",
  USER_UPDATED_SUCCESSFULLY: "User was updated successfully",
};

const errorMessage = {
  MISSING_BODY: "Missing body data! Please provide valid body data",
  TIP_CREATION_FAILURE: "Tip was not created successfully",
  TIP_FETCHING_FAILURE: "Tip were not fetched successfully",
  USER_REGISTERATION_FAILURE: "User registration was not successfull",
  USER_LOGIN_FAILURE: "User login was not successfull",
  GET_USER_LIST_FUNCTION_FAILURE: "Error in get list of users function",
  USER_DELETION_FAILURE: "User deletion was not successfull",
  INVALID_DATA: "Invalid data",
  USER_UPDATE_FAILURE: "User update was not successfull",
  GET_USER_FAILURE: "Error in getting user details",
};

module.exports = {
  successMessage,
  errorMessage,
};
