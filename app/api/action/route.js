import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'


export async function POST(request) {
    let {action, productName, initialQuantity} = await request.json()
    console.log(action, productName, initialQuantity)
    const uri = "mongodb+srv://" + process.env.USER_NAME + ":"+ process.env.DATABASE_PASSWORD+"@free-cluster-rabbi.ur8qf93.mongodb.net/"
    let client = new MongoClient(uri)
    try {
        console.log("++++++++ Action Post ++++++++");
        const database = client.db('stock-management-sys');
        const inventory = database.collection('inventory');
        
        // Plus/Minus
        let newQuantity = action=="plus" ? (parseInt(initialQuantity) + 1) : (parseInt(initialQuantity) - 1);

        // Filter
        const filter = {'productName': productName}
        const updatedDoc = {
            $set: { quantity:  newQuantity}
        }

        // Update Collection
        await inventory.updateOne(filter, updatedDoc)
        console.log(await inventory.findOne(filter))
        return NextResponse.json({success: true})

    } finally {
        await client.close()
    }


}


