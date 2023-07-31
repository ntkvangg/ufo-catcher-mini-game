interface Props {
    onClick: ()=> void
}

function CatchButton({onClick}: Props){
    return (
        <button className="button button-action button-catch mb-20 mt-10" onClick={onClick}>Catch</button>
    )
}

export default CatchButton;