import mongoose, { mongo } from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbconnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Alr connected to database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "",{})
        console.log(db)
        connection.isConnected = db.connections[0].readyState
        console.log(db.connections)
        console.log("Connected to database")
        
    } catch (error) {
        console.log("Database connection failed" , error)
        process.exit(1)
        
    }

}

export default dbconnect;