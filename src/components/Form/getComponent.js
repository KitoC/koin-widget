import Input from "./Input";

const componentMap = {
  TextInput: Input,
};

const getComponent = (component) => {
  return componentMap[component] || component || Input;
};

export default getComponent;
