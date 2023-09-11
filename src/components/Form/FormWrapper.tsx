import { FormHTMLAttributes, ReactNode } from "react"

type Props = FormHTMLAttributes<HTMLFormElement> & {
  title: string
  children: ReactNode
}

export function FormWrapper({ title, children, ...rest }: Props) {
  return (
    <form className="bg-neutral-800 flex flex-col p-6 rounded-md gap-4 text-sm" {...rest}>
      <h1 className="text-center mb-4 font-semibold text-lg">{title}</h1>
      {children}
    </form>
  )
}