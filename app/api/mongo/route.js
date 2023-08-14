import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(request) {
    
    const uri = "mongodb+srv://" + process.env.USER_NAME + ":"+ process.env.DATABASE_PASSWORD+"@free-cluster-rabbi.ur8qf93.mongodb.net/"
    let client = new MongoClient(uri)
    try {
        console.log("++++++++ S M S ++++++++");
        const database = client.db('stock-management-sys');
        const stocks = database.collection('stocks');
        
        //Query
        const query = {};
        console.log("--- Starting ---")
        const result = await stocks.find(query).toArray()
        console.log(result)
        return NextResponse.json({"a": 12, result})

    } finally {
        await client.close()
    }
}



