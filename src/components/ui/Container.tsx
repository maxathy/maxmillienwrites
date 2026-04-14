import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export function Container({ className = '', ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}
      {...props}
    />
  )
}
