import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

const InputLabel = ({ id, label, value, onChange }: Props) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 bg-zinc-800"
      />
    </div>
  )
}

export default InputLabel
