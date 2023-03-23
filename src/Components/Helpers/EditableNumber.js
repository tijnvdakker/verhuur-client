import {React, useState} from 'react';
import { enterDetector } from "../../Utils";

function EditableNumber({defaultValue, update}) {

    const [editable, setEditable] = useState(false);

    async function onChange(event) {
        await update(event);

        setEditable(false);
    }

    if (editable) {
        return (
            <input autoFocus onClick={e => e.preventDefault()} type='number' step="1" defaultValue={defaultValue} onBlur={e => onChange(e)} onKeyDown={e => enterDetector(e, onChange)}/>
        )
    }

    return (
        <div className="editable-number" onClick={e => {e.preventDefault(); setEditable(true)}}>{defaultValue}</div>
    )
}

export default EditableNumber;
