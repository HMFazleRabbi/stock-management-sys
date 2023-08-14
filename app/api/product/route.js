import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const uri = "mongodb+srv://" + process.env.USER_NAME + ":"+ process.env.DATABASE_PASSWORD+"@free-cluster-rabbi.ur8qf93.mongodb.net/"
    let client = new MongoClient(uri)
    try {
        console.log("++++++++ Product GET ++++++++");
        const database = client.db('stock-management-sys');
        const inventory = database.collection('inventory');
        
        //Query
        const query = {};
        console.log("--- inventory ---")
        const result = await inventory.find(query).toArray()
        return NextResponse.json({ result})

    } finally {
        await client.close()
    }
}

export async function POST(request) {
    let body = await request.json()
    const uri = "mongodb+srv://" + process.env.USER_NAME + ":"+ process.env.DATABASE_PASSWORD+"@free-cluster-rabbi.ur8qf93.mongodb.net/"
    let client = new MongoClient(uri)
    try {
        // console.log("++++++++ Product Post ++++++++");
        const database = client.db('stock-management-sys');
        const inventory = database.collection('inventory');
        
        //Insert
        const result = await inventory.insertOne(body)
        return NextResponse.json({ result, "ok": true})

    } finally {
        await client.close()
    }
}


