import { PropsWithChildren } from 'react';

export function MyButton(props: PropsWithChildren) {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-base text-white">{props.children}</button>
  );
}
