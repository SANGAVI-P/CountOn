import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

type Settings = {
  precision: number;
};

type SettingsDialogProps = {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
};

const SettingsDialog = ({ settings, onSettingsChange }: SettingsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your calculator experience.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="precision">Result Precision ({settings.precision} decimal places)</Label>
            <Slider
              id="precision"
              min={0}
              max={14}
              step={1}
              value={[settings.precision]}
              onValueChange={(value) => onSettingsChange({ ...settings, precision: value[0] })}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;