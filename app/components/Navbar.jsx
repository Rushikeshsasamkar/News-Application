import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { auth, db } from '../firebaseconfig/index';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LOGIN, LOGOUT, SET_USER_INFO } from '../store/reducers/UserReducer';

const Navbar = () => {
    // We will use this to update redux states
    const dispatch = useDispatch();
    // Getting user data from redux state
    const userData = useSelector((state) => state.user);
    // Importing this from firebase/auth
    const provider = new GoogleAuthProvider();

    // Func to update the Firestore database
    const fetchData = async (email, displayName) => {
        // Fetching document from db where email field has the email of the logged-in user
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // If such document exists with the logged-in user's information, then update redux state
            dispatch(SET_USER_INFO(docSnap.data()));
            // Toast notification
            toast.success(`Welcome Back, ${displayName.split(' ')[0]}!`);
        } else {
            try {
                // Add a new document in the collection "users"
                await setDoc(doc(db, 'users', email), {
                    name: displayName,
                    email: email,
                });
                // Updating redux state
                dispatch(
                    SET_USER_INFO({
                        name: displayName,
                        email: email,
                    })
                );
                // Toast notification
                toast.success(`Welcome Back, ${displayName.split(' ')[0]}!`);
            } catch (e) {
                console.log(e);
                // Toast notification
                toast.error('Error: Something Went Wrong!');
            }
        }
    };

    // Func to login to the app
    const signIn = () => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        signInWithPopup(auth, provider)
            .then((result) => {
                // Returns the user information after successful login along with token
                const { user } = result;
                // Destructure the following from returned information
                const { email, displayName, photoURL } = user;
                // Save this information to redux state
                dispatch(
                    LOGIN({
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                // Calling below func to update the Firestore database
                fetchData(email, displayName);
            })
            .catch((error) => {
                // Handle Errors here.
                console.log('Error ===> ', error);
                toast.error('Error: Something Went Wrong!');
            });
    };

    // Func to logout
    const logout = () => {
        dispatch(LOGOUT());
        // Toast notification
        toast.success(`See you again, ${userData?.user?.displayName?.split(' ')[0]}!`);
    };

    return (
        <div className="flex justify-between items-center mt-0 bg-green-500 shadow-2xl w-full px-6 py-4">
            <h1 className="text-lg font-extrabold italic text-white">Latest News</h1>
            {!userData?.isAuth ? (
                <button onClick={signIn} className="px-4 py-1 rounded-md shadow-lg bg-slate-100 text-xs md:text-sm">
                    Login
                </button>
            ) : (
                <div className="flex items-center">
                    <Image
                        src={userData?.user?.photoURL || '/default-profile-image.jpg'}
                        alt="dp"
                        width={30}
                        height={30}
                        className="rounded-full mr-2"
                    />
                    <button onClick={logout} className="px-4 py-1 text-white rounded-md shadow-lg bg-red-500 text-xs md:text-sm">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
