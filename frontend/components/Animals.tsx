import Helpers from "@/utils/Helpers";
import Image from "next/image";
import Button from "./Button";


interface Props {
    animals?: any,
}
const Animals = ({ animals }: Props) => {
    return (
        <>
            <div className="list-animal">
                {Helpers.imageAnimal.map((item, index) => (
                    <Image src={`/images/${item}.svg` || ""} width={40} height={40} key={index} alt="Animal" />
                ))}
            </div>
            <div className="count-animal">
                {Helpers.imageAnimal.map((animal, index) => (
                    <Button className="circle-button" key={index}>{animals[animal]}</Button>
                ))}

            </div>
        </>
    )
}

export default Animals;