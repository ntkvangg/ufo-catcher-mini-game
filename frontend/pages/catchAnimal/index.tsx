import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Helpers from "@/utils/Helpers";
import Animals from "@/components/Animals";
import Spinner from "@/components/Spinner";


function CatchAnimal() {
    const [animals, setAnimals] = useState<any>(Helpers.animals);
    const [catchAnimal, setCatchAnimal] = useState("empty");
    const [isCombined, setIsCombined] = useState(true);
    const [message, setMessage] = useState("");
    const [totalDiamond, setTotalDiamond] = useState(0);
    const [isAnimationCatching, setIsAnimationCatching] = useState(false);
    const [loading, setLoading] = useState<any>({});


    const getDiamonds = async () => {
        try {
            const data = await Helpers.fetchApi("/api/animals/diamonds");
            setTotalDiamond(data.total);
        } catch (error: any) {
            handleErrorMsg(error.message);
        }
    }

    const getAnimals = async () => {
        try {
            const data = await Helpers.fetchApi("/api/animals");
            setAnimals(data);
            setIsCombined(checkDisableCombinebtn(data));
        } catch (error: any) {
            handleErrorMsg(error.message);
        }
    }


    useEffect(() => {
        getAnimals();
        getDiamonds();
    }, [])



    const handleCatch = useCallback(async () => {
        setLoading({...loading, catch: true});
        try {
            const { animal, animals } = await Helpers.fetchApi(`/api/animals/catch/${1}`);
            setCatchAnimal(animal);
            setAnimals(animals);
            setIsCombined(checkDisableCombinebtn(animals));
            setIsAnimationCatching(true);
            setTimeout(() => {
                setIsAnimationCatching(false);
            }, 1000)
            setLoading({...loading, catch: false});
        } catch (error: any) {
            handleErrorMsg(error.message);
            setLoading({...loading, catch: false});
        }
    }, [])

    const checkDisableCombinebtn = (animals: any) => {
        const totalCaughtAnimals: any = Object.values(animals).reduce((sum: any, count: any) => {
            if (count) {
                sum = sum + 1
            }
            return sum;
        }, 0);
        return totalCaughtAnimals < 7
    }

    const handleErrorMsg = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("")
        }, 10000);
    }

    const handleCombine = useCallback(async () => {
        setLoading({...loading, combine: true});
        try {
            const data = await Helpers.fetchApi("/api/animals/combine");
            handleErrorMsg(data.success ? "Congratulations! You have extracted a diamond!" : "Oops! The combination failed.");
            if (data.success) {
                getDiamonds();
            }
            getAnimals();
            setLoading({...loading, combine: false});
        } catch (error: any) {
            getAnimals();
            handleErrorMsg(error.status === 403 ? "Animals cannot be combined because they have already been combined in another session!" : error.message);
            setLoading({...loading, combine: false});
        }
    }, [isCombined])

    return (

        <div className="mini-game-content text-center">
            <div className={`card-image ${isAnimationCatching ? 'highlight' : ''}`}>
                <Image src={`/images/${catchAnimal}.svg` || ""} width={200} height={150} alt="Animal" />
            </div>
            <Button className="button-action button-catch styled-catch-btn" onClick={handleCatch}>
                {loading?.catch && <Spinner className="mr-1"/>}
                Catch Animal
            </Button>
            <div className="wrapper-list-animal mt-10">
                <Animals animals={animals} />
            </div>

            <Button className="button-action button-combine mt-10" onClick={handleCombine} disabled={isCombined}>
            <div className="wrapper-catch-button">
                    {loading?.combine && <Spinner className="mr-1"/>}
                    <span>Combine</span>
                </div>
            </Button>
            <div className="result mt-10">
                {totalDiamond > 0 ?
                    <div className="total-diamond">
                        <p className="text-dark">x {totalDiamond}</p><Image src="/images/diamond.png" alt="Diamond" width={60} height={60} className="combining" />
                    </div>
                    :
                    <Image width={40} height={40} src="/images/empty.svg" alt="question" />
                }
                {message && <p className="text-dark">{message}</p>}
            </div>
        </div>


    )
}

export default CatchAnimal;