import clsx from "clsx"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        "bg-white px-2 shadow-[inset_-2px_-2px_3px_0px_rgba(0,0,0,0.4)] active:shadow-[inset_-1px_-1px_3px_0px_rgba(0,0,0,0.4)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
