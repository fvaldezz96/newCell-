import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Tooltip } from '@mui/material'


const LoginButton = () => {

    const { loginWithRedirect } = useAuth0()

    return (
        <div>
            <Tooltip title="Login" aria-label="add">
                <button onClick={() => loginWithRedirect()} className="btn btn-success">Login</button>
            </Tooltip>
        </div >
    )


}
export default LoginButton