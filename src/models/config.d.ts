export interface Config {
    
    port: number

    mongo: {
        host: string
        database: string
    }

}