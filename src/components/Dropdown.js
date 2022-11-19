import { useState } from "react";

function Dropdown(props) {
  //   const [visibility, setVisibility] = useState(false);
  return <article>{props.visibility && props.children}</article>;
}

export default Dropdown;
