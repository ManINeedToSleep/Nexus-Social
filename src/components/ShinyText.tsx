'use client';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  gradient?: string;
}

const ShinyText = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = '',
  gradient = 'from-purple-500 to-blue-500'
}: ShinyTextProps) => {
  const animationDuration = `${speed}s`;
  
  // Define gradient colors based on the gradient prop with higher opacity
  const getGradientColors = () => {
    switch (gradient) {
      case 'from-purple-500 to-blue-500':
        return {
          base: 'rgba(147, 51, 234, 0.4)', // purple-500 with base opacity
          shine: 'rgba(59, 130, 246, 0.9)', // blue-500 with higher opacity
        };
      case 'from-blue-500 to-cyan-500':
        return {
          base: 'rgba(59, 130, 246, 0.4)', // blue-500 with base opacity
          shine: 'rgba(6, 182, 212, 0.9)', // cyan-500 with higher opacity
        };
      case 'from-purple-500 to-cyan-500':
        return {
          base: 'rgba(147, 51, 234, 0.4)', // purple-500 with base opacity
          shine: 'rgba(6, 182, 212, 0.9)', // cyan-500 with higher opacity
        };
      default:
        return {
          base: 'rgba(255, 255, 255, 0.4)',
          shine: 'rgba(255, 255, 255, 0.9)',
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div
      className={`text-transparent bg-clip-text inline-block relative ${disabled ? '' : 'animate-shine'} ${className}
        bg-gradient-to-r ${gradient}`}
      style={{
        backgroundImage: `linear-gradient(120deg, 
          ${disabled ? '' : `
            ${colors.base} 10%,
            ${colors.base.replace('0.4)', '0.5)')} 25%,
            ${colors.base.replace('0.4)', '0.6)')} 35%,
            ${colors.base.replace('0.4)', '0.8)')} 45%,
            ${colors.shine} 50%,
            ${colors.base.replace('0.4)', '0.8)')} 55%,
            ${colors.base.replace('0.4)', '0.6)')} 65%,
            ${colors.base.replace('0.4)', '0.5)')} 75%,
            ${colors.base} 90%
          `}
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        filter: 'blur(0.1px)', // Reduced blur for sharper shine
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText; 