import { createContext, useEffect, useState } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    username: '',
    updateUsername: () => { },
    email: '',
    updateEmail: () => { },
    // carTypes: [],
    // addCarType: () => { },
    deleteFund: () => { },
    changeFundStatus: () => { },
    // updateCarTypes: () => { },
    funds: [],
    updateFunds: () => { },
    // steeringWheelSides: [],
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [email, setEmail] = useState(initialContext.email);
    // const [carTypes, setCarTypes] = useState(initialContext.carTypes);
    const [funds, setFunds] = useState(initialContext.funds);
    // const [steeringWheelSides, setSteeringWheelSides] = useState(initialContext.steeringWheelSides);

    // console.log(funds);

    // User busena: role, email, ....
    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);

    // Pradinis automobiliu tipu masyvas
    // useEffect(() => {
    //     fetch('http://localhost:3001/api/car-types', {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status === 'ok' && data.list) {
    //                 setCarTypes(data.list.map(t => t.title));
    //             }
    //         })
    //         .catch(console.error);
    // }, []);

    // Pradinis vairo poziciju masyvas
    // useEffect(() => {
    //     fetch('http://localhost:3001/api/data/steering-wheel-sides', {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status === 'ok' && data.list) {
    //                 setSteeringWheelSides(data.list.map(t => t.side));
    //             }
    //         })
    //         .catch(console.error);
    // }, []);

    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'user'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateUsername(username) {
        setUsername(username);
    }

    function updateEmail(email) {
        setEmail(email);
    }

    // function updateCarTypes(carTypes) {
    //     setCarTypes(carTypes);
    // }

    // function addCarType(carType) {
    //     setCarTypes(pre => [...pre, carType]);
    // }

    function deleteFund(fund) {
        setFunds(pre => pre.filter(title => title !== fund));
    }

    function changeFundStatus(fundId, newStatus) {
        setFunds(pre => pre.map(fund =>
            fund.id === fundId ? { ...fund, is_blocked_fund: newStatus } : fund
        ));
        console.log(funds);
    }

    function updateFunds(funds) {
        setFunds(funds);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        username,
        updateUsername,
        email,
        updateEmail,
        // carTypes,
        // addCarType,
        deleteFund,
        // changeCarType,
        // updateCarTypes,
        funds,
        updateFunds,
        changeFundStatus,
        // steeringWheelSides,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};