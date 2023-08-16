import styles from "@/styles/Spinner.module.css";

interface Props{
    className?: string
}

const Spinner = ({className}: Props)=>{
    return (
        <div className={`${styles.spinner} ${className}`}></div>
    )
}

export default Spinner;