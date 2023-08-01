import Animal from "@/components/Animal";
import CatchButton from "@/components/CatchButton";
import CombineButton from "@/components/CombineButton";
import CountButton from "@/components/CountButton";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const imageAnimal = [
    "chicken",
    "duck",
    "rabbit",
    "pig",
    "sheep",
    "horse",
    "cow"
]

const animalCounts: any = {
    "chicken": 0,
    "duck": 0,
    "rabbit": 0,
    "pig": 0,
    "sheep": 0,
    "horse": 0,
    "cow": 0
};
  

function CatchAnimal (){
    const [animals, setAnimals] = useState<any>(animalCounts);
    const [catchAnimal, setCatchAnimal] = useState("");
    const [isCombined, setIsCombined] = useState(true);
    const [isCombinationSuccess, setIsCombinationSuccess] = useState(false);
    // const [isShowMsg, setIsShowMsg] = useState(false);
    const [message, setMessage] = useState("");

    const fetchCatchAnimals = async () => {
        const data = await fetch("/api/animals/catch")
          .then((response) => response.json())
          .then((data) => { return data;})
          .catch((error) => {return error;});
        return data;
    }

    const updateCountAnimal = async (animal: any) => {
        const data = await fetch(`/api/animals`, {
            method: "POST",
            body: JSON.stringify({ animal }),
            headers: { "Content-Type": "application/json" }
        }).then((response) => response.json())
        .then((data) => { return data;})
        .catch((error) => {return error;});
        return data;
    }

    const fectAnimals = async () => {
        const data = await fetch("/api/animals")
          .then((response) => response.json())
          .then((data) => { return data;})
          .catch((error) => {return error;});
        return data;
    }

    const checkCombination = async () => {
        const data = await fetch("/api/animals/combine")
        .then((response) => response.json())
        .then((data) => {return data;})
        .catch((error) => {return error;});
        return data;
    }

    const getAnimals = useCallback(async()=>{
        try{
            const data = await fectAnimals();
            setAnimals(data);
            setIsCombined(checkDisableCombinebtn(data));
        }catch(error: any){
            handleError(error.message);
        }
        
    }, [isCombined]) 


    useEffect(()=>{
        getAnimals();
    }, [])

    
    
    const handleCatch = useCallback(async()=>{
        try{
            const animal = await fetchCatchAnimals();
            const updatedAnimals = await updateCountAnimal(animal);
            setCatchAnimal(animal);
            setAnimals(updatedAnimals);
            setIsCombined(checkDisableCombinebtn(updatedAnimals));
        }catch(error: any){
            handleError(error.message);
        }
    }, [])

    const checkDisableCombinebtn = (animals: any)=>{
        const totalCaughtAnimals: any = Object.values(animals).reduce((sum: any, count: any) => {
            if(count){
                sum = sum + 1
            }
            return sum;
        }, 0);
        return totalCaughtAnimals < 7
    }

    const handleError = (message: string)=>{
        setMessage(message);
        setTimeout(() => {
            setMessage("")
        }, 10000);
    }
      
    const handleCombine = useCallback( async()=>{
        try{
            const data = await checkCombination();
            if(data.status === 403){
                setMessage(data.message);
            }else{
                setMessage(data.success ? "Congratulations! You have extracted a diamond!" : "Oops! The combination failed.");
            }
            setIsCombinationSuccess(data.success);
            setTimeout(() => {
                setMessage("");
                setIsCombinationSuccess(false);
            }, 10000);
            getAnimals();
        }catch(error: any){
            handleError(error.message);
        }
        
    }, [isCombined])
      
    
    return (
        <>
            <div className="mini-game-content text-center">
                <div className="card-image">
                    {
                        catchAnimal ? 
                            <Animal type={catchAnimal} width={200} height={150}/>
                        :
                            <Image src="/images/question.svg" alt="Catch animal" width={200} height={150}/>
                    }
                </div>
                <CatchButton onClick={handleCatch} />
                <div className="wrapper-list-animal">
                    <div className="list-animal">
                        {imageAnimal.map((item, index)=>(
                            <Animal type={item} width={40} height={40} key={index}/>
                        ))}
                    </div>
                    <div className="count-animal">
                        {imageAnimal.map((animal, index) => (
                            <CountButton count={animals[animal]} key={index}/>
                        ))}
                    </div>
                </div>
                <CombineButton onClick={handleCombine} isDisabled={isCombined}/>
                <div className="result mt-10">
                    {isCombinationSuccess ? 
                    <div>
                        <Image src="/images/diamond.png" alt="Diamond" width={60} height={60}/>
                        {message && <p>{message}</p>}
                    </div>
                    :
                    <div>
                        <Image width={40} height={40} src="/images/question.svg" alt="question"/>
                        {message && <p>{message}</p>}
                    </div>
                    
                    }
                </div>
                
            </div>
        </>
       
    )
}

export default CatchAnimal;