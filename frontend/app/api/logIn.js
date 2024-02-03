import axios from "axios";
import { NextResponse } from "next/server";

export default async function(data){
    
    try{
        const response= await axios.post('http://localhost:8000/api/auth',data);
        return response.data.ok;
        
    }catch(err){
        return(err);
    }
    
}