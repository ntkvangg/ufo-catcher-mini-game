import Animal from "@/components/Animal";
import CatchButton from "@/components/CatchButton";
import CombineButton from "@/components/CombineButton";
import CountButton from "@/components/CountButton";
import Diamond from "@/components/Diamond";
import { useEffect, useState } from "react";
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
    const [catchAnimal, setCatchAnimal] = useState("");
    const [isCombined, setIsCombined] = useState(true);
    const [isCombinationSuccess, setIsCombinationSuccess] = useState(false);
    const [animals, setAnimals] = useState<any>({});
    const [isShowMsg, setIsShowMsg] = useState(false);
    console.log(animals);

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
    };

    const getAnimals = async () => {
        const data = await fectAnimals();
        setAnimals(data);
        setIsCombined(checkDisableCombinebtn(data));
    };


    useEffect(()=>{
        getAnimals();
    }, [])

    
    
    const handleCatch = async() => {
        const animal = await fetchCatchAnimals();
        const updatedAnimals = await updateCountAnimal(animal);
        setCatchAnimal(animal);
        setAnimals(updatedAnimals);
        setIsCombined(checkDisableCombinebtn(updatedAnimals));
      };

      const checkDisableCombinebtn = (animals: any)=>{
        const totalCaughtAnimals: any = Object.values(animals).reduce((sum: any, count: any) => {
            if(count){
                sum = sum + 1
            }
            return sum;
        }, 0);
        return totalCaughtAnimals < 7
      }
      

      const handleCombine = async() => {
        const data = await checkCombination();
        setIsCombinationSuccess(data.success);
        setIsShowMsg(true);
        setTimeout(() => {
            setIsShowMsg(false);
        }, 3000);
        getAnimals();
      };
      
    
    return (
        
        <div className="mini-game text-center">
            <div className="card-image">
                {
                    catchAnimal ? 
                        <Animal type={catchAnimal} width={200} height={150}/>
                    :
                        <Image src="/images/question.svg" alt="Catch animal" width={50} height={50}/>
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
                    {isShowMsg && <p>Congratulations! You have extracted a diamond!</p>}
                </div>
                :
                <div>
                    <Image width={40} height={40} src="/images/question.svg" alt="question"/>
                    {isShowMsg && <p>Oops! The combination failed.</p>}
                </div>
                
                }
            </div>
            
        </div>
       
    )
}

export default CatchAnimal;