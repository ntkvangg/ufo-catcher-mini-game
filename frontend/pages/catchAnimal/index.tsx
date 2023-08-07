import Animal from "@/components/Animal";
import CatchButton from "@/components/CatchButton";
import CombineButton from "@/components/CombineButton";
import CountButton from "@/components/CountButton";
import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

const imageAnimal = [
    "chicken",
    "duck",
    "rabbit",
    "pig",
    "sheep",
    "horse",
    "cow"
];

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
    const [catchAnimal, setCatchAnimal] = useState("empty");
    const [isCombined, setIsCombined] = useState(true);
    const [message, setMessage] = useState("");
    const [totalDiamond, setTotalDiamond] = useState(0); 
    const [toggle, setToggle] = useState(false);
    const [timeTest, setTimeTest] = useState(1000);
    const [countPercentAnimals, setCountPercentAnimals] = useState<any>(animalCounts);
    const [isAnimationCatching, setIsAnimationCatching] = useState(false);


    const fetchApi = async (url: string, method?: string, body?: any, headers?: any) => {
        const response = await fetch(url, {method: method ? method : "GET", headers, body});
        if(!response.ok){
            throw {name: "Error", message: response.statusText, status: response.status};
        }
        return response.json();
    }

    const getDiamonds = async ()=>{
        try{
            const data = await fetchApi("/api/animals/diamonds");
            setTotalDiamond(data.total);
        }catch(error: any){
            handleErrorMsg(error.message);
        }
    }

    const getAnimals = async () => {
        try{
            const data = await fetchApi("/api/animals");
            setAnimals(data);
            setIsCombined(checkDisableCombinebtn(data));
        }catch(error: any){
            handleErrorMsg(error.message);
        }
    }


    useEffect(()=>{
        getAnimals();
        getDiamonds();
    }, [])

    
    
    const handleCatch = useCallback(async()=>{
        try{
            const animal = await fetchApi("/api/animals/catch");
            const updatedAnimals = await fetchApi(`/api/animals`, "POST", JSON.stringify({ animal }), { "Content-Type": "application/json" });
            setCatchAnimal(animal);
            setAnimals(updatedAnimals);
            setIsCombined(checkDisableCombinebtn(updatedAnimals));
            setIsAnimationCatching(true);
            setTimeout(() => {
                setIsAnimationCatching(false);
            }, 1000)
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
            const data = await fetchApi("/api/animals/combine");
            handleErrorMsg(data.success ? "Congratulations! You have extracted a diamond!" : "Oops! The combination failed.");
            if(data.success){
                getDiamonds();
            }
            getAnimals();
        }catch(error: any){
            getAnimals();
            handleErrorMsg(error.status === 403 ? "Animals cannot be combined because they have already been combined in another session!" : error.message);
        }
    }, [isCombined])

    const getRandomAnimal = ()=> {  
        const animals = [
            "chicken", "chicken", "chicken",
            "duck", "duck", "duck",
            "rabbit", "rabbit", "rabbit",
            "pig", "pig",
            "sheep", "sheep",
            "horse",
            "cow",
            "empty", "empty", "empty", "empty", "empty"
        ];
        const randomAnimalIndex = Math.floor(Math.random() * animals.length);
        return animals[randomAnimalIndex];
    }
      

    const proveWeightedRandomGenerator = ()=> {
        const countAnimal: any = {}
        const countPercentAnimal: any = {}
        const timeCatching = parseInt(timeTest.toString());
        for (let i = 0; i < timeCatching; i++) {
            const animal = getRandomAnimal();
            if (countAnimal[animal]) {
                countAnimal[animal] = countAnimal[animal] + 1;
            }else{
                countAnimal[animal] = 1;
            }
        }
        for (const key in countAnimal) {
            if(key !== 'empty'){
                countPercentAnimal[key] = (countAnimal[key] / timeCatching * 100).toFixed(2);
            }else{
                countPercentAnimal[key] = (countAnimal[key] / timeCatching  * 100).toFixed(2);
            }   
        }
        setAnimals(countAnimal);
        setCountPercentAnimals(countPercentAnimal);
    }

    const totalSuccessCatching: any = useMemo(()=>{
        const animalTempt = {...animals};
        delete animalTempt.empty;
        return Object.values(animalTempt).reduce((sum: any, count: any) => {
            if(count){
                sum = sum + count
            }
            return sum;
        }, 0);
    }, [animals]);


    const totalSuccessPercentCatching: any = useMemo(()=>{
        const animalTempt = {...countPercentAnimals};
        delete animalTempt.empty;
        return Object.values(animalTempt).reduce((sum: any, count: any) => {
            if(count){
                sum = sum + parseFloat(count)
            }
            return sum;
        }, 0);
    }, [countPercentAnimals]);

    const handleToggleApp = ()=>{   
        setToggle(!toggle);
        if(!toggle){
            setAnimals(animalCounts);
            setCountPercentAnimals(animalCounts);
        }else{
            getAnimals();
            getDiamonds();
        }
        
    }      
      
    
    return (
        <div className="wrapper">
            <div className="select-app">
                <button className="button button-toggle" onClick={handleToggleApp}>{toggle ? 'Play gane' : 'Testing'}</button>
            </div>
            <div className="mini-game-content text-center">
                <div className={`card-image ${isAnimationCatching ? 'highlight' : ''}`}>
                    {   !toggle ?
                            catchAnimal !== 'empty'? 
                                <Animal type={catchAnimal} width={200} height={150}/>
                            :
                                <Image src="/images/question.svg" alt="Catch animal" style={{maxWidth: '100%'}} width={150} height={150}/>
                        :
                        <div className="card-testing">
                            <p className="text-dark">Weighted Random Animal Generation Testing Tool</p>
                            <div className="form-catch">
                                <label className="text-label-time-catching text-dark">Times to catch</label>
                                <div>
                                    <input className="input-testing" type="text" value={timeTest} onChange={(e: any)=> setTimeTest(e.target.value)}/>
                                </div>
                                <button className="button mt-1" onClick={proveWeightedRandomGenerator} disabled={isNaN(timeTest) || !timeTest || timeTest < 100}>
                                    <Image src="/images/play.svg" alt="Play Button" width={30} height={30}/>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                {!toggle && <CatchButton onClick={handleCatch} />}
                <div className="wrapper-list-animal mt-10">
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
                    {
                        toggle && <div className="count-percent">
                            {imageAnimal.map((animal, index) => (
                                <span className="text-percent" key={index}>{countPercentAnimals[animal]+ '%'}</span>
                            ))}
                        </div>
                    }
                    
                </div>
                {!toggle ? 
                    <>
                        <CombineButton onClick={handleCombine} isDisabled={isCombined}/>
                        <div className="result mt-10">
                            {totalDiamond > 0 ? 
                                <div className="total-diamond">
                                    <p className="text-dark">x {totalDiamond}</p><Image src="/images/diamond.png" alt="Diamond" width={60} height={60} className="combining"/>
                                </div>
                                :
                                <Image width={40} height={40} src="/images/question.svg" alt="question"/>
                            }
                            {message && <p className="text-dark">{message}</p>}
                        </div> 
                    </>: <div className="total-catching">
                        <p className="text-dark">Success: {totalSuccessCatching} ~ {totalSuccessPercentCatching} %</p>
                        <p className="text-dark">Failed: {animals.empty} ~ {countPercentAnimals.empty} %</p>
                        </div>}
            </div>
        </div>
       
    )
}

export default CatchAnimal;