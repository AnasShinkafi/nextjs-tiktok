"use client"

import { ShowErrorObject } from "@/app/types";
import { useState } from "react"
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";

const Login = () => {
    let { setIsLoginOpen } = useGeneralStore();
    const contextUser = useUser()

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | "">("");
    const [password, setPassword] = useState<string | "">("");
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
    }

    const validate = () => {
        setError(null)
        let isError = false

        if (!email) {
            setError({ type: 'email', message: 'An Email is required' })
            isError = true
        } if (!password) {
            setError({ type: 'password', message: 'A Password is required' })
            isError = true
        }
        return isError
    }

    const login = async () => {
        let isError = validate()
        if(isError) return;
        if(!contextUser) return;

        try {
            setLoading(true);
            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginOpen(false);
        } catch (error) {
            setLoading(false);
            alert(error);
        }
     }

    return (
        <>
            <div className="">
                <h1 className=" text-center text-[28px] mb-4 font-bold">Log in</h1>

                <div className=" px-6 pb-2">
                    <TextInput
                        string={email}
                        placeholder="Email address"
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                </div>

                <div className=" px-6 pb-2">
                    <TextInput
                        string={password}
                        placeholder="Password"
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>

                <div className=" px-6 mt-6 pb-2">
                    <button
                        disabled={loading}
                        onClick={() => login()}
                        className={`flex py-4 items-center justify-center w-full text-[17px] font-semibold text-white ${(!email || !password) ? 'bg-gray-200' : "bg-[#F02C56]"}`}>
                        {loading ? <BiLoaderCircle size="25" className="animate-spin" color="#ffffff" /> : "Log in"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login