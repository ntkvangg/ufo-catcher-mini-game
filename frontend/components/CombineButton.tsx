interface Props {
    onClick: ()=> void,
    isDisabled: boolean
}

import {memo} from 'react';

function CombineButton({onClick, isDisabled}: Props){
    return (
        <button className="button button-action button-combine mt-10" onClick={onClick} disabled={isDisabled}>Combine</button>
    )
}

export default memo(CombineButton);
