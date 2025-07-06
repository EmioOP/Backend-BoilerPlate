import mongoose from "mongoose";

const MAX_RETRIES = 3;
const RETRY_INTERVEL = 5000; //5secs 

class DatabaseConnection {
    constructor() {
        this.retryCount = 0
        this.isConnected = false

        mongoose.set("strictQuery", true)

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connection successfull")
            this.isConnected = true
        })
        mongoose.connection.on("error", () => {
            console.log("MongoDB connection error")
            this.isConnected = false
        })
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected")
            this.isConnected = false

            this.handleDisconnection()
        })
    }

    async connect() {
        try {
            if (!process.env.MONGODB_URI) {
                throw new Error("Mongo db uri not defined in env")
            }

            const options = {
                maxPoolSize: 10,
                serverSelectionTimeOut: 5000,
                socketTimeoutMS: 4500,
                family: 4, //ipv4 
            }

            if (process.env.NODE_ENV === "development") {
                mongoose.set("debug", true) // for more debug options
            }

            await mongoose.connect(process.env.MONGODB_URI, options); // connecting to database

            this.retryCount = 0; //reset retry count on success
        } catch (error) {
            console.error(error.message)
            await this.handleConnectionError()
        }
    }

    async handleConnectionError() {
        if (this.retryCount <= MAX_RETRIES) {
            console.log("Retrieng Connection... Attempt No.", this.retryCount, "Of", this.MAX_RETRIES)
            await new Promise(resolve => setTimeout(() => {
                resolve
            }, RETRY_INTERVEL))
            return this.connect()
        } else {
            console.error("Failed to connect to mongodb after", MAX_RETRIES, "Attempts")
            process.exit(1)
        }


    }

    async handleDisconnection(){
        if(!this.isConnected){
            console.log("Attempting Reconnection...")
            this.connect()
        }
    }

    async handleAppTermination(){
        try {
            await mongoose.connection.close()
            console.log('Mongodb connection closed throgh app termination')
            process.exit(1)
        } catch (error) {
            console.error('error during database disconnection')
            process.exit(1)
        }
    }

    getConnectionStatus(){
        return {
            isConnected:this.isConnected,
            readyState:mongoose.connection.readyState,
            host:mongoose.connection.host,
            name:mongoose.connection.name,
        }
    }

}

//create singleton instance

const dbConnection = new DatabaseConnection()

export default dbConnection.connect.bind(dbConnection)
export const getDbStatus = dbConnection.getConnectionStatus.bind(dbConnection)