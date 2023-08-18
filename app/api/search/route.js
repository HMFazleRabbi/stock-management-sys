import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const uri = "mongodb+srv://" + process.env.USER_NAME + ":"+ process.env.DATABASE_PASSWORD+"@free-cluster-rabbi.ur8qf93.mongodb.net/"
    let client = new MongoClient(uri)
    const query = request.nextUrl.searchParams.get('query')
    console.log("search api:", query)
    
    // Validation
    if(query=='') 
        return NextResponse.json({ success: true, products: []})

    //Search Database
    try {
        const database = client.db('stock-management-sys');
        const collection = database.collection('inventory');
        const pipeline = [
            {
              $match: {
                $or: [
                  { productName: { $regex: query , $options: 'i' } }, // Case-insensitive partial match on name
                //   { quantity: { $regex: searchText, $options: 'i' } }, // Case-insensitive partial match on quantity
                //   { price: { $regex: searchText, $options: 'i' } }, // Case-insensitive partial match on price
                ],
              },
            },
          ];

          
        //Query
        const products = await collection.aggregate(pipeline).toArray();
        return NextResponse.json({ success: true, products})

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
        const collection = db.collection('inventory');
        
        //Insert
        const product = await collection.insertOne(body)
        return NextResponse.json({success: true, product})

    } finally {
        await client.close()
    }
}


