'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { notificationPage } from '@/constants/notificationData';
import Bell from '@/components/icons/bell.svg'
import Image from 'next/image';
import Dot from "@/components/icons/circle.svg"
import { tankers_selectors } from '@/selectors/tankers';
import Bus from '@/components/icons/bus';
import Pipe from '@/components/icons/pipe';

function Notification() {
  const { notifications } = tankers_selectors()

  // const [notifications, setNotifications] = useState(notificationPage)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showNotificationList, setShowNotificationList] = useState(true)

  const isArrayOfObject = (arr) => {
    // check if it is an array
    if (Array.isArray(arr)) {
      // check if every element in the array is an object
      return arr.every((item) => typeof item === 'object' && !Array.isArray(item))
    }
    // is not an array
    return false;
  }

  //Check if notifications is an array of objects
  const isNotifyOfObjects = isArrayOfObject(notifications)

  const handleNotificationClick = (notification_string) => {
    const selected = notifications.find((notification) => notification == notification_string)
    setSelectedNotification(selected)
  }

  const handleBackToNotifications = () => {
    setSelectedNotification(null)
    setShowNotificationList(false)
  }
  const reducedString = (longString, maxLength) => {
    return longString?.length > maxLength ? longString.substring(0, maxLength) + '...' : longString;
  }


  return (
    <div className='h-100 w-full bg-white overflow-y-scroll visible_thumb_bar'>
      <div className='border-b-[4px]'>
        <h1 className='text-[#800E80] font-[700] text-[24px] leading-[30.72px] mt-20 mb-6 mx-6  xl:mx-14'>Notifications</h1>
      </div>

      <div className='flex items-center flex-1 justify-between mx-6 xl:mx-14'>
        <div className={`${!showNotificationList ? 'hidden xl:block' : 'block'} h-full  xl:w-[819px]  border-r-[4px]`}>

          <ul className=''>
            {notifications.filter((notification) => !notification.read)
              .map((notification, index) => (
                <li key={index}>
                  <span className={`flex items-center justify-between px-2 border-l-4 text-[#800E80] h-[82px] 
                  w-[340px] xl:w-[723px] bg-[#ffffff] shadow-md shadow-[#800e80] my-10 rounded-md`}
                    onClick={() => handleNotificationClick(notification)}>
                    <span className='flex items-center'>
                      <span className="w-[20px] h-[20px]">
                        {
                          !notification?.toString()?.includes('Pipe_line') ?
                            (<span className='w-[25px] h-[25px] text-[#800E80]'><Bus /></span>)
                            :
                            (<Pipe />)
                        }
                      </span>
                      <span className='px-2 text-[16px] leading-[20.48px] font-[400]'>{reducedString(notification, 20)}</span>
                    </span>
                    <span className='flex items-center flex-col'>
                      <span>{'03:12 PM'}</span>
                    </span>
                  </span>

                </li>
              ))}
          </ul>

          <ul className=''>
            {notifications
              .map((notification, index) => (
                <li key={index}>
                  <span className={` flex items-center justify-between px-2 border-l-4 text-[#800E80]  h-[82px] 
                w-[340px] xl:w-[723px] bg-[#ffffff] shadow-md shadow-[#800e80] my-10 rounded-md`}
                    onClick={() => handleNotificationClick(notification)}>
                    <span className='flex items-center'>
                      <span className="w-[20px] h-[20px]">
                        {
                          !notification?.toString()?.includes('Pipe_line') ?
                            (<span className='w-[25px] h-[25px] text-[#800E80]'><Bus /></span>)
                            :
                            (<Pipe />)
                        }
                      </span>

                      <span className='px-2 text-[16px] leading-[20.48px] font-[400]'>{reducedString(notification)}</span>
                    </span>
                    <span className='flex items-center flex-col'>

                      <span>{'03:12 PM'}</span>
                    </span>
                  </span>

                </li>
              ))}
          </ul>

        </div>

        <div className='w-full h-[862px]'>
          {selectedNotification ? (
            <div className={`h-[374px] w-full xl:w-full gap-[106px]
        `}>
              <div className='flex items-center justify-between mt-6 px-4'>
                <span className="w-[20px] h-[20px]">
                  {
                    !selectedNotification?.toString()?.includes('Pipe_line') ?
                      (<span className='w-[25px] h-[25px] text-[#800E80]'><Bus /></span>)
                      :
                      (<Pipe />)
                  }
                </span>
                <p className='text-center text-[16px] font-[400] leading-[25.6px] text-justify
          '>
                  {selectedNotification}
                </p>
                <span>{'03:12 PM'}</span>
              </div>
              {/* <div className='h-[52px] w-[350px] xl:w-[597px] my-10'>
                <p className='text-center text-[16px] font-[400] leading-[25.6px] text-justify
          '>
                  {selectedNotification}
                </p>
              </div> */}
              {/* <ul className='space-y-10 pt-14 xl:mt-0'>
                <li><span className='font-[700] text-[16px] leading-[20.4px]'>Tracking ID :</span>
                  <span className='font-[400] text-[20px] leading-[25.6px] pl-20'> {selectedNotification.trackingId}</span></li>
                <li><span className='font-[700] text-[16px] leading-[20.4px]'>Location Name :</span>
                  <span className='font-[400] text-[20px] leading-[25.6px] pl-[3.6rem]'> {selectedNotification.locationName}</span></li>
                <li><span className='font-[700] text-[16px] leading-[20.4px]'>Gps-Coordinates :</span>
                  <span className='font-[400] text-[20px] leading-[25.6px] pl-[3.1rem]'> {selectedNotification.gpsCoordinatesLat}</span>
                  <br /><span className='pl-[12rem] font-[400] text-[20px] leading-[25.6px]'>{selectedNotification.gpsCoordinatesLan}</span></li>
              </ul>
              <div className='flex justify-center mt-32'>
                <button className='h-[48px] font-[700] text-[16px] leading-[20.24px] w-[140px] gap-[10px] py-[8px] px-[24px] rounded-[4px] bg-[#800e80] text-white'>View Map</button>
                {showNotificationList || (
                  <button className='h-[48px] font-[700] text-[16px] leading-[20.24px] w-[140px] gap-[10px] py-[8px] px-[24px] rounded-[4px] bg-[#800e80] text-white' onClick={handleBackToNotifications}>Back to notification</button>

                )}
              </div> */}
              <div>

              </div>

            </div>
          )
            :
            <div className='hidden xl:block '>
              <img
                src={Bell.src}
                height={339}
                width={453}
                alt="bell" />
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Notification