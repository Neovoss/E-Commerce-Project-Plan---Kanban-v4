import { Loader2 } from 'lucide-react'

export default function Spinner({ label = 'Yükleniyor...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Loader2 size={40} className="animate-spin text-brand" />
      <p className="text-sm font-bold text-brand-muted">{label}</p>
    </div>
  )
}
