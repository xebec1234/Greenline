import { authOption } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const Hero = async () => {
    const session = await getServerSession(authOption);
    if(session?.user) {
        return <div className="bg-[#efece1]">successfully Login</div>;
    } 
    return (
        <div className="bg-[#efece1]">please Login</div>
    )
}

export default Hero