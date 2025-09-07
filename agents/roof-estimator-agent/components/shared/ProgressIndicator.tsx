interface ProgressIndicatorProps {
  steps: readonly string[];
  currentStep: string;
}

const stepLabels: Record<string, string> = {
  address: 'Address',
  confirmation: 'Confirm',
  materials: 'Materials',
  contact: 'Contact',
  results: 'Results'
};

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex flex-col items-center space-y-2 ${
              index <= currentIndex ? 'text-blue-600 font-semibold' : 'text-gray-400'
            }`}
          >
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                index < currentIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : index === currentIndex
                  ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-200'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentIndex ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step Label */}
            <span className="hidden sm:block capitalize font-medium">
              {stepLabels[step] || step}
            </span>
            
            {/* Mobile abbreviated label */}
            <span className="sm:hidden capitalize font-medium">
              {(stepLabels[step] || step).substring(0, 4)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Current Step Description */}
      <div className="text-center mt-6">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Step {currentIndex + 1}: {stepLabels[currentStep] || currentStep}
        </h2>
        <div className="text-sm text-gray-500 mt-1">
          {currentIndex + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
}