import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../slices/posts.slice';



export const Home =  () => {

  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.posts)

  const userData =  useSelector(state => state.auth.data)
  const isPostsLoading = posts.status === 'loading'

  useEffect(()=> {
    dispatch(fetchPosts())
    
  }, [])


  return (
    <>
      {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs> */}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
            <Post key={index} isLoading={true}/>
            
          ) : (
            <Post
              _id={obj._id}
              title={obj.title}
              imageUrl= { obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
              user={{
                avatarUrl: (obj.user.avatarUrl ? [obj.user.avatarUrl] : ''),
                fullName: [obj.user.fullName],
              }}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={ userData?. _id === obj.user._id}
            />
          ))}
        </Grid>
        {/* <Grid xs={4} item>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
