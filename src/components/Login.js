import React from 'react'
import { useEffect, useState     } from 'react';
import './style.css';
import {collection, getDocs, limit, addDoc, doc, setDoc} from 'firebase/firestore'
import { db, auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'


export const Login = () => {

    const navigate = useNavigate();


    const usercollectionref = collection(db, 'users')


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        
        signUpButton.addEventListener('click', () => {
          container.classList.add("right-panel-active");
        });
        
        signInButton.addEventListener('click', () => {
          container.classList.remove("right-panel-active");
        });
        }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            
            navigate("/home", { state: { uid: user.uid, name: name } }); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });

    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // userCredential.user contains the user information
                const user = userCredential.user;

                setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email:email,
                    password:password
                });

                console.log("Registered", user.uid)

                navigate("/home", { state: { uid: user.uid, name: name } }); 
            })

            
        }catch(e){
            alert(e);
        }
        


          
          
          // Clear the form after successful registration
          setName('');
          setEmail('');
          setPassword('');

      };


  return (
    <div className='login'>

    <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUp}>
                <h2>Create Account</h2>
                
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Sign Up</button>
                </form>
            </div>



            <div className="form-container sign-in-container">
                <form onSubmit={handleSignIn}>
                <h2>Sign in</h2>
                <div className="social-container">
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us please login with your info</p>
                    <button className="ghost" id="signIn">Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h2>Make a new account</h2>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp">Sign Up</button>
                </div>
                </div>
            </div>
        </div>


    </div>
  )
}
