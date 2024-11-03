export const BE_URLS = {
    ADD_USER: "http://localhost:8000/user/add",
    USERS_LIST: "http://localhost:8000/user/list",
    REMOVE_USER: "http://localhost:8000/user/remove"
}

export const CREATE_USER_RESPONSE = {
    DEFAULT: {type: "", title: null, message: ""},
    SUCCESS: {type: "success", title: "Successful", message: "User record addedd successfully.!"},
    SOMETHING_WENT_WRONG: {type: "danger", title: "Failed", message: "Something went wrong, Please try again.!"},
    BAD_REQUEST: {type: "danger", title: "Failed", message: "Please provide all the required information.!"} 
}