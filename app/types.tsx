export type Class = {
  id: string;
  name: string;
  description: string;
  location: string;
  start: Time;
  end: Time;
  day_of_week: number;
};
export type Time = {
    hour: number;
    minute: number;
}