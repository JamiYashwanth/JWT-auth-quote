import jwt from "jsonwebtoken";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const [quote,setQuote] = useState('');
    const [actualQuote,setActualQuote] =useState('');

    async function getQuote(){
        const req = await axios.get("http://localhost:5000/api/quote", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });
        setActualQuote(req.data.quote)
    }

    async function updateQuote(e){
        e.preventDefault();
        console.log('quote = ',quote)
        const data ={quote : quote}
        const res = await axios.post("http://localhost:5000/api/quote", data,{
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        console.log('res=',res)
        if(res.data.status === "ok"){
            setActualQuote(quote);
            setQuote('');
        }
        else{
            alert(res.err)
        }
    }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
          getQuote();
      } else {
        localStorage.removeItem("token");
        navigate('/login',{replace : true})
      }
    }
  },[]);
  return (
    <div>
      <div className="quote">
        <h1>Your quote : {actualQuote || "No quote"}</h1>
      </div>
      <input
        type="text"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <button onClick={updateQuote}>Submit</button>
    </div>
  );
}

export default Dashboard;
