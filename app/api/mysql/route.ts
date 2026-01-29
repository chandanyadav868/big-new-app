import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: NextRequest) {

   try {
     const db = await mysql.createConnection({
         host: process.env.DB_HOST,
         port: Number(process.env.DB_PORT),
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
     });
 
     console.log({db});

     const [rows] = await db.query("SHOW TABLES");
     
     return NextResponse.json({status:200,message:"successfully",data:rows})
   } catch (error) {
    console.log("Error:- ", error);
    return NextResponse.json({status:500,error:JSON.stringify((error as any).message)})
   }
}