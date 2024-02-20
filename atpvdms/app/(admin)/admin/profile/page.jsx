'use client'

import Chevron_Down from '@/components/icons/chevron_down'
import Container from '@/components/layout/container'
import { images } from '@/constants/images'
import { useState } from 'react'
import Link from 'next/link'
import { admin_selectors } from '@/selectors/admin'
import { useUpdate_admin_profileMutation } from '@/state/slices/admin'
import { useDispatch } from 'react-redux'
import { show_tooltip } from '@/components/layout/tooltip'
import Spinner from '@/components/icons/spinner'
import { useLogoutMutation } from '@/state/slices/auth'
import { useRouter } from 'next/navigation'

const get_user_location = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    return `lat:${latitude} - lng:${longitude}`

  })
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

export default function Profile() {
  const { admin, loading: getting_profile } = admin_selectors()
  const dispatch = useDispatch();
  const router = useRouter();
  const [update_admin_profile, { isLoading, error, data }] = useUpdate_admin_profileMutation();
  const [logout, { isLoading: logging_out }] = useLogoutMutation();

  const [muted, set_muted] = useState(false);
  const [editting, set_editting] = useState(false);
  const [profile_data, set_profile_data] = useState({
    password: admin?.password,
    region: admin?.region,
    bio: admin?.bio,
    lang: admin?.lang
  })

  const { bio, password, region, lang } = profile_data;

  const on_change = (event) => {
    event.preventDefault();

    set_profile_data(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const update_profile = async () => {
    const res = await update_admin_profile(profile_data);
    const { error, data } = res;
    if (error) {
      const { msg, code } = error.data;
      show_tooltip({ code, msg })
    }
    if (data) {
      const { msg, code } = data;
      show_tooltip({ code, msg });

      set_editting(false);
    }
  }

  const commit_logout = async () => {
    const res = await logout({});
    const { error, data } = res;
    if (error) {
      const { msg, code } = error.data;
      show_tooltip({ code, msg })
    }
    if (data) {
      const { msg, code } = data;
      show_tooltip({ code, msg });

      if (!token) router.replace('/login');
    }
  }

  return (
    <div className="w-full h-[90vh]">
      <Container className="grid grid-cols-[8fr_4fr] gap-[16px] pt-1">
        <div className="w-full col-start-[1] col-end-[2] flex flex-col gap-[72px] p-[16px] border-r-[1px] border-r-[#800E80] border-b-[1px] border-b-[#800E80]">
          <div className="w-full flex items-center justify-between">
            {/* <img
              className="w-[100px] h-[100px] rounded-full object-cover mr-3"
              src={images.user.src}
              alt=""
            /> */}
            {
              !getting_profile ?
                (<span className="w-[100px] h-[100px] rounded-full object-cover mr-3 cursor-pointer border-[1px]  border-[#800E80] text-[2.5rem] text-[#800E80] flex items-center justify-center" alt="">{firstLettersOfWords(admin?.full_name) || '...'}</span>)
                :
                (
                  <div className="w-[100px] h-[100px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center">
                    <Spinner w={100} h={100} />
                  </div>
                )}

            <div className="flex flex-col gap-1 w-[fit-content] mt-auto mr-auto">
              <h2 className="text-[24px] font-[700] text-[#800E80]">
                {admin?.full_name}
              </h2>
              <div className="text-[16px] font-[400]">
                <span className="text-black">{admin?.full_name || '...'} -</span>
                <span className="text-[#800E80]">Administration</span>
              </div>
            </div>

            {!editting ?
              (<button onClick={() => set_editting(true)} className="flex items-center justify-center py-1 px-5 rounded-[4px] bg-[#800E80] text-white active:scale-[0.9]">
                Edit profile
              </button>)
              :
              (<div className='flex gap-1 w-[fit-content] h-[fitcontent]'>
                <button onClick={() => set_editting(false)} className="flex items-center justify-center py-1 px-5 rounded-[4px] bg-[#800E80] text-white active:scale-[0.9]">
                  Discard changes
                </button>
                <>
                  {
                    !isLoading ?
                      (<button onClick={() => update_profile()} className="flex items-center justify-center py-1 px-5 rounded-[4px] bg-[#800E80] text-white active:scale-[0.9]">
                        Save changes
                      </button>)
                      :
                      <div className="flex items-center justify-center py-1 px-5 rounded-[4px] bg-[#800E80] text-white active:scale-[0.9]">
                        <Spinner w={15} h={15} />
                      </div>
                  }
                </>
              </div>)
            }
          </div>

          <div className="flex flex-col gap-[16px] w-[70%]">
            <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Admin number:
              </span>
              <span className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80]">
                {admin?.admin_number || '...'}
              </span>
            </div>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Password:
              </span>
              {
                !editting ?
                  (<span className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80]">
                    {admin?.password || '...'}
                  </span>)
                  :
                  (
                    <input value={password} onChange={on_change} name='password' className='w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80] outline-[#800E80] outline-[1px] focus:outline-[#800E80] focus:outline-[1px]' placeholder='Change your password' />
                  )
              }
            </div>
            {/* <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Contact:
              </span>
              <span className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80]">
                {admin?.phone_number}
              </span>
            </div> */}
            <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Region:
              </span>
              {
                !editting ?
                  (<span className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80]">
                    {admin?.region || '...'}
                  </span>)
                  :
                  (<input value={region} onChange={on_change} name='region' className='w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80] outline-[#800E80] outline-[1px] focus:outline-[#800E80] focus:outline-[1px]' placeholder='Change your region' />)
              }
            </div>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Language:
              </span>
              {
                !editting ?
                  (<span className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-[1px] border-[#800E80] pl-1">
                    {admin?.lang || '...'}
                  </span>)
                  :
                  (<input value={lang} onChange={on_change} name='lang' className='w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80] outline-[#800E80] outline-[1px] focus:outline-[#800E80] focus:outline-[1px]' placeholder='Change your language' />)
              }
            </div>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <span className="text-[16px] font-[700] text-[#800E80]">
                Bio:
              </span>
              {
                !editting ?
                  (<div className="w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-[1px] border-[#800E80] p-1">
                    {admin?.bio || '...'}
                  </div>)
                  :
                  (<input value={bio} onChange={on_change} name='bio' className='w-[70%] text-[#800E80] text-[14px] text-[400] pb-2 border-b-[1px] border-b-[#800E80] outline-[#800E80] outline-[1px] focus:outline-[#800E80] focus:outline-[1px]' placeholder='Change your bio' />)
              }
            </div>
          </div>
        </div>

        <div className="col-start-[2] col-end-[3] flex flex-col gap-[16px] p-[16px] items-start border-l-[1px] border-l-[#800E80] border-t-[1px] border-t-[#800E80]">
          <h2 className="text-[20px] text-[#800E80] font-[700]">Settings</h2>

          <div className="w-[80%] flex flex-col gap-[24px]">
            <div className="w-full flex gap-1 items-center cursor-pointer">
              <span className="text-[#800E80] w-[20px] h-[20px]">
                <Chevron_Down />
              </span>
              <span className="text-[16px] text-[#800E80] font-[400]">
                Add new tracker device
              </span>
            </div>

            <div className="w-full flex gap-1 items-center justify-between">
              <span className="text-[16px] text-[#800E80] font-[400]">
                Mute notification
              </span>
              <span
                className={`w-[42px] h-[20px] flex relative bg-[#D7D7D7] border-[1px] border-[#D7D7D7] rounded-[20px]`}
              >
                <span
                  onClick={() => set_muted((prev) => !prev)}
                  className={`bg-white absolute z-[2] top-0 w-[20px] h-[100%] active:scale-[0.8] cursor-pointer rounded-full ${muted ? 'left-0' : 'right-0'
                    }`}
                ></span>
              </span>
            </div>

            <a href="/help" className="text-[16px] text-[#800E80] font-[400]">
              Help
            </a>

            {
              !logging_out ?
                (<span
                  onClick={() => commit_logout()}
                  className="text-[16px] text-[#800E80] font-[400] cursor-pointer"
                >
                  Logout
                </span>)
                :
                (
                  <div className="w-[32px] h-[32px] rounded-full cursor-pointer border-[1px]  border-white flex items-center justify-center">
                    <Spinner w={15} h={15} />
                  </div>
                )
            }
          </div>
        </div>
      </Container>
    </div>
  )
}
