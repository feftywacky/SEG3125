export default function GradientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
      <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-300 to-pink-200 blur-3xl" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-blue-200 to-teal-200 blur-3xl" />
      <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-amber-100 to-rose-200 blur-3xl" />
    </div>
  )
}
