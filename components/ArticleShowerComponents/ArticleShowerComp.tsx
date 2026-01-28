import { SingleArticleProps } from '@/lib/readux/singleArticleFetched'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/readux/store';
import NotLoggedINError from '@/components/NotLoggedInError';
import CommentComponents, { NotloggedInDialogboxShowProp } from '../CommentComponents';
import FigureImage from '@/components/FigureImage';
import LineDivider from '@/components/LineDivider';
import HeadingRender from '@/components/HeadingRender';
import MDEditorMarkdown from '@/components/MDEditorMarkdown';
import ProfileBanner from '@/components/ProfileBanner';


const ArticleShowerComp = ({ _id, blogImageUrl, featuredImagealt, content, isLiked, createdBy, likes, dislikes, isDisLiked, title, category }: SingleArticleProps) => {
  const [increaseLikes, setIncreaseLikes] = useState(likes);
  const [stateIsLiked, setStateIsLiked] = useState(false);
  // dislikes
  const [increaseDisLikes, setIncreaseDisLikes] = useState(dislikes);
  const [stateIsDisLiked, setStateIsDisLiked] = useState(false);
  const [notloggedInDialogboxShow, setNotloggedInDialogboxShow] = useState<NotloggedInDialogboxShowProp | null>(null)

  const { data } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setStateIsLiked(isLiked);
    setIncreaseLikes(likes);

    setIncreaseDisLikes(dislikes);
    setStateIsDisLiked(isDisLiked);

  }, [isLiked, dislikes, createdBy?.isFollowed]); // Runs whenever `isLiked` changes

  const likesFun = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonBox = (e.target as HTMLDivElement).getBoundingClientRect();

    if (data?._id) {

      if (stateIsLiked) {
        setStateIsLiked(false);
        setIncreaseLikes(increaseLikes - 1);
        const response = await fetch(`/api?id=likes&articleId=${_id}`);
        if (response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
        }
      } else {
        setIncreaseLikes(increaseLikes + 1);
        setStateIsLiked(true);
        const response = await fetch(`/api?id=likes&articleId=${_id}`);
        if (response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
        }
      }

    } else {
      setNotloggedInDialogboxShow({ notLoggedIn: true, buttonRectArea: buttonBox })
    }
  }

  const dislikesFun = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonBox = (e.target as HTMLDivElement).getBoundingClientRect();

    if (data?._id) {
      if (stateIsDisLiked) {
        setStateIsDisLiked(false);
        setIncreaseDisLikes(increaseDisLikes - 1);
        console.log("You reverse disliked");
        const response = await fetch(`/api?id=dislikes&articleId=${_id}`);

        if (response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
        }

      } else {
        setStateIsDisLiked(true);
        setIncreaseDisLikes(increaseDisLikes + 1);
        console.log("You did disliked");
        const response = await fetch(`/api?id=dislikes&articleId=${_id}`);

        if (response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
        }
      }

    } else {
      setNotloggedInDialogboxShow({ notLoggedIn: true, buttonRectArea: buttonBox })
    }
  }

  return (
    <section className='max-w-screen-lg mx-auto p-2'>

      <LineDivider className='my-0.5' />
      <p className='font-bold text-lg text-center'>{category?.toUpperCase()}</p>
      <LineDivider className='my-0.5' />

      {/* title shower */}
      <HeadingRender title={title} />

      {/* image shower */}
      <div className='max-w-screen-lg px-3 mx-auto'>
        <FigureImage blogImageUrl={blogImageUrl} featuredImagealt={featuredImagealt} />
      </div>

      <LineDivider className='my-2' />

      {/* banner of follow name */}
      {createdBy && <ProfileBanner _id={createdBy._id} fullname={createdBy.fullname} Followeing={createdBy.isFollowed}  username={createdBy.username} /> }
 
      {/* like and dislikes */}
      <div className='flex px-4 py-2'>
        <div className='flex gap-4'>

          <button disabled={stateIsDisLiked ? true : false} onClick={(e) => likesFun(e)} className={`like-dislike-button ${stateIsLiked ? "bg-red-700" : "bg-red-100 relative"}`}>{`Likes ${increaseLikes}`}
          </button>

          <button disabled={stateIsLiked ? true : false} onClick={(e) => dislikesFun(e)} className={` like-dislike-button ${stateIsDisLiked ? "bg-red-700" : "bg-red-100 relative"}`}>{`Dislikes ${increaseDisLikes}`}
          </button>

        </div>
      </div>

      {/* content shower */}
      <article className='py-5'>
        <MDEditorMarkdown content={content}/>
      </article>

      {/* commenting features */}
      <CommentComponents articleId={_id} />

      {/* not logged in components */}
      {notloggedInDialogboxShow?.notLoggedIn &&
        <NotLoggedINError button={notloggedInDialogboxShow} setNotloggedInDialogboxShow={setNotloggedInDialogboxShow} btnText={"Follow"} />}
    </section>
  )
}

export default ArticleShowerComp