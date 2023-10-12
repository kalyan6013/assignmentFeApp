import  React, {useEffect, useState } from "react";

const API ="http://localhost:3001/userData"
function User() {
    const [formState, setFormState] = useState(null);
    const [userState, setUserState] = useState([
        {
            name:"Hemanth",
            email:"test@gmail.com",
            mobile:"9988998899"
        }
    ]);

    const fetchUser = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            console.log("data",data)
            setUserState(data?.users || []);
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState((preState) => ({
            ...preState,
            [name]: value
        }))

    }

    const handleSubmit = async () => {
        // console.log(formState)
        // setUserState((preState)=>[...preState, formState]);

        if(!formState) return;
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            };
            const response = await fetch(API,requestOptions);
            const data = await response.json();
            setUserState((preState)=>[...preState, data.user]);
            setFormState(null)
        } catch (err) {
            console.log(err)
        }
    }

    const renderUser = (user, index) => {

        return <div key={index}>
            {index === 0 && <>
                <div className="user-header">
                    <div className="item-min-width">Name</div><div className="item-min-width">Email</div><div className="item-min-width">Mobile</div>
                </div>
            </>}
            <div className="user-items">
                <div className="item-min-width">{user.name}</div><div className="item-min-width">{user.email}</div><div className="item-min-width">{user.mobile}</div>
            </div>
        </div>
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <div className="App">
            <div className="Container">
                <h1>UsersData</h1>
                <div className="section-user-list">
                        {userState?.map((item, index) =>renderUser(item,index))}
                        {userState.length === 0 && <div>No data</div>}
                </div>
                <div className="section-user-form">
                        <label>Name: </label>
                        <input type="text" value={formState?.name || ""} name="name" onChange={handleChange}/>
                        <label>Email: </label>
                        <input type="text" value={formState?.email || ""} name="email" onChange={handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                        <label>Mobile: </label>
                        <input type="text" value={formState?.mobile || ""} name="mobile" minLength="10" maxLength="10" onChange={handleChange}/>
                        <input type="hidden" value={formState?.location || ""} name="location" onChange={handleChange} />
                        <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );

}
export default User;