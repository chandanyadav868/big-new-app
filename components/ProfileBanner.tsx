import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
// import NotLoggedInError from '@/components/NotLoggedInError';
import { NotloggedInDialogboxShowProp } from '@/components/CommentComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/readux/store';
import PopUpError from './PopUpError';

interface ProfileBannerProp {
    _id: string
    username: string
    fullname: string
    Followeing: boolean;
    avatartUrl?:string;
}

function ProfileBanner({ _id, fullname, Followeing, username,avatartUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s" }: ProfileBannerProp) {
    const [notloggedInDialogboxShow, setNotloggedInDialogboxShow] = useState<NotloggedInDialogboxShowProp | null>(null);
    const { data } = useSelector((state: RootState) => state.auth);
    const [stateFollower, setStateFollower] = useState(Followeing);

    const followFun = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const buttonBox = (e.target as HTMLDivElement).getBoundingClientRect();
        if (data?._id) {

            setStateFollower((prev) => !prev);
            const response = await fetch(`/api?id=follow&creatorId=${_id}`);
            const responseJson = await response.json();
            if (response.ok) console.log(responseJson);

        } else {
            setNotloggedInDialogboxShow({ notLoggedIn: true, buttonRectArea: buttonBox })
        }
    }

    return (
        <>
            <div className='px-1 py-2 flex justify-between flex-wrap '>
                <Link href={`/u/${username}`} aria-label='user profile link'>
                    <div className='flex gap-2 items-center max-md:text-sm'>
                        <Image src={avatartUrl} alt='avatar logo' width={100} height={100} className='w-10 h-10 object-cover rounded-full'/>
                        <div className='flex flex-col font-bold' style={{lineHeight:"15px"}}>
                            <span className='text-inherit'>{fullname}</span>
                            <span className='text-inherit'>@{username}</span>
                        </div>
                    </div>
                </Link>

                {/* follow */}
                <div className='flex flex-1 gap-2 justify-end items-center'>
                    <button 
                        onClick={followFun} 
                        className={`px-5 py-2 font-semibold rounded-full shadow-sm transition-colors border ${
                            stateFollower
                            ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            : "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent hover:bg-gray-800 dark:hover:bg-gray-200"
                        }`}
                    >
                        {stateFollower ? "Following" : "Follow"}
                    </button>
                </div>
            </div>

            {/* not logged in components */}
            {notloggedInDialogboxShow?.notLoggedIn &&
                <PopUpError button={notloggedInDialogboxShow} setNotloggedInDialogboxShow={setNotloggedInDialogboxShow} btnText={"Follow"} />}
        </>
    )
}

export default ProfileBanner