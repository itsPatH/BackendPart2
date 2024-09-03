import {
    ProductErrorCodes,
    ProductHttpStatusCodes,
    ProductErrorMessages,
    CartErrorCodes,
    CartHttpStatusCodes,
    CartErrorMessages,
  } from "../config/error.config.js";
  
  function getErrorDetails(code, origin) {
    let ErrorCodes, HttpStatusCodes, ErrorMessages;
  
    switch (origin) {
      case "product":
        ErrorCodes = ProductErrorCodes;
        HttpStatusCodes = ProductHttpStatusCodes;
        ErrorMessages = ProductErrorMessages;
        break;
      case "cart":
        ErrorCodes = CartErrorCodes;
        HttpStatusCodes = CartHttpStatusCodes;
        ErrorMessages = CartErrorMessages;
        break;
      default:
        return {
          errorName: "UNKNOWN_ERROR",
          httpCode: 500,
          message: "An unknown error occurred",
        };
    }
  
    const errorKey = Object.keys(ErrorCodes).find(key => ErrorCodes[key] === code);
    
    if (errorKey) {
      const httpCode = HttpStatusCodes[errorKey] || 500;
      const message = ErrorMessages[errorKey] || "An unknown error occurred";
      return { errorName: errorKey, httpCode, message };
    }
  
    return {
      errorName: "UNKNOWN_ERROR",
      httpCode: 500,
      message: "An unknown error occurred",
    };
  }
  
  export default getErrorDetails;
  