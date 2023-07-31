interface Props {
    onClick: ()=> void,
    isDisabled: boolean
}

function CombineButton({onClick, isDisabled}: Props){
    return (
        <button className="button button-action button-combine mt-10" onClick={onClick} disabled={isDisabled}>Combine</button>
    )
}

export default CombineButton;
