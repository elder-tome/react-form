import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

type Props =  InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result
}

export function FormInput({ label, name, ...rest }: Props) {
  const { register, formState: { errors } } = useFormContext()

  const fieldError = get(errors, name)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        className="bg-neutral-700 p-3 rounded"
        id={name}
        {...register(name)}
        {...rest}
      />
      <span className="text-red-400">{fieldError?.message?.toString()}</span>
    </div>
  )
}