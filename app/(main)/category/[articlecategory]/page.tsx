import React from 'react'
import { Metadata } from 'next';
import Categorypage from './categoryShower';

export const metadata: Metadata = {
  title: "Category Page | Human Talking",
  description:
    "Human Talking is a sports and gaming news platform delivering latest WWE, gaming, esports and trending news.",
  alternates: {
    canonical: "https://humantalking.com/category",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function page() {
  return (
    <>
    <Categorypage/>
    </>
  )
}

export default page