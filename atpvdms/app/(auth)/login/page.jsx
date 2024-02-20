"use client";

import Eye from "@/components/icons/eye"
import Correct from "@/components/icons/correct";
import { useState } from "react"
import { useRouter } from "next/navigation";
import ATPVDMS_Logo from "@/components/icons/atpvdms_logo";
import { images } from "@/constants/images";
import { set_token, useLoginMutation } from "@/state/slices/auth";
import { show_tooltip } from "@/components/layout/tooltip";
import Spinner from "@/components/icons/spinner";
import { useDispatch } from "react-redux";
import { auth_selectors } from "@/selectors/auth";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const { token } = auth_selectors()

    const [form_data, set_form_data] = useState({
        pass_phrase: '',
        password: '',
        remember_me: false
    })

    const [email_valid, set_email_valid] = useState(false);
    const [password_visible, set_password_visible] = useState(false);
    const [fields_blank, set_fields_blank] = useState(true);

    const validate_email = () => {
        if (pass_phrase === '' || !pass_phrase.includes('@')) set_email_valid(false);
        if (pass_phrase !== '' && pass_phrase.includes('@')) set_email_valid(true);
    }

    const validate_fields = () => {
        if (pass_phrase !== '' && password !== '') set_fields_blank(false)
        else set_fields_blank(true);
    }

    const on_change = (event) => {
        event.preventDefault();

        set_form_data(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const commit_login = async () => {
        // validate_fields();

        const res = await login(form_data);
        const { error, data } = res;
        // if (error) {
        //     const { msg, code } = error.data;
        //     show_tooltip({ code, msg })
        //     dispatch(set_token(token));
        // }
        if (data) {
            const { msg, code, token } = data;
            show_tooltip({ code, msg })
            dispatch(set_token(token));
            if (token) router.replace('/admin/dashboard');
        }
    }

    const { pass_phrase, password, remember_me } = form_data;

    return (
        <>
            {/* Mobile */}
            <div className="md:hidden lg:hidden w-full h-[100vh] flex flex-col items-center justify-between bg-white">
                <h1 className="text-[#131212] text-left w-[85%] text-[2rem] font-[700] mt-[1rem]">Login</h1>

                <form className="w-[85%] mb-[2rem] flex flex-col">
                    <div className="w-full flex flex-col gap-[24px]">
                        <div className={`relative w-full`}>
                            <input value={pass_phrase} onChange={on_change} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[20px] font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[50px]" type="text" name="pass_phrase" placeholder="Email / Admin number" />
                            {email_valid && <span className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                <Correct />
                            </span>}
                        </div>

                        <div className={`relative w-full`}>
                            <input onChange={on_change} onInput={() => validate_fields()} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[20px] font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[50px]" type={password_visible ? 'text' : 'password'} name="password" placeholder="Password" />
                            {password !== '' && <span onClick={() => set_password_visible(prev => !prev)} className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                <Eye />
                            </span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2 mt-[3px] mb-[40px]">
                        <span className="flex gap-2">
                            <input className="bg-[#800E80] text-[#800E80] fill-[#800E80]" type="checkbox" name="remember_me" />
                            <span className="text-[#800E80] text-[14px] font-[400]">Remember me</span>
                        </span>

                        <span className="text-[#800E80] text-[14px] font-[400]">Forgot password?</span>
                    </div>

                    <div className="flex flex-col gap-[24px] mt-[40px]">
                        <button onClick={() => signup()} className={`flex items-center justify-center w-full h-[48px] py-[8px] px-[24px] text-white ${fields_blank || email_valid ? 'bg-[rgba(19, 18, 18, 0.20)] bg-gray-200' : 'bg-[#800E80]'} rounded-[4px] text-[16px] font-[700]`} type="button" disabled={fields_blank}>Login</button>

                        <p className="text-center text-[rgba(19, 18, 18, 0.60)] text-[16px] font-[400]">
                            Don't have an account? <a className="font-[700] text-[#800E80]" href="">Sign Up</a>
                        </p>
                    </div>

                </form>
            </div>
            {/* Mobile */}

            {/* Desktop and tablet */}
            <div className="max-sm:hidden bg-transparent w-full h-[100vh] relative flex items-center justify-center">
                <div className="w-[80%] h-[87%] bg-transparent flex flex-col justify-start items-end pt-[20px] pr-[20px] relative" style={{ boxShadow: '0px 4px 16px 6px rgba(0, 0, 0, 0.25)' }}>
                    <h2 className="w-[45%] text-center text-[32px] font-[700] text-[#800E80]">Login</h2>

                    <form className="w-[45%] mb-[2rem] flex flex-col">
                        <div className="w-full flex flex-col gap-[24px]">
                            <div className={`relative w-full`}>
                                <input value={pass_phrase} onChange={on_change} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] focus:border-none focus:outline-none font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[30px]" type="text" name="pass_phrase" placeholder="Email / Admin number" />
                            </div>

                            <div className={`relative w-full`}>
                                <input value={password} onChange={on_change} onInput={() => validate_fields()} className="w-full border-b-[1px] outline-[unset] border-b-[rgba(0, 0, 0, 0.20)] text-[16px] focus:border-none focus:outline-none font-[400] placeholder:text-[rgba(0, 0, 0, 0.40)] h-[30px]" type={password_visible ? 'text' : 'password'} name="password" placeholder="Password" />
                                {password !== '' && <span onClick={() => set_password_visible(prev => !prev)} className={`w-[20.5px] h-[20.5px] absolute top-[10px] right-0`}>
                                    <Eye />
                                </span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2 mt-[3px] mb-[40px]">
                            <span className="flex gap-2">
                                <input value={remember_me} onChange={on_change} className="bg-[#800E80] text-[#800E80] fill-[#800E80]" type="checkbox" name="remember_me" />
                                <span className="text-[#800E80] text-[14px] font-[400]">Remember me</span>
                            </span>

                            <a href="/forgot_password" className="text-[#800E80] text-[14px] font-[400]">Forgot password?</a>
                        </div>

                        <div className="flex flex-col gap-[24px] mt-[40px]">
                            <button onClick={() => commit_login()} className={`flex items-center justify-center w-full h-[48px] py-[8px] px-[24px] text-white bg-[#800E80] rounded-[4px] text-[16px] font-[700]`} type="button">
                                {!isLoading ? 'Login' : ''}
                                {isLoading && <span><Spinner h={15} w={15} /> </span>}
                            </button>

                            <p className="text-center text-[rgba(19, 18, 18, 0.60)] text-[16px] font-[400]">
                                Don't have an account? <a className="font-[700] text-[#800E80]" href="/signup">Sign Up</a>
                            </p>
                        </div>
                    </form>

                    <span className="w-[107px] h-[101px] absolute top-[3%] left-[12%] z-[2]">
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
            {/* Desktop and tablet */}
        </>
    )
}