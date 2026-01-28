import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { NotloggedInDialogboxShowProp } from './CommentComponents';

interface NotLoggedINErrorProps {
  btnText: string;
  setNotloggedInDialogboxShow: React.Dispatch<React.SetStateAction<NotloggedInDialogboxShowProp | null>>
  button?: {
    notLoggedIn: boolean,
    buttonRectArea?: DOMRect
  } | null
}

function NotLoggedINError({ btnText, button, setNotloggedInDialogboxShow }: NotLoggedINErrorProps) {
  const dilogBox = useRef<HTMLDivElement | null>(null);
  const [dialogBoxPosition, setDialogBoxPosition] = useState({});

  useEffect(() => {
    const dialogBoxRectDom = dilogBox.current?.getBoundingClientRect();

    let left = button?.buttonRectArea?.right

    if ((dialogBoxRectDom?.width ?? 0) + (button?.buttonRectArea?.right ?? 0) > window.innerWidth) {
      left = (button?.buttonRectArea?.right ?? 0) - (dialogBoxRectDom?.width ?? 0)
    }

    const position = {
      top: button?.buttonRectArea?.top,
      left: left
    }
    setDialogBoxPosition(position);
    document.body.style.overflow = 'hidden';

    document.addEventListener("click", boxSwitchOff);
    return () => {
      document.removeEventListener("click", boxSwitchOff);
      document.body.style.overflow = "auto";
    };
  }, [])
 function boxSwitchOff(e: MouseEvent) {
    // target is the element where you clicked
    const target = e.target as Node;

    // check dilogbox is open and dilogbox target element containing
    if (dilogBox.current && !dilogBox.current.contains(target)) {
      setNotloggedInDialogboxShow(null);
      document.body.style.overflow = "auto";
    }
  }

  return (
    <div ref={dilogBox} className={`z-10 fixed`} style={{ ...dialogBoxPosition }}>
      <Link href={"/auth/login"}>
        <div className={` bg-gray-900 text-white mt-3  p-2 rounded-md shadow-md min-w-[200px] max-w-[250px] $`}>
          <p>{`Want to ${btnText} Article`}</p>
          <p>Please <li className='text-blue-500 hover:underline list-none'>Logged In</li></p>
        </div>
      </Link>
    </div>
  )
}

export default NotLoggedINError