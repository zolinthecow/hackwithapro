'use client'

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import createClass, { type ClassData } from '@/actions/createClass';
import LocationInput from "@/components/add-class/locationInput";

const days: ('monday'| 'tuesday'| 'wednesday'| 'thursday'| 'friday'| 'saturday'| 'sunday')[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Component() {
  // State to hold form data (optional, for demonstration)
  const [formData, setFormData] = useState<ClassData>({
    className: '',
    time: '13:37',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    location: {
      name: '',
      lat: '',
      lng: '',
    },
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  // @ts-expect-error wtv
  const submitForm = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (formData.className === '') {
      setErrorMessage('Please enter a class name.');
      return;
    } else if (formData.location.name === '') {
      setErrorMessage('Please enter a location');
      return;
    }

    createClass(formData);
  };

  // Function to handle form data changes
  // @ts-expect-error wtf
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      // Handling checkboxes separately
      if (event.type === 'click') {
        return {
          ...prevFormData,
          days: {
            ...prevFormData.days,
            // @ts-expect-error all good
            [event.target.id]: !prevFormData.days[event.target.id],
          },
        };
      }
      // Handling other inputs
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  return (
    <div className={"min-h-screen flex flex-row justify-center"}>
      <div className={`w-1/2 py-2 justify-center bg-red-700 text-white text-md`} hidden={errorMessage === ''}>
        {errorMessage}
      </div>
    <form className={"min-h-screen flex flex-row justify-center"} onSubmit={submitForm}>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="className">Class Name</Label>
          <Input className="w-full max-w-sm" id="className" name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="time">Start Time</Label>
          <Input defaultValue="13:37" id="time" name="time" type="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Days</legend>
            <div key={'monday'} className="flex items-center gap-2">
              <Checkbox id={'monday'} name={'monday'} checked={formData.days.monday} onChange={handleChange} />
              <label className="text-sm font-normal leading-none" htmlFor={'monday'}>
                Monday
              </label>
            </div>

            {days.map(d => (
              <div key={d} className="flex items-center gap-2">
                <Checkbox id={d} name={d} checked={formData.days[d]} onClick={handleChange} />
                <label className="text-sm font-normal leading-none" htmlFor={d}>
                  {capitalizeFirstLetter(d)}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <LocationInput handleChange={handleChange}/>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}
