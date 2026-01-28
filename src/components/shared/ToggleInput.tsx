import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ToggleInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
}

const ToggleInput = ({
  label,
  checked,
  onChange,
  icon,
  className,
}: ToggleInputProps) => {
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {label}
      </label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
};

export default ToggleInput;
