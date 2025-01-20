export interface StepCalendarProps {
  selectedDate?: Date;
  onSelectDate: (date: Date | undefined) => void;
  placeholder?: string;
}