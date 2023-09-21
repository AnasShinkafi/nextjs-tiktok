import { Query, database } from "@/libs/AppWriteClient"


const useGetRandomUsers = async () => {
    try {
        const profileResult = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            [
                Query.limit(5)
            ]
        )
        const documents = profileResult.documents;
        
        const objectPromises = documents.map(profile => {
            return {
                id: profile?.user_id,
                name: profile?.name,
                image: profile?.image,
            }
        })

        const result = await Promise.all(objectPromises)
        return result;
    } catch (error) {
        throw error;
    }
}

export default useGetRandomUsers