'use client'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type Props = {
  handleChange({ target }: { target: { name: string, value: any }}): void;
}

export default function LocationInput(props: Props) {
  const [selectedAddress, setSelectedAddress] = useState('');
  const handleSelect = async (address: any) => {
    // You can add additional logic here to handle the selected address,
    // such as geocoding it to get lat/long or storing the address in state.
    console.log(address);
    const geocodeResp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${address.value.place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`, { method: 'GET' });
    const geocodeJson = await geocodeResp.json();
    props.handleChange({
      target: {
        name: 'location',
        value: {
          name: address.value.structured_formatting.main_text,
          lat: geocodeJson.results[0].geometry.location.lat.toString(),
          lng: geocodeJson.results[0].geometry.location.lng.toString(),
        },
      }
    });
    setSelectedAddress(address);
  };

  return (
    <GooglePlacesAutocomplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} selectProps={{
      // @ts-expect-error wtv
      value: selectedAddress,
      onChange: handleSelect,
    }} />
  );
}
