import axios from "axios";
import { NextResponse } from "next/server";

export default async function logIn(data: any){
    
    try{
        const response= await axios.post('http://localhost:8000/api/auth?type=r',data);
        return response.data.ok;
        
    }catch(err){
        return(err);
    }
    
}