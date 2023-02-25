import {React, useState} from 'react';
import { enterDetector } from "../../Utils";

function EditableText({defaultValue, update}) {

    const [editable, setEditable] = useState(false);

    async function onChange(event) {
        await update(event);

        setEditable(false);
    }

    if (editable) {
        return (
            <input autoFocus onClick={e => e.preventDefault()} type='text' defaultValue={defaultValue} onBlur={e => onChange(e)} onKeyDown={e => enterDetector(e, onChange)}/>
        )
    }

    return (
        <div onClick={e => {e.preventDefault(); setEditable(true)}}>{defaultValue}</div>
    )
}

export default EditableText;
