import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const selectedColumns = 'post_uid,title,body,created_at,users(user_uid,name)'

const mapResponse = (supabasePost) => {
    if (!supabasePost) return undefined
    return {
        postUid: supabasePost.post_uid,
        title: supabasePost.title,
        body: supabasePost.body,
        createdAt: supabasePost.createdAt,
        author: supabasePost.users.name
    }
}

export const getPosts = () => {
    const [apiState, setApiState] = useState([[], true, undefined]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select(selectedColumns)
            setApiState([data.map(mapResponse), false, error])
        }
        fetchData()
    }, [apiState])

    return apiState;
}

export const getPost = (postUid) => {
    const [apiState, setApiState] = useState([undefined, true, undefined]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select(selectedColumns)
                .eq('post_uid', postUid)
                .single()
            setApiState([mapResponse(data), false, error])
        }
        fetchData()
    }, [apiState, postUid])

    return apiState;
}