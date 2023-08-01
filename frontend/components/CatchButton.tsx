interface Props {
    onClick: ()=> void
}

import {memo} from 'react';

function CatchButton({onClick}: Props){
    return (
        <button className="button button-action button-catch mb-20 mt-10" onClick={onClick}>Catch</button>
    )
}

export default memo(CatchButton);