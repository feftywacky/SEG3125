export default function GradientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
      <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-green-400 to-teal-300 blur-3xl" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-blue-400 to-cyan-300 blur-3xl" />
      <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-teal-300 to-blue-400 blur-3xl" />
    </div>
  )
}