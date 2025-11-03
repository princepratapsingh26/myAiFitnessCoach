"use client"

interface ProgressTrackerProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressTracker({ currentStep, totalSteps }: ProgressTrackerProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Form Progress</span>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
