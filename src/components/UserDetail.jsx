import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFirst } from '../context/FirstContext'

const UserDetail = () => {
    const { userById, getUserById } = useFirst()
    const { id } = useParams()
    useEffect(() => {
        getUserById(id)
        console.log(userById)
    }, [id])
    if (!userById) return null
    return (
        <div>
            <span>name:{userById.username}</span>

        </div>
    )
}

export default UserDetail
