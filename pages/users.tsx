import type { NextPage } from "next"
import type { Collection } from "mongodb"

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import { Database } from "@app/mongo"



const Users: NextPage = (users: any) => {
    
    const Users = users.users

    return (
        <div>
            {Users.map((user: any) => (
                <p>{user.name}</p>
            ))}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const Users = await Database('users')

    const users = await Users.find({}).toArray()

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}



export default Users