import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import NotLoggedInError from '@/components/NotLoggedInError';
import { NotloggedInDialogboxShowProp } from '@/components/CommentComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/readux/store';

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
            <div className='px-4 py-2 flex justify-between flex-wrap '>
                <Link href={`/u/${username}`}>
                    <div className='p-2 flex gap-2'>
                        <Image src={avatartUrl} alt='avatar logo' width={100} height={100} className='w-12 h-12 object-cover rounded-full ' />
                        <div className='flex flex-col font-bold'>
                            <span>{fullname}</span>
                            <span className='text-gray-400'>@{username}</span>
                        </div>
                    </div>
                </Link>

                {/* follow */}
                <div className='flex flex-1 gap-2 justify-center min-[444px]:justify-end items-center'>
                    <div>
                        <button onClick={(e) => followFun(e)} className='px-7 py-3 bg-pink-400 font-bold rounded-md shadow-sm relative'>{stateFollower ? "Following" : "Follow"}
                        </button>
                    </div>
                </div>
            </div>

            {/* not logged in components */}
            {notloggedInDialogboxShow?.notLoggedIn &&
                <NotLoggedInError button={notloggedInDialogboxShow} setNotloggedInDialogboxShow={setNotloggedInDialogboxShow} btnText={"Follow"} />}
        </>
    )
}

export default ProfileBanner