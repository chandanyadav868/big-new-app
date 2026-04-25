"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { profileAsyncThunk } from '@/lib/readux/profileFetching';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/readux/store';
import Banner from '@/components/Banner';
import ProfileBanner from '@/components/ProfileBanner';
import { ChannelPageComp } from '@/components/ChannelPageComp';

function ProfilePage() {
    const { profile } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { error, intialProfile, loading } = useSelector((state: RootState) => state.profileFetching);
    // console.log("intialProfile:- ", intialProfile);

    // console.log({ profile, section });
    // this useEffect is running when where profile of user change to show its articles
    useEffect(() => {
        if ((intialProfile.arrayOfArticles?.length ?? 0) > 0) return
        const response = async () => {
            if (!profile || profile instanceof Array) {
                return
            }
            dispatch(profileAsyncThunk({ profile }))
        }
        response();
    }, [profile]);

    return (
        <div className='min-h-screen pb-12'>
            {intialProfile._id &&
                (<main className='m-auto max-w-screen-xl'>
                    {/* banner */}
                    <div className='w-full bg-gray-100 dark:bg-gray-800 rounded-b-2xl overflow-hidden shadow-sm'>
                        <Banner banner='/images/defaultbanner.jpg' />
                    </div>
                    
                    {/* profile details */}
                    <div className='px-4 md:px-8 mt-4'>
                        <ProfileBanner 
                            _id={intialProfile._id ?? ""} 
                            fullname={intialProfile.fullname ?? ""} 
                            Followeing={intialProfile.isFollowing ?? false} 
                            username={intialProfile.username ?? ""} 
                        />
                    </div>
                    
                    {/* category and articles */}
                    <div className='px-4 md:px-8 mt-6'>
                        <ChannelPageComp />
                    </div>
                </main>
                )}
        </div>
    )
}

export default ProfilePage


