import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllPostsThunk, getAllUsersThunk } from "../../apis/postThunk";
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import FeedHeader from '../components/FeedHeader'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'
import RightSidebar from '../components/RightSlidebar'
export default function HomePage() {

  const dispatch = useDispatch()
  const {allPost } = useSelector((store)=> store.postSlice)

  useEffect(()=>{
      dispatch(getAllUsersThunk())
      dispatch(getAllPostsThunk()) 
  },[])


  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171717]">
      <Navbar />

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-[220px_minmax(0,650px)_290px] lg:px-8">
        <Sidebar />

        <section className="min-w-0">
          <FeedHeader />
          <CreatePost />


          {allPost?.map((post)=>{
            return <Post post={post} />
          })}
        
        </section>

        <RightSidebar />
      </div>

    </main>
  );
}