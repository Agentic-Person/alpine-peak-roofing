interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'blue' | 'white' | 'gray';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const colorClasses = {
  blue: 'border-blue-600',
  white: 'border-white',
  gray: 'border-gray-400'
};

export function LoadingSpinner({ size = 'md', className = '', color = 'blue' }: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]} ${colorClasses[color]} border-t-current ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingSpinnerWithText({ 
  text, 
  size = 'lg', 
  className = '' 
}: { 
  text: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string; 
}) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <LoadingSpinner size={size} />
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );
}