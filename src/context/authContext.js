import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        access: null,
        token: ""
    });
    let data = null;


    // default axios  
    // axios.defaults.headers.common['Authorization'] = "Bearer " + auth?.token;
    // axios.defaults.headers.common['Authorization'] = "Bearer " + "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbWFuQGdtYWlsLmNvbSIsImlhdCI6MTcxMTAwNTQ4MywiZXhwIjoxNzExMDkxODgzfQ.7IOox4A9L9FjL_iwit0Tmidk4lT7bSipdXAhf6rybRMma1BFflDhsNYoOS4E64lj";




    useEffect(() => {
        const data = localStorage.getItem('authUser');
        if (data) {
            const parseData = JSON.parse(data);
            const userData = decodeToken(parseData.token);
            setAuth({
                ...auth,
                user: userData,
                access: parseData?.menuAccess?.[0],
                token: parseData?.token,
            })
        }
        // data = null;

        // eslint-disable-next-line
    }, [data])


    const decodeToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            let data = { email: decodedToken.Email, fatherName: decodedToken.FatherName, grandFatherName: decodedToken.GrandFatherName, photoPath: decodedToken.photoPath, userName: decodedToken.UserName, role: decodedToken.Role }

            return data;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    }

    return (
        <AuthContext.Provider value={[auth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }









// import { useState, useEffect, useContext, createContext } from "react";
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         user: null,
//         access: null,
//         token: ""
//     });

//     // Set axios default headers when auth changes
//     useEffect(() => {
//         axios.defaults.headers.common['Authorization'] = auth.token;
//     }, [auth.token]);

//     useEffect(() => {
//         // Function to decode token
//         const decodeToken = (token) => {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 return {
//                     email: decodedToken.Email,
//                     fatherName: decodedToken.FatherName,
//                     grandFatherName: decodedToken.GrandFatherName,
//                     photoPath: decodedToken.photoPath,
//                     userName: decodedToken.UserName,
//                     role: decodedToken.Role
//                 };
//             } catch (error) {
//                 console.error('Error decoding JWT token:', error);
//                 return null;
//             }
//         };

//         // Check local storage for auth data on initial load
//         const data = localStorage.getItem('authUser');
//         if (data) {
//             const parseData = JSON.parse(data);
//             const userData = decodeToken(parseData.token);
//             if (userData) {
//                 setAuth({
//                     ...auth,
//                     user: userData,
//                     access: parseData.menuAccess[0],
//                     token: parseData.token,
//                 });
//             }
//         }
//     }, []); // Only run once on initial render

//     return (
//         <AuthContext.Provider value={auth}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };

