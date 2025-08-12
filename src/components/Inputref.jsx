import { useRef } from "react";

const Inputref = () => {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.value="new value"
    };
  

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={handleClick}>Change Input</button>
        </div>
    );
}

export default Inputref
