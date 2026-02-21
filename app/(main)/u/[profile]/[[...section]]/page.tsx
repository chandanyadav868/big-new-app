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
        <div className='min-h-lvh'>
            { intialProfile._id &&
                (<div className='p-2 m-auto max-w-[1280px]'>
                    {/* banner */}
                    <div className='max-w-[1280px] bg-purple-300'>
                        <Banner banner='/images/defaultbanner.jpg' />
                    </div>
                    {/* profile */}
                    <div className='p-2'>
                        <ProfileBanner _id={intialProfile._id ?? ""} fullname={intialProfile.fullname ?? ""} Followeing={intialProfile.isFollowing ?? false} username={intialProfile.username ?? ""} />
                    </div>
                    <ChannelPageComp />
                </div>
                )}
        </div>
    )
}

export default ProfilePage


