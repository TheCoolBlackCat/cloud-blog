const posts = [
    {
        postUid: '3585a829-5e04-43bd-ae3a-ff23c79ac34c',
        title: 'My Awesome Post',
        body: 'This is a post about how awesome it is to write a blog post!',
        createdAt: '2025-04-20T17:30:00.000Z',
        author: 'Steve Jobs'
    },
    {
        postUid: 'adbd7d36-6b54-4a46-8b42-1c5b29d2e96e',
        title: 'Hello World!',
        body: 'Hey there! I\'m .',
        createdAt: '2025-04-25T06:30:00.000Z',
        author: 'Bill Gates'
    },
    {
        postUid: '4e119f8e-f46d-4cd6-9f68-627801364600',
        title: 'My Second Post',
        body: 'Writing another post, this time about how cool that first post was.',
        createdAt: '2025-04-30T20:10:00.000Z',
        author: 'Steve Jobs'
    }
]

export const getPosts = () => {
    // [res, isLoading, error]
    return [posts, false, undefined];
}

export const getPost = (postUid) => {
    const maybePost = posts.find(post => post.postUid === postUid)
    return [maybePost, false, undefined]
}