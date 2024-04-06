'use client'

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { type ClassData } from '@/actions/createClass';

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


  };

  // Function to handle form data changes
  // @ts-expect-error wtf
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      // Handling checkboxes separately
      if (type === 'checkbox') {
        return {
          ...prevFormData,
          days: {
            ...prevFormData.days,
            [name]: checked,
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
          <Label htmlFor="startTime">Start Time</Label>
          <Input defaultValue="13:37" id="startTime" name="startTime" type="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Days</legend>
            {/* Repeat for each day */}
            <div className="flex items-center gap-2">
              <Checkbox id="monday" name="monday" checked={formData.days.monday} onChange={handleChange} />
              <label className="text-sm font-normal leading-none" htmlFor="monday">
                Monday
              </label>
            </div>
            {/* Repeat above block for other weekdays, adjusting id, name, and checked accordingly */}
          </fieldset>
        </div>
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input className="w-full max-w-sm" id="location" name="location" placeholder="Location" value={formData.location.name} onChange={handleChange} />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}
