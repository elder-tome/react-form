import { LoadingButton } from "../LoadingButton"

type Props = {
  text: string
  loading?: boolean
}

export function FormButton({ text, loading }: Props) {
  return (
    <button
      className={`${ loading ? 'bg-green-500' : 'bg-green-600' } p-3 w-full rounded mt-4 hover:bg-green-500 text-neutral-800 font-medium flex justify-center transition-all duration-150`}
      type="submit"
      disabled={loading}
    >
      {loading ? <LoadingButton /> : text}
    </button>
  )
}