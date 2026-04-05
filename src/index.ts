import { createServer } from "node:http"

async function main(){
    try {
        
        const server = createServer()
        const PORT:number = 3000

        server.listen(PORT,()=>{
            console.log(`Server is running on PORT: ${PORT}`)
        })
    } catch (error) {
        console.log(`Error starting server: ${error}`)
    }
}

main()