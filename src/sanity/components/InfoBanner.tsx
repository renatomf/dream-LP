'use client'

export function InfoBanner({ message }: { message: string }) {
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      background: '#fef9c3',
      border: '1px solid #fbd024',
      borderRadius: 4,
      padding: '10px 12px',
      fontSize: 12,
      lineHeight: 1.5,
      color: '#713f12',
    }}>
      <span style={{ flexShrink: 0 }}>ℹ️</span>
      <span>{message}</span>
    </div>
  )
}
