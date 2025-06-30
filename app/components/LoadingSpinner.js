'use client';

export default function LoadingSpinner({ size = 'medium' }) {
  // 根据size属性设置尺寸
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className="flex justify-center items-center">
      <div className={`${spinnerSize} relative`}>
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
}