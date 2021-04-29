import get from "lodash/get";

const getError = (error) => {
  return get(error, "response.data.error", error);
};

export default getError;
