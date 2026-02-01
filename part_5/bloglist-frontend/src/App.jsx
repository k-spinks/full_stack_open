import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import LogoutButton from "./components/LogoutButton";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  const handleNotification = (message, error) => {
    setNotificationMessage(message)
    setIsError(error)
    setTimeout(() => {
        setIsError(false)
        setNotificationMessage(null)
      }, 5000)
  }

  const handleLoginSubmit = async (credentials) => {
    if (!credentials.username || !credentials.password) {
      handleNotification(`Missing username or password`, true)
      return;
    }
    try {
      const user = await loginService.login(credentials);
      if (!user) {
        handleNotification('No user found', true)
      }
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
    } catch (error) {
      handleNotification(error.response.data.error, true)
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      const createdBlog = response
      setBlogs([...blogs, createdBlog])
      handleNotification(`A blog \`${createdBlog.title} by ${createdBlog.author}\` added`, false)
      blogFormRef.current.toggleVisibility()
    }catch (error) {
      handleNotification(error.response.data.error, true)
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    handleNotification(`Log out successful`, false)
  };

  const increaseLike = async (id) => {
    console.log(id)
    try {
      const response = await blogService.increaseLike(id)
      console.log(response)
    } catch (error) {
      handleNotification(error.response.data.error, true)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} error={isError}/>
      {user ? (
        <div>
          <h1>{user.name} is logged in</h1>
          <LogoutButton handleLogout={handleLogout} />
          <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={addBlog} ref={blogFormRef}/>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} increaseLike={increaseLike} />
          ))}
        </div>
      ) : (
        <LoginForm login={handleLoginSubmit} />
      )}
    </div>
  );
};

export default App;
