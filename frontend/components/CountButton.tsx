interface Props{
    count: any
}

function CountButton({count}: Props){
    return (
        <button className="circle-button">{count}</button>
        
    )
}
export default CountButton;