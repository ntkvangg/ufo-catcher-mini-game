class Helpers{
    static fetchApi = async (url: string, method?: string, body?: any, headers?: any) => {
        const response = await fetch(url, { method: method ? method : "GET", headers, body });
        if (!response.ok) {
            throw { name: "Error", message: response.statusText, status: response.status };
        }
        return response.json();
    }
    static imageAnimal = [
        "chicken",
        "duck",
        "rabbit",
        "pig",
        "sheep",
        "horse",
        "cow"
    ];

    static animals = {
        "chicken": 0,
        "duck": 0,
        "rabbit": 0,
        "pig": 0,
        "sheep": 0,
        "horse": 0,
        "cow": 0
    }
}

export default Helpers;