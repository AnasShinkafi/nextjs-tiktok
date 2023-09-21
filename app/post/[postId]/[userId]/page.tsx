"use client"

import ClientOnly from "@/app/components/ClientOnly"
import Comments from "@/app/components/post/Comments"
import CommentsHeader from "@/app/components/post/CommentsHeader"
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"
import { useCommentStore } from "@/app/stores/comment"
import { useLikeStore } from "@/app/stores/like"
import { usePostStore } from "@/app/stores/post"
import { PostPageTypes } from "@/app/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

const PostIdPage = ({ params }: PostPageTypes) => {
  let { postById, postByUser, setPostById, setPostsByUser } = usePostStore();
  let { setLikesByPost } = useLikeStore();
  let { setCommentsByPost } = useCommentStore();

  const router = useRouter();

  useEffect(() => {
    setPostById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.userId)
  }, []);

  const loopThroughPostsUp = () => {
    postByUser.forEach(post => {
      if(post.id > params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    })
  }

  const loopThroughPostsDown = () => {
    postByUser.forEach(post => {
      if(post.id < params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    })
  }

  return (
    <>
      <div id="PostPage"
        className=" lg:flex justify-between w-full h-screen bg-black overflow-auto">
        <div className=" lg:w-[calc(100%-540px)] h-full relative">
          <Link href={`/profile/${params?.userId}`}
            className=" absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <AiOutlineClose size="27" />
          </Link>

          <div className="">
            <button
              onClick={() => loopThroughPostsUp()}
              className=" absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
              <BiChevronUp size="30" color="" />
            </button>

            <button
              onClick={() => loopThroughPostsDown()}
              className=" absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
              <BiChevronDown size="30" color="" />
            </button>
          </div>
          <img
            className=" absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" src="/images/tiktok-logo-small.png" alt="" width={45} />

          <ClientOnly>
            {postById?.video_url ? (
              <video
                className=" fixed object-cover w-full my-auto z-[0] h-screen"
                src={useCreateBucketUrl(postById?.video_url)} />
            ) : null}

            <div className=" bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
              {postById?.video_url ? (
                <video
                  autoPlay
                  controls
                  loop
                  muted
                  className="h-screen mx-auto"
                  src={useCreateBucketUrl(postById?.video_url)} />
              ) : null}
            </div>
          </ClientOnly>
        </div>

        <div id="InfoSection" className=" lg:max-w-[550px] relative w-full h-full bg-white">
          <div className=" py-7" />

          <ClientOnly>
            {postById?.video_url ? (
              <CommentsHeader post={postById} params={params} />
            ) : null}
          </ClientOnly>
          <Comments params={params} />
        </div>
      </div>
    </>
  )
}

export default PostIdPage