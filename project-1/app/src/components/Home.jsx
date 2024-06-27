import axios from "axios";

const Home = () => {
  const handleCheckAuth = () =>{
    axios.get('http://localhost:8081/checkAuth', {
      headers:{
        'access-token': localStorage.getItem("token")
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return <div>
    <h1>Home</h1>
    <button onClick={handleCheckAuth} className="btn btn-primary">CheckAuth</button>
  </div>;
};

export default Home;
