import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
}

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  icon,
  className,
}: SliderInputProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          {icon}
          {label}
        </label>
        <span className="text-sm font-mono text-primary">
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};

export default SliderInput;
