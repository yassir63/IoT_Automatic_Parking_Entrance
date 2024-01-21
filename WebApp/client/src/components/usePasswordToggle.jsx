import {useState} from 'react';
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';



const usePasswordToggle = ()=>{

    const [visible,setVisible]=useState(false);
    const icon =  visible ? <AiOutlineEye/> : <AiOutlineEyeInvisible /> 
    const inputType = visible ? "text" : "password";

    return [inputType,icon];

}

export default usePasswordToggle;