import Image from "next/image";

interface AnimalProps {
    type: any,
    width: number,
    height: number
}
 
const Animal = ({type, width, height}: AnimalProps) => {
    return <Image src={`/images/${type}.svg`} alt={type} width={width} height={height}/>;
}
 
export default Animal;