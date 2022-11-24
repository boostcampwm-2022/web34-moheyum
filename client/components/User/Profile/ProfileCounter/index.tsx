import Link from 'next/link';
import React from 'react'
import { Counter } from './index.style';

interface Props {
  href: string;
  label: string;
  counter: number;
}

function ProfileCounter( props: Props) {
  let JSX = (
    <>
      {props.label} {props.counter}
    </>
  );
  if (props.href !== "")
    JSX = (
      <Link href={props.href}>
        {JSX}
      </Link>
    )
  return (
    <Counter>
      {JSX}
    </Counter>
  );
}

export default ProfileCounter