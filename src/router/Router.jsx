import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../root/Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../root/DashBordRoot";
import MyProfile from "../Pages/userDashboardPage/UserProfile";
import AddPost from "../Pages/userDashboardPage/AddPost";
import MyPosts from "../Pages/userDashboardPage/MyPost";
import Comments from "../Pages/userDashboardPage/CommentPage";
import PostDetails from "../Pages/PostDetails";
import Private from "../private/Private";
import MembershipPage from "../Pages/Membership";
import MembershipDetails from "../Pages/Payments";
import AdminProfile from "../Pages/AdminDashboardPage/AdminProfile";
import ManageUsers from "../Pages/AdminDashboardPage/ManageUsers";
import MakeAnnouncement from "../Pages/AdminDashboardPage/MakeAnnouncement";
import ReportedComments from "../Pages/AdminDashboardPage/ReportedComments";
import AdminPrivate from "../private/AdminPrivate";
import Forbeden from "../Pages/Forbeden";
import AllPosts from "../Pages/AllPosT.JSX";
import AnnouncementPage from "../components/AnnouncementSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
     
        {
            path:'/post/:id',
            element:<PostDetails></PostDetails>
        },
        {
            path:'/membership',
            element:<Private><MembershipPage></MembershipPage></Private>
        },
        {
            path:'/payment/:id',
            element:<Private><MembershipDetails></MembershipDetails></Private>
        }
        ,
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]
  },
  {
    path:'dashboard',
    element:<Private><DashboardLayout></DashboardLayout></Private>,
    children:[
      {
        path:'/dashboard/my-profile',
        element:<Private><MyProfile></MyProfile></Private>
      },
      {
        path:'/dashboard/add-post',
        element:<Private><AddPost></AddPost></Private>
      },
      {
        path:'/dashboard/my-posts',
        element:<Private><MyPosts></MyPosts></Private>
      },
      {
        path:'/dashboard/comments/:postId',
        element:<Private><Comments></Comments></Private>
      },


      // admin panel Routes

      {
        path:'/dashboard/admin-profile',
        element:<AdminPrivate><AdminProfile></AdminProfile></AdminPrivate>
      },
      {
        path:'/dashboard/manage-users',
        element:<AdminPrivate><ManageUsers></ManageUsers></AdminPrivate>
      },
      {
        path:'/dashboard/announcement',
        element:<AdminPrivate><MakeAnnouncement></MakeAnnouncement></AdminPrivate>
      },
      {
        path:'/dashboard/reports',
        element:<AdminPrivate><ReportedComments></ReportedComments></AdminPrivate>
      }

    ]
  },
  {
    path:'*',
    element:<Forbeden></Forbeden>
  }
]);