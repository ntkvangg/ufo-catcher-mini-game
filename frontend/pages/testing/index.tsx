import Image from "next/image";
import { useState, useMemo } from "react";
import Helpers from "@/utils/Helpers";
import ResultAnimals from "@/components/Animals";
import Button from "@/components/Button";

const Testing = () => {

    const [count, setCount] = useState(0);
    const [percentAnimals, setPercentAnimals] = useState<any>(Helpers.animals);
    const [animals, setAnimals] = useState<any>(Helpers.animals);
    const proveWeightedRandomGenerator = async () => {
        setCount(0);
        try {
            const { animals, percentAnimals } = await Helpers.fetchApi(`/api/animals/catch/${count}`);
            setAnimals(animals);
            setPercentAnimals(percentAnimals);
        } catch (error) {
            console.log(error);
        }

    }

    const totalSuccessCatching: any = useMemo(() => {
        const animalTempt = { ...animals };
        delete animalTempt.empty;
        return Object.values(animalTempt).reduce((sum: any, count: any) => {
            if (count) {
                sum = sum + count
            }
            return sum;
        }, 0);
    }, [animals]);


    const totalSuccessPercentCatching: any = useMemo(() => {
        const animalTempt = { ...percentAnimals };
        delete animalTempt.empty;
        return Object.values(animalTempt).reduce((sum: any, count: any) => {
            if (count) {
                sum = sum + parseFloat(count)
            }
            return sum;
        }, 0);
    }, [percentAnimals]);

    return (
        <div className="mini-game-content">
            <div className={`card-image `}>
                <div className="card-testing">
                    <p className="text-dark">Weighted Random Animal Generation Testing Tool</p>
                    <div className="form-catch">
                        <label className="text-label-time-catching text-dark">Times to catch</label>
                        <div>
                            <input className="input-testing" type="text" value={count} onChange={(e: any) => setCount(e.target.value)} />
                        </div>
                        <div className="card-toolbar">
                            <Button className="button mt-1" onClick={proveWeightedRandomGenerator} disabled={isNaN(count) || !count || count < 100}>
                                <Image src="/images/play.svg" alt="Play Button" width={30} height={30} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="result mt-4">
                <ResultAnimals animals={animals} />
                <div className="total mt-10">
                    <p className="text-dark">Success: {totalSuccessCatching} ~ {totalSuccessPercentCatching} %</p>
                    <p className="text-dark">Failed: {animals.empty} ~ {percentAnimals.empty} %</p> 
                </div>
                <div className="count-percent">
                    {Helpers.imageAnimal.map((animal, index) => (
                        <span className="text-percent" key={index}>{percentAnimals[animal] + '%'}</span>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Testing;