import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames } from '@/lib/i18n';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Globe className="h-4 w-4 text-primary" />
        {t('language')}
      </label>
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-full bg-secondary border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
