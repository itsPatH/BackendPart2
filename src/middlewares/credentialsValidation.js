import { passportCall } from "./passportCall.js";

export const Validator = (allowedRoles, endpointName) => {
  return async (req, res, next) => {
    passportCall("current")(req, res, async () => {
      try {
        if (!req.user) {
          console.log(`No user found for endpoint: ${endpointName}`);
          return res.status(401).send({ status: "error", message: "User not authenticated" });
        }

        const { role, name } = req.user;
        
        if (allowedRoles.includes(role)) {
          console.log(`${role} (${name}) is allowed for endpoint: ${endpointName}`);
          return next();
        } else {
          console.log(`${role} (${name}) is not allowed for endpoint: ${endpointName}`);
          return res.status(403).send({ status: "error", message: "Access denied" });
        }
      } catch (error) {
        console.error(`Error during authorization for endpoint: ${endpointName}`, error);
        return res.status(500).send({ status: "error", message: "Internal server error" });
      }
    });
  };
};