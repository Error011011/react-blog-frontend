import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'

export const fetchPosts = createAsyncThunk('./posts/fetchPosts', async () => {
 const {data} = await axios.get('/posts')
 return data
})

export const fetchRemovePost = createAsyncThunk('./posts/fetchRemovePost', (id => {
    axios.delete(`/posts/${id}`)
   })
)




const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: {
            items: [],
            status: "loading",
            
        }
    }
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loaded'
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj.id !== action.meta.arg)
            state.posts.status = 'loading'
        },
        [fetchRemovePost.fulfilled]: (state) => {
            state.posts.status = 'loaded'
        },
        
    }
})

export const postsReducer = postsSlice.reducer