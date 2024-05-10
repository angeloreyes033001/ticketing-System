import axios from 'axios'
const BASE_URL = "http://localhost:3000/api";

export const GET = async(url)=>{
    try {
        const response = await axios.get(BASE_URL+url,{ withCredentials: true });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if(error instanceof TypeError){
            console.error(`Error occurred TypeError ${error.message}`)
        }
        else if(error instanceof ReferenceError){
            console.error(`Error occurred ReferenceError ${error.message}`)
        }
        else{
            console.error(`Error occurred ${error.message}`)
        }
    }
}

export const POST = async(url,data)=>{
    try {
        const response = await axios.post(BASE_URL+url,data,{ withCredentials: true })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if(error instanceof TypeError){
            console.error(`Error occurred TypeError ${error.message}`)
        }
        else if(error instanceof ReferenceError){
            console.error(`Error occurred ReferenceError ${error.message}`)
        }
        else{
            console.error(`Error occurred ${error.message}`)
        }
    }
}

export const PUT = async(url,data)=>{
    try {
        const response = await axios.put(BASE_URL+url,data,{ withCredentials: true })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if(error instanceof TypeError){
            console.error(`Error occurred TypeError ${error.message}`)
        }
        else if(error instanceof ReferenceError){
            console.error(`Error occurred ReferenceError ${error.message}`)
        }
        else{
            console.error(`Error occurred ${error.message}`)
        }
    }
}