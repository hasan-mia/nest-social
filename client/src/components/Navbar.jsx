import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiHomeHeart } from "react-icons/bi";
import { BsFacebook, BsSearch } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userImag from "../assets/userImg.png";
import authApi from "../store/api/authApi";
import notificationApi from "../store/api/notificationApi";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {notifications} = useSelector(state=>state.notification)
  const dispatch = useDispatch();

  // handle logout
  const handleLogout =(e)=>{
    e.preventDefault();
    Cookies.remove('token');
    window.location.reload()
  }

  useEffect(() => {
    if (!userInfo) {
      dispatch(authApi.userInfo());
    }
  }, [userInfo, dispatch]);

  useEffect(()=>{
    if (notifications.length === 0) {
      dispatch(notificationApi.getNotification())
    }
  },[notifications, dispatch])

  return (
    <header className="pb-2">
      <div className="w-full navbar justify-between bg-base-100 border border-b-2 border-gray-100">
        <div className="navbar-start flex-1 gap-2">
          <BsFacebook className="text-3xl lg:text-4xl text-blue-600" />
          <div className="bg-main py-2 px-4 relative rounded sm-none">
            <input
              type="text"
              placeholder="Search here.."
              className="p-2 border bg-gray-200 border-gray-100 rounded-3xl w-full px-2 lg:px-8 outline-none"
            />
            <p>
              <BsSearch
                size={18}
                className="text-color z-10 absolute end-5 top-5 mx-2"
              />
            </p>
          </div>
          <BsSearch className="text-3xl lg:text-4xl bg-gray-200 rounded-full p-2 active:text-blue-600 lg:hidden" />
          <label for="my-drawer" className="lg:hidden">
            <AiOutlineMenu className="text-3xl cursor-pointer" />
          </label>
        </div>

        <div className="navbar-center flex justify-center sm-none">
          <Link to="/" className="text-xl text-gray-600">
            <BiHomeHeart size={32} />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <MdOutlineNotificationsActive size={28} />
                  <span className="badge badge-sm indicator-item">{notifications.length}</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  {
                    notifications?.map(notification=><Link key={Math.random()} to="/" className="font-semibold text-md">
                    {notification.notificationType === 'new_reply' ? 'You have a new comment reply' : notification.notificationType === "new_comment" ? 'You have new post comment' : null }
                  </Link>)
                  }
                  
                  <hr />
                  <div className="card-actions">
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-blue-500 hover:text-white btn-block border"
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={userImag} alt="user" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content my-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="my-1">
                  <Link to="/profile" className="flex text-center border py-1 px-2 text-lg">
                    Profile
                  </Link>
                </li>

                <li className="my-1 text-center">
                  {
                    !userInfo ? (<Link to="/auth" className="flex text-center border py-1 px-2 text-lg">Signin</Link>) :( <button type="button"  className="flex text-center border py-1 px-2 text-lg" onClick={handleLogout}>Signout</button>)
                  }
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
