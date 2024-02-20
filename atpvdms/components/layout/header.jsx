"use client";

import { images } from "@/constants/images"
import Container from "./container"
import ATPVDMS_Logo from "../icons/atpvdms_logo"
import { nav_links } from "@/constants/links"
import Chevron_Down from "../icons/chevron_down"
import { useState } from "react"
import Notification from "../icons/notification";
import Active from "../icons/active";
import Download from "../icons/download";
import { usePathname, useRouter } from "next/navigation";
import Active_Indicator from "../icons/active_indicator";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { set_token, useLogoutMutation } from "@/state/slices/auth";
import { toast } from "react-toastify";
import { show_tooltip } from "./tooltip";
import { admin_selectors } from "@/selectors/admin";
import { auth_selectors } from "@/selectors/auth";
import { set_admin, useGet_admin_profileQuery } from "@/state/slices/admin";
import Spinner from "../icons/spinner";
import { blockchain_selectors } from "@/selectors/blockchain";

export default function Header() {
    const router = useRouter();
    const path = usePathname();
    const dispatch = useDispatch()
    const [hovered_item, set_hovered] = useState('');
    const [clicked, set_clicked] = useState(false);

    const { isLoading: getting_profile, data: profile_data, error: profile_error
    } = useGet_admin_profileQuery({})
    const [logout, { isLoading: logging_out }] = useLogoutMutation();

    const admin = profile_data?.admin || profile_error?.data?.admin;

    if (admin) dispatch(set_admin(admin))

    const { token } = auth_selectors()
    const { eth_account_number, loading } = blockchain_selectors()

    const active = ({ link }) => {
        return path === link || path.includes(link);
    }

    function firstLettersOfWords(sentence) {
        let words = sentence?.split(" ");
        let firstLetters = "";
        for (let i = 0; i < words?.length; i++) {
            if (words[i]?.length > 0) {
                firstLetters += words[i][0];
            }
        }

        return firstLetters;
    }

    const signout = async () => {
        const res = await logout({});
        const { error, data } = res;
        if (error) {
            const { msg, code } = error.data;
            show_tooltip({ code, msg })
        }
        if (data) {
            const { msg, code } = data;
            show_tooltip({ code, msg })
            dispatch(set_token(null));
            if (!token) router.replace('/login');
        }
    }

    return (
        <div className="w-full h-full bg-[#800E80] text-white" style={{ boxShadow: '6px 6px 4px 0px rgba(128, 14, 128, 0.25)' }}>
            <Container className='flex items-center justify-between p-[9px 0px 9.273px 0px]'>
                {/* List -> ATPVDMS logo, tetfund, tetfund co support logo */}
                <a href="/admin/dashboard" className="flex items-center justify-center gap-[16px]">
                    <span className="w-[78px] h-[50px]">
                        <ATPVDMS_Logo />
                    </span>
                    <img className="w-[62px] h-[20px] object-contain" src={images.tetfund_img.src} alt="" />
                    <img className="w-[40px] h-[20px] object-contain" src={images.tetfund_co_support_img.src} alt="" />
                </a>
                {/* List -> ATPVDMS logo, tetfund, tetfund co support logo */}

                {/* List -. Dashboard, Log, Profile, Blockchain, maps */}
                <ul className="w-[fit-content] flex justify-center items-center gap-[32px]">
                    {nav_links.map((link, index) => (
                        <li onMouseEnter={() => link.sub_links && set_hovered(link.name)} onMouseLeave={() => link.sub_links && set_hovered('')} className={`cursor-pointer relative ${link?.sub_links ? 'flex gap-[3px]items-center' : ''}`} key={index}>
                            <a className="text-[16px] font-[400] capitalize" href={link?.sub_links ? link.sub_links[0].href : link.href}>{link.name}</a>
                            {link?.sub_links && <span className="w-[20px] h-[20px] mt-[3px]">
                                <Chevron_Down />
                            </span>}

                            {/* Active Link Indicator */}
                            {active({ link: link.href }) && <span className="absolute top-[25%] left-0 z-[4] w-[100%] h-[44px]">
                                <Active_Indicator />
                            </span>}
                            {/* Active Link Indicator */}

                            {/* Dropdown list */}
                            {hovered_item === link.name && link.sub_links && <div className="absolute top-[100%] left-0 z-[3] bg-[#800E80] flex flex-col gap-[5px] py-[8px] w-[fit-content] h-[fit-content]">
                                {link.sub_links.map(((sub_link, index) => (
                                    <a className="border-b-[1px] border-b-white text-white text-[16px] font-[700] py-[3px] px-[25px] capitalize" href={sub_link.href} key={index}>{sub_link.name}</a>
                                )))}
                            </div>}
                            {/* Dropdown list */}
                        </li>
                    ))}
                </ul>
                {/* List -. Dashboard, Log, Profile, Blockchain, maps */}

                {/* Blockchain */}
                <div className="flex gap-1 items-center w-[fit-content] h-[calc(100%-0.6em)] border-[1px] border-white rounded-[0.5em] my-[0.3em] p-[0.3em] cursor-pointer">
                    <img className="w-[45px] h-[45px] object-contain" src={images?.ethereum_logo.src} alt="Ethereum account number" />

                    {
                        !loading ?
                            (<span className="text-white">{eth_account_number || '...'}</span>)
                            :
                            (
                                <span className="w-[15px] h-[15px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center">
                                    <Spinner w={15} h={15} />
                                </span>
                            )
                    }
                </div>
                {/* Blockchain */}

                {/* User */}
                <div className="flex items-center gap-[24px]">
                    <span onMouseEnter={() => '/admin/dashboard/notification' && set_hovered('notification')} onMouseLeave={() => '/admin/dashboard/notification' && set_hovered('')}
                        className="w-[20px] h-[20px] relative">
                        <Link href={'/admin/dashboard/notification'}>
                            <Notification />
                        </Link>
                        <span className="absolute top-[-2px] right-[-2px]">
                            <Active />
                        </span>
                    </span>

                    {/* User Avatar */}
                    {/* <img onClick={() => set_clicked(prev => !prev)} className="w-[32px] h-[32px] rounded-full cursor-pointer" src={images.user.src} alt="" /> */}
                    {
                        !getting_profile ?
                            (<span onClick={() => set_clicked(prev => !prev)} className="w-[32px] h-[32px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center" alt="">{firstLettersOfWords(admin?.full_name) || '...'}</span>)

                            :
                            (
                                <div className="w-[32px] h-[32px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center">
                                    <Spinner w={15} h={15} />
                                </div>
                            )}
                    {/* User Avatar */}

                    <div onClick={() => set_clicked(prev => !prev)} className="flex flex-col items-center gap-[3px] rounded-[8px] active:scale-[0.9] bg-white py-1 px-4 relative cursor-pointer">
                        <span className="text-center text-[14px] text-[#800E80] font-[400]">{admin?.full_name || '...'}</span>
                        <span className="text-[#131212] text-[12px] font-[700]">Admin</span>

                        {clicked && <div className="absolute top-[100%] right-0 z-[3] bg-[#800E80] flex flex-col gap-[5px] py-[8px] w-[fit-content] h-[fit-content]">
                            <a className="border-b-[1px] border-b-white text-white text-[16px] font-[700] py-[3px] px-[25px] capitalize flex items-center justify-between" href=''>
                                <span className="w-[24px] h-[24px]">
                                    <Download />
                                </span>
                                <span>Download</span>
                            </a>
                            {
                                !logging_out ?
                                    (<span onClick={() => signout()} className="border-b-[1px] border-b-white text-white text-[16px] font-[700] py-[3px] px-[25px] capitalize">Logout</span>)
                                    :
                                    (
                                        <div className="w-[32px] h-[32px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center">
                                            <Spinner w={15} h={15} />
                                        </div>
                                    )
                            }
                        </div>}
                    </div>
                    {/* User */}
                </div>
            </Container>
        </div>
    )
}