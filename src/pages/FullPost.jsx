import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const {id} = useParams();

  useEffect(()=> {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch((err) => {
      console.warn(err);
      alert("Ошибка при получении статьи") 
    })
  }, [])


  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  

  
  return (
    <>
      
      
      <Post
        id={data._id}
        title={data.title}
        imageUrl= {data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={{
          avatarUrl: (data.user.avatarUrl ? [data.user.avatarUrl] : '' ),
          fullName: [data.user.fullName],
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Влад",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock> */}
    </>
  );
};
