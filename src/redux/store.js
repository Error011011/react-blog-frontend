import {configureStore} from '@reduxjs/toolkit';

import { postsReducer } from '../slices/posts.slice';
import { authReducer } from '../slices/auth.slice';



const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    }
})

export default store;