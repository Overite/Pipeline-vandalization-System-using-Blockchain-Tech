"use client";

import Eye from "@/components/icons/eye"
import Correct from "@/components/icons/correct";
import { useState } from "react"
import { useRouter } from "next/navigation";
import ATPVDMS_Logo from "@/components/icons/atpvdms_logo";
import { images } from "@/constants/images";
import { useSignupMutation } from "@/state/slices/auth";
import Spinner from "@/components/icons/spinner";
import { show_tooltip } from "@/components/layout/tooltip";
images

export default function Singup() {
    const router = useRouter();
    const [signup, { isLoading }] = useSignupMutation()

    const [form_data, set_form_data] = useState({
        email: '',
        password: '',
        full_name: ''
    })

    const [email_valid, set_email_valid] = useState(false);
    const [password_visible, set_password_visible] = useState(false);
    const [fields_blank, set_fields_blank] = useState(true);

    const validate_email = () => {
        if (email === '' || !email.includes('@')) set_email_valid(false);
        if (email !== '' && email.includes('@')) set_email_valid(true);
    }

    const validate_fields = () => {
        if (email !== '' && password !== '') set_fields_blank(false)
        else set_fields_blank(true);
    }

    const on_change = (event) => {
        event.preventDefault();

        set_form_data(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const commit_signup = async () => {
        validate_fields();

        const res = await signup(form_data);
        const { error, data } = res;
        if (error) {
            const { msg, code } = error.data;
            show_tooltip({ code, msg })
        }
        if (data) {
            const { msg, code } = data;
            show_tooltip({ code, msg })
            if (code == 201 || code == '201') router.replace('/login');
        }
    }

    const { email, password, full_name } = form_data;

    return (
        <>
            {/* Mobile */}
            <div className="md:hidden lg:hidden w-full h-[100vh] flex flex-col items-center justify-between bg-white">
                <h1 className="text-[#131212] text-left w-[85%] text-[2rem] font-[700] mt-[1rem]">Sign Up</h1>

                <form className="w-[85%] mb-[2rem] flex flex-col gap-[80px]">
                    <div className="w-full flex flex-col gap-[24px]">
                        <div className={`relative w-full`}>
                            <input onChange={on_change} onInput={() => { validate_email(); validate_fields() }} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[50px]" type="email" name="email" placeholder="Email Address" />
                            {email_valid && <span className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                <Correct />
                            </span>}
                        </div>

                        <div className={`relative w-full`}>
                            <input onChange={on_change} onInput={() => validate_fields()} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[50px]" type={password_visible ? 'text' : 'password'} name="password" placeholder="Password" />
                            {password !== '' && <span onClick={() => set_password_visible(prev => !prev)} className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                <Eye />
                            </span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[24px]">
                        <button onClick={() => signup()} className={`flex items-center justify-center w-full h-[48px] py-[8px] px-[24px] text-white ${fields_blank ? 'bg-[rgba(19, 18, 18, 0.20)] bg-gray-200' : 'bg-[#800E80]'} rounded-[4px] text-[16px] font-[700]`} type="button" disabled={fields_blank}>{`${fields_blank ? 'Sign Up' : 'Continue'}`}</button>

                        <p className="text-center text-[rgba(19, 18, 18, 0.60)] text-[16px] font-[400]">
                            Already have an account? <a className="font-[700] text-[#800E80]" href="">Login</a>
                        </p>
                    </div>

                </form>
            </div>
            {/* Mobile */}

            {/* Desktop Tablet */}
            <div className="max-sm:hidden bg-transparent w-full h-[100vh] relative flex items-center justify-center">
                <div className="w-[80%] h-[87%] bg-transparent flex flex-col justify-start items-end pt-[20px] pr-[20px] relative" style={{ boxShadow: '0px 4px 16px 6px rgba(0, 0, 0, 0.25)' }}>
                    <h2 className="w-[45%] text-center text-[32px] font-[700] text-[#800E80]">Sign Up</h2>

                    <form className="w-[45%] mb-[2rem] flex flex-col mt-5">
                        <div className="w-full flex flex-col gap-[24px]">
                            <div className={`relative w-full`}>
                                <input value={full_name} onChange={on_change} onInput={() => { validate_fields() }} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] focus:border-none focus:outline-none font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[30px]" type="text" name="full_name" placeholder="FullName" />

                            </div>

                            <div className={`relative w-full`}>
                                <input value={email} onChange={on_change} onInput={() => { validate_email(); validate_fields() }} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] focus:border-none focus:outline-none font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[30px]" type="email" name="email" placeholder="Email / Admin number" />
                                {email_valid && <span className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                </span>}
                            </div>

                            <div className={`relative w-full`}>
                                <input value={password} onChange={on_change} onInput={() => validate_fields()} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] focus:border-none focus:outline-none font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[30px]" type={password_visible ? 'text' : 'password'} name="password" placeholder="Password" />
                                {password !== '' && <span onClick={() => set_password_visible(prev => !prev)} className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                    <Eye />
                                </span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[24px] mt-[40px]">
                            <button onClick={() => commit_signup()} className={`flex items-center justify-center w-full h-[48px] py-[8px] px-[24px] text-white bg-[#800E80] rounded-[4px] text-[16px] font-[700]`} type="button">
                                {!isLoading ? 'Sign up' : ''}
                                {isLoading && <span><Spinner h={15} w={15} /> </span>}
                            </button>

                            <p className="text-center text-[rgba(19, 18, 18, 0.60)] text-[16px] font-[400]">
                                Already have an account? <a className="font-[700] text-[#800E80]" href="/login">Login</a>
                            </p>
                        </div>
                    </form>

                    <span className="w-[107x] h-[101px] absolute top-[3%] left-[12%] z-[2]">
                        <ATPVDMS_Logo />
                    </span>

                    <span className="w-[fit-content] absolute bottom-[15px] right-[15px] flex gap-[1px]">
                        <img className="h-[15px] object-contain" src={images.tetfund_img.src} alt="" />
                        <img className="h-[18px] object-contain" src={images.tetfund_co_support_img.src} alt="" />
                    </span>

                </div>

                <div className="w-[35vw] h-full fixed top-0 left-0 z-[-1] pr-[97px] pt-[48px] text-[10rem] bg-[#800E80] flex flex-col items-end justify-start" style={{ boxShadow: '0px 4px 16px 6px rgba(0, 0, 0, 0.25)' }}>

                </div>
            </div>
            {/* Desktop Tablet */}
        </>
    )
}