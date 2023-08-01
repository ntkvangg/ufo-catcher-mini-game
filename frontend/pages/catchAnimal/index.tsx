import Animal from "@/components/Animal";
import CatchButton from "@/components/CatchButton";
import CombineButton from "@/components/CombineButton";
import CountButton from "@/components/CountButton";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from 'axios';

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
    const [message, setMessage] = useState("");


    const handleError = (response: any)=>{
        if(response.status === 404){
            throw {name: 'Error', message: "Page not found", status: 404};
        }else if(response.status === 403){
            throw {name: "Error", message: "Forbiden", status: 403};
        }else if(response.status === 500){
            throw {name: "Error", message: "Error server", status: 500}
        }else if(!response.ok){
            throw {name: "Error", message: `Error! status: ${response.status}`};
        }
    }

    const fetchDiamonds = async ()=>{
        const response = await fetch("/api/diamonds");
        console.log(response);
    }

    const fetchCatchAnimals = async () => {
        const response = await fetch("/api/animals/catch");
        handleError(response);
        const data = await response.json();
        return data;
    }

    const updateCountAnimal = async (animal: any) => {
        const response = await fetch(`/api/animals`, {
            method: "POST",
            body: JSON.stringify({ animal }),
            headers: { "Content-Type": "application/json" }
        });
        handleError(response);
        const data = await response.json();
        return data;
    }

    const fectAnimals = async () => {
        const response = await fetch("/api/animals");
        handleError(response);
        const data = await response.json();
        return data;
    }

    
    const checkCombination = async () => {
        const response = await fetch("/api/animals/combine");
        handleError(response);
        const data = await response.json();
        return data;      
    }

    const getAnimals = useCallback(async()=>{
        try{
            const data = await fectAnimals();
            setAnimals(data);
            setIsCombined(checkDisableCombinebtn(data));
        }catch(error: any){
            handleErrorMsg(error.message);
        }       
    }, []) 


    useEffect(()=>{
        getAnimals();
        fetchDiamonds();
    }, [])

    
    
    const handleCatch = useCallback(async()=>{
        try{
            const animal = await fetchCatchAnimals();
            const updatedAnimals = await updateCountAnimal(animal);
            setCatchAnimal(animal);
            setAnimals(updatedAnimals);
            setIsCombined(checkDisableCombinebtn(updatedAnimals));
        }catch(error: any){
            handleErrorMsg(error.message);
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

    const handleErrorMsg = (message: string)=>{
        setMessage(message);
        setTimeout(() => {
            setMessage("")
        }, 10000);
    }
      
    const handleCombine = useCallback( async()=>{
        try{
            const data: any = await checkCombination();
            setMessage(data.success ? "Congratulations! You have extracted a diamond!" : "Oops! The combination failed.");
            setIsCombinationSuccess(data.success);
            setTimeout(() => {
                setMessage("");
                setIsCombinationSuccess(false);
            }, 10000);
            getAnimals();
        }catch(error: any){
            handleErrorMsg(error.status === 403 ? "Animals cannot be combined because they have already been combined in another session!" : error.message);
        }
    }, [isCombined])
      
    
    return (
        <div className="wrapper">
            <div className="select-app">

            </div>
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
        </div>
       
    )
}

export default CatchAnimal;