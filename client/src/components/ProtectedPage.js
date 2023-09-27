import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'

function ProtectedPage({ children }) {
    const [currentUSer, serCurrentUser] = useState(null);
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                message.success(response.message)
                serCurrentUser(response.data);
            }
            else {
                throw new Error(response.message)
            }

        } catch (error) {
            message.error(error.message)
        }
    };


    useEffect(() => {
        getCurrentUser();
    }, []);


    return (<div>
        {currentUSer && <h1>Welcome {currentUSer?.name}</h1>}
        {children}
    </div>
    );

}

export default ProtectedPage;