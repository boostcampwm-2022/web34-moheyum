import Link from 'next/link';
import React from 'react';
import { Counter } from './index.style';

interface Props {
  url: string;
  label: string;
  counter: number;
}

function ProfileCounter({ ...props }: Props) {
  let JSX = (
    <>
      {props.label} {props.counter}
    </>
  );
  if (props.url !== '') JSX = <Link href={props.url}>{JSX}</Link>;
  return <Counter>{JSX}</Counter>;
}

export default ProfileCounter;
