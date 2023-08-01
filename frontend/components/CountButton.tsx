interface Props{
    count: any
}

import {memo} from 'react';

function CountButton({count}: Props){
    return (
        <button className="circle-button">{count}</button>
        
    )
}
export default memo(CountButton);